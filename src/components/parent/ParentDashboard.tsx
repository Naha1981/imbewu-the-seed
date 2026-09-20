import React, { useState } from 'react';
import { Sparkles, Heart, Printer, CheckCircle2, ArrowRight, Play, RotateCcw, Volume2, Star, BookOpen, Layers, Award, Calendar, Scissors, Share2, Flame } from 'lucide-react';
import { CURRICULUM_SKILLS, SA_VOCABULARY, getRecommendedNextAction, INITIAL_DEMO_WORKSHEET } from '../../services/learningGraph';
import { EntitlementService } from '../../services/entitlementEngine';
import { WeeklyProgressTracker } from './WeeklyProgressTracker';
import { ParentCalendarView } from './ParentCalendarView';
import { DailyStreakTracker } from './DailyStreakTracker';
import { ShareProgressModal } from './ShareProgressModal';
import { MilestoneBadgeShowcase } from './MilestoneBadgeShowcase';
import { BadgeCelebrationModal } from './BadgeCelebrationModal';
import { DailyLearningPromptWidget } from './DailyLearningPromptWidget';
import { DevelopmentalMilestoneChart } from './DevelopmentalMilestoneChart';
import { StoryResourceLibrary } from './StoryResourceLibrary';
import { OfflineStorageService, SEED_WEEKLY_PACKS } from '../../services/offlineStorage';
import type { ChildProfile, SkillProgress, LanguageCode, WorksheetData, PlanTier, WeeklyLearningPack, MilestoneBadge } from '../../types';

interface ParentDashboardProps {
  language: LanguageCode;
  userPlan: PlanTier;
  onOpenPaywall: (feature: 'pdf_download' | 'weekly_pack' | 'multi_child') => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  language,
  userPlan,
  onOpenPaywall
}) => {
  // Demo child profile for Lerato (age 4)
  const [child, setChild] = useState<ChildProfile>({
    id: 'child-1',
    parentId: 'usr-parent-1',
    nickname: 'Lerato',
    age: 4,
    preferredLanguage: language,
    interests: ['Drawing', 'Soccer', 'Singing'],
    learningAreas: ['Letters', 'Numbers', 'Sounds'],
    learningMode: 'both',
    createdAt: '2026-09-10'
  });

  const [skillsProgress, setSkillsProgress] = useState<SkillProgress[]>([
    {
      skillId: 'skill-matching-case',
      childId: 'child-1',
      status: 'PRACTISING',
      recentScore: 75,
      practiceCount: 3,
      lastPracticedAt: 'Today',
      practiceSignal: 'Showing keen enthusiasm matching B and M.'
    },
    {
      skillId: 'skill-letter-tracing',
      childId: 'child-1',
      status: 'INTRODUCED',
      recentScore: 60,
      practiceCount: 1,
      lastPracticedAt: 'Yesterday',
      practiceSignal: 'Enjoys finger-tracing curves before pencil.'
    },
    {
      skillId: 'skill-number-counting',
      childId: 'child-1',
      status: 'DEVELOPING',
      recentScore: 85,
      practiceCount: 5,
      lastPracticedAt: '3 days ago',
      practiceSignal: 'Confidently counts items up to 5.'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'today' | 'library' | 'badges' | 'calendar' | 'activity' | 'worksheet' | 'progress'>('today');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [streakKey, setStreakKey] = useState(0);
  const [badgeKey, setBadgeKey] = useState(0);
  const [celebratingBadge, setCelebratingBadge] = useState<MilestoneBadge | null>(null);
  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState(false);
  
  // Interactive activity state
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activityScore, setActivityScore] = useState(0);
  const [activityFinished, setActivityFinished] = useState(false);

  const recommendation = getRecommendedNextAction(child.nickname, skillsProgress);

  const prompts = [
    { target: 'B', options: ['b', 'd', 'p'], correct: 'b', wordEn: 'Ball', wordZu: 'Ibhola', icon: '⚽' },
    { target: 'M', options: ['w', 'm', 'n'], correct: 'm', wordEn: 'Milk', wordZu: 'Ubisi', icon: '🥛' },
    { target: 'S', options: ['c', 's', 'z'], correct: 's', wordEn: 'Sun', wordZu: 'Ilanga', icon: '☀️' },
    { target: 'A', options: ['e', 'a', 'o'], correct: 'a', wordEn: 'Apple', wordZu: 'I-aphula', icon: '🍎' }
  ];

  const handleOptionClick = (opt: string) => {
    setSelectedOption(opt);
    const correct = opt === prompts[currentPromptIndex].correct;
    if (correct) {
      setActivityScore(prev => prev + 25);
    }
    setTimeout(() => {
      if (currentPromptIndex < prompts.length - 1) {
        setCurrentPromptIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setActivityFinished(true);
        OfflineStorageService.recordDailyActivity(child.id);
        setStreakKey(k => k + 1);

        // Evaluate milestone badge unlock & celebrate
        const { newlyUnlocked } = OfflineStorageService.evaluateAndUnlockBadges(child.id, {
          completedActivityCount: 1,
          bilingualPracticed: true
        });

        if (newlyUnlocked && newlyUnlocked.length > 0) {
          setCelebratingBadge(newlyUnlocked[0]);
          setIsCelebrationModalOpen(true);
        }
        setBadgeKey(k => k + 1);
      }
    }, 700);
  };

  const restartActivity = () => {
    setCurrentPromptIndex(0);
    setSelectedOption(null);
    setActivityScore(0);
    setActivityFinished(false);
  };

  // Weekly pack selection for preview & print
  const [selectedPackId, setSelectedPackId] = useState<string>(SEED_WEEKLY_PACKS[0].id);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  const activePack = SEED_WEEKLY_PACKS.find(p => p.id === selectedPackId) || SEED_WEEKLY_PACKS[0];
  const activeDay = activePack.days[selectedDayIdx] || activePack.days[0];

  const handleOpenWorksheetFromTracker = (packId?: string, dayIndex?: number) => {
    if (packId) setSelectedPackId(packId);
    if (dayIndex !== undefined) setSelectedDayIdx(dayIndex);
    setActiveTab('worksheet');
  };

  const handleDownloadWorksheet = () => {
    const canDownload = EntitlementService.canDownloadPDF(userPlan);
    if (!canDownload) {
      onOpenPaywall('pdf_download');
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Child Profile Banner */}
        <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E07A5F]/15 border-2 border-[#E07A5F]/30 flex items-center justify-center text-3xl font-editorial font-bold text-[#E07A5F]">
              {child.nickname.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D]">
                  {language === 'zu' ? `Sawubona, ${child.nickname} 🌱` : `Good morning, ${child.nickname} 🌱`}
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F]">
                  {child.age} {language === 'zu' ? 'Iminyaka' : 'Years'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                {language === 'zu'
                  ? 'Ukufunda kwansuku zonke kukhulisa amakhono omntwana wakho.'
                  : 'Nourishing letter recognition, sounds, and pencil control.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#2A9D8F] hover:bg-[#238276] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition"
              title="Generate summary report for teachers via WhatsApp or Email"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Progress</span>
            </button>

            <button
              onClick={() => setActiveTab('today')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'today' ? 'bg-[#14213D] text-white' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              🌱 Today
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'library' ? 'bg-[#2A9D8F] text-white' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              📚 Stories & Resources
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'badges' ? 'bg-[#E07A5F] text-white' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              🏆 Badges & Stickers
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'calendar' ? 'bg-[#2A9D8F] text-white' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              📅 Calendar
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'activity' ? 'bg-[#E07A5F] text-white' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              🎮 Activity
            </button>
            <button
              onClick={() => setActiveTab('worksheet')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'worksheet' ? 'bg-[#457B9D] text-white' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              📄 Worksheet
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'progress' ? 'bg-[#F4A261] text-[#14213D]' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              📊 Progress
            </button>
          </div>
        </div>

        {/* TAB 1: TODAY'S OVERVIEW & WEEKLY PROGRESS TRACKER */}
        {activeTab === 'today' && (
          <div className="space-y-8">
            {/* Daily Learning Streak Tracker - Habit Formation */}
            <DailyStreakTracker
              key={`streak-today-${streakKey}`}
              child={child}
              language={language}
              onStartActivity={() => setActiveTab('activity')}
              onStreakUpdated={() => setStreakKey(k => k + 1)}
            />

            {/* Daily Learning Prompt Widget - 5-Minute Household Activity */}
            <DailyLearningPromptWidget
              child={child}
              language={language}
              onActivityCompleted={() => {
                setStreakKey(k => k + 1);
                const { newlyUnlocked } = OfflineStorageService.evaluateAndUnlockBadges(child.id, {
                  completedActivityCount: 1,
                  bilingualPracticed: true
                });
                if (newlyUnlocked && newlyUnlocked.length > 0) {
                  setCelebratingBadge(newlyUnlocked[0]);
                  setIsCelebrationModalOpen(true);
                }
                setBadgeKey(k => k + 1);
              }}
            />

            {/* Milestone Badge & Digital Sticker Quick Strip */}
            <MilestoneBadgeShowcase
              key={`badge-compact-${badgeKey}`}
              child={child}
              language={language}
              compact={true}
              onBadgeAwarded={b => {
                setCelebratingBadge(b);
                setIsCelebrationModalOpen(true);
                setBadgeKey(k => k + 1);
              }}
            />

            {/* Visual Progress Tracker Component (Completion % & Growth Metaphor) */}
            <WeeklyProgressTracker
              child={child}
              language={language}
              userPlan={userPlan}
              onStartActivity={() => setActiveTab('activity')}
              onOpenWorksheet={handleOpenWorksheetFromTracker}
              onOpenPaywall={onOpenPaywall}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Primary Recommendation Card */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-3 py-1 rounded-full">
                {language === 'zu' ? 'Umsebenzi Wanamuhla' : "Today's Learning Step"}
              </span>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mt-3 mb-2">
                {recommendation.recommendationTitle}
              </h2>

              <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                {recommendation.recommendationReason}
              </p>

              {/* Step Details Box */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EADFCF] mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Target Skill:</span>
                  <span className="font-bold text-[#14213D]">{recommendation.skill.nameEn}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Status:</span>
                  <span className="font-semibold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2 py-0.5 rounded">
                    Practising (75% signal)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Duration:</span>
                  <span className="font-semibold text-[#14213D]">~{recommendation.estimatedMinutes} minutes</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setActiveTab('activity')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-7 py-3.5 rounded-full font-bold text-xs shadow-sm transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start 5-Minute Practice</span>
                </button>

                <button
                  onClick={() => setActiveTab('worksheet')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F4EDE2] text-[#14213D] border border-[#EADFCF] px-6 py-3.5 rounded-full font-bold text-xs transition-all"
                >
                  <Printer className="w-4 h-4 text-[#6B7280]" />
                  <span>View Printable Worksheet</span>
                </button>
              </div>
            </div>

            {/* Right Col: Bilingual Sound Vocabulary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs">
              <h3 className="font-editorial text-lg font-bold text-[#14213D] mb-4 flex items-center gap-2">
                <span>🇿🇦 Local Words for B</span>
              </h3>

              <p className="text-xs text-[#6B7280] mb-4">
                Reinforce these words in English and isiZulu during kitchen time or walks:
              </p>

              <div className="space-y-3">
                {SA_VOCABULARY['B'].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF]/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-bold text-[#14213D]">{item.en}</p>
                        <p className="text-[#E07A5F] font-semibold">{item.zu}</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
                      Sound /b/
                    </span>
                  </div>
                ))}
              </div>

              {/* Print-First Reminder */}
              <div className="mt-6 pt-4 border-t border-[#FAF7F2] text-center">
                <p className="text-[11px] text-[#6B7280] italic">
                  “A child is a seed. Learning is nourishment.”
                </p>
              </div>

            </div>

          </div>
        </div>
        )}

        {/* TAB: STORY & RESOURCE LIBRARY */}
        {activeTab === 'library' && (
          <StoryResourceLibrary
            child={child}
            language={language}
            userPlan={userPlan}
            onOpenPaywall={onOpenPaywall}
            onOpenWorksheet={handleOpenWorksheetFromTracker}
          />
        )}

        {/* TAB: DIGITAL MILESTONE BADGES & STICKER ALBUM */}
        {activeTab === 'badges' && (
          <MilestoneBadgeShowcase
            key={`badges-full-${badgeKey}`}
            child={child}
            language={language}
            compact={false}
            onBadgeAwarded={b => {
              setCelebratingBadge(b);
              setIsCelebrationModalOpen(true);
              setBadgeKey(k => k + 1);
            }}
          />
        )}

        {/* TAB 2: CALENDAR SCHEDULER */}
        {activeTab === 'calendar' && (
          <ParentCalendarView
            child={child}
            language={language}
            onStartActivity={() => setActiveTab('activity')}
            onOpenWorksheet={handleOpenWorksheetFromTracker}
            onActivityCompleted={() => setStreakKey(k => k + 1)}
          />
        )}

        {/* TAB 3: INTERACTIVE ACTIVITY PLAYER */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADFCF] shadow-xs max-w-2xl mx-auto">
            {!activityFinished ? (
              <div className="text-center">
                
                {/* Progress pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#EADFCF] text-xs text-[#6B7280] font-semibold mb-6">
                  <span>Question {currentPromptIndex + 1} of {prompts.length}</span>
                  <span className="text-[#2A9D8F] font-bold">· {activityScore} pts</span>
                </div>

                {/* Big Target Letter Card */}
                <div className="w-24 h-24 mx-auto rounded-3xl bg-[#FAF7F2] border-2 border-[#14213D] flex items-center justify-center font-editorial text-5xl font-bold text-[#14213D] shadow-inner mb-4">
                  {prompts[currentPromptIndex].target}
                </div>

                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#14213D] mb-8">
                  <span className="text-2xl">{prompts[currentPromptIndex].icon}</span>
                  <span>
                    {language === 'zu' 
                      ? `Thola inhlamvu encane ehambisana no-${prompts[currentPromptIndex].target}:` 
                      : `Tap the lowercase letter that matches uppercase ${prompts[currentPromptIndex].target}:`}
                  </span>
                </div>

                {/* Big Child Friendly Option Buttons */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {prompts[currentPromptIndex].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      disabled={selectedOption !== null}
                      className={`h-20 rounded-2xl font-editorial text-4xl font-bold transition-all border-2 ${
                        selectedOption === opt
                          ? opt === prompts[currentPromptIndex].correct
                            ? 'bg-[#2A9D8F]/15 border-[#2A9D8F] text-[#2A9D8F] scale-105'
                            : 'bg-red-50 border-red-400 text-red-600'
                          : 'bg-[#FAF7F2] border-[#EADFCF] hover:border-[#14213D] text-[#14213D]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#6B7280]">
                  🌱 {prompts[currentPromptIndex].target} is for <strong>{prompts[currentPromptIndex].wordEn}</strong> / <strong>{prompts[currentPromptIndex].wordZu}</strong>
                </p>

              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#2A9D8F]/20 text-[#2A9D8F] mx-auto flex items-center justify-center mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-3xl font-bold text-[#14213D] mb-2">
                  {language === 'zu' ? `Kahle kakhulu, ${child.nickname}! 🌱` : `High Five, ${child.nickname}! 🌱`}
                </h3>
                <p className="text-sm text-[#4B5563] mb-6">
                  {language === 'zu' 
                    ? 'Uqede umsebenzi wokufanisa izinhlamvu ngempumelelo.' 
                    : 'You completed uppercase and lowercase matching with flying colours.'}
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={restartActivity}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EADFCF] bg-[#FAF7F2] font-bold text-xs text-[#14213D]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Play Again</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('worksheet')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E07A5F] text-white font-bold text-xs shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Practice Sheet</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRINTABLE WORKSHEET PREVIEW & PRINT ENGINE */}
        {activeTab === 'worksheet' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Interactive Pack & Day Switcher (Screen only, hidden when printed) */}
            <div className="no-print bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#E07A5F] tracking-wider">
                  Weekly Printable Pack Browser · Standard A4 Layout
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#14213D]">
                  {activePack.title}
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Theme: {activePack.theme} · 5 Days of structured printable learning
                </p>
              </div>

              {/* Day selection tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {activePack.days.map((d, idx) => (
                  <button
                    key={d.dayName}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedDayIdx === idx
                        ? 'bg-[#14213D] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#6B7280] hover:bg-[#F4EDE2]'
                    }`}
                  >
                    Day {idx + 1} ({d.dayName.slice(0, 3)})
                  </button>
                ))}
              </div>

              <button
                onClick={handleDownloadWorksheet}
                className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-6 py-3 rounded-full font-bold text-xs shadow-sm transition-all shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span>{userPlan === 'FREE' ? 'Print Sheet (🔒 Unlock)' : 'Print A4 Sheet'}</span>
              </button>
            </div>

            {/* Printable Sheet Frame (Enhanced for high-resolution desktop & ink-friendly printer layouts) */}
            <div className="printable-sheet worksheet-frame bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed border-[#14213D]/25 shadow-xs relative overflow-hidden">
              
              {/* Paywall Overlay for Free plan */}
              {userPlan === 'FREE' && (
                <div className="no-print absolute inset-0 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-20">
                  <span className="text-3xl mb-2">🔒</span>
                  <h4 className="font-editorial text-2xl font-bold text-[#14213D] mb-1">
                    Printable A4 Learning Pack Preview
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mb-5 leading-relaxed">
                    Full ink-saver A4 printable worksheets with handwriting trace guides, cut-out activities, and bilingual teacher guides are included with an Imbewu Family membership (R79/month).
                  </p>
                  <button
                    onClick={() => onOpenPaywall('pdf_download')}
                    className="bg-[#E07A5F] text-white px-7 py-3 rounded-full text-xs font-bold shadow-md hover:bg-[#D46A4F] transition-all"
                  >
                    Unlock Download & Print →
                  </button>
                </div>
              )}

              {/* Print Student Header */}
              <div className="print-student-header pb-4 mb-6 border-b-2 border-[#14213D] flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-editorial text-2xl font-bold text-[#14213D] tracking-tight">
                      IMBEWU · The Seed
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                      ECD Foundation Phase
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                    {activePack.title}: {activePack.theme} · {activeDay.dayName} Focus
                  </p>
                </div>

                <div className="text-right text-xs space-y-1 text-[#14213D]">
                  <p>
                    <strong>Learner:</strong> <span className="print-underline font-serif font-bold text-sm px-2">{child.nickname}</span>
                  </p>
                  <p>
                    <strong>Date:</strong> <span className="print-underline px-2">________________</span>
                  </p>
                </div>
              </div>

              {/* Worksheet Title & Instructions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADFCF]">
                  <div>
                    <h4 className="font-editorial text-lg font-bold text-[#14213D]">
                      {activeDay.focus}
                    </h4>
                    <p className="text-xs text-[#4B5563] mt-0.5">
                      {activeDay.learningObjective}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#2A9D8F] bg-[#2A9D8F]/15 px-3 py-1 rounded-full">
                    ⏱️ {activeDay.durationMinutes} mins
                  </span>
                </div>

                {/* Section A: Handwriting & Tracing Row */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
                    Part 1: Trace & Practice Handwriting
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {['B', 'b', 'M', 'm', 'S', 's'].map((char, idx) => (
                      <div
                        key={idx}
                        className="trace-dotted-box flex flex-col items-center justify-center h-20 rounded-xl bg-white border border-[#EADFCF]"
                      >
                        <span className="trace-dotted-letter text-3xl font-editorial font-bold text-gray-400">
                          {char}
                        </span>
                        <div className="w-8 border-b border-dashed border-gray-300 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Matching / Recognition Task */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
                    Part 2: Look, Sound & Connect (Bilingual SA Vocabulary)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INITIAL_DEMO_WORKSHEET.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADFCF] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {idx === 0 ? '⚽' : idx === 1 ? '🥛' : idx === 2 ? '☀️' : '🍎'}
                          </span>
                          <div>
                            <span className="font-editorial text-xl font-bold text-[#14213D]">
                              {item.prompt}
                            </span>
                            <p className="text-[11px] text-[#6B7280]">
                              {idx === 0 ? 'Ball / Ibhola' : idx === 1 ? 'Milk / Ubisi' : idx === 2 ? 'Sun / Ilanga' : 'Apple / I-aphula'}
                            </p>
                          </div>
                        </div>
                        <span className="w-7 h-7 rounded-lg border-2 border-[#14213D] flex items-center justify-center text-xs font-mono">
                          [  ]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scissor Cut Line for Physical Hands-on Matching Cards */}
                <div className="print-cut-line py-2" />

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <Scissors className="w-3.5 h-3.5 text-[#E07A5F]" />
                    <span className="font-semibold">Hands-on Cut & Place Activity:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['b', 'm', 's', 'a'].map((letter, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-dashed border-[#14213D]/40 p-3 rounded-xl text-center bg-white"
                      >
                        <span className="font-editorial text-2xl font-bold text-[#14213D]">
                          {letter}
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1">cut card</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teacher / Parent Notes footer */}
                <div className="print-notes-box pt-4 border-t border-[#EADFCF] text-[11px] text-[#6B7280] space-y-1">
                  <p>
                    <strong className="text-[#14213D]">Teacher / Classroom Note:</strong> {activeDay.teacherGuide}
                  </p>
                  <p>
                    <strong className="text-[#E07A5F]">Parent Home Tip:</strong> Praise steady pencil grip and encourage pronouncing the phonetic sound aloud before writing.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: PROGRESS & PRACTICE SIGNALS */}
        {activeTab === 'progress' && (
          <div className="space-y-8">
            {/* Top Share & Report Header */}
            <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A9D8F] bg-[#2A9D8F]/10 px-3 py-1 rounded-full">
                  ECD Educator & Parent Collaboration
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mt-2 mb-1">
                  {child.nickname}'s Learning Progress Report
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Share real-time practice signals and streak milestones with teachers via WhatsApp or email.
                </p>
              </div>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#2A9D8F] hover:bg-[#238276] text-white px-6 py-3 rounded-full font-bold text-xs shadow-md transition shrink-0"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Teacher</span>
              </button>
            </div>

            {/* Daily Streak Tracker */}
            <DailyStreakTracker
              key={`streak-progress-${streakKey}`}
              child={child}
              language={language}
              onStartActivity={() => setActiveTab('activity')}
              onStreakUpdated={() => setStreakKey(k => k + 1)}
            />

            {/* Visual Progress Tracker Component on Progress Tab */}
            <WeeklyProgressTracker
              child={child}
              language={language}
              userPlan={userPlan}
              onStartActivity={() => setActiveTab('activity')}
              onOpenWorksheet={handleOpenWorksheetFromTracker}
              onOpenPaywall={onOpenPaywall}
            />

            {/* Digital Milestone Badges Showcase */}
            <MilestoneBadgeShowcase
              key={`badge-progress-${badgeKey}`}
              child={child}
              language={language}
              compact={false}
              onBadgeAwarded={b => {
                setCelebratingBadge(b);
                setIsCelebrationModalOpen(true);
                setBadgeKey(k => k + 1);
              }}
            />

            {/* D3-based Growth & Developmental Milestone Trajectory Chart */}
            <DevelopmentalMilestoneChart
              child={child}
              language={language}
            />

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs">
              <h3 className="font-editorial text-2xl font-bold text-[#14213D] mb-2">
                {child.nickname}'s Curriculum Skill Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] mb-6">
                Gentle practice signals based on recent activities. No high-pressure testing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skillsProgress.map(p => {
                  const def = CURRICULUM_SKILLS.find(s => s.id === p.skillId);
                  return (
                    <div key={p.skillId} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#E07A5F]">
                            {def?.category || 'Skill'}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            p.status === 'CONFIDENT' ? 'bg-green-100 text-green-800' :
                            p.status === 'DEVELOPING' ? 'bg-amber-100 text-amber-800' :
                            p.status === 'PRACTISING' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {p.status}
                          </span>
                        </div>

                        <h4 className="font-editorial text-base font-bold text-[#14213D] mb-1">
                          {def?.nameEn}
                        </h4>
                        <p className="text-[11px] text-[#E07A5F] font-semibold mb-3">
                          {def?.nameZu}
                        </p>

                        <p className="text-xs text-[#4B5563] mb-4 leading-relaxed">
                          {p.practiceSignal}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#EADFCF]/60 flex items-center justify-between text-[11px] text-[#6B7280]">
                        <span>Practiced {p.practiceCount} times</span>
                        <span className="font-bold text-[#14213D]">{p.recentScore}% signal</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Share Progress Modal for WhatsApp & Email */}
      <ShareProgressModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        child={child}
        language={language}
        skillsProgress={skillsProgress}
      />

      {/* Celebratory Milestone Badge Modal */}
      <BadgeCelebrationModal
        isOpen={isCelebrationModalOpen}
        badge={celebratingBadge}
        child={child}
        language={language}
        onClose={() => setIsCelebrationModalOpen(false)}
        onViewAlbum={() => {
          setIsCelebrationModalOpen(false);
          setActiveTab('badges');
        }}
      />
    </div>
  );
};
