import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, RotateCw, Home, Heart, Lightbulb, ChevronRight, Check, Share2 } from 'lucide-react';
import type { ChildProfile, LanguageCode, DailyLearningPrompt } from '../../types';
import { HOUSEHOLD_DAILY_PROMPTS } from '../../data/learningPromptsAndStories';
import { OfflineStorageService } from '../../services/offlineStorage';

interface DailyLearningPromptWidgetProps {
  child: ChildProfile;
  language: LanguageCode;
  onActivityCompleted?: () => void;
}

export const DailyLearningPromptWidget: React.FC<DailyLearningPromptWidgetProps> = ({
  child,
  language,
  onActivityCompleted
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedPrompts, setCompletedPrompts] = useState<{ [id: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(`imbewu_household_done_${child.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [justCompleted, setJustCompleted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const prompt: DailyLearningPrompt = HOUSEHOLD_DAILY_PROMPTS[currentIndex] || HOUSEHOLD_DAILY_PROMPTS[0];
  const isDone = Boolean(completedPrompts[prompt.id]);

  const handleNextPrompt = () => {
    setJustCompleted(false);
    setCurrentIndex((prev) => (prev + 1) % HOUSEHOLD_DAILY_PROMPTS.length);
  };

  const playSuccessChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio context might be restricted
    }
  };

  const handleMarkCompleted = () => {
    const updated = { ...completedPrompts, [prompt.id]: true };
    setCompletedPrompts(updated);
    try {
      localStorage.setItem(`imbewu_household_done_${child.id}`, JSON.stringify(updated));
    } catch {
      // Ignore local storage error
    }

    playSuccessChime();
    setJustCompleted(true);

    // Record activity for daily streak
    OfflineStorageService.recordDailyActivity(child.id);

    if (onActivityCompleted) {
      onActivityCompleted();
    }

    setTimeout(() => {
      setJustCompleted(false);
    }, 4000);
  };

  const handleSharePrompt = () => {
    const shareText = `🌟 Imbewu 5-Minute Household Activity for ${child.nickname}:\n\n` +
      `"${prompt.title} (${prompt.titleZu})"\n` +
      `📦 Items: ${prompt.householdItems.join(', ')}\n` +
      `🎯 Goal: ${prompt.learningGoal}\n\n` +
      `Shared from Imbewu ECD platform.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADFCF] shadow-xs relative overflow-hidden">
      {/* Top Banner & Category Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/15 text-[#B45309] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Home className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{language === 'zu' ? 'Umsebenzi Wasekhaya (Imizuzu Emi-5)' : '5-Min Household Prompt'}</span>
          </span>
          <span className="text-[11px] font-bold text-[#6B7280] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EADFCF]">
            {prompt.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSharePrompt}
            className="p-2 text-[#6B7280] hover:text-[#14213D] hover:bg-[#FAF7F2] rounded-xl transition text-xs font-semibold flex items-center gap-1"
            title="Copy prompt to share on family WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showShareToast ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={handleNextPrompt}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#E07A5F] hover:text-[#C55F45] bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#EADFCF] px-3 py-1.5 rounded-xl transition"
            title="Show another 5-minute household activity idea"
          >
            <RotateCw className="w-3 h-3" />
            <span>{language === 'zu' ? 'Enye Indlela' : 'Shuffle Idea'}</span>
          </button>
        </div>
      </div>

      {/* Main Prompt Card */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Icon Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#FFFBEB] to-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-4xl sm:text-5xl shadow-xs shrink-0">
          <span>{prompt.icon}</span>
        </div>

        {/* Middle Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#14213D]">
              {language === 'zu' ? prompt.titleZu : prompt.title}
            </h3>
            <span className="text-xs font-medium text-[#2A9D8F]">
              ({language === 'zu' ? prompt.title : prompt.titleZu})
            </span>
          </div>

          <p className="text-xs font-semibold text-[#6B7280] mt-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>{prompt.durationMinutes} minutes · Low-resource household items · No prep needed</span>
          </p>

          {/* Household items needed */}
          <div className="mt-3 bg-[#FAF7F2] rounded-2xl p-3.5 border border-[#EADFCF]/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-1.5 flex items-center gap-1">
              <span>📦</span>
              <span>{language === 'zu' ? 'Izinto Zasekhaya Ozidingayo:' : 'Household Items You Need:'}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(language === 'zu' ? prompt.householdItemsZu : prompt.householdItems).map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-xs font-medium bg-white text-[#14213D] px-2.5 py-1 rounded-lg border border-[#EADFCF]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold text-[#14213D] uppercase tracking-wide">
              {language === 'zu' ? 'Izinyathelo Ezilula:' : 'Easy 5-Minute Steps:'}
            </p>
            <ol className="space-y-1.5">
              {(language === 'zu' ? prompt.instructionsZu : prompt.instructions).map((step, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-[#4B5563] flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#14213D]/10 text-[#14213D] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Parent Praise & Learning Goal Bar */}
          <div className="mt-4 pt-3 border-t border-[#EADFCF]/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 text-xs text-[#6B7280]">
              <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#14213D]">Learning Objective: </strong>
                <span>{language === 'zu' ? prompt.learningGoalZu : prompt.learningGoal}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-[#6B7280]">
              <Heart className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#14213D]">Parent Tip: </strong>
                <span>{language === 'zu' ? prompt.parentPraiseTipZu : prompt.parentPraiseTip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-5 pt-4 border-t border-[#EADFCF] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isDone ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{language === 'zu' ? 'Wenziwe namuhla! Halala!' : `Completed with ${child.nickname} today!`}</span>
            </span>
          ) : (
            <span className="text-xs text-[#6B7280]">
              {language === 'zu' ? 'Qeda lo msebenzi ukugcina ilanga lakho lisebenza' : 'Marking done extends your daily learning streak.'}
            </span>
          )}

          {justCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>+1 Daily Streak Day Recorded!</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleMarkCompleted}
            disabled={isDone}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition ${
              isDone
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#2A9D8F] hover:bg-[#238276] text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isDone ? 'Completed Today' : (language === 'zu' ? 'Senze Lokhu Namuhla!' : 'We Did This Today!')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
