import React from 'react';
import { Sparkles, Award, ArrowRight, X, Heart, Star } from 'lucide-react';
import type { MilestoneBadge, LanguageCode, ChildProfile } from '../../types';

interface BadgeCelebrationModalProps {
  isOpen: boolean;
  badge: MilestoneBadge | null;
  child: ChildProfile;
  language: LanguageCode;
  onClose: () => void;
  onViewAlbum: () => void;
}

export const BadgeCelebrationModal: React.FC<BadgeCelebrationModalProps> = ({
  isOpen,
  badge,
  child,
  language,
  onClose,
  onViewAlbum
}) => {
  if (!isOpen || !badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-[#F59E0B] shadow-2xl relative text-center overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Decorative corner sparkles */}
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <Sparkles className="w-24 h-24 text-[#F59E0B]" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#9CA3AF] hover:text-[#14213D] hover:bg-[#FAF7F2] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration header tag */}
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F59E0B]/20 to-[#E07A5F]/20 text-[#B45309] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{language === 'zu' ? 'Isitikha Esinqobile!' : 'New Sticker Earned!'}</span>
        </div>

        {/* Animated Big Sticker Emblem */}
        <div className="relative inline-block my-2">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex items-center justify-center text-6xl sm:text-7xl bg-gradient-to-tr from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border-4 border-[#F59E0B] shadow-xl ring-8 ring-[#F59E0B]/20 animate-bounce">
            <span className="select-none filter drop-shadow-md">{badge.stickerEmoji}</span>
          </div>

          <div className="absolute -bottom-2 inset-x-0 flex justify-center">
            <span className="bg-[#10B981] text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
              Halala! {badge.rarity}
            </span>
          </div>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mt-4 mb-1">
          {badge.title}
        </h3>
        <p className="text-sm font-semibold text-[#2A9D8F] mb-3">
          {badge.titleZu}
        </p>

        {/* South African Encouragement Quote */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADFCF] my-4 text-left">
          <p className="text-xs sm:text-sm font-editorial italic text-[#14213D]">
            "{badge.praiseQuote}"
          </p>
          <p className="text-xs text-[#6B7280] italic mt-1">
            "{badge.praiseQuoteZu}"
          </p>
        </div>

        <p className="text-xs text-[#6B7280] mb-6">
          {child.nickname} completed: <span className="font-bold text-[#14213D]">{badge.criteria}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              onClose();
              onViewAlbum();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2A9D8F] hover:bg-[#238276] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition"
          >
            <Award className="w-4 h-4" />
            <span>{language === 'zu' ? 'Buka Isikhwama Sezitikha' : 'Collect in Sticker Album'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs text-[#6B7280] hover:text-[#14213D] hover:bg-[#FAF7F2] transition"
          >
            {language === 'zu' ? 'Qhubeka Nokufunda' : 'Continue Learning'}
          </button>
        </div>
      </div>
    </div>
  );
};
