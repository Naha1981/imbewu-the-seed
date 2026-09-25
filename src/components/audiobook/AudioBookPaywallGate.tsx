import React from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Headphones, 
  Moon, 
  Volume2, 
  Heart, 
  School, 
  CreditCard,
  MessageCircle,
  Download,
  Lock
} from 'lucide-react';
import type { PlanTier } from '../../types';

interface AudioBookPaywallGateProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  speakerName: string;
  onUpgradeSimulate: (planTier: PlanTier) => void;
}

export const AudioBookPaywallGate: React.FC<AudioBookPaywallGateProps> = ({
  isOpen,
  onClose,
  childName,
  speakerName,
  onUpgradeSimulate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#14213D] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 overflow-hidden">
        
        {/* Ambient Golden Glow in background */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-[#E07A5F]/20 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 30-Second Golden Hook Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider w-fit mb-3">
          <Moon className="w-3.5 h-3.5" />
          <span>30-Second Golden Teaser Completed</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
          You Just Heard {childName}’s Story in {speakerName}’s Voice!
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
          The first 30 seconds are just the beginning. Unlock the complete 3-chapter bedtime adventure, unlimited audiobooks, and direct WhatsApp night-shift audio sharing.
        </p>

        {/* Two Tier Options: Parent Pro & Creche Pro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* Option 1: Parent Pro */}
          <div className="p-5 rounded-2xl bg-white/5 border border-amber-400/40 hover:border-amber-400 transition-all flex flex-col justify-between relative group">
            <div className="absolute top-3 right-3 bg-amber-500/30 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              POPULAR
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#E07A5F]" />
                <h4 className="font-bold text-sm text-white">Parent Pro</h4>
              </div>
              <p className="text-xl font-bold text-amber-400 mb-2">R49 <span className="text-xs text-gray-400">/ month</span></p>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Unlimited personalized audiobooks</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>2 cloned voices (Mom & Dad)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Send story audio to Gogo via WhatsApp</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onUpgradeSimulate('FAMILY');
                onClose();
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#14213D] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Unlock Parent Pro (R49)</span>
            </button>
          </div>

          {/* Option 2: Creche Pro */}
          <div className="p-5 rounded-2xl bg-white/5 border border-[#2A9D8F]/40 hover:border-[#2A9D8F] transition-all flex flex-col justify-between relative">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <School className="w-4 h-4 text-[#2A9D8F]" />
                <h4 className="font-bold text-sm text-white">Creche Pro</h4>
              </div>
              <p className="text-xl font-bold text-[#2A9D8F] mb-2">R199 <span className="text-xs text-gray-400">/ month</span></p>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>All classroom learners included</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Teacher voice for group rest-time</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Export high-quality offline MP3s</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onUpgradeSimulate('ECD');
                onClose();
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Unlock Creche Pro (R199)</span>
            </button>
          </div>

        </div>

        {/* Night-Shift & Caregiver Value Note */}
        <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3 text-xs text-gray-300">
          <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
          <p>
            Working night shifts or late at the hospital/factory? Send your bedtime voice clone directly to your child’s Gogo or caregiver on WhatsApp before sleep.
          </p>
        </div>

      </div>
    </div>
  );
};
