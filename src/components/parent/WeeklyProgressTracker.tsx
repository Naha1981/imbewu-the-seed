import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Printer, 
  Play, 
  Flame, 
  DownloadCloud, 
  WifiOff, 
  ChevronRight, 
  Award, 
  Layers, 
  RotateCcw,
  BookOpen,
  Calendar
} from 'lucide-react';
import type { ChildProfile, LanguageCode, PlanTier, WeeklyLearningPack, WeeklyPackProgress } from '../../types';
import { OfflineStorageService, SEED_WEEKLY_PACKS } from '../../services/offlineStorage';

interface WeeklyProgressTrackerProps {
  child: ChildProfile;
  language: LanguageCode;
  userPlan: PlanTier;
  onStartActivity: () => void;
  onOpenWorksheet: (packId?: string, dayIndex?: number) => void;
  onOpenPaywall: (feature: 'pdf_download' | 'weekly_pack' | 'multi_child') => void;
}

export const WeeklyProgressTracker: React.FC<WeeklyProgressTrackerProps> = ({
  child,
  language,
  userPlan,
  onStartActivity,
  onOpenWorksheet,
  onOpenPaywall
}) => {
  const [availablePacks] = useState<WeeklyLearningPack[]>(SEED_WEEKLY_PACKS);
  const [selectedPackId, setSelectedPackId] = useState<string>(SEED_WEEKLY_PACKS[0].id);
  const [progress, setProgress] = useState<WeeklyPackProgress>(() => 
    OfflineStorageService.getWeeklyProgress(child.id, SEED_WEEKLY_PACKS[0].id)
  );
  const [isOffline, setIsOffline] = useState(false);
  const [justCelebrated, setJustCelebrated] = useState(false);

  // Sync network state
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync progress when pack changes
  useEffect(() => {
    const p = OfflineStorageService.getWeeklyProgress(child.id, selectedPackId);
    setProgress(p);
  }, [selectedPackId, child.id]);

  const currentPack = availablePacks.find(p => p.id === selectedPackId) || availablePacks[0];

  const handleToggleDay = (dayName: string) => {
    const updated = OfflineStorageService.toggleDayCompletion(child.id, selectedPackId, dayName);
    setProgress(updated);
    
    // Trigger celebratory visual cue when reaching 100% or making progress
    if (updated.completionPercentage === 100 || updated.completionPercentage > progress.completionPercentage) {
      setJustCelebrated(true);
      setTimeout(() => setJustCelebrated(false), 3000);
    }
  };

  // Botanical seed growth metadata
  const getGrowthVisuals = (percentage: number) => {
    if (percentage < 20) {
      return {
        stage: 'Seed Planted',
        stageZu: 'Inhlamvu Isitshaliwe',
        icon: '🌱',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        progressBg: 'bg-amber-500',
        ringColor: '#D97706',
        nextMilestone: 'Complete 1 activity to see your seed sprout!',
        nextMilestoneZu: 'Qeda umsebenzi owodwa ukuze uhlume!',
        illustration: (
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#EADFCF] flex items-center justify-center shadow-inner">
              <span className="text-3xl">🌰</span>
            </div>
            <span className="absolute bottom-0 right-1 text-xs px-1.5 py-0.5 rounded-full bg-[#14213D] text-white font-bold">
              Level 1
            </span>
          </div>
        )
      };
    } else if (percentage < 50) {
      return {
        stage: 'First Sprout',
        stageZu: 'Ukuhluma Kwesithombo',
        icon: '🌿',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        progressBg: 'bg-[#2A9D8F]',
        ringColor: '#2A9D8F',
        nextMilestone: 'Complete 3 activities to grow tall green stems!',
        nextMilestoneZu: 'Qeda imisebenzi emi-3 ukuze ukhulise iziqu eziluhlaza!',
        illustration: (
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#2A9D8F]/20 flex items-center justify-center animate-pulse">
              <span className="text-4xl">🌱</span>
            </div>
            <span className="absolute bottom-0 right-1 text-xs px-1.5 py-0.5 rounded-full bg-[#2A9D8F] text-white font-bold">
              Level 2
            </span>
          </div>
        )
      };
    } else if (percentage < 80) {
      return {
        stage: 'Growing Leaves',
        stageZu: 'Iziqu Namahlamvu',
        icon: '🪴',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
        progressBg: 'bg-teal-600',
        ringColor: '#0D9488',
        nextMilestone: 'Almost at full bloom! Just 1 or 2 activities left.',
        nextMilestoneZu: 'Kusale kancane ukuba imbali ivuleke ngokuphelele!',
        illustration: (
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-4xl">🪴</span>
            </div>
            <span className="absolute bottom-0 right-1 text-xs px-1.5 py-0.5 rounded-full bg-teal-700 text-white font-bold">
              Level 3
            </span>
          </div>
        )
      };
    } else {
      return {
        stage: 'Golden Harvest & Bloom',
        stageZu: 'Isithelo Se-Imbewu',
        icon: '🌸',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
        progressBg: 'bg-[#E07A5F]',
        ringColor: '#E07A5F',
        nextMilestone: 'Weekly pack 100% completed! Star badge unlocked.',
        nextMilestoneZu: 'Iphakethe leviki liqediwe! Ibheji lenkanyezi livuliwe.',
        illustration: (
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#E07A5F]/20 flex items-center justify-center shadow-md">
              <span className="text-4xl">🌳</span>
            </div>
            <span className="absolute -top-1 -right-1 text-lg">⭐</span>
            <span className="absolute bottom-0 right-1 text-xs px-1.5 py-0.5 rounded-full bg-[#E07A5F] text-white font-bold">
              Master
            </span>
          </div>
        )
      };
    }
  };

  const growth = getGrowthVisuals(progress.completionPercentage);

  // SVG Circular progress computation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress.completionPercentage / 100) * circumference;

  return (
    <div id="weekly-progress-tracker" className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs space-y-6">
      
      {/* Header Bar: Pack Selector & Offline Capability Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADFCF]/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
              Weekly Activity Pack
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F]">
              <DownloadCloud className="w-3 h-3" />
              <span>Offline Ready</span>
            </span>
            {isOffline && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                <WifiOff className="w-3 h-3" />
                <span>Offline Mode</span>
              </span>
            )}
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#14213D]">
            {language === 'zu' ? `Inqubekela-phambili ka-${child.nickname}` : `${child.nickname}'s Weekly Learning Journey`}
          </h3>
          <p className="text-xs text-[#6B7280]">
            {language === 'zu' 
              ? 'Qedela imisebenzi yansuku zonke ukuze uhlumise isithombo sakho se-Imbewu.'
              : 'Small daily steps build big lifelong confidence. Complete daily activities to nourish your seed.'}
          </p>
        </div>

        {/* Weekly Pack Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {availablePacks.map(p => {
            const isSelected = p.id === selectedPackId;
            const isLocked = p.isPaidOnly && userPlan === 'FREE';
            return (
              <button
                key={p.id}
                onClick={() => {
                  if (isLocked) {
                    onOpenPaywall('weekly_pack');
                  } else {
                    setSelectedPackId(p.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#14213D] text-white border-[#14213D]'
                    : 'bg-[#FAF7F2] text-[#4B5563] border-[#EADFCF] hover:bg-[#F4EDE2]'
                }`}
              >
                <span>{p.title.split('(')[0].trim()}</span>
                {isLocked && <span className="text-[10px]">🔒</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Motivation Spotlight: Circular Tracker + Seed Growth Metaphor + Streak */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#FAF7F2] rounded-2xl p-6 border border-[#EADFCF] items-center">
        
        {/* Col 1: Radial Progress Percentage Dial */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="relative w-28 h-28 flex items-center justify-center mb-2">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#EADFCF]"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={growth.ringColor}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-editorial text-2xl font-bold text-[#14213D]">
                {progress.completionPercentage}%
              </span>
              <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">
                {progress.completedDaysCount} / {progress.totalDays} Days
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EADFCF] text-xs font-bold text-[#14213D]">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{progress.currentStreakDays} Day Streak!</span>
          </div>
        </div>

        {/* Col 2: Botanical Growth Stage Card */}
        <div className="md:col-span-5 flex items-center gap-4 bg-white p-4 rounded-xl border border-[#EADFCF]">
          {growth.illustration}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs">{growth.icon}</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${growth.badgeColor}`}>
                {language === 'zu' ? growth.stageZu : growth.stage}
              </span>
            </div>
            <h4 className="font-editorial text-base font-bold text-[#14213D] truncate">
              {language === 'zu' ? `Isithombo sika-${child.nickname}` : `${child.nickname}'s Living Seed`}
            </h4>
            <p className="text-xs text-[#4B5563] mt-1 leading-snug">
              {language === 'zu' ? growth.nextMilestoneZu : growth.nextMilestone}
            </p>
          </div>
        </div>

        {/* Col 3: Quick Action Launchpad */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <button
            onClick={onStartActivity}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Practice Today</span>
          </button>

          <button
            onClick={() => onOpenWorksheet(selectedPackId)}
            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] text-[#14213D] border border-[#EADFCF] px-4 py-2.5 rounded-xl font-bold text-xs transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Print Pack (A4)</span>
          </button>
        </div>

      </div>

      {/* Celebratory Banner when an activity is checked off */}
      {justCelebrated && (
        <div className="bg-[#2A9D8F]/15 border border-[#2A9D8F]/30 rounded-2xl p-4 flex items-center justify-between text-xs text-[#14213D] animate-bounce">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-bold">
                {language === 'zu' ? 'Siyakuhalalisela!' : 'Halala! Great step forward!'}
              </p>
              <p className="text-[#4B5563]">
                {language === 'zu' 
                  ? `Umsebenzi ubhaliwe. Isithombo sika-${child.nickname} siyakhula!`
                  : `Progress saved offline. Give ${child.nickname} a big high-five or a warm hug!`
                }
              </p>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-[#E07A5F] animate-spin" />
        </div>
      )}

      {/* 5-Day Interactive Activity Progression Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-editorial text-lg font-bold text-[#14213D] flex items-center gap-2">
            <span>📅 5-Day Weekly Progression</span>
            <span className="text-xs font-sans font-normal text-[#6B7280]">
              (Tap day checkmark to mark practice complete)
            </span>
          </h4>
          <span className="text-xs font-semibold text-[#2A9D8F]">
            {progress.completedDaysCount} of 5 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {currentPack.days.map((day, idx) => {
            const dayProgress = progress.days.find(d => d.dayName === day.dayName);
            const isDone = dayProgress?.completed ?? false;

            return (
              <div 
                key={day.dayName}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDone 
                    ? 'bg-[#2A9D8F]/10 border-[#2A9D8F]/40 shadow-xs' 
                    : 'bg-[#FAF7F2] border-[#EADFCF] hover:border-[#14213D]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#14213D]">
                      {day.dayName}
                    </span>
                    
                    <button
                      onClick={() => handleToggleDay(day.dayName)}
                      aria-label={`Mark ${day.dayName} completed`}
                      className={`p-1 rounded-full transition-transform active:scale-90 ${
                        isDone 
                          ? 'text-[#2A9D8F]' 
                          : 'text-[#6B7280] hover:text-[#14213D]'
                      }`}
                      title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 fill-[#2A9D8F] text-white" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <h5 className="font-bold text-xs text-[#E07A5F] mb-1 line-clamp-1">
                    {day.focus}
                  </h5>

                  <p className="text-[11px] text-[#4B5563] leading-relaxed mb-3 line-clamp-2">
                    {day.learningObjective}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#EADFCF]/70 flex items-center justify-between text-[10px]">
                  <span className="text-[#6B7280] font-medium">
                    ⏱️ ~{day.durationMinutes} mins
                  </span>

                  <button
                    onClick={() => onOpenWorksheet(selectedPackId, idx)}
                    className="inline-flex items-center gap-1 font-bold text-[#14213D] hover:text-[#E07A5F]"
                  >
                    <span>View Sheet</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Parent Extension Encouragement Box */}
      <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADFCF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">💡</span>
          <div>
            <p className="font-bold text-[#14213D]">
              {language === 'zu' ? 'Icebiso Labazali Lwanamuhla' : "Parent Home Connection Tip"}
            </p>
            <p className="text-[#6B7280]">
              {currentPack.days[0].parentHomeExtension}
            </p>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-[#E07A5F] shrink-0">
          🇿🇦 Proudly South African Early Learning
        </div>
      </div>

    </div>
  );
};
