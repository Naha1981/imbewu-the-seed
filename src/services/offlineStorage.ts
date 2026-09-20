import type { WeeklyLearningPack, WorksheetData, WeeklyPackProgress, DayProgress, ScheduledActivity, DayOfWeek, DailyStreakData, MilestoneBadge } from '../types';
import { INITIAL_DEMO_WORKSHEET } from './learningGraph';

// Storage keys
const STORAGE_KEYS = {
  PACKS: 'imbewu_offline_packs_v1',
  WORKSHEETS: 'imbewu_offline_worksheets_v1',
  PROGRESS_PREFIX: 'imbewu_weekly_progress_',
  SCHEDULE_PREFIX: 'imbewu_schedule_',
  STREAK_PREFIX: 'imbewu_streak_',
  BADGES_PREFIX: 'imbewu_badges_',
  LAST_SYNC: 'imbewu_last_offline_sync'
};

// Built-in South African core curriculum weekly packs (always accessible offline)
export const SEED_WEEKLY_PACKS: WeeklyLearningPack[] = [
  {
    id: 'pack-week-1',
    title: 'Alphabet & Beginning Sounds (Week 1)',
    theme: 'Foundational Phonics & Letter Recognition',
    ageGroup: 'Ages 3–5',
    language: 'zu',
    totalActivities: 5,
    isPaidOnly: false,
    createdAt: '2026-09-01T00:00:00Z',
    days: [
      {
        dayName: 'Monday',
        focus: 'Sound /b/ & Letter B',
        learningObjective: 'Recognise uppercase B and lowercase b. Connect to Ibhola (Ball) and Ibhasi (Bus).',
        instructions: 'Circle all the uppercase B and lowercase b letters. Say /b/ with your parent.',
        worksheetType: 'circle_letter',
        teacherGuide: 'Emphasise the lip-popping sound /b/. Show a picture of a soccer ball (ibhola).',
        parentHomeExtension: 'Find 2 things in the kitchen starting with /b/ (isinkwa/bread or ibhola).',
        durationMinutes: 10
      },
      {
        dayName: 'Tuesday',
        focus: 'Letter Tracing & Pencil Grip',
        learningObjective: 'Trace down the tall stroke, then bounce around two bellies for B.',
        instructions: 'Trace the dotted lines from the seed to the plant with a green or brown crayon.',
        worksheetType: 'letter_tracing',
        teacherGuide: 'Ensure relaxed grip. Guide finger tracing in sand before pencil on paper.',
        parentHomeExtension: 'Let your child draw the letter B in a plate of maize meal.',
        durationMinutes: 15
      },
      {
        dayName: 'Wednesday',
        focus: 'Uppercase / Lowercase Pairing',
        learningObjective: 'Match uppercase B to lowercase b, and M to m.',
        instructions: 'Draw a straight line connecting mama letter (B) to baby letter (b).',
        worksheetType: 'matching_case',
        teacherGuide: 'Use the mama and baby metaphor to make case pairing intuitive.',
        parentHomeExtension: 'Ask: "Can you spot the little b hiding in this street sign?"',
        durationMinutes: 10
      },
      {
        dayName: 'Thursday',
        focus: 'Colouring & Vocabulary',
        learningObjective: 'Colour objects that begin with B (Bus, Ball, Bread, Banana).',
        instructions: 'Colour only the items that start with /b/. Leave others blank.',
        worksheetType: 'colour_objects',
        teacherGuide: 'Encourage children to stay within the lines while holding crayon firmly.',
        parentHomeExtension: 'Talk about what colour taxis and buses are in your area.',
        durationMinutes: 15
      },
      {
        dayName: 'Friday',
        focus: 'Review & Celebration Story',
        learningObjective: 'Review all 4 letters (B, M, S, A) and share proud moments.',
        instructions: 'Complete the Friday seed review puzzle. Earn your Week 1 Sprout Badge!',
        worksheetType: 'pencil_control',
        teacherGuide: 'Reward effort and celebration. Mark the progress badge in their book.',
        parentHomeExtension: 'Praise your child with high-fives and bedtime story in mother tongue.',
        durationMinutes: 15
      }
    ]
  },
  {
    id: 'pack-week-2',
    title: 'Counting & Taxi Passengers (Week 2)',
    theme: 'Early Numeracy (Numbers 1 to 5)',
    ageGroup: 'Ages 3–5',
    language: 'en',
    totalActivities: 5,
    isPaidOnly: false,
    createdAt: '2026-09-08T00:00:00Z',
    days: [
      {
        dayName: 'Monday',
        focus: 'Number 1 & 2 Recognition',
        learningObjective: 'Count 1 sun in the sky and 2 shoes on our feet.',
        instructions: 'Circle the sets of 1 and 2 objects.',
        worksheetType: 'count_and_circle',
        teacherGuide: 'Use real bottle caps or stones to represent numbers physically.',
        parentHomeExtension: 'Count shoes at the door when coming back from preschool.',
        durationMinutes: 10
      },
      {
        dayName: 'Tuesday',
        focus: 'Tracing Number 3 & 4',
        learningObjective: 'Follow curves of 3 and straight corners of 4.',
        instructions: 'Trace the dotted numbers 3 and 4 with steady strokes.',
        worksheetType: 'number_tracing',
        teacherGuide: 'Help with directionality: around the tree and around the tree makes 3.',
        parentHomeExtension: 'Count spoons when setting the dinner table together.',
        durationMinutes: 15
      },
      {
        dayName: 'Wednesday',
        focus: 'Mini-Bus Taxi Passenger Count',
        learningObjective: 'Count passengers getting on the taxi from 1 up to 5.',
        instructions: 'Draw dots inside the taxi windows for each passenger.',
        worksheetType: 'count_and_circle',
        teacherGuide: 'Sing a South African taxi counting song during morning ring.',
        parentHomeExtension: 'Ask how many people are sitting in the room right now.',
        durationMinutes: 15
      },
      {
        dayName: 'Thursday',
        focus: 'Connecting Numbers to Objects',
        learningObjective: 'Match numeral symbol 5 to a picture of 5 apples.',
        instructions: 'Match each number to the box with that many items.',
        worksheetType: 'shapes_patterns',
        teacherGuide: 'Pair learners to check each other’s counting with high fives.',
        parentHomeExtension: 'Show 5 fingers on one hand. Count them out loud.',
        durationMinutes: 15
      },
      {
        dayName: 'Friday',
        focus: 'Weekly Number Harvest & Badge',
        learningObjective: 'Consolidate 1–5 counting and claim your Sprout Math Star.',
        instructions: 'Count all the seeds planted this week.',
        worksheetType: 'pencil_control',
        teacherGuide: 'Celebrate progress with an Imbewu gold sticker or stamp.',
        parentHomeExtension: 'Ask your child to count from 1 to 5 in both English and isiZulu.',
        durationMinutes: 15
      }
    ]
  },
  {
    id: 'pack-week-3',
    title: 'Shapes & Patterns in Our Community (Week 3)',
    theme: 'Geometry, Symmetry & Visual Discrimination',
    ageGroup: 'Ages 4–6',
    language: 'zu',
    totalActivities: 5,
    isPaidOnly: true,
    createdAt: '2026-09-15T00:00:00Z',
    days: [
      {
        dayName: 'Monday',
        focus: 'Circles & Round Things (Isiyingi)',
        learningObjective: 'Spot round shapes like the soccer ball (ibhola) and clock.',
        instructions: 'Colour all the round circles red. Trace the edge smoothly.',
        worksheetType: 'shapes_patterns',
        teacherGuide: 'Bring a round soccer ball and plate to class.',
        parentHomeExtension: 'Look around the kitchen: which containers are round?',
        durationMinutes: 15
      },
      {
        dayName: 'Tuesday',
        focus: 'Triangles & Traditional Roofs',
        learningObjective: 'Identify 3 sides and 3 corners in a triangle.',
        instructions: 'Connect the 3 dots to draw your own triangular roofs.',
        worksheetType: 'pencil_control',
        teacherGuide: 'Discuss traditional rondavel roofs and triangles in buildings.',
        parentHomeExtension: 'Cut a slice of toast into two triangles for breakfast.',
        durationMinutes: 15
      },
      {
        dayName: 'Wednesday',
        focus: 'Squares & Window Frames',
        learningObjective: 'Recognise 4 equal sides in squares and window panes.',
        instructions: 'Colour the squares blue and count how many you find.',
        worksheetType: 'colour_objects',
        teacherGuide: 'Have learners trace floor tiles with chalk or tape.',
        parentHomeExtension: 'Look out the window: notice how windows are made of squares.',
        durationMinutes: 15
      },
      {
        dayName: 'Thursday',
        focus: 'Pattern Sequences (Circle, Square, Circle)',
        learningObjective: 'Complete simple ABAB repeating shape patterns.',
        instructions: 'What shape comes next in the train? Draw it in the empty car.',
        worksheetType: 'shapes_patterns',
        teacherGuide: 'Clap-clap-stomp rhythm games reinforce repeating patterns.',
        parentHomeExtension: 'Create a pattern with spoons and forks on the table.',
        durationMinutes: 15
      },
      {
        dayName: 'Friday',
        focus: 'Creative Shape Collage & Badge',
        learningObjective: 'Combine shapes to build a house, tree, and car.',
        instructions: 'Draw your own community using circles, squares, and triangles.',
        worksheetType: 'pencil_control',
        teacherGuide: 'Display learner drawings on the classroom bulletin board.',
        parentHomeExtension: 'Display this week’s drawing on the fridge with pride.',
        durationMinutes: 20
      }
    ]
  }
];

export const SEED_BADGES: MilestoneBadge[] = [
  {
    id: 'badge-first-seed',
    category: 'learning',
    title: 'First Seed Sown',
    titleZu: 'Imbewu Yokuqala',
    stickerEmoji: '🌱',
    stickerTheme: 'emerald',
    description: 'Completed first learning activity and planted the seed of knowledge.',
    descriptionZu: 'Uqede umsebenzi wokuqala wokufunda watshala imbewu yolwazi.',
    criteria: 'Complete 1 learning activity',
    requiredCount: 1,
    currentCount: 0,
    unlocked: false,
    rarity: 'Common',
    rarityZu: 'Okujwayelekile',
    praiseQuote: 'Halala! Every giant baobab starts from a tiny, hopeful seed.',
    praiseQuoteZu: 'Halala! Isihlahla sonke esikhulu siqala ngembewu encane yethemba.'
  },
  {
    id: 'badge-streak-3',
    category: 'streak',
    title: '3-Day Habit Flame',
    titleZu: 'Inhlansi Yezinsuku Ezi-3',
    stickerEmoji: '🔥',
    stickerTheme: 'amber',
    description: 'Learned 3 days in a row without breaking the daily practice rhythm.',
    descriptionZu: 'Ufunde izinsuku ezi-3 zilandelana ngaphandle kokwephula isigqi sokuzilolonga.',
    criteria: 'Maintain a 3-day active streak',
    requiredCount: 3,
    currentCount: 0,
    unlocked: false,
    rarity: 'Rare',
    rarityZu: 'Okungajwayelekile',
    praiseQuote: 'Magnificent focus! Consistency transforms curious play into true mastery.',
    praiseQuoteZu: 'Ukuzinikela okumangalisayo! Ukufunda nsuku zonke kuguqula umdlalo ube wulwazi lwangempela.'
  },
  {
    id: 'badge-brave-lion',
    category: 'learning',
    title: 'Fearless Phonics Lion',
    titleZu: 'Ibhubesi Elinesibindi',
    stickerEmoji: '🦁',
    stickerTheme: 'amber',
    description: 'Mastered initial letter sound recognition and oral pronunciation.',
    descriptionZu: 'Ubambe imisindo yokuqala yezinhlamvu nokuphimisa okucacile.',
    criteria: 'Achieve confidence in letter recognition',
    requiredCount: 1,
    currentCount: 0,
    unlocked: false,
    rarity: 'Rare',
    rarityZu: 'Okungajwayelekile',
    praiseQuote: 'Roar with pride! Your spoken sounds are strong and confident.',
    praiseQuoteZu: 'Bhonga ngokuziqhenya! Imisindo yakho yokuphimisa inamandla futhi icacile.'
  },
  {
    id: 'badge-streak-5',
    category: 'streak',
    title: 'School-Week Superstar',
    titleZu: 'Iqhawe Lesonto Lokufunda',
    stickerEmoji: '⭐',
    stickerTheme: 'indigo',
    description: 'Achieved a full 5-day learning streak across Monday to Friday.',
    descriptionZu: 'Ufinyelele izinsuku ezi-5 zilandelana kusukela ngoMsombuluko kuya kuLwesihlanu.',
    criteria: 'Reach a 5-day continuous streak',
    requiredCount: 5,
    currentCount: 0,
    unlocked: false,
    rarity: 'Epic',
    rarityZu: 'Okwehlukile',
    praiseQuote: 'A whole week of joyful learning! You shine brighter than the morning star.',
    praiseQuoteZu: 'Iviki lonke lokufunda ngenjabulo! Ukhanya ukudlula inkanyezi yokusa.'
  },
  {
    id: 'badge-bilingual-rainbow',
    category: 'explorer',
    title: 'Bilingual Rainbow Explorer',
    titleZu: 'Umcwaningi Wezilimi Ezimbili',
    stickerEmoji: '🇿🇦',
    stickerTheme: 'teal',
    description: 'Practiced vocabulary in both isiZulu and English language pathways.',
    descriptionZu: 'Uzijwayeze amagama azo zombili izilimi isiZulu nesiNgisi.',
    criteria: 'Complete 3 bilingual practice interactions',
    requiredCount: 3,
    currentCount: 0,
    unlocked: false,
    rarity: 'Rare',
    rarityZu: 'Okungajwayelekile',
    praiseQuote: 'Speaking multiple mother tongues is your South African superpower!',
    praiseQuoteZu: 'Ukukhuluma izilimi eziningi kungamandla akho amakhulu aseNingizimu Afrika!'
  },
  {
    id: 'badge-creative-artist',
    category: 'creativity',
    title: 'Fine Motor Artist',
    titleZu: 'Umculi Wezandla Nobuciko',
    stickerEmoji: '🎨',
    stickerTheme: 'rose',
    description: 'Practiced pencil grip, tracing curved strokes, or creative colouring.',
    descriptionZu: 'Uzijwayeze ukubamba ipensela nokulandela imigqa yobuciko.',
    criteria: 'Complete 1 tracing or drawing activity',
    requiredCount: 1,
    currentCount: 0,
    unlocked: false,
    rarity: 'Common',
    rarityZu: 'Okujwayelekile',
    praiseQuote: 'Every stroke strengthens tiny hands for future reading and writing.',
    praiseQuoteZu: 'Yonke imivimbo iqinisa izandla ezincane zokubhala nokufunda esikhathini esizayo.'
  },
  {
    id: 'badge-elephant-memory',
    category: 'learning',
    title: 'Elephant Wisdom',
    titleZu: 'Inkumbulo Yendlovu Enkulu',
    stickerEmoji: '🐘',
    stickerTheme: 'purple',
    description: 'Accumulated 7 lifetime practice sessions building long-term memory.',
    descriptionZu: 'Uqoqe izikhathi zokuzilolonga eziyi-7 ezakha inkumbulo ehlala njalo.',
    criteria: 'Complete 7 total learning sessions',
    requiredCount: 7,
    currentCount: 0,
    unlocked: false,
    rarity: 'Epic',
    rarityZu: 'Okwehlukile',
    praiseQuote: 'Like Indlovu, you never forget what your heart has learned with joy.',
    praiseQuoteZu: 'NjengeNdlovu enobuhlakani, awusoze wakukhohlwa lokho okufunde ngenhliziyo nenjabulo.'
  },
  {
    id: 'badge-scholar-scroll',
    category: 'creativity',
    title: 'Print & Paper Champion',
    titleZu: 'Iqhawe Lamaphepha Okuzilolonga',
    stickerEmoji: '📄',
    stickerTheme: 'indigo',
    description: 'Engaged with an A4 printable offline worksheet with family.',
    descriptionZu: 'Usebenze ngephepha lokufunda le-A4 elingaphrintwa nomndeni.',
    criteria: 'Complete or print an offline worksheet',
    requiredCount: 1,
    currentCount: 0,
    unlocked: false,
    rarity: 'Common',
    rarityZu: 'Okujwayelekile',
    praiseQuote: 'Screen-free tactile exploration is where true coordination blossoms!',
    praiseQuoteZu: 'Ukufunda ephepheni ngaphandle kwesikrini kwenza izandla zicabange kahle!'
  },
  {
    id: 'badge-baobab-master',
    category: 'streak',
    title: 'Mighty Baobab Guardian',
    titleZu: 'Umgcinisihlahla Sebaobab',
    stickerEmoji: '🌳',
    stickerTheme: 'emerald',
    description: 'Reached a 10-day streak or finished all activities in a weekly pack.',
    descriptionZu: 'Ufinyelele izinsuku ezi-10 noma waqeda yonke imisebenzi yephekhi yeviki.',
    criteria: 'Reach 10-day streak or complete weekly pack',
    requiredCount: 10,
    currentCount: 0,
    unlocked: false,
    rarity: 'Legendary',
    rarityZu: 'Inganekwane',
    praiseQuote: 'Deep roots weathering any storm! You stand tall like the ancient Baobab.',
    praiseQuoteZu: 'Izimpande ezijulile! Umi ngokuziqhenya njengesihlahla esikhulu se-Baobab.'
  },
  {
    id: 'badge-ubuntu-family',
    category: 'explorer',
    title: 'Ubuntu Family Circle',
    titleZu: 'Umndeni We-Ubuntu',
    stickerEmoji: '🤝',
    stickerTheme: 'amber',
    description: 'Shared a real-life home extension learning moment with family.',
    descriptionZu: 'Wabelana ngomzuzu wokufunda ekhaya nomndeni wakho.',
    criteria: 'Complete 1 home extension or family check-in',
    requiredCount: 1,
    currentCount: 0,
    unlocked: false,
    rarity: 'Rare',
    rarityZu: 'Okungajwayelekile',
    praiseQuote: 'Umuntu ngumuntu ngabantu — a child is raised by the whole village!',
    praiseQuoteZu: 'Umuntu ngumuntu ngabantu — ingane ikhuliswa ngumphakathi wonke!'
  }
];

export class OfflineStorageService {
  /**
   * Initializes local storage cache with initial South African weekly packs
   */
  static initializeCache(): void {
    try {
      if (typeof window === 'undefined') return;

      const existingPacks = localStorage.getItem(STORAGE_KEYS.PACKS);
      if (!existingPacks) {
        localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(SEED_WEEKLY_PACKS));
      }

      const existingWorksheets = localStorage.getItem(STORAGE_KEYS.WORKSHEETS);
      if (!existingWorksheets) {
        localStorage.setItem(STORAGE_KEYS.WORKSHEETS, JSON.stringify([INITIAL_DEMO_WORKSHEET]));
      }

      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (e) {
      console.warn('LocalStorage unavailable or quota exceeded:', e);
    }
  }

  /**
   * Retrieves all cached weekly learning packs
   */
  static getCachedWeeklyPacks(): WeeklyLearningPack[] {
    try {
      if (typeof window === 'undefined') return SEED_WEEKLY_PACKS;
      const raw = localStorage.getItem(STORAGE_KEYS.PACKS);
      if (!raw) {
        this.initializeCache();
        return SEED_WEEKLY_PACKS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to parse cached weekly packs:', e);
      return SEED_WEEKLY_PACKS;
    }
  }

  /**
   * Caches a new or updated weekly pack for offline use
   */
  static cacheWeeklyPack(pack: WeeklyLearningPack): void {
    try {
      if (typeof window === 'undefined') return;
      const packs = this.getCachedWeeklyPacks();
      const idx = packs.findIndex(p => p.id === pack.id);
      if (idx >= 0) {
        packs[idx] = pack;
      } else {
        packs.unshift(pack);
      }
      localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(packs));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (e) {
      console.warn('Failed to cache weekly pack offline:', e);
    }
  }

  /**
   * Retrieves cached printable worksheets
   */
  static getCachedWorksheets(): WorksheetData[] {
    try {
      if (typeof window === 'undefined') return [INITIAL_DEMO_WORKSHEET];
      const raw = localStorage.getItem(STORAGE_KEYS.WORKSHEETS);
      if (!raw) return [INITIAL_DEMO_WORKSHEET];
      return JSON.parse(raw);
    } catch {
      return [INITIAL_DEMO_WORKSHEET];
    }
  }

  /**
   * Caches a single worksheet for offline printing
   */
  static cacheWorksheet(ws: WorksheetData): void {
    try {
      if (typeof window === 'undefined') return;
      const worksheets = this.getCachedWorksheets();
      const idx = worksheets.findIndex(w => w.id === ws.id);
      if (idx >= 0) {
        worksheets[idx] = ws;
      } else {
        worksheets.unshift(ws);
      }
      localStorage.setItem(STORAGE_KEYS.WORKSHEETS, JSON.stringify(worksheets));
    } catch (e) {
      console.warn('Failed to cache worksheet offline:', e);
    }
  }

  /**
   * Gets or initializes weekly pack progress for a given child and pack
   */
  static getWeeklyProgress(childId: string, packId: string): WeeklyPackProgress {
    const key = `${STORAGE_KEYS.PROGRESS_PREFIX}${childId}_${packId}`;
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(key);
        if (raw) {
          return JSON.parse(raw);
        }
      }
    } catch (e) {
      console.warn('Failed to read progress from storage:', e);
    }

    // Default progress for initial state (e.g. 2 days done as demo progress)
    const defaultDays: DayProgress[] = [
      { dayName: 'Monday', completed: true, completedAt: 'Yesterday' },
      { dayName: 'Tuesday', completed: true, completedAt: 'Today' },
      { dayName: 'Wednesday', completed: false },
      { dayName: 'Thursday', completed: false },
      { dayName: 'Friday', completed: false }
    ];

    const completed = defaultDays.filter(d => d.completed).length;
    const percentage = Math.round((completed / defaultDays.length) * 100);

    const initialProgress: WeeklyPackProgress = {
      packId,
      childId,
      weekNumber: packId === 'pack-week-2' ? 2 : packId === 'pack-week-3' ? 3 : 1,
      packTitle: packId === 'pack-week-2' ? 'Counting & Taxi Passengers' : 'Alphabet & Beginning Sounds',
      theme: 'Foundational Phonics & Letter Recognition',
      totalDays: 5,
      completedDaysCount: completed,
      completionPercentage: percentage,
      days: defaultDays,
      currentStreakDays: 3,
      sproutStage: this.calculateSproutStage(percentage),
      lastPracticedDate: 'Today'
    };

    this.saveWeeklyProgress(initialProgress);
    return initialProgress;
  }

  /**
   * Saves weekly progress to local storage
   */
  static saveWeeklyProgress(progress: WeeklyPackProgress): void {
    const key = `${STORAGE_KEYS.PROGRESS_PREFIX}${progress.childId}_${progress.packId}`;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(progress));
      }
    } catch (e) {
      console.warn('Failed to save progress to local storage:', e);
    }
  }

  /**
   * Toggles completion for a specific day in a weekly pack
   */
  static toggleDayCompletion(childId: string, packId: string, dayName: string): WeeklyPackProgress {
    const current = this.getWeeklyProgress(childId, packId);
    const updatedDays = current.days.map(d => {
      if (d.dayName === dayName) {
        const nextState = !d.completed;
        return {
          ...d,
          completed: nextState,
          completedAt: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        };
      }
      return d;
    });

    const completedCount = updatedDays.filter(d => d.completed).length;
    const percentage = Math.round((completedCount / updatedDays.length) * 100);

    // Calculate streak
    let streak = current.currentStreakDays;
    if (completedCount > current.completedDaysCount) {
      streak = Math.min(streak + 1, 7);
    } else if (completedCount < current.completedDaysCount) {
      streak = Math.max(streak - 1, 1);
    }

    const updated: WeeklyPackProgress = {
      ...current,
      days: updatedDays,
      completedDaysCount: completedCount,
      completionPercentage: percentage,
      currentStreakDays: streak,
      sproutStage: this.calculateSproutStage(percentage),
      lastPracticedDate: 'Just now'
    };

    this.saveWeeklyProgress(updated);
    return updated;
  }

  /**
   * Maps 0-100% completion into Imbewu's botanical seed growth stages
   */
  static calculateSproutStage(percentage: number): 'seed' | 'sprout' | 'stem' | 'bloom' | 'harvest' {
    if (percentage < 20) return 'seed';
    if (percentage < 45) return 'sprout';
    if (percentage < 70) return 'stem';
    if (percentage < 90) return 'bloom';
    return 'harvest';
  }

  /**
   * Retrieves scheduled activities for a child
   */
  static getScheduledActivities(childId: string): ScheduledActivity[] {
    const key = `${STORAGE_KEYS.SCHEDULE_PREFIX}${childId}`;
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.warn('Error reading schedule from storage:', e);
    }

    // Default seed schedule based on Week 1 pack
    const week1Pack = SEED_WEEKLY_PACKS[0];
    const initialSchedule: ScheduledActivity[] = week1Pack.days.map((day, idx) => ({
      id: `sched-${childId}-${day.dayName.toLowerCase()}-${idx}`,
      childId,
      packId: week1Pack.id,
      dayName: day.dayName as DayOfWeek,
      activityTitle: `${week1Pack.title} - ${day.focus}`,
      focus: day.focus,
      learningObjective: day.learningObjective,
      durationMinutes: day.durationMinutes,
      timeSlot: idx % 2 === 0 ? 'Morning (08:00)' : 'Afternoon (14:00)',
      completed: idx < 2, // Monday & Tuesday completed as realistic seed
      completedAt: idx < 2 ? '08:30 AM' : undefined,
      notes: idx === 0 ? 'Enjoyed popping the /b/ sound with ball!' : undefined
    }));

    this.saveScheduledActivities(childId, initialSchedule);
    return initialSchedule;
  }

  /**
   * Saves scheduled activities
   */
  static saveScheduledActivities(childId: string, activities: ScheduledActivity[]): void {
    const key = `${STORAGE_KEYS.SCHEDULE_PREFIX}${childId}`;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(activities));
      }
    } catch (e) {
      console.warn('Failed to save schedule:', e);
    }
  }

  /**
   * Toggles completion of a scheduled activity
   */
  static toggleScheduleCompletion(childId: string, scheduleId: string): ScheduledActivity[] {
    const list = this.getScheduledActivities(childId);
    let justCompleted = false;
    const updated = list.map(item => {
      if (item.id === scheduleId) {
        const nextState = !item.completed;
        if (nextState) justCompleted = true;
        return {
          ...item,
          completed: nextState,
          completedAt: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        };
      }
      return item;
    });

    this.saveScheduledActivities(childId, updated);
    if (justCompleted) {
      this.recordDailyActivity(childId);
    }
    return updated;
  }

  /**
   * Adds or updates a scheduled activity
   */
  static addScheduledActivity(childId: string, activity: ScheduledActivity): ScheduledActivity[] {
    const list = this.getScheduledActivities(childId);
    const existingIndex = list.findIndex(i => i.id === activity.id);
    let updated: ScheduledActivity[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = activity;
    } else {
      updated = [...list, activity];
    }
    this.saveScheduledActivities(childId, updated);
    return updated;
  }

  /**
   * Deletes a scheduled activity
   */
  static deleteScheduledActivity(childId: string, scheduleId: string): ScheduledActivity[] {
    const list = this.getScheduledActivities(childId);
    const updated = list.filter(i => i.id !== scheduleId);
    this.saveScheduledActivities(childId, updated);
    return updated;
  }

  /**
   * Automatically schedules an entire weekly pack across Monday-Friday
   */
  static autoSchedulePack(childId: string, packId: string): ScheduledActivity[] {
    const pack = SEED_WEEKLY_PACKS.find(p => p.id === packId) || SEED_WEEKLY_PACKS[0];
    const newItems: ScheduledActivity[] = pack.days.map((day, idx) => ({
      id: `sched-${childId}-${pack.id}-${day.dayName.toLowerCase()}-${Date.now() + idx}`,
      childId,
      packId: pack.id,
      dayName: day.dayName as DayOfWeek,
      activityTitle: `${pack.title.split('(')[0].trim()} · ${day.focus}`,
      focus: day.focus,
      learningObjective: day.learningObjective,
      durationMinutes: day.durationMinutes,
      timeSlot: idx % 2 === 0 ? 'Morning (08:00)' : 'Afternoon (14:00)',
      completed: false
    }));

    // Retain activities for other packs or days not covered, replace this pack
    const current = this.getScheduledActivities(childId).filter(i => i.packId !== pack.id);
    const combined = [...current, ...newItems];
    this.saveScheduledActivities(childId, combined);
    return combined;
  }

  /**
   * Gets daily streak data for habit formation
   */
  static getDailyStreak(childId: string): DailyStreakData {
    const key = `${STORAGE_KEYS.STREAK_PREFIX}${childId}`;
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.warn('Error reading streak data:', e);
    }

    // Default streak data: 4 consecutive active days
    const today = new Date();
    const dates: { [d: string]: boolean } = {};
    for (let i = 0; i < 4; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      dates[iso] = true;
    }

    const defaultStreak: DailyStreakData = {
      childId,
      currentStreak: 4,
      longestStreak: 7,
      lastActiveDate: today.toISOString().split('T')[0],
      weeklyActivityDates: dates,
      totalPracticeDays: 14
    };

    this.saveDailyStreak(defaultStreak);
    return defaultStreak;
  }

  /**
   * Saves daily streak data
   */
  static saveDailyStreak(streak: DailyStreakData): void {
    const key = `${STORAGE_KEYS.STREAK_PREFIX}${streak.childId}`;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(streak));
      }
    } catch (e) {
      console.warn('Failed to save streak:', e);
    }
  }

  /**
   * Records today's activity and calculates streak progression
   */
  static recordDailyActivity(childId: string): DailyStreakData {
    const streak = this.getDailyStreak(childId);
    const todayIso = new Date().toISOString().split('T')[0];

    const updatedDates = {
      ...streak.weeklyActivityDates,
      [todayIso]: true
    };

    let newCurrent = streak.currentStreak;
    if (streak.lastActiveDate !== todayIso) {
      newCurrent += 1;
    }

    const newLongest = Math.max(newCurrent, streak.longestStreak);
    const updated: DailyStreakData = {
      ...streak,
      currentStreak: newCurrent,
      longestStreak: newLongest,
      lastActiveDate: todayIso,
      weeklyActivityDates: updatedDates,
      totalPracticeDays: streak.totalPracticeDays + (streak.lastActiveDate !== todayIso ? 1 : 0)
    };

    this.saveDailyStreak(updated);
    
    // Automatically evaluate streak badges when activity is logged
    this.evaluateAndUnlockBadges(childId, {
      completedActivityCount: 1,
      currentStreak: updated.currentStreak,
      totalPracticeDays: updated.totalPracticeDays
    });

    return updated;
  }

  /**
   * Retrieves milestone badges for a child
   */
  static getBadges(childId: string): MilestoneBadge[] {
    const key = `${STORAGE_KEYS.BADGES_PREFIX}${childId}`;
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed: MilestoneBadge[] = JSON.parse(stored);
          // Merge with any new seed badges in case new ones were introduced
          const existingIds = new Set(parsed.map(b => b.id));
          const missing = SEED_BADGES.filter(b => !existingIds.has(b.id));
          return [...parsed, ...missing];
        }
      }
    } catch (e) {
      console.warn('Failed to load badges:', e);
    }

    // Default: Return initial seed badges with sensible initial unlocked state for demo
    const streak = this.getDailyStreak(childId);
    return SEED_BADGES.map(badge => {
      let isUnlocked = badge.unlocked;
      let currentCount = badge.currentCount;
      let unlockedAt = badge.unlockedAt;

      if (badge.id === 'badge-first-seed' && streak.totalPracticeDays >= 1) {
        isUnlocked = true;
        currentCount = streak.totalPracticeDays;
        unlockedAt = '2026-09-18T10:00:00Z';
      } else if (badge.id === 'badge-streak-3' && streak.currentStreak >= 3) {
        isUnlocked = true;
        currentCount = streak.currentStreak;
        unlockedAt = '2026-09-19T14:30:00Z';
      } else if (badge.id === 'badge-brave-lion') {
        isUnlocked = true; // Starter phonics completed in initial demo
        currentCount = 1;
        unlockedAt = '2026-09-17T09:15:00Z';
      } else if (badge.id === 'badge-streak-5') {
        currentCount = Math.min(badge.requiredCount, streak.currentStreak);
      } else if (badge.id === 'badge-elephant-memory') {
        currentCount = Math.min(badge.requiredCount, streak.totalPracticeDays);
      }

      return {
        ...badge,
        unlocked: isUnlocked,
        currentCount,
        unlockedAt
      };
    });
  }

  /**
   * Saves milestone badges for a child
   */
  static saveBadges(childId: string, badges: MilestoneBadge[]): void {
    const key = `${STORAGE_KEYS.BADGES_PREFIX}${childId}`;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(badges));
      }
    } catch (e) {
      console.warn('Failed to save badges:', e);
    }
  }

  /**
   * Evaluates milestone badge progress and unlocks newly achieved stickers
   */
  static evaluateAndUnlockBadges(
    childId: string,
    triggers?: {
      completedActivityCount?: number;
      currentStreak?: number;
      totalPracticeDays?: number;
      hasPrintedWorksheet?: boolean;
      completedDayInPack?: boolean;
      bilingualPracticed?: boolean;
    }
  ): { badges: MilestoneBadge[]; newlyUnlocked: MilestoneBadge[] } {
    const badges = this.getBadges(childId);
    const streak = this.getDailyStreak(childId);
    const nowIso = new Date().toISOString();
    const newlyUnlocked: MilestoneBadge[] = [];

    const effectiveStreak = triggers?.currentStreak ?? streak.currentStreak;
    const effectiveTotalDays = triggers?.totalPracticeDays ?? streak.totalPracticeDays;

    const updatedBadges = badges.map(badge => {
      if (badge.unlocked) return badge;

      let shouldUnlock = false;
      let newCount = badge.currentCount;

      switch (badge.id) {
        case 'badge-first-seed':
          newCount = Math.max(badge.currentCount, effectiveTotalDays >= 1 ? 1 : 0);
          if (effectiveTotalDays >= 1 || (triggers?.completedActivityCount && triggers.completedActivityCount > 0)) {
            shouldUnlock = true;
          }
          break;

        case 'badge-streak-3':
          newCount = Math.max(badge.currentCount, effectiveStreak);
          if (effectiveStreak >= 3) shouldUnlock = true;
          break;

        case 'badge-streak-5':
          newCount = Math.max(badge.currentCount, effectiveStreak);
          if (effectiveStreak >= 5) shouldUnlock = true;
          break;

        case 'badge-brave-lion':
          if (triggers?.completedActivityCount || triggers?.completedDayInPack) {
            newCount = 1;
            shouldUnlock = true;
          }
          break;

        case 'badge-bilingual-rainbow':
          if (triggers?.bilingualPracticed) {
            newCount = Math.min(badge.requiredCount, badge.currentCount + 1);
            if (newCount >= badge.requiredCount) shouldUnlock = true;
          }
          break;

        case 'badge-creative-artist':
          if (triggers?.hasPrintedWorksheet || triggers?.completedDayInPack) {
            newCount = 1;
            shouldUnlock = true;
          }
          break;

        case 'badge-elephant-memory':
          newCount = Math.max(badge.currentCount, effectiveTotalDays);
          if (effectiveTotalDays >= 7) shouldUnlock = true;
          break;

        case 'badge-scholar-scroll':
          if (triggers?.hasPrintedWorksheet) {
            newCount = 1;
            shouldUnlock = true;
          }
          break;

        case 'badge-baobab-master':
          newCount = Math.max(badge.currentCount, effectiveStreak);
          if (effectiveStreak >= 10 || triggers?.completedDayInPack) {
            shouldUnlock = true;
          }
          break;

        case 'badge-ubuntu-family':
          if (triggers?.completedDayInPack) {
            newCount = 1;
            shouldUnlock = true;
          }
          break;

        default:
          break;
      }

      if (shouldUnlock && !badge.unlocked) {
        const unlockedBadge: MilestoneBadge = {
          ...badge,
          unlocked: true,
          currentCount: badge.requiredCount,
          unlockedAt: nowIso
        };
        newlyUnlocked.push(unlockedBadge);
        return unlockedBadge;
      }

      return {
        ...badge,
        currentCount: newCount
      };
    });

    this.saveBadges(childId, updatedBadges);
    return { badges: updatedBadges, newlyUnlocked };
  }

  /**
   * Manually unlock a badge (e.g. for testing / parent reward reward)
   */
  static unlockBadge(childId: string, badgeId: string): MilestoneBadge[] {
    const badges = this.getBadges(childId);
    const updated = badges.map(b => {
      if (b.id === badgeId) {
        return {
          ...b,
          unlocked: true,
          currentCount: b.requiredCount,
          unlockedAt: new Date().toISOString()
        };
      }
      return b;
    });
    this.saveBadges(childId, updated);
    return updated;
  }

  /**
   * Check if running in offline mode or network is down
   */
  static isOffline(): boolean {
    if (typeof navigator === 'undefined') return false;
    return !navigator.onLine;
  }
}

// Auto-initialize on module load in client
if (typeof window !== 'undefined') {
  OfflineStorageService.initializeCache();
}
