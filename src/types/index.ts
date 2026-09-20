export type UserRole = 'PARENT' | 'TEACHER' | 'ECD_MANAGER' | 'SUPER_ADMIN';

export type PlanTier = 'FREE' | 'FAMILY' | 'ECD' | 'CENTRE' | 'ENTERPRISE';

export type LanguageCode = 'en' | 'zu' | 'nso' | 'st' | 'tn' | 'xh';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
  currentPlan: PlanTier;
  preferredLanguage: LanguageCode;
  centreId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  nickname: string;
  age: number;
  dateOfBirth?: string;
  preferredLanguage: LanguageCode;
  interests: string[];
  learningAreas: string[];
  learningMode: 'digital' | 'printable' | 'both';
  createdAt: string;
}

export type SkillStatus = 'INTRODUCED' | 'PRACTISING' | 'DEVELOPING' | 'CONFIDENT';

export interface SkillDefinition {
  id: string;
  category: 'literacy' | 'numeracy' | 'shapes_logic' | 'fine_motor' | 'observation';
  nameEn: string;
  nameZu: string;
  descriptionEn: string;
  descriptionZu: string;
  targetAge: number;
  prerequisites?: string[];
}

export interface SkillProgress {
  skillId: string;
  childId: string;
  status: SkillStatus;
  recentScore: number;
  practiceCount: number;
  lastPracticedAt: string;
  practiceSignal: string;
  recommendedNextId?: string;
}

export type WorksheetType = 
  | 'letter_tracing'
  | 'matching_case'
  | 'missing_letter'
  | 'circle_letter'
  | 'colour_objects'
  | 'number_tracing'
  | 'count_and_circle'
  | 'shapes_patterns'
  | 'pencil_control';

export interface WorksheetData {
  id: string;
  title: string;
  titleZu?: string;
  type: WorksheetType;
  ageRange: string;
  language: LanguageCode;
  skillId: string;
  learningObjective: string;
  instructions: string;
  targetLetterOrNumber: string;
  items: Array<{
    id: string;
    prompt: string;
    options?: string[];
    answer: string;
    imagePrompt?: string;
    hint?: string;
  }>;
  teacherNotes: string;
  parentNotes: string;
  isPaidEntitlement: boolean;
  watermark?: boolean;
}

export interface DayActivity {
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  focus: string;
  learningObjective: string;
  instructions: string;
  worksheetType: WorksheetType;
  teacherGuide: string;
  parentHomeExtension: string;
  durationMinutes: number;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface ScheduledActivity {
  id: string;
  childId: string;
  packId: string;
  dayName: DayOfWeek;
  activityTitle: string;
  focus: string;
  learningObjective: string;
  durationMinutes: number;
  timeSlot: 'Morning (08:00)' | 'Afternoon (14:00)' | 'Evening (18:00)' | 'Anytime';
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface StreakMilestone {
  days: number;
  title: string;
  titleZu: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export type BadgeCategory = 'streak' | 'learning' | 'explorer' | 'creativity';

export interface MilestoneBadge {
  id: string;
  category: BadgeCategory;
  title: string;
  titleZu: string;
  stickerEmoji: string;
  stickerTheme: 'amber' | 'emerald' | 'rose' | 'indigo' | 'purple' | 'teal';
  description: string;
  descriptionZu: string;
  criteria: string;
  requiredCount: number;
  currentCount: number;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  rarityZu: string;
  praiseQuote: string;
  praiseQuoteZu: string;
}

export interface DailyStreakData {
  childId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  weeklyActivityDates: { [dateStr: string]: boolean };
  totalPracticeDays: number;
}

export interface DayProgress {
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface WeeklyPackProgress {
  packId: string;
  childId: string;
  weekNumber: number;
  packTitle: string;
  theme: string;
  totalDays: number;
  completedDaysCount: number;
  completionPercentage: number;
  days: DayProgress[];
  currentStreakDays: number;
  sproutStage: 'seed' | 'sprout' | 'stem' | 'bloom' | 'harvest';
  lastPracticedDate?: string;
}

export interface WeeklyLearningPack {
  id: string;
  title: string;
  theme: string;
  ageGroup: string;
  language: LanguageCode;
  days: DayActivity[];
  totalActivities: number;
  isPaidOnly: boolean;
  createdAt: string;
}

export interface StoryPackage {
  id: string;
  titleEn: string;
  titleZu: string;
  theme: string;
  ageRange: string;
  paragraphsEn: string[];
  paragraphsZu: string[];
  vocabulary: Array<{ wordEn: string; wordZu: string; meaning: string }>;
  comprehensionQuestions: Array<{
    questionEn: string;
    questionZu: string;
    options: string[];
    correctIndex: number;
  }>;
  colouringActivityPrompt: string;
  numeracyExtensionPrompt: string;
  parentTip: string;
  teacherTip: string;
}

export interface Centre {
  id: string;
  name: string;
  area: string;
  city: string;
  province: string;
  managerId?: string;
  managerName?: string;
  managerEmail?: string;
  phone?: string;
  status: 'PENDING_CLAIM' | 'ACTIVE' | 'INACTIVE';
  plan: PlanTier;
  classesCount: number;
  learnersCount: number;
  createdAt: string;
}

export interface Classroom {
  id: string;
  centreId: string;
  name: string;
  ageRange: string;
  teacherName: string;
  learnerCount: number;
  createdAt: string;
}

export interface Learner {
  id: string;
  classId: string;
  centreId: string;
  nickname: string;
  age: number;
  preferredLanguage: LanguageCode;
  observationsCount: number;
  skillsActiveCount: number;
}

export type ProspectDiscoveryStatus = 
  | 'DISCOVERED'
  | 'REVIEW_REQUIRED'
  | 'VERIFIED'
  | 'WORKSPACE_PREPARED'
  | 'INVITE_READY'
  | 'INVITED'
  | 'LINK_OPENED'
  | 'CLAIMED'
  | 'ACTIVATED'
  | 'ACTIVE'
  | 'PAID'
  | 'DUPLICATE'
  | 'NOT_ECD'
  | 'DO_NOT_CONTACT';

export interface ECDProspect {
  id: string;
  placeId?: string;
  centreName: string;
  area: string;
  city: string;
  province: string;
  addressSnippet?: string;
  phone?: string;
  discoverySource: 'Google Search Grounding' | 'Google Maps Discovery' | 'Manual Outreach';
  verificationStatus: 'VERIFIED' | 'NEEDS_REVIEW' | 'DUPLICATE' | 'NOT_ECD';
  status: ProspectDiscoveryStatus;
  activationTokenId?: string;
  activationUrl?: string;
  managerName?: string;
  managerEmail?: string;
  invitedAt?: string;
  claimedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface ActivationToken {
  id: string;
  token: string;
  prospectId: string;
  centreName: string;
  area: string;
  expiresAt: string;
  isClaimed: boolean;
  claimedByEmail?: string;
  claimedAt?: string;
  createdAt: string;
}

export interface PlanEntitlements {
  maxChildren: number;
  maxClasses: number;
  maxLearners: number;
  monthlyWorksheetGenerations: number;
  canDownloadPDF: boolean;
  canPrint: boolean;
  canGenerateWeeklyPacks: boolean;
  canAccessFullStoryLibrary: boolean;
  canAccessBilingualCurriculum: boolean;
  hasClassroomManagement: boolean;
  priceMonthlyZAR: number;
}

export interface AuditLog {
  id: string;
  actorEmail: string;
  action: string;
  target: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// --- Daily Learning Prompt (Household items 5-minute activity) ---
export type HouseholdActivityCategory = 'fine_motor' | 'numeracy' | 'language' | 'sensory_science' | 'creative';

export interface DailyLearningPrompt {
  id: string;
  title: string;
  titleZu: string;
  category: HouseholdActivityCategory;
  durationMinutes: number;
  householdItems: string[];
  householdItemsZu: string[];
  instructions: string[];
  instructionsZu: string[];
  learningGoal: string;
  learningGoalZu: string;
  parentPraiseTip: string;
  parentPraiseTipZu: string;
  icon: string;
  difficulty: 'Easy' | 'Engaging' | 'Playful';
}

// --- Developmental Milestone Chart (D3 Visualization) ---
export type DevelopmentalDomain = 'language' | 'motor' | 'numeracy';

export interface MilestoneCheckpoint {
  id: string;
  title: string;
  titleZu: string;
  domain: DevelopmentalDomain;
  ageMonthExpected: number; // e.g. 42 (3.5 yrs)
  achieved: boolean;
  achievedDate?: string;
  notes?: string;
}

export interface DomainMilestoneHistoryPoint {
  monthLabel: string; // e.g., 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'
  childAgeMonths: number;
  languageScore: number; // 0 - 100
  motorScore: number;     // 0 - 100
  numeracyScore: number;  // 0 - 100
  benchmarkScore: number; // Expected standard
  unlockedMilestones: string[];
}

// --- Story & Resource Library ---
export type StoryAgeGroup = '3-4' | '4-5' | '5-6';
export type StoryTheme = 'animals' | 'ubuntu_family' | 'nature_gardening' | 'daily_routines' | 'shapes_counting' | 'food_culture';
export type ResourceContentType = 'story' | 'printable_activity' | 'rhyme_song';

export interface StoryPage {
  pageNumber: number;
  textEn: string;
  textZu: string;
  illustrationEmoji: string;
  dialoguePrompt: string;
  dialoguePromptZu: string;
}

export interface StoryResourceItem {
  id: string;
  title: string;
  titleZu: string;
  ageGroup: StoryAgeGroup;
  theme: StoryTheme;
  contentType: ResourceContentType;
  readingTimeMinutes: number;
  summaryEn: string;
  summaryZu: string;
  coverEmoji: string;
  themeColor: string;
  keyVocabulary: Array<{ en: string; zu: string; icon: string }>;
  pages: StoryPage[];
  parentReadingTipEn: string;
  parentReadingTipZu: string;
  printableSheetsCount: number;
}

