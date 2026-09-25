import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Share2,
  Heart,
  Info,
  Shuffle,
  Volume2,
  VolumeX,
  Sunrise,
  Sun,
  Moon,
  Star,
  Check,
  Award,
  ChevronRight,
  BookOpen,
  ArrowRight,
  X,
  HelpCircle,
  Flame
} from 'lucide-react';
import type { ChildProfile, LanguageCode, TimeOfDayPeriod, DailyEncouragementActivity } from '../../types';
import {
  DAILY_ENCOURAGEMENT_ACTIVITIES,
  getCurrentTimeOfDay,
  getTimeSlotInfo,
  getActivitiesForTime
} from '../../data/dailyEncouragementActivities';
import { OfflineStorageService } from '../../services/offlineStorage';

interface DailyEncouragementCardProps {
  child: ChildProfile;
  language: LanguageCode;
  onActivityCompleted?: () => void;
}

export const DailyEncouragementCard: React.FC<DailyEncouragementCardProps> = ({
  child,
  language,
  onActivityCompleted
}) => {
  // Current real-time clock and natural time slot
  const [realTimeSlot, setRealTimeSlot] = useState<TimeOfDayPeriod>(() => getCurrentTimeOfDay());
  const [selectedSlot, setSelectedSlot] = useState<TimeOfDayPeriod>(() => getCurrentTimeOfDay());
  const [formattedCurrentTime, setFormattedCurrentTime] = useState<string>('');

  // Activities for currently selected time slot
  const slotActivities = getActivitiesForTime(selectedSlot);
  const [activityIndex, setActivityIndex] = useState(0);

  // Active activity
  const activity: DailyEncouragementActivity =
    slotActivities[activityIndex % slotActivities.length] || slotActivities[0];

  // Completion state
  const [completedActivities, setCompletedActivities] = useState<{ [id: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(`imbewu_encouragement_done_${child.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isCompleted = Boolean(completedActivities[activity?.id]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showDeepDiveModal, setShowDeepDiveModal] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // 5-minute interactive timer state (300 seconds)
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Audio speech synthesis reading state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Update clock every minute
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setRealTimeSlot(getCurrentTimeOfDay(now));
      setFormattedCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current as NodeJS.Timeout);
            setIsTimerRunning(false);
            playCelebrationChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  // Audio celebration sound using Web Audio API
  const playCelebrationChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 joyful arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.45);
      });
    } catch {
      // Audio might be muted or unsupported
    }
  };

  const handleToggleTimer = () => {
    setIsTimerRunning(prev => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(300);
  };

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Text to speech voice read-aloud
  const handleReadAloud = () => {
    if (isSpeaking) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      playCelebrationChime();
      return;
    }

    const title = language === 'zu' ? activity.titleZu : activity.titleEn;
    const steps = language === 'zu' ? activity.stepsZu.join('. ') : activity.stepsEn.join('. ');
    const textToSpeak = `Daily 5-minute encouragement for ${child.nickname}. ${title}. ${activity.taglineEn}. Let's do this: ${steps}. ${activity.encouragementQuote}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech if unmounting
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const handleShuffleActivity = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActivityIndex(prev => prev + 1);
    setIsTimerRunning(false);
    setTimerSeconds(300);
  };

  const handleSelectTimeSlot = (slot: TimeOfDayPeriod) => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSelectedSlot(slot);
    setActivityIndex(0);
    setIsTimerRunning(false);
    setTimerSeconds(300);
  };

  const handleMarkCompleted = () => {
    const updated = { ...completedActivities, [activity.id]: true };
    setCompletedActivities(updated);
    try {
      localStorage.setItem(`imbewu_encouragement_done_${child.id}`, JSON.stringify(updated));
    } catch {
      // Local storage fallback
    }

    playCelebrationChime();
    setShowCelebration(true);

    // Record activity in daily streak service
    OfflineStorageService.recordDailyActivity(child.id);

    if (onActivityCompleted) {
      onActivityCompleted();
    }

    setTimeout(() => {
      setShowCelebration(false);
    }, 4500);
  };

  const handleShareWhatsApp = () => {
    const title = language === 'zu' ? activity.titleZu : activity.titleEn;
    const text = `🌟 BanaPele Daily 5-Minute Encouragement for ${child.nickname}:\n\n` +
      `"${title}"\n` +
      `🌱 NCF Focus: ${activity.eldaCode}\n` +
      `⏰ Time of Day: ${activity.timeBadge}\n` +
      `💡 Activity: ${activity.stepsEn[0]}\n\n` +
      `"${activity.encouragementQuote}" — ${activity.encouragementQuoteAuthor}\n\n` +
      `Shared from BanaPele AI (Children First) Early Childhood Development.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2800);
    }
  };

  const timeInfo = getTimeSlotInfo(selectedSlot, language);
  const isRealNow = selectedSlot === realTimeSlot;

  // Progress percentage for 5 minute timer
  const timerPercentage = Math.round(((300 - timerSeconds) / 300) * 100);

  return (
    <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#EADFCF] shadow-sm overflow-hidden transition-all">
      {/* Decorative Warm Top Background Glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        style={{ backgroundColor: activity.accentColor }}
      />

      {/* Header Bar: Title, Live Clock, and Slot Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/20">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#E07A5F]" />
              <span>BanaPele Daily Encouragement</span>
            </span>

            {isRealNow && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                <span>Live ({formattedCurrentTime || 'Now'})</span>
              </span>
            )}
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mt-2">
            {language === 'zu' ? 'Isikhuthazo Sosuku Lomndeni' : '5-Minute Parent Connection Spark'}
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            {language === 'zu'
              ? `Umdlalo omfushane wemizuzu emi-5 osuselwa esikhathini sosuku no-NCF 0–4 ka-Lerato.`
              : `Playful, zero-resource bonding tailored for ${child.nickname} based on the current time of day & South Africa’s NCF.`}
          </p>
        </div>

        {/* Time-of-Day Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#EADFCF] self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => handleSelectTimeSlot('morning')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedSlot === 'morning'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#14213D] hover:bg-white/80'
            }`}
          >
            <Sunrise className="w-3.5 h-3.5" />
            <span>Morning</span>
            {realTimeSlot === 'morning' && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />}
          </button>

          <button
            onClick={() => handleSelectTimeSlot('afternoon')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedSlot === 'afternoon'
                ? 'bg-[#2A9D8F] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#14213D] hover:bg-white/80'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Afternoon</span>
            {realTimeSlot === 'afternoon' && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />}
          </button>

          <button
            onClick={() => handleSelectTimeSlot('evening')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedSlot === 'evening'
                ? 'bg-[#8338EC] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#14213D] hover:bg-white/80'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Evening</span>
            {realTimeSlot === 'evening' && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />}
          </button>

          <button
            onClick={() => handleSelectTimeSlot('night')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedSlot === 'night'
                ? 'bg-[#1D3557] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#14213D] hover:bg-white/80'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Night</span>
            {realTimeSlot === 'night' && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Main Activity Showcase Card */}
      <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-7 border border-[#EADFCF] relative z-10 space-y-6">
        
        {/* Top Badges: ELDA Badge & Duration & Shuffle Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EADFCF]/70 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-2xs"
              style={{ backgroundColor: activity.accentColor }}
            >
              {activity.eldaCode}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#EADFCF] text-[#4B5563]">
              {timeInfo.icon} {activity.timeBadge}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#EADFCF] text-[#4B5563] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#E07A5F]" />
              <span>5 Minutes</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadAloud}
              className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse'
                  : 'bg-white border-[#EADFCF] text-[#4B5563] hover:bg-amber-50 hover:text-amber-800'
              }`}
              title="Listen to teacher/parent read aloud"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-[#2A9D8F]" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Pause Voice' : 'Read Aloud'}</span>
            </button>

            <button
              onClick={handleShuffleActivity}
              className="p-2 rounded-xl text-xs font-semibold bg-white border border-[#EADFCF] text-[#4B5563] hover:bg-[#EADFCF]/40 transition-all flex items-center gap-1.5"
              title="Shuffle another 5-minute activity for this time slot"
            >
              <Shuffle className="w-4 h-4 text-[#E07A5F]" />
              <span className="hidden sm:inline">Try Another</span>
            </button>

            <button
              onClick={() => setShowDeepDiveModal(true)}
              className="p-2 rounded-xl text-xs font-bold bg-white border border-[#EADFCF] text-[#14213D] hover:bg-emerald-50 hover:text-emerald-800 transition-all flex items-center gap-1.5"
              title="Tell me more about how this helps my child"
            >
              <Info className="w-4 h-4 text-[#2A9D8F]" />
              <span className="hidden sm:inline">Tell Me More</span>
            </button>
          </div>
        </div>

        {/* Activity Title & Tagline */}
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xs shrink-0 border border-white"
            style={{ backgroundColor: `${activity.accentColor}18` }}
          >
            {activity.icon}
          </div>

          <div className="flex-1">
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#14213D] leading-tight">
              {language === 'zu' ? activity.titleZu : activity.titleEn}
            </h3>
            {language !== 'zu' && activity.titleZu && (
              <p className="text-xs text-[#E07A5F] font-semibold mt-0.5">
                isiZulu: {activity.titleZu}
              </p>
            )}
            <p className="text-sm text-[#4B5563] mt-1.5 leading-relaxed font-medium">
              {language === 'zu' ? activity.taglineZu : activity.taglineEn}
            </p>
          </div>
        </div>

        {/* Household Zero-Cost Items Strip */}
        <div className="bg-white rounded-xl p-3.5 border border-[#EADFCF]/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
            <span>📦 What You Need (0-Cost):</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activity.householdItems.map((item, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#FAF7F2] text-[#14213D] font-medium px-2.5 py-0.5 rounded-lg border border-[#EADFCF]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Step-by-Step 5-Minute Guide */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-[#14213D] uppercase tracking-wider flex items-center gap-1.5">
            <span>🐾 5-Minute Step-by-Step Play:</span>
          </p>
          <div className="space-y-2">
            {(language === 'zu' ? activity.stepsZu : activity.stepsEn).map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white p-3 rounded-xl border border-[#EADFCF]/70 text-xs sm:text-sm text-[#14213D] leading-relaxed"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: activity.accentColor }}
                >
                  {idx + 1}
                </div>
                <p className="flex-1 whitespace-pre-line">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 5-Minute Countdown Timer & Completion Widget */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EADFCF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Visual Circular/Pill Timer Display */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border-2 border-[#14213D] flex flex-col items-center justify-center shadow-inner">
                <span className="font-mono text-base font-bold text-[#14213D]">
                  {formatTimerDisplay(timerSeconds)}
                </span>
                <span className="text-[9px] uppercase font-bold text-[#6B7280]">
                  {isTimerRunning ? 'Active' : 'Timer'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[#14213D]">
                  {isTimerRunning ? '5-Minute Play in Progress...' : '5-Minute Practice Clock'}
                </h4>
                {timerSeconds === 0 && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Done! 🌟
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">
                {isTimerRunning
                  ? 'Stay present in the moment with your child.'
                  : 'Start the clock to focus for 5 uninterrupted minutes.'}
              </p>

              {/* Progress bar */}
              <div className="w-full sm:w-44 bg-[#EADFCF]/60 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#E07A5F] transition-all duration-1000"
                  style={{ width: `${timerPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Timer Controls & Complete Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleToggleTimer}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                isTimerRunning
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                  : 'bg-[#14213D] hover:bg-[#1f315a] text-white'
              }`}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isTimerRunning ? 'Pause' : timerSeconds === 300 ? 'Start 5m' : 'Resume'}</span>
            </button>

            <button
              onClick={handleResetTimer}
              className="p-2.5 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#EADFCF]/60 text-[#4B5563] border border-[#EADFCF] transition-all"
              title="Reset 5-Minute Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleMarkCompleted}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#2A9D8F] hover:bg-[#238276] text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Done'}</span>
            </button>
          </div>
        </div>

        {/* Ubuntu Warm Parent Encouragement & Cultural Root */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/70 to-orange-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5 fill-[#E07A5F]/20" />
            <div>
              <p className="font-semibold italic text-[#14213D]">
                {activity.encouragementQuote}
              </p>
              <p className="text-[11px] text-[#E07A5F] font-bold mt-0.5">
                — {activity.encouragementQuoteAuthor}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#EADFCF] text-xs font-bold text-[#14213D] hover:bg-[#2A9D8F] hover:text-white hover:border-[#2A9D8F] transition-all shadow-2xs"
              title="Share encouragement to WhatsApp or family"
            >
              <Share2 className="w-3 h-3 text-[#2A9D8F] hover:text-white" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setShowDeepDiveModal(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#2A9D8F] hover:underline"
            >
              <span>Why it works</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Share Toast Notification */}
      {shareToast && (
        <div className="absolute top-4 right-4 z-50 bg-[#14213D] text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Encouragement copied! Ready to paste on WhatsApp.</span>
        </div>
      )}

      {/* Confetti Celebration Banner / Feedback on Completion */}
      {showCelebration && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-40 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-4xl mb-4 shadow-md">
            🌟
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
            Ubuntu Moment Achieved
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mb-2">
            {language === 'zu' ? `Halala! 5 Minutes of Magic!` : `Halala, ${child.nickname}!` }
          </h3>
          <p className="text-sm text-[#4B5563] max-w-md mx-auto mb-6">
            You just gave {child.nickname} 5 minutes of your undivided love, language, and presence. 
            The seeds you plant today will bloom for years to come.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 bg-[#2A9D8F] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#238276] transition shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Achievement on WhatsApp</span>
            </button>

            <button
              onClick={() => setShowCelebration(false)}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#14213D] border border-[#EADFCF] hover:bg-[#EADFCF]/50 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* "Tell Me More About This Activity" Deep-Dive Modal */}
      {showDeepDiveModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#EADFCF] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowDeepDiveModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] hover:bg-[#EADFCF] text-[#4B5563] transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xs shrink-0"
                style={{ backgroundColor: `${activity.accentColor}20` }}
              >
                {activity.icon}
              </div>
              <div>
                <span
                  className="text-xs font-bold px-3 py-0.5 rounded-full text-white inline-block mb-1.5"
                  style={{ backgroundColor: activity.accentColor }}
                >
                  {activity.eldaCode}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#14213D]">
                  {activity.titleEn}
                </h3>
                <p className="text-xs text-[#E07A5F] font-semibold">
                  isiZulu: {activity.titleZu}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-xs sm:text-sm">
              {/* NCF Curriculum Grounding */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EADFCF]">
                <h4 className="font-bold text-[#14213D] flex items-center gap-2 mb-2 text-sm">
                  <BookOpen className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Why This 5-Minute Activity Works (NCF 0-4 Rationale)</span>
                </h4>
                <p className="text-[#4B5563] leading-relaxed">
                  {activity.whyItMattersEn}
                </p>
                {language === 'zu' && (
                  <p className="text-[#2A9D8F] font-medium mt-2 leading-relaxed italic">
                    {activity.whyItMattersZu}
                  </p>
                )}
              </div>

              {/* Cultural Heritage & Township Living */}
              <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200">
                <h4 className="font-bold text-[#14213D] flex items-center gap-2 mb-2 text-sm">
                  <Heart className="w-4 h-4 text-[#E07A5F]" />
                  <span>Township Roots & Cultural Connection</span>
                </h4>
                <p className="text-[#4B5563] leading-relaxed">
                  {activity.culturalTouchpoint}
                </p>
              </div>

              {/* Age Adaptation (Age 3 vs Age 5-6) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#EADFCF] shadow-2xs">
                  <span className="text-[11px] font-bold text-[#E07A5F] uppercase tracking-wider block mb-1">
                    For Younger Toddlers (Age 3):
                  </span>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {activity.ageAdaptation.forAge3}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EADFCF] shadow-2xs">
                  <span className="text-[11px] font-bold text-[#2A9D8F] uppercase tracking-wider block mb-1">
                    For Older Preschoolers (Age 4-5+):
                  </span>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {activity.ageAdaptation.forAge5}
                  </p>
                </div>
              </div>

              {/* Distraction / Busy Parent Advice */}
              <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADFCF] flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#14213D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#14213D] text-xs">
                    What if {child.nickname} gets distracted or has low energy?
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Don’t force it! In ECD, gentle connection always beats rigid completion. If your child wants to change the rules, laugh and follow their lead. 60 seconds of joyful presence is infinitely better than 10 minutes of stressed drills.
                  </p>
                </div>
              </div>

              {/* Actions in Modal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#EADFCF]">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2A9D8F] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#238276] transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Activity with Gogo / Teacher</span>
                </button>

                <button
                  onClick={() => setShowDeepDiveModal(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-[#14213D] text-white hover:bg-[#1f315a] transition"
                >
                  Got It, Let’s Play!
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
