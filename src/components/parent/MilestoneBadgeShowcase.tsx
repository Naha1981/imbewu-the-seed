import React, { useState } from 'react';
import { Award, Sparkles, Star, Lock, CheckCircle2, Flame, Printer, X, Volume2, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import type { ChildProfile, LanguageCode, MilestoneBadge, BadgeCategory } from '../../types';
import { OfflineStorageService, SEED_BADGES } from '../../services/offlineStorage';

interface MilestoneBadgeShowcaseProps {
  child: ChildProfile;
  language: LanguageCode;
  onBadgeAwarded?: (badge: MilestoneBadge) => void;
  compact?: boolean;
}

export const MilestoneBadgeShowcase: React.FC<MilestoneBadgeShowcaseProps> = ({
  child,
  language,
  onBadgeAwarded,
  compact = false
}) => {
  const [badges, setBadges] = useState<MilestoneBadge[]>(() => 
    OfflineStorageService.getBadges(child.id)
  );
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');
  const [activeModalBadge, setActiveModalBadge] = useState<MilestoneBadge | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<MilestoneBadge | null>(null);

  // Sound chime using Web Audio API (completely offline, zero network dependencies)
  const playCelebrationChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        
        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.3, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } catch {
      // Audio not permitted or supported; silent fallback
    }
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter(b => b.category === selectedCategory);

  const handleManualUnlock = (badgeId: string) => {
    const updated = OfflineStorageService.unlockBadge(child.id, badgeId);
    setBadges(updated);
    const unlocked = updated.find(b => b.id === badgeId);
    if (unlocked) {
      setActiveModalBadge(unlocked);
      playCelebrationChime();
      onBadgeAwarded?.(unlocked);
    }
  };

  const handlePrintCertificate = (badge: MilestoneBadge) => {
    setShowCertificateModal(badge);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Theme color maps for sticker borders and badges
  const getThemeStyles = (theme: MilestoneBadge['stickerTheme'], unlocked: boolean) => {
    if (!unlocked) {
      return {
        bg: 'bg-[#F3EFEA]',
        border: 'border-[#D9D0C3]',
        text: 'text-[#9CA3AF]',
        badgeBg: 'bg-[#E5E0D8]',
        glow: ''
      };
    }
    switch (theme) {
      case 'amber':
        return {
          bg: 'bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]',
          border: 'border-[#F59E0B]',
          text: 'text-[#B45309]',
          badgeBg: 'bg-[#F59E0B]/20 text-[#B45309]',
          glow: 'shadow-[0_8px_20px_rgba(245,158,11,0.25)]'
        };
      case 'emerald':
        return {
          bg: 'bg-gradient-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]',
          border: 'border-[#10B981]',
          text: 'text-[#047857]',
          badgeBg: 'bg-[#10B981]/20 text-[#047857]',
          glow: 'shadow-[0_8px_20px_rgba(16,185,129,0.25)]'
        };
      case 'rose':
        return {
          bg: 'bg-gradient-to-br from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]',
          border: 'border-[#F43F5E]',
          text: 'text-[#BE123C]',
          badgeBg: 'bg-[#F43F5E]/20 text-[#BE123C]',
          glow: 'shadow-[0_8px_20px_rgba(244,63,94,0.25)]'
        };
      case 'indigo':
        return {
          bg: 'bg-gradient-to-br from-[#EEF2FF] via-[#E0E7FF] to-[#C7D2FE]',
          border: 'border-[#6366F1]',
          text: 'text-[#4338CA]',
          badgeBg: 'bg-[#6366F1]/20 text-[#4338CA]',
          glow: 'shadow-[0_8px_20px_rgba(99,102,241,0.25)]'
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-br from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]',
          border: 'border-[#A855F7]',
          text: 'text-[#7E22CE]',
          badgeBg: 'bg-[#A855F7]/20 text-[#7E22CE]',
          glow: 'shadow-[0_8px_20px_rgba(168,85,247,0.25)]'
        };
      case 'teal':
      default:
        return {
          bg: 'bg-gradient-to-br from-[#F0FDFA] via-[#CCFBF1] to-[#99F6E4]',
          border: 'border-[#14B8A6]',
          text: 'text-[#0F766E]',
          badgeBg: 'bg-[#14B8A6]/20 text-[#0F766E]',
          glow: 'shadow-[0_8px_20px_rgba(20,184,166,0.25)]'
        };
    }
  };

  // Compact layout (for embedding on "Today" overview tab)
  if (compact) {
    const recentUnlocked = badges.filter(b => b.unlocked).slice(0, 4);
    const nextToUnlock = badges.find(b => !b.unlocked);

    return (
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADFCF] shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E07A5F]/15 flex items-center justify-center text-[#E07A5F]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#14213D]">
                {language === 'zu' ? 'Izitikha Nezimpumelelo' : 'Milestone Stickers'}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {unlockedCount} / {totalCount} {language === 'zu' ? 'kutholiwe' : 'collected'} ({completionPercentage}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-1 rounded-full">
              {completionPercentage}%
            </span>
          </div>
        </div>

        {/* Sticker strip preview */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 mb-3">
          {recentUnlocked.map(badge => {
            const style = getThemeStyles(badge.stickerTheme, true);
            return (
              <button
                key={badge.id}
                onClick={() => {
                  setActiveModalBadge(badge);
                  playCelebrationChime();
                }}
                className={`relative group aspect-square rounded-2xl ${style.bg} border-2 ${style.border} ${style.glow} flex flex-col items-center justify-center p-1.5 transition transform hover:scale-105 active:scale-95`}
                title={`${badge.title} - ${badge.criteria}`}
              >
                <span className="text-2xl sm:text-3xl filter drop-shadow-sm select-none">
                  {badge.stickerEmoji}
                </span>
                <span className="text-[10px] font-bold text-[#14213D] truncate w-full text-center mt-1">
                  {badge.title}
                </span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#10B981] text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs">
                  ✓
                </span>
              </button>
            );
          })}

          {nextToUnlock && (
            <button
              onClick={() => setActiveModalBadge(nextToUnlock)}
              className="relative aspect-square rounded-2xl bg-[#FAF7F2] border-2 border-dashed border-[#D1C7B7] flex flex-col items-center justify-center p-1.5 transition hover:border-[#E07A5F]"
              title={`Next Goal: ${nextToUnlock.title}`}
            >
              <div className="relative">
                <span className="text-2xl sm:text-3xl opacity-35 filter grayscale select-none">
                  {nextToUnlock.stickerEmoji}
                </span>
                <Lock className="w-3.5 h-3.5 text-[#9CA3AF] absolute -bottom-1 -right-1" />
              </div>
              <span className="text-[10px] font-bold text-[#9CA3AF] truncate w-full text-center mt-1">
                {language === 'zu' ? 'Okulandelayo' : 'Next Goal'}
              </span>
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#EADFCF] rounded-full h-2 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-[#2A9D8F] via-[#E07A5F] to-[#F4A261] h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <p className="text-[11px] text-[#6B7280] italic text-center">
          {language === 'zu'
            ? 'Cindezela isitikha ukubona imininingwane noma uphrinte isitifiketi.'
            : 'Tap any sticker to celebrate accomplishments or print physical certificates.'}
        </p>

        {/* Modal when tapped */}
        {activeModalBadge && (
          <BadgeDetailModal
            badge={activeModalBadge}
            child={child}
            language={language}
            onClose={() => setActiveModalBadge(null)}
            onManualUnlock={() => handleManualUnlock(activeModalBadge.id)}
            onPrint={() => handlePrintCertificate(activeModalBadge)}
          />
        )}
      </div>
    );
  }

  // Full Album View
  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E07A5F]/10 text-[#E07A5F] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'zu' ? 'Isikhwama Sezitikha Ze-ECD' : 'Digital Sticker Album & Milestones'}</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D]">
              {child.nickname}'s Learning Badges & Stickers
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-2xl leading-relaxed">
              {language === 'zu'
                ? 'Imiklomelo yedijithali ekhuthaza ukuzimisela kwansuku zonke, ukuqina kwengqondo, kanye nokuthula kwenhliziyo ekufundeni.'
                : 'Celebrate daily streaks, foundational phonics breakthroughs, and tactile home learning milestones with collectible stickers.'}
            </p>
          </div>

          {/* Sticker Collection Counter */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADFCF] flex items-center gap-4 shrink-0">
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#F4A261] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <span className="select-none text-2xl">🏆</span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#14213D] leading-none">
                {unlockedCount} <span className="text-sm font-bold text-[#9CA3AF]">/ {totalCount}</span>
              </div>
              <div className="text-xs font-bold text-[#2A9D8F] mt-1">
                {completionPercentage}% {language === 'zu' ? 'Kuvuliwe' : 'Collected'}
              </div>
              <div className="text-[11px] text-[#6B7280]">
                {badges.filter(b => b.unlocked && b.rarity === 'Legendary').length > 0 ? '★ Legendary achieved' : 'Keep practicing!'}
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-[#F0E8DD]">
          <div className="flex items-center justify-between text-xs font-bold text-[#4B5563] mb-2">
            <span>Overall Milestone Progress</span>
            <span className="text-[#E07A5F]">{unlockedCount} of {totalCount} Stickers Earned</span>
          </div>
          <div className="w-full bg-[#EADFCF] rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#2A9D8F] via-[#E07A5F] to-[#F4A261] h-full rounded-full transition-all duration-700"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'all', label: 'All Stickers', labelZu: 'Zonke Izitikha', icon: '🌟' },
            { id: 'streak', label: 'Streaks & Habits', labelZu: 'Ukuzinikela Nsuku Zonke', icon: '🔥' },
            { id: 'learning', label: 'Phonics & Literacy', labelZu: 'Imisindo Nezinhlamvu', icon: '🌱' },
            { id: 'explorer', label: 'Bilingual & Ubuntu', labelZu: 'Izilimi Nomphakathi', icon: '🇿🇦' },
            { id: 'creativity', label: 'Art & Worksheets', labelZu: 'Ubuciko Namaphepha', icon: '🎨' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as BadgeCategory | 'all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#14213D] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#EADFCF]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{language === 'zu' ? cat.labelZu : cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stickers Grid Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredBadges.map(badge => {
          const style = getThemeStyles(badge.stickerTheme, badge.unlocked);
          const isUnlocked = badge.unlocked;

          return (
            <div
              key={badge.id}
              onClick={() => {
                setActiveModalBadge(badge);
                if (isUnlocked) playCelebrationChime();
              }}
              className={`group relative rounded-3xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${
                isUnlocked
                  ? `${style.bg} border-2 ${style.border} ${style.glow}`
                  : 'bg-white border-2 border-dashed border-[#D1C7B7] hover:border-[#E07A5F]'
              } flex flex-col items-center text-center justify-between min-h-[220px]`}
            >
              {/* Rarity Ribbon / Status Tag */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  isUnlocked ? style.badgeBg : 'bg-[#FAF7F2] text-[#9CA3AF]'
                }`}>
                  {language === 'zu' ? badge.rarityZu : badge.rarity}
                </span>

                {isUnlocked ? (
                  <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    ✓
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-[#E5E0D8] text-[#9CA3AF] flex items-center justify-center text-xs">
                    <Lock className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Large Sticker Emoji Visual with Sticker Emboss Styling */}
              <div className="relative my-2">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl sm:text-5xl transition-transform group-hover:scale-110 ${
                  isUnlocked
                    ? 'bg-white/80 shadow-md ring-4 ring-white/60'
                    : 'bg-[#F3EFEA] opacity-40 filter grayscale'
                }`}>
                  <span className="select-none filter drop-shadow-sm">{badge.stickerEmoji}</span>
                </div>

                {isUnlocked && (
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 text-[#14213D] text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    EARNED
                  </div>
                )}
              </div>

              {/* Badge Details */}
              <div className="w-full">
                <h4 className="text-sm font-bold text-[#14213D] leading-tight mb-1">
                  {language === 'zu' ? badge.titleZu : badge.title}
                </h4>
                <p className="text-[11px] text-[#6B7280] line-clamp-2 leading-relaxed">
                  {isUnlocked
                    ? (language === 'zu' ? badge.descriptionZu : badge.description)
                    : badge.criteria}
                </p>

                {/* Progress bar for locked badges */}
                {!isUnlocked && (
                  <div className="mt-3 pt-2 border-t border-[#EADFCF]/60">
                    <div className="flex justify-between text-[10px] font-bold text-[#6B7280] mb-1">
                      <span>{language === 'zu' ? 'Inqubekela' : 'Progress'}</span>
                      <span>{badge.currentCount} / {badge.requiredCount}</span>
                    </div>
                    <div className="w-full bg-[#EADFCF] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#2A9D8F] h-full rounded-full"
                        style={{ width: `${Math.min(100, Math.round((badge.currentCount / badge.requiredCount) * 100))}%` }}
                      />
                    </div>
                  </div>
                )}

                {isUnlocked && badge.unlockedAt && (
                  <div className="mt-2 text-[10px] text-[#2A9D8F] font-bold">
                    ★ {new Date(badge.unlockedAt).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Parent Encouragement & Tactile Award Tip */}
      <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#EADFCF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2A9D8F]/15 flex items-center justify-center text-[#2A9D8F] shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#14213D]">
              {language === 'zu' ? 'Ithiphu Lomzali: Imiklomelo Yangempela' : 'Parent Tip: Tactile Real-World Praise'}
            </h4>
            <p className="text-xs text-[#6B7280]">
              {language === 'zu'
                ? 'Lapho umntwana ethola isitikha sedijithali, mshayele ihlombe noma ubeke isitikha sangempela esiqandisini ekhaya!'
                : 'When a digital sticker is unlocked, celebrate with a high-five or place a physical gold star sticker on your fridge chart.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const firstUnlocked = badges.find(b => b.unlocked) || badges[0];
            handlePrintCertificate(firstUnlocked);
          }}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#F3EFEA] text-[#14213D] border border-[#D9D0C3] px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition shrink-0"
        >
          <Printer className="w-4 h-4 text-[#2A9D8F]" />
          <span>Print Certificate of Achievement</span>
        </button>
      </div>

      {/* Interactive Sticker Detail Modal */}
      {activeModalBadge && (
        <BadgeDetailModal
          badge={activeModalBadge}
          child={child}
          language={language}
          onClose={() => setActiveModalBadge(null)}
          onManualUnlock={() => handleManualUnlock(activeModalBadge.id)}
          onPrint={() => handlePrintCertificate(activeModalBadge)}
        />
      )}

      {/* Printable Certificate View (Shown when printing) */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-white p-8 flex flex-col items-center justify-center print:block hidden">
          <div className="border-8 border-double border-[#B45309] p-8 max-w-2xl w-full text-center rounded-2xl bg-[#FFFDF9]">
            <div className="text-4xl mb-3">🌱 🇿🇦 🏆</div>
            <h1 className="font-editorial text-3xl font-black text-[#14213D] tracking-wide uppercase">
              Certificate of Achievement
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-[#B45309] mt-1 mb-6">
              Imbewu Early Childhood Development Milestone Award
            </p>

            <p className="text-sm text-[#4B5563]">This certificate proudly acknowledges that</p>
            <div className="font-editorial text-4xl font-black text-[#14213D] my-3 border-b-2 border-[#EADFCF] pb-2 inline-block px-8">
              {child.nickname}
            </div>
            <p className="text-sm text-[#4B5563]">has earned the official milestone sticker:</p>

            <div className="my-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] max-w-md mx-auto">
              <span className="text-5xl block mb-2">{showCertificateModal.stickerEmoji}</span>
              <h2 className="text-xl font-bold text-[#14213D]">{showCertificateModal.title}</h2>
              <p className="text-xs text-[#2A9D8F] font-semibold">{showCertificateModal.titleZu}</p>
              <p className="text-xs text-[#6B7280] mt-2 italic">"{showCertificateModal.praiseQuote}"</p>
            </div>

            <div className="flex justify-between items-end mt-12 pt-6 border-t border-[#EADFCF] text-xs text-[#4B5563]">
              <div className="text-left">
                <div className="border-b border-[#14213D] w-40 mb-1"></div>
                <span>Parent / Guardian Signature</span>
              </div>
              <div>
                <span className="font-bold">Date: </span>
                {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-right">
                <div className="border-b border-[#14213D] w-40 mb-1"></div>
                <span>Educator / Imbewu Learning</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component: Sticker Detail Inspection & Celebration Modal
interface BadgeDetailModalProps {
  badge: MilestoneBadge;
  child: ChildProfile;
  language: LanguageCode;
  onClose: () => void;
  onManualUnlock: () => void;
  onPrint: () => void;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  child,
  language,
  onClose,
  onManualUnlock,
  onPrint
}) => {
  const isUnlocked = badge.unlocked;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADFCF] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#9CA3AF] hover:text-[#14213D] hover:bg-[#FAF7F2] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {/* Status Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#FAF7F2] text-[#14213D] border border-[#EADFCF]">
            {isUnlocked ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[#047857]">★ Unlocked Sticker</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span className="text-[#6B7280]">Locked Milestone</span>
              </>
            )}
          </div>

          {/* Big Visual Sticker with Realistic Glow */}
          <div className="relative inline-block my-2">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex items-center justify-center text-6xl sm:text-7xl shadow-xl transition transform hover:rotate-3 ${
              isUnlocked
                ? 'bg-gradient-to-tr from-[#FFFBEB] via-white to-[#FEF3C7] border-4 border-[#F59E0B] ring-8 ring-[#F59E0B]/10'
                : 'bg-[#F3EFEA] border-4 border-[#D9D0C3] opacity-50 filter grayscale'
            }`}>
              <span className="select-none">{badge.stickerEmoji}</span>
            </div>

            {isUnlocked && (
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span className="bg-[#10B981] text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                  Halala! Earned
                </span>
              </div>
            )}
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mt-4">
            {badge.title}
          </h3>
          <p className="text-sm font-semibold text-[#2A9D8F] mb-3">
            {badge.titleZu}
          </p>

          <p className="text-xs sm:text-sm text-[#4B5563] max-w-sm mx-auto leading-relaxed mb-4">
            {badge.description}
          </p>

          {/* Bilingual South African Praise Quote */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADFCF] my-4 text-left">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] mb-1 flex items-center gap-1.5">
              <Star className="w-3 h-3" />
              <span>{language === 'zu' ? 'Amazwi Okubonga' : 'South African Encouragement'}</span>
            </div>
            <p className="text-xs sm:text-sm font-editorial italic text-[#14213D]">
              "{badge.praiseQuote}"
            </p>
            <p className="text-xs text-[#6B7280] italic mt-1">
              "{badge.praiseQuoteZu}"
            </p>
          </div>

          {/* Criteria details */}
          <div className="text-xs text-[#6B7280] mb-6">
            <span className="font-bold text-[#14213D]">Requirement: </span>
            {badge.criteria}
            <div className="mt-1 font-semibold text-[#2A9D8F]">
              Progress: {badge.currentCount} / {badge.requiredCount}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {isUnlocked ? (
              <button
                onClick={onPrint}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2A9D8F] hover:bg-[#238276] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Award Certificate</span>
              </button>
            ) : (
              <button
                onClick={onManualUnlock}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#D0694E] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition"
                title="Mark milestone achieved for offline home practice"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Award Sticker Now</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs text-[#6B7280] hover:text-[#14213D] hover:bg-[#FAF7F2] transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
