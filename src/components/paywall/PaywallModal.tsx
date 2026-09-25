import React from 'react';
import { X, Check, Sparkles, Shield, Lock, CreditCard } from 'lucide-react';
import type { PlanTier } from '../../types';
import { EntitlementService } from '../../services/entitlementEngine';
import { buildPayFastCheckoutUrl } from '../../services/payfast';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: 'pdf_download' | 'weekly_pack' | 'multi_child' | 'classroom_pack' | 'story_library' | 'screen_free_printables';
  userEmail?: string;
  userName?: string;
  onSimulateUpgrade?: (plan: PlanTier) => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  feature,
  userEmail = 'parent@imbewu.co.za',
  userName = 'Parent User',
  onSimulateUpgrade
}) => {
  if (!isOpen) return null;

  const offer = EntitlementService.getUpgradeOffer(feature);
  const checkoutData = buildPayFastCheckoutUrl({
    plan: offer.recommendedPlan,
    userEmail,
    userName,
    userId: 'usr_demo_1',
    returnUrl: window.location.href,
    cancelUrl: window.location.href
  });

  const handlePayFastProceed = () => {
    // In demo / preview mode, we provide both a direct simulated activation and a real PayFast form trigger
    if (onSimulateUpgrade) {
      onSimulateUpgrade(offer.recommendedPlan);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADFCF]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B7280] hover:text-[#14213D] hover:bg-[#F4EDE2] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Value Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-bold uppercase tracking-wider w-fit mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>{offer.taglineBadge || 'Imbewu Membership Feature'}</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mb-2 leading-snug">
          {offer.title}
        </h3>

        <p className="text-sm text-[#4B5563] mb-6">
          {offer.subtitle}
        </p>

        {/* Value Highlights Box */}
        <div className="bg-white rounded-2xl p-5 border border-[#EADFCF] shadow-xs mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F] block mb-3">
            What you unlock right now:
          </span>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#14213D]">
            {offer.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Summary */}
        <div className="flex items-center justify-between p-4 bg-[#F4EDE2] rounded-2xl border border-[#EADFCF] mb-6">
          <div>
            <p className="text-xs text-[#6B7280] font-medium">BanaPele Tier</p>
            <p className="font-editorial text-lg font-bold text-[#14213D]">
              {offer.recommendedPlan === 'PARENT_PRO' ? '2. Parent Pro' : offer.recommendedPlan === 'CRECHE_CHAMPION' ? '4. Creche Champion' : 'Parent Pro'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-[#E07A5F]">{offer.priceFormatted}</p>
            <p className="text-[10px] text-[#2A9D8F] font-bold">or R12 / week micro-billing</p>
          </div>
        </div>

        {/* Local Payment Options Note */}
        <div className="p-3 bg-white rounded-xl border border-[#EADFCF] text-[11px] text-[#4B5563] mb-5 flex items-center justify-between">
          <span>🇿🇦 Pay with: <strong>Capitec Pay</strong>, <strong>Flash / 1Voucher PIN</strong>, or <strong>MTN / Vodacom airtime</strong>.</span>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handlePayFastProceed}
            className="w-full py-4 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Unlock Now ({offer.priceFormatted})</span>
          </button>

          <p className="text-[11px] text-center text-[#6B7280]">
            🔒 Encrypted South African payments via Capitec Pay, PayFast & Flash Spaza Vouchers.
          </p>
        </div>

      </div>
    </div>
  );
};
