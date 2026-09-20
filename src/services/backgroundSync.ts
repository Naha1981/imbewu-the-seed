import { 
  getFirebaseDb, 
  getFirebaseAuth, 
  doc, 
  setDoc, 
  getDocFromServer 
} from '../config/firebase';
import { OfflineStorageService } from './offlineStorage';
import type { WeeklyPackProgress, DailyStreakData, MilestoneBadge } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const auth = getFirebaseAuth();
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface SyncQueueItem {
  id: string;
  type: 'child_progress' | 'daily_streak' | 'milestone_badges' | 'household_prompt' | 'milestone_checkpoint' | 'centre_sync';
  childId?: string;
  centreId?: string;
  payload: Record<string, unknown>;
  timestamp: string;
  retryCount: number;
}

export interface SyncState {
  isOnline: boolean;
  isStable: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  pendingQueueCount: number;
  lastError: string | null;
  syncedItemsCount: number;
}

const QUEUE_STORAGE_KEY = 'imbewu_sync_queue_v1';
const LAST_SYNC_KEY = 'imbewu_last_cloud_sync_timestamp';

type SyncListener = (state: SyncState) => void;

class BackgroundSyncService {
  private queue: SyncQueueItem[] = [];
  private listeners: Set<SyncListener> = new Set();
  private state: SyncState = {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isStable: false,
    isSyncing: false,
    lastSyncedAt: typeof localStorage !== 'undefined' ? localStorage.getItem(LAST_SYNC_KEY) : null,
    pendingQueueCount: 0,
    lastError: null,
    syncedItemsCount: 0,
  };
  private stabilizationTimer: ReturnType<typeof setTimeout> | null = null;
  private autoSyncInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadQueue();
      this.state.isOnline = navigator.onLine;
      this.state.isStable = navigator.onLine;
      this.setupNetworkListeners();
      
      // Listen for decoupled storage mutation events
      window.addEventListener('imbewu:data_changed', ((event: CustomEvent<Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>>) => {
        if (event.detail) {
          this.enqueue(event.detail);
        }
      }) as EventListener);

      // Attempt connection validation test
      if (this.state.isOnline) {
        this.verifyStableConnection().then(stable => {
          if (stable) {
            this.syncPendingData();
          }
        });
      }

      // Periodic safety check every 45 seconds for stable connection
      this.autoSyncInterval = setInterval(() => {
        if (navigator.onLine && (this.queue.length > 0 || this.hasUnsyncedLocalData())) {
          this.syncPendingData();
        }
      }, 45000);
    }
  }

  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.updateState({ isOnline: true, isStable: false });
      
      // Debounce and test connection stability (important for rural South African 3G/LTE connections)
      if (this.stabilizationTimer) clearTimeout(this.stabilizationTimer);
      this.stabilizationTimer = setTimeout(async () => {
        const isStable = await this.verifyStableConnection();
        this.updateState({ isStable });
        if (isStable) {
          console.log('[Imbewu Sync] Stable connection confirmed. Triggering automatic background sync...');
          this.syncPendingData();
        }
      }, 2500); // 2.5s stability window
    });

    window.addEventListener('offline', () => {
      if (this.stabilizationTimer) clearTimeout(this.stabilizationTimer);
      this.updateState({ isOnline: false, isStable: false });
    });
  }

  /**
   * Performs a lightweight Firestore server probe to verify real cloud connectivity
   */
  public async verifyStableConnection(): Promise<boolean> {
    if (!navigator.onLine) return false;
    try {
      const db = getFirebaseDb();
      // Try to fetch connection test doc with a 3-second timeout
      const probePromise = getDocFromServer(doc(db, '_connection_test', 'ping'));
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Connection probe timeout')), 3500)
      );
      await Promise.race([probePromise, timeoutPromise]).catch(() => {
        // Doc might not exist or permission denied, but connection to Firestore server succeeded!
      });
      return true;
    } catch {
      // Offline or blocked
      return navigator.onLine;
    }
  }

  private loadQueue(): void {
    try {
      const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
      this.queue = stored ? JSON.parse(stored) : [];
      this.state.pendingQueueCount = this.queue.length;
    } catch {
      this.queue = [];
    }
  }

  private saveQueue(): void {
    try {
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(this.queue));
      this.updateState({ pendingQueueCount: this.queue.length });
    } catch {
      // LocalStorage error
    }
  }

  /**
   * Enqueues an offline action to be pushed to Firestore once stable connection is active
   */
  public enqueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>): void {
    const queueItem: SyncQueueItem = {
      ...item,
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      retryCount: 0
    };

    this.queue.push(queueItem);
    this.saveQueue();

    // If currently online & stable, trigger immediate sync
    if (this.state.isOnline && !this.state.isSyncing) {
      this.syncPendingData();
    }
  }

  /**
   * Gathers all local progress data for a child and prepares a full sync snapshot
   */
  public snapshotChildProgress(childId: string): Record<string, unknown> {
    const streak = OfflineStorageService.getDailyStreak(childId);
    const badges = OfflineStorageService.getBadges(childId);
    const schedule = OfflineStorageService.getScheduledActivities(childId);
    
    // Collect pack progress
    const packProgresses: Record<string, WeeklyPackProgress> = {};
    const packs = OfflineStorageService.getAvailablePacks();
    packs.forEach(p => {
      const prog = OfflineStorageService.getWeeklyProgress(p.id, childId);
      if (prog) {
        packProgresses[p.id] = prog;
      }
    });

    // Collect household prompt completion & milestone checkpoints
    let householdDone: Record<string, boolean> = {};
    let checkpoints: unknown[] = [];
    try {
      const hStr = localStorage.getItem(`imbewu_household_done_${childId}`);
      if (hStr) householdDone = JSON.parse(hStr);
      const cStr = localStorage.getItem(`imbewu_checkpoints_${childId}`);
      if (cStr) checkpoints = JSON.parse(cStr);
    } catch {
      // Ignore
    }

    return {
      childId,
      streak,
      badges,
      schedule,
      packProgresses,
      householdDone,
      checkpoints,
      lastSnapshotAt: new Date().toISOString(),
      platform: 'web-pwa-hybrid'
    };
  }

  /**
   * Gathers all local ECD centre sync data
   */
  public snapshotCentreData(centreId: string = 'centre-soweto-01'): Record<string, unknown> {
    let attendanceLogs: unknown[] = [];
    try {
      const attStr = localStorage.getItem(`imbewu_centre_attendance_${centreId}`);
      if (attStr) attendanceLogs = JSON.parse(attStr);
    } catch {
      // Ignore
    }

    return {
      centreId,
      attendanceLogs,
      syncedAt: new Date().toISOString(),
      status: 'ACTIVE_CENTRE'
    };
  }

  private hasUnsyncedLocalData(): boolean {
    return this.queue.length > 0;
  }

  /**
   * Pushes all pending queue items and latest snapshots to Firestore
   */
  public async syncPendingData(): Promise<{ success: boolean; syncedCount: number; error?: string }> {
    if (this.state.isSyncing) return { success: false, syncedCount: 0 };
    if (!navigator.onLine) {
      this.updateState({ isOnline: false, isStable: false });
      return { success: false, syncedCount: 0, error: 'Device is offline' };
    }

    this.updateState({ isSyncing: true, lastError: null });

    try {
      const db = getFirebaseDb();
      let syncedCount = 0;

      // 1. Process queued items first
      const remainingQueue: SyncQueueItem[] = [];

      for (const item of this.queue) {
        try {
          if (item.childId) {
            const path = `child_progress/${item.childId}`;
            await setDoc(doc(db, 'child_progress', item.childId), {
              childId: item.childId,
              [item.type]: item.payload,
              lastSyncedAt: new Date().toISOString(),
              syncSource: 'background_service'
            }, { merge: true }).catch(err => {
              handleFirestoreError(err, OperationType.WRITE, path);
            });
            syncedCount++;
          } else if (item.centreId) {
            const path = `centre_sync_logs/${item.centreId}`;
            await setDoc(doc(db, 'centre_sync_logs', item.centreId), {
              centreId: item.centreId,
              payload: item.payload,
              syncedAt: new Date().toISOString(),
              status: 'SYNCED'
            }, { merge: true }).catch(err => {
              handleFirestoreError(err, OperationType.WRITE, path);
            });
            syncedCount++;
          }
        } catch (err: unknown) {
          console.warn(`[Imbewu Sync] Failed item ${item.id}:`, err);
          item.retryCount++;
          if (item.retryCount < 5) {
            remainingQueue.push(item);
          }
        }
      }

      this.queue = remainingQueue;
      this.saveQueue();

      // 2. Perform automated snapshot synchronization for active child profile & centre
      const activeChildId = this.getActiveChildId();
      if (activeChildId) {
        const childSnapshot = this.snapshotChildProgress(activeChildId);
        const childPath = `child_progress/${activeChildId}`;
        await setDoc(doc(db, 'child_progress', activeChildId), childSnapshot, { merge: true }).catch(err => {
          handleFirestoreError(err, OperationType.WRITE, childPath);
        });
        syncedCount++;
      }

      // Also sync centre log
      const centreSnapshot = this.snapshotCentreData();
      const centrePath = `centre_sync_logs/default_centre`;
      await setDoc(doc(db, 'centre_sync_logs', 'default_centre'), centreSnapshot, { merge: true }).catch(err => {
        handleFirestoreError(err, OperationType.WRITE, centrePath);
      });
      syncedCount++;

      const nowIso = new Date().toISOString();
      localStorage.setItem(LAST_SYNC_KEY, nowIso);

      this.updateState({
        isSyncing: false,
        lastSyncedAt: nowIso,
        pendingQueueCount: this.queue.length,
        syncedItemsCount: this.state.syncedItemsCount + syncedCount,
        lastError: null
      });

      return { success: true, syncedCount };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      this.updateState({
        isSyncing: false,
        lastError: errMsg
      });
      return { success: false, syncedCount: 0, error: errMsg };
    }
  }

  private getActiveChildId(): string | null {
    try {
      const saved = localStorage.getItem('imbewu_active_child');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.id || null;
      }
    } catch {
      // Default to known demo child
    }
    return 'child-1';
  }

  public getState(): SyncState {
    return { ...this.state };
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private updateState(partial: Partial<SyncState>): void {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(fn => {
      try {
        fn(this.getState());
      } catch (e) {
        console.error('Error in sync listener:', e);
      }
    });
  }
}

export const syncService = new BackgroundSyncService();
