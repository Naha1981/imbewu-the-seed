import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Download, 
  MessageCircle, 
  Lock, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Share2,
  Headphones,
  ShieldCheck
} from 'lucide-react';
import type { AudioBook, AudioBookChapter, PlanTier } from '../../types';
import { FishAudioService } from '../../services/FishAudioService';
import { AudioBookPaywallGate } from './AudioBookPaywallGate';

interface AudioBookPlayerProps {
  audioBook: AudioBook;
  userPlan: PlanTier;
  onUpgradePlan: (plan: PlanTier) => void;
  onBackToStudio?: () => void;
}

export const AudioBookPlayer: React.FC<AudioBookPlayerProps> = ({
  audioBook,
  userPlan,
  onUpgradePlan,
  onBackToStudio
}) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  // Bedtime Mode (Anti-Blue Light)
  const [isBedtimeMode, setIsBedtimeMode] = useState(false);
  
  // Ambient Music Track Toggle
  const [isAmbientAudioOn, setIsAmbientAudioOn] = useState(true);

  // Dev Toggle for testing Free Teaser vs Paid Tier
  const [devPaidOverride, setDevPaidOverride] = useState<boolean | null>(null);

  // Paywall Modal State
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [teaserTriggered, setTeaserTriggered] = useState(false);

  // WhatsApp Share State
  const [whatsAppSuccess, setWhatsAppSuccess] = useState(false);

  // Effective plan check
  const isPaid = devPaidOverride !== null 
    ? devPaidOverride 
    : (userPlan !== 'FREE');

  const currentChapter: AudioBookChapter = audioBook.chapters[currentChapterIdx] || audioBook.chapters[0];
  const words = currentChapter.storyText.split(/\s+/).filter(w => w.trim().length > 0);

  // Audio Context & Playback references
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientControllerRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const speechControllerRef = useRef<{ stop: () => void; pause: () => void; resume: () => void } | null>(null);
  const timerIntervalRef = useRef<any>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const stopAllAudio = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (speechControllerRef.current) {
      speechControllerRef.current.stop();
      speechControllerRef.current = null;
    }
    if (ambientControllerRef.current) {
      ambientControllerRef.current.stop();
      ambientControllerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  // Play gentle chime sound when 30-second teaser expires
  const playTeaserChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.6); // G5

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.4);
    } catch {
      // Audio context restricted
    }
  };

  // Start or Pause Audio Playback
  const handleTogglePlay = () => {
    if (isPlaying) {
      // Pause
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (speechControllerRef.current) speechControllerRef.current.pause();
      if (ambientControllerRef.current) ambientControllerRef.current.stop();
      setIsPlaying(false);
    } else {
      // Resume / Start
      startPlayback();
    }
  };

  const startPlayback = () => {
    // If not paid and already exceeded 30s, show paywall
    if (!isPaid && playbackSeconds >= 30) {
      setIsPaywallOpen(true);
      return;
    }

    // Init Web Audio API for ambient sounds
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    if (isAmbientAudioOn && audioContextRef.current) {
      ambientControllerRef.current = FishAudioService.createAmbientAudioTrack(
        audioContextRef.current,
        audioContextRef.current.destination
      );
      ambientControllerRef.current.start();
    }

    // Synthesize cloned voice narration
    const remainingText = words.slice(currentWordIndex).join(' ');
    speechControllerRef.current = FishAudioService.synthesizeExpressiveVoice({
      text: remainingText || currentChapter.storyText,
      language: 'en',
      role: audioBook.voiceRole,
      onWordBoundary: (word, charIdx) => {
        setCurrentWordIndex(prev => Math.min(prev + 1, words.length - 1));
      },
      onEnd: () => {
        handleChapterCompleted();
      }
    });

    setIsPlaying(true);

    // Playback timer & 30-Second Free Tier Cutoff
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setPlaybackSeconds(prev => {
        const next = prev + 1;

        // FREE TIER 30-SECOND TEASER HOOK
        if (!isPaid && next >= 30) {
          clearInterval(timerIntervalRef.current);
          stopAllAudio();
          playTeaserChime();
          setTeaserTriggered(true);
          setIsPaywallOpen(true);
          return 30;
        }

        return next;
      });
    }, 1000);
  };

  const handleChapterCompleted = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsPlaying(false);

    if (currentChapterIdx < audioBook.chapters.length - 1) {
      // Advance to next chapter if paid
      if (isPaid) {
        setCurrentChapterIdx(prev => prev + 1);
        setPlaybackSeconds(0);
        setCurrentWordIndex(0);
      } else {
        setIsPaywallOpen(true);
      }
    }
  };

  const handleChapterSelect = (idx: number) => {
    if (!isPaid && idx > 0) {
      setIsPaywallOpen(true);
      return;
    }
    stopAllAudio();
    setCurrentChapterIdx(idx);
    setPlaybackSeconds(0);
    setCurrentWordIndex(0);
  };

  // WhatsApp story export for parents working late or night-shifts
  const handleShareToWhatsApp = () => {
    if (!isPaid) {
      setIsPaywallOpen(true);
      return;
    }

    const message = `🌙 *KASI BEDTIME AUDIO STORY FOR ${audioBook.childName.toUpperCase()}*
📖 *Story:* ${audioBook.title}
🎙️ *Narrated by:* ${audioBook.voiceProfileName} (Fish Audio Cloned Voice)
🏡 *Setting:* ${audioBook.suburb}

Sawubona Gogo / Caregiver! 👋
I recorded tonight's personalized bedtime adventure in my own voice for ${audioBook.childName} so they feel safe and loved while I am working late.

✨ *Chapter 1:* ${audioBook.chapters[0]?.title}
✨ *Chapter 2:* ${audioBook.chapters[1]?.title}
✨ *Chapter 3:* ${audioBook.chapters[2]?.title}

Tap to play tonight's soothing audio book:
${window.location.origin}/#audiobook-player?id=${audioBook.id}

_Lala kahle, sweet dreams from Imbewu BanaPele AI!_ 🌱`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setWhatsAppSuccess(true);
    setTimeout(() => setWhatsAppSuccess(false), 4000);
  };

  // Download high-quality offline audio buffer
  const handleDownloadOfflineAudio = () => {
    if (!isPaid) {
      setIsPaywallOpen(true);
      return;
    }

    // Generate downloadable text package or simulated audio track
    const element = document.createElement('a');
    const file = new Blob([
      `IMBEWU / BANAPELE AUDIOBOOK OFFLINE PACKAGE\n` +
      `Title: ${audioBook.title}\n` +
      `Child: ${audioBook.childName}\n` +
      `Voice: ${audioBook.voiceProfileName}\n\n` +
      audioBook.chapters.map(c => `[Chapter ${c.chapterNumber}: ${c.title}]\n${c.storyText}\n`).join('\n')
    ], { type: 'text/plain;charset=utf-8' });

    element.href = URL.createObjectURL(file);
    element.download = `${audioBook.title.replace(/\s+/g, '-').toLowerCase()}-${audioBook.childName}.txt`;
    element.click();
  };

  return (
    <div className={`rounded-3xl transition-colors duration-500 overflow-hidden border shadow-2xl relative ${
      isBedtimeMode 
        ? 'bg-[#090C15] text-gray-100 border-indigo-950' 
        : 'bg-[#FAF7F2] text-[#14213D] border-[#EADFCF]'
    }`}>
      
      {/* Bedtime Glowing Stars Ambient Background (Only in Bedtime Mode) */}
      {isBedtimeMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-12 w-2 h-2 rounded-full bg-amber-200/80 blur-[1px] animate-pulse" />
          <div className="absolute top-20 right-20 w-1.5 h-1.5 rounded-full bg-blue-200/70 blur-[1px] animate-pulse" style={{ animationDelay: '1.2s' }} />
          <div className="absolute bottom-24 left-1/4 w-2 h-2 rounded-full bg-purple-200/60 blur-[1px] animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute bottom-16 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-100/70 blur-[1px] animate-pulse" style={{ animationDelay: '1.8s' }} />
          <div className="absolute -top-24 right-1/4 w-72 h-72 rounded-full bg-indigo-900/10 blur-3xl" />
        </div>
      )}

      {/* Top Navigation & Controls */}
      <div className={`p-5 sm:p-6 border-b flex flex-wrap items-center justify-between gap-4 relative z-10 ${
        isBedtimeMode ? 'border-gray-800 bg-[#0E1322]/80' : 'border-[#EADFCF] bg-white'
      }`}>
        <div className="flex items-center gap-3">
          {onBackToStudio && (
            <button
              onClick={() => {
                stopAllAudio();
                onBackToStudio();
              }}
              className="text-xs font-bold text-[#E07A5F] hover:underline flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Studio</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-500">
                <Headphones className="w-4 h-4" />
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold">
                {audioBook.title}
              </h2>
            </div>
            <p className="text-xs text-gray-500">
              Hero: <strong>{audioBook.childName}</strong> · Voice: <span className="text-[#E07A5F] font-semibold">{audioBook.voiceProfileName}</span>
            </p>
          </div>
        </div>

        {/* Action Toggles: Bedtime Mode, Ambient Sound, Dev Paid Status */}
        <div className="flex items-center gap-2">
          
          {/* Dev Toggle: Toggle Paid Status */}
          <button
            onClick={() => setDevPaidOverride(prev => prev === null ? !isPaid : !prev)}
            className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500/25 transition-all"
            title="Toggle between Free Tier (30s teaser) and Paid Tier for testing"
          >
            Dev: {isPaid ? 'PAID UNLOCKED' : 'FREE TEASER (30s)'}
          </button>

          {/* Ambient Music Box & Crickets Toggle */}
          <button
            onClick={() => setIsAmbientAudioOn(!isAmbientAudioOn)}
            className={`p-2 rounded-xl text-xs font-bold transition-all border ${
              isAmbientAudioOn
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}
            title="Gentle African lullaby music box + night crickets"
          >
            {isAmbientAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Bedtime Mode (Anti-Blue Light) Toggle */}
          <button
            onClick={() => setIsBedtimeMode(!isBedtimeMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isBedtimeMode
                ? 'bg-amber-400 text-gray-950 border-amber-300 shadow-sm'
                : 'bg-[#14213D] text-white border-[#14213D]'
            }`}
            title="Deep dark black mode with glowing stars to protect melatonin"
          >
            {isBedtimeMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isBedtimeMode ? 'Day Mode' : 'Bedtime Mode'}</span>
          </button>

        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div className={`p-4 border-b flex items-center justify-between overflow-x-auto gap-2 text-xs relative z-10 ${
        isBedtimeMode ? 'border-gray-800 bg-[#0B0F1C]' : 'border-[#EADFCF] bg-[#FAF7F2]'
      }`}>
        <div className="flex items-center gap-2">
          {audioBook.chapters.map((ch, idx) => {
            const isCurrent = idx === currentChapterIdx;
            const isLocked = !isPaid && idx > 0;
            return (
              <button
                key={ch.chapterNumber}
                onClick={() => handleChapterSelect(idx)}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#E07A5F] text-white shadow-xs'
                    : isLocked
                    ? 'bg-black/20 text-gray-400 opacity-60'
                    : isBedtimeMode ? 'bg-white/5 text-gray-300' : 'bg-white text-gray-700 border border-[#EADFCF]'
                }`}
              >
                {isLocked ? <Lock className="w-3 h-3 text-amber-400" /> : <span>Ch {ch.chapterNumber}:</span>}
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>

        {!isPaid && (
          <span className="text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full whitespace-nowrap">
            🔒 Free Teaser (0:30 Limit)
          </span>
        )}
      </div>

      {/* Main Interactive Karaoke Story Reader View */}
      <div className="p-6 sm:p-10 max-w-3xl mx-auto space-y-8 relative z-10">
        
        {/* Chapter Title & Expressive Tag Indicator */}
        <div className="text-center space-y-2">
          <span className={`text-xs font-bold uppercase tracking-widest ${
            isBedtimeMode ? 'text-amber-400' : 'text-[#E07A5F]'
          }`}>
            Chapter {currentChapter.chapterNumber} of 3
          </span>
          <h3 className="font-editorial text-2xl sm:text-4xl font-bold leading-tight">
            {currentChapter.title}
          </h3>
          <p className="text-xs text-gray-400">
            Synthesized with Fish Audio s2.1-pro · Expressive bedtime cadence
          </p>
        </div>

        {/* Synchronized Karaoke-Style Text Reader */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-inner transition-colors duration-300 ${
          isBedtimeMode
            ? 'bg-black/50 border-gray-800 text-gray-200'
            : 'bg-white border-[#EADFCF] text-[#14213D]'
        }`}>
          <p className="font-editorial text-lg sm:text-2xl leading-relaxed tracking-wide select-none">
            {words.map((word, idx) => {
              const isHighlighted = idx === currentWordIndex && isPlaying;
              const isPast = idx < currentWordIndex;
              return (
                <span
                  key={idx}
                  className={`inline-block mr-2 transition-all duration-150 rounded-sm px-0.5 ${
                    isHighlighted
                      ? 'bg-amber-400 text-black font-bold scale-105 shadow-xs'
                      : isPast
                      ? isBedtimeMode ? 'text-gray-400' : 'text-gray-700'
                      : isBedtimeMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* 30-Second Golden Teaser In-App Notice if Triggered */}
        {teaserTriggered && !isPaid && (
          <div className="p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-400 text-amber-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold text-white text-sm">
                  You are listening to {audioBook.childName}'s personalized story in {audioBook.voiceProfileName}!
                </p>
                <p className="text-amber-300">
                  Unlock the full 3-chapter bedtime adventure, offline listening, and WhatsApp sharing.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsPaywallOpen(true)}
              className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-md shrink-0 transition-all"
            >
              Unlock Full Audio Book (R49) →
            </button>
          </div>
        )}

        {/* Playback Controls & Progress Bar */}
        <div className={`p-5 rounded-3xl border ${
          isBedtimeMode ? 'bg-[#0E1322] border-gray-800' : 'bg-white border-[#EADFCF]'
        } space-y-4`}>
          
          {/* Progress Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400 font-mono">
              <span>{Math.floor(playbackSeconds / 60)}:{(playbackSeconds % 60).toString().padStart(2, '0')}</span>
              <span>
                {!isPaid ? '0:30 (Free Teaser)' : `${Math.floor(currentChapter.durationSeconds / 60)}:${(currentChapter.durationSeconds % 60).toString().padStart(2, '0')}`}
              </span>
            </div>

            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isBedtimeMode ? 'bg-amber-400' : 'bg-[#E07A5F]'
                }`}
                style={{
                  width: `${(playbackSeconds / (!isPaid ? 30 : currentChapter.durationSeconds)) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Primary Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              
              {/* Play / Pause */}
              <button
                onClick={handleTogglePlay}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-lg ${
                  isBedtimeMode 
                    ? 'bg-amber-400 text-black hover:bg-amber-300' 
                    : 'bg-[#E07A5F] text-white hover:bg-[#D46A4F]'
                }`}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              {/* Restart */}
              <button
                onClick={() => {
                  stopAllAudio();
                  setPlaybackSeconds(0);
                  setCurrentWordIndex(0);
                }}
                className={`p-3 rounded-full border transition-all ${
                  isBedtimeMode 
                    ? 'border-gray-800 text-gray-400 hover:text-white hover:bg-white/5' 
                    : 'border-[#EADFCF] text-gray-600 hover:bg-[#FAF7F2]'
                }`}
                title="Restart Chapter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-xs text-gray-400">
                {isPlaying ? 'Playing with ambient music box' : 'Paused'}
              </span>
            </div>

            {/* Paid Tier Action Buttons: WhatsApp & Offline MP3 Download */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareToWhatsApp}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                  isPaid
                    ? 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs'
                    : 'bg-black/20 text-gray-400 border border-gray-700'
                }`}
                title="Share to Gogo on WhatsApp for late night shifts"
              >
                {isPaid ? <MessageCircle className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                <span>Send to WhatsApp</span>
              </button>

              <button
                onClick={handleDownloadOfflineAudio}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  isPaid
                    ? 'bg-white/10 hover:bg-white/20 text-gray-200 border-white/20'
                    : 'bg-black/20 text-gray-400 border-gray-700'
                }`}
                title="Save for offline bedtime listening during load-shedding"
              >
                {isPaid ? <Download className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                <span>Offline MP3</span>
              </button>
            </div>

          </div>

          {whatsAppSuccess && (
            <p className="text-xs text-[#25D366] font-bold text-right animate-in fade-in">
              ✓ WhatsApp message opened! Your child’s caregiver can now play the story.
            </p>
          )}

        </div>

      </div>

      {/* Paywall Gate Modal */}
      <AudioBookPaywallGate
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        childName={audioBook.childName}
        speakerName={audioBook.voiceProfileName}
        onUpgradeSimulate={(plan) => {
          onUpgradePlan(plan);
          setDevPaidOverride(true);
        }}
      />

    </div>
  );
};
