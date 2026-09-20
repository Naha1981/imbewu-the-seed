import React, { useState } from 'react';
import { Flame, Sparkles, Award, CheckCircle2, Calendar, TrendingUp, Heart, Trophy, Zap, AlertCircle } from 'lucide-react';
import type { ChildProfile, LanguageCode, DailyStreakData } from '../../types';
import { OfflineStorageService } from '../../services/offlineStorage';

interface DailyStreakTrackerProps {
  child: ChildProfile;
  language: LanguageCode;
  onStartActivity?: () => void;
  onStreakUpdated?: () => void;
}

export const DailyStreakTracker: React.FC<DailyStreakTrackerProps> = ({
  child,
  language,
  onStartActivity,
  onStreakUpdated,
}) => {
  const [streakData, setStreakData] = useState<DailyStreakData>(() =>
    OfflineStorageService.getDailyStreak(child.id)
  );
  const [showCelebration, setShowCelebration] = useState(false);

  const todayIso = new Date().toISOString().split('T')[0];
  const isPracticedToday = Boolean(streakData.weeklyActivityDates[todayIso]);

  // Compute last 7 days representation
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-ZA', { weekday: 'short' });
    const isToday = iso === todayIso;
    const isCompleted = Boolean(streakData.weeklyActivityDates[iso]);
    return { iso, dayLabel, isToday, isCompleted };
  });

  // Milestone definitions
  const milestones = [
    {
      days: 3,
      title: 'Sprout Pioneer',
      titleZu: 'Isithombo Sokuqala',
      icon: '🌱',
      desc: '3 consecutive days of playful discovery',
      unlocked: streakData.currentStreak >= 3,
    },
    {
      days: 7,
      title: 'Flame of Dedication',
      titleZu: 'Ilanga Lokuzimisela',
      icon: '🔥',
      desc: '1 full week of daily learning habit',
      unlocked: streakData.currentStreak >= 7,
    },
    {
      days: 14,
      title: 'Star Builder',
      titleZu: 'Inkanyezi Yolwazi',
      icon: '⭐',
      desc: '2 weeks of steady neuroplastic growth',
      unlocked: streakData.currentStreak >= 14,
    },
    {
      days: 30,
      title: 'Giant Baobab',
      titleZu: 'Isihlahla Esikhulu',
      icon: '🌳',
      desc: '1 month habit master with deep roots',
      unlocked: streakData.currentStreak >= 30,
    },
  ];

  // Next milestone
  const nextMilestone = milestones.find(m => !m.unlocked) || milestones[milestones.length - 1];
  const progressToNext = Math.min(
    100,
    Math.round((streakData.currentStreak / nextMilestone.days) * 100)
  );

  const handleLogPractice = () => {
    const updated = OfflineStorageService.recordDailyActivity(child.id);
    setStreakData(updated);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
    if (onStreakUpdated) onStreakUpdated();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs space-y-6 relative overflow-hidden">
      
      {/* Celebration Overlay Effect */}
      {showCelebration && (
        <div className="absolute inset-0 bg-[#E07A5F]/95 text-white flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
          <span className="text-5xl mb-2 animate-bounce">🎉🔥🌱</span>
          <h3 className="font-editorial text-3xl font-bold mb-1">
            {streakData.currentStreak} Days in a Row!
          </h3>
          <p className="text-sm max-w-md opacity-95 mb-4">
            Halala! You and {child.nickname} are nurturing lifelong curiosity. Consistency makes every seed bloom!
          </p>
          <button
            onClick={() => setShowCelebration(false)}
            className="bg-white text-[#14213D] px-6 py-2.5 rounded-full font-bold text-xs shadow-lg hover:bg-gray-50 transition"
          >
            Keep Growing →
          </button>
        </div>
      )}

      {/* Header section with streak hero & stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#EADFCF]">
        
        {/* Left: Streak Flame Hero */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-[#E07A5F] text-white shadow-lg shadow-orange-500/20">
            <Flame className="w-10 h-10 animate-pulse" />
            <span className="absolute -top-1 -right-1 text-xs">🌱</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
                {language === 'zu' ? 'Umkhuba Wansuku Zonke' : 'Habit Formation Streak'}
              </span>
              {isPracticedToday ? (
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Logged Today
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" /> Pending Today
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#14213D]">
                {streakData.currentStreak}
              </h3>
              <span className="font-editorial text-xl font-bold text-[#E07A5F]">
                {streakData.currentStreak === 1 ? 'Day Active' : 'Days Active'}
              </span>
            </div>

            <p className="text-xs text-[#6B7280] mt-0.5">
              Best Record: <strong className="text-[#14213D]">{streakData.longestStreak} days</strong> · Total Sessions: <strong className="text-[#14213D]">{streakData.totalPracticeDays}</strong>
            </p>
          </div>
        </div>

        {/* Right: Quick Action to Keep Streak Alive */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!isPracticedToday ? (
            <button
              onClick={handleLogPractice}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-5 py-3 rounded-full font-bold text-xs shadow-md transition"
            >
              <Zap className="w-4 h-4" />
              <span>Log Today's Practice (+1)</span>
            </button>
          ) : (
            <div className="bg-[#FAF7F2] border border-[#EADFCF] rounded-2xl px-4 py-2 text-center text-xs text-[#2A9D8F] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Streak Protected for Today!</span>
            </div>
          )}
        </div>

      </div>

      {/* 7-Day Rolling Habit Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280]">
          <span>Past 7 Days Consistency</span>
          <span className="text-[#E07A5F] font-bold">
            {last7Days.filter(d => d.isCompleted).length} of 7 days completed
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {last7Days.map((day, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-3 text-center border transition-all ${
                day.isToday
                  ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/20'
                  : 'border-[#EADFCF]'
              } ${
                day.isCompleted
                  ? 'bg-amber-500/10 text-amber-900 font-bold'
                  : 'bg-[#FAF7F2] text-gray-400'
              }`}
            >
              <span className="block text-[10px] uppercase font-bold mb-1">
                {day.dayLabel}
              </span>
              <div className="flex items-center justify-center h-8">
                {day.isCompleted ? (
                  <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-dashed border-gray-300" />
                )}
              </div>
              <span className="block text-[9px] text-[#6B7280] mt-1">
                {day.isToday ? 'Today' : day.isCompleted ? 'Done' : 'Rest'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Progress Ladder */}
      <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EADFCF] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#E07A5F]" />
            <h4 className="font-editorial text-sm font-bold text-[#14213D]">
              Next Milestone: {nextMilestone.icon} {nextMilestone.title} ({nextMilestone.days} Days)
            </h4>
          </div>
          <span className="text-xs font-bold text-[#E07A5F]">
            {streakData.currentStreak} / {nextMilestone.days} Days ({progressToNext}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-[#E07A5F] rounded-full transition-all duration-500"
            style={{ width: `${progressToNext}%` }}
          />
        </div>

        {/* Milestone Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {milestones.map(m => (
            <div
              key={m.days}
              className={`rounded-xl p-2.5 text-center border transition-all ${
                m.unlocked
                  ? 'bg-white border-green-200 shadow-xs'
                  : 'bg-white/40 border-dashed border-gray-200 opacity-60'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              <p className="text-[11px] font-bold text-[#14213D] truncate">{m.title}</p>
              <p className="text-[9px] text-[#6B7280]">{m.days} Days</p>
              {m.unlocked ? (
                <span className="inline-block mt-1 text-[8px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">
                  Unlocked ✓
                </span>
              ) : (
                <span className="inline-block mt-1 text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                  Locked 🔒
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Science & South African ECD Habit Tip */}
      <div className="flex items-start gap-3 text-xs text-[#4B5563] bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
        <Sparkles className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#14213D]">
            The 10-Minute Habit Science
          </p>
          <p className="text-[11px] leading-relaxed text-[#4B5563]">
            {language === 'zu'
              ? 'Ukwenza imizuzu eyi-10 nsuku zonke kusiza ubuchopho bomntwana ukugcina amagama nomsindo kalula kakhulu kunokufunda isikhathi eside kanye ngesonto.'
              : 'Consistent 10–15 minute daily micro-sessions build deeper synaptic pathways for reading and counting than infrequent cram sessions. Praise effort, not perfection!'}
          </p>
        </div>
      </div>

    </div>
  );
};

function ClockIcon(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
