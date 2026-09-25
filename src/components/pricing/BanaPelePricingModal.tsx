import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Receipt, 
  Store, 
  Heart, 
  School, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import type { PlanTier, LocalizedPaymentMethod } from '../../types';
import { BANAPELE_PRICING_TIERS, PLAN_CONFIGS } from '../../services/entitlementEngine';

interface BanaPelePricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: PlanTier;
  onSelectPlan: (plan: PlanTier) => void;
  defaultTier?: PlanTier;
}

export const BanaPelePricingModal: React.FC<BanaPelePricingModalProps> = ({
  isOpen,
  onClose,
  currentPlan = 'FREE',
  onSelectPlan,
  defaultTier = 'PARENT_PRO'
}) => {
  const [selectedTier, setSelectedTier] = useState<PlanTier>(defaultTier);
  const [paymentRail, setPaymentRail] = useState<LocalizedPaymentMethod>('capitec_pay');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'weekly' | 'annual'>('monthly');

  // Form states for local payment rails
  const [voucherPin, setVoucherPin] = useState('');
  const [voucherProvider, setVoucherProvider] = useState<'1voucher' | 'flash' | 'kazang' | 'ott'>('flash');
  const [carrierPhone, setCarrierPhone] = useState('');
  const [carrierProvider, setCarrierProvider] = useState<'vodacom' | 'mtn' | 'telkom'>('vodacom');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentTierData = BANAPELE_PRICING_TIERS.find(t => t.id === selectedTier) || BANAPELE_PRICING_TIERS[1];

  const handleSimulatePayment = (tierToPay: PlanTier) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccessMessage(`Payment approved! You are now subscribed to ${currentTierData.name}.`);
      setTimeout(() => {
        onSelectPlan(tierToPay);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADFCF] my-8 max-h-[92vh] flex flex-col text-[#14213D]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B7280] hover:text-[#14213D] hover:bg-[#F4EDE2] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-4 border-b border-[#EADFCF]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Soweto & Township Fair Pricing</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D]">
            BanaPele AI Economic Pricing
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1 max-w-2xl">
            Priced for working-class families and community ECD centres. Cheaper than streaming entertainment, with zero-guilt micro-billing and spaza voucher options.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
          
          {/* Official 4-Tier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
            {BANAPELE_PRICING_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              const isCurrent = currentPlan === tier.id;

              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-[#E07A5F] bg-white shadow-md'
                      : 'border-[#EADFCF] bg-white/70 hover:bg-white'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-4 bg-[#E07A5F] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#14213D] mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-[11px] text-[#6B7280] mb-3 leading-snug">
                      {tier.targetAudience}
                    </p>

                    <div className="mb-3">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#14213D]">
                        R{tier.priceZAR}
                      </span>
                      <span className="text-xs text-[#6B7280] ml-1">
                        / {tier.billingPeriod}
                      </span>

                      {tier.weeklyMicroBillingZAR && (
                        <p className="text-[11px] font-bold text-[#2A9D8F] mt-0.5">
                          or R{tier.weeklyMicroBillingZAR} / week
                        </p>
                      )}
                    </div>

                    <ul className="space-y-1.5 text-xs text-[#4B5563] mb-4">
                      {tier.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier.id);
                      if (tier.id === 'FREE') {
                        onSelectPlan('FREE');
                        onClose();
                      }
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#14213D] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#4B5563] border border-[#EADFCF]'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : isSelected ? 'Selected ✓' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Payment Method Selector (Only for Paid Tiers) */}
          {selectedTier !== 'FREE' && (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADFCF] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-editorial text-lg font-bold text-[#14213D]">
                    Select Local Township Payment Rail
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    No credit card needed. Instant authorization via Capitec, Spaza cash vouchers, or airtime.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500">Total Due Today:</span>
                  <p className="text-xl font-extrabold text-[#E07A5F]">
                    R{billingCycle === 'weekly' && currentTierData.weeklyMicroBillingZAR 
                      ? currentTierData.weeklyMicroBillingZAR 
                      : currentTierData.priceZAR}
                    <span className="text-xs font-normal text-[#6B7280]">
                      {' '}({billingCycle === 'weekly' ? 'per week' : 'per month'})
                    </span>
                  </p>
                </div>
              </div>

              {/* Payment Rail Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* Rail 1: Capitec Pay & Instant EFT */}
                <button
                  type="button"
                  onClick={() => setPaymentRail('capitec_pay')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    paymentRail === 'capitec_pay'
                      ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 shadow-xs'
                      : 'border-[#EADFCF] bg-[#FAF7F2] hover:bg-[#F4EDE2]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#2A9D8F] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs text-[#14213D]">Capitec Pay & EFT</p>
                    <p className="text-[10px] text-[#6B7280]">Authorize directly in banking app (Ozow / Yoco)</p>
                  </div>
                </button>

                {/* Rail 2: Spaza Retail Cash Vouchers */}
                <button
                  type="button"
                  onClick={() => setPaymentRail('cash_voucher')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    paymentRail === 'cash_voucher'
                      ? 'border-[#E07A5F] bg-[#E07A5F]/10 shadow-xs'
                      : 'border-[#EADFCF] bg-[#FAF7F2] hover:bg-[#F4EDE2]'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#E07A5F] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs text-[#14213D]">Spaza Cash Voucher</p>
                    <p className="text-[10px] text-[#6B7280]">Flash, Kazang, 1Voucher, OTT from spaza shop</p>
                  </div>
                </button>

                {/* Rail 3: Airtime Micro-Billing */}
                <button
                  type="button"
                  onClick={() => setPaymentRail('airtime_carrier')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    paymentRail === 'airtime_carrier'
                      ? 'border-purple-600 bg-purple-50 shadow-xs'
                      : 'border-[#EADFCF] bg-[#FAF7F2] hover:bg-[#F4EDE2]'
                  }`}
                >
                  <Receipt className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs text-[#14213D]">Airtime Carrier Billing</p>
                    <p className="text-[10px] text-[#6B7280]">Deduct R12/week from Vodacom / MTN airtime</p>
                  </div>
                </button>

              </div>

              {/* Sub-form based on selected payment rail */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADFCF] space-y-3">
                
                {paymentRail === 'capitec_pay' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#14213D]">Capitec Pay Cellphone Number:</span>
                      <span className="text-[10px] text-gray-500">60%+ of Soweto households</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="e.g. 082 123 4567"
                      className="w-full bg-white border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-bold text-[#14213D]"
                    />
                    <p className="text-[11px] text-[#6B7280]">
                      You will receive an instant approval notification on your Capitec / banking app. No card numbers needed.
                    </p>
                  </div>
                )}

                {paymentRail === 'cash_voucher' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#14213D] mb-1">Select Spaza Voucher Provider:</label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['flash', '1voucher', 'kazang', 'ott'] as const).map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setVoucherProvider(p)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-bold uppercase transition-all ${
                              voucherProvider === p 
                                ? 'bg-[#14213D] text-white' 
                                : 'bg-white text-gray-700 border border-[#EADFCF]'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#14213D] mb-1">Enter 16-Digit Voucher PIN:</label>
                      <input
                        type="text"
                        value={voucherPin}
                        onChange={(e) => setVoucherPin(e.target.value)}
                        placeholder="XXXX - XXXX - XXXX - XXXX"
                        className="w-full bg-white border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-mono font-bold tracking-widest text-[#14213D]"
                      />
                      <p className="text-[10px] text-[#6B7280] mt-1">
                        Buy a BanaPele AI voucher at your local spaza shop, Shoprite, Pep, or Flash kiosk.
                      </p>
                    </div>
                  </div>
                )}

                {paymentRail === 'airtime_carrier' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#14213D] mb-1">Cellular Network:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['vodacom', 'mtn', 'telkom'] as const).map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCarrierProvider(c)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-bold uppercase transition-all ${
                              carrierProvider === c 
                                ? 'bg-purple-700 text-white' 
                                : 'bg-white text-gray-700 border border-[#EADFCF]'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#14213D] mb-1">Airtime Phone Number (R12 / week):</label>
                      <input
                        type="tel"
                        value={carrierPhone}
                        onChange={(e) => setCarrierPhone(e.target.value)}
                        placeholder="e.g. 072 987 6543"
                        className="w-full bg-white border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-bold text-[#14213D]"
                      />
                      <p className="text-[10px] text-[#6B7280] mt-1">
                        R12 will be deducted from your prepaid airtime balance every 7 days. Cancel anytime via SMS.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {paymentSuccessMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">{paymentSuccessMessage}</span>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#EADFCF] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#6B7280]">
            🔒 Protected by South African National Payment System (PASA) & POPIA compliant.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#EADFCF] text-[#14213D] text-xs font-bold transition-all"
            >
              Cancel
            </button>

            <button
              onClick={() => handleSimulatePayment(selectedTier)}
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'Authorizing Payment...'
                  : selectedTier === 'FREE'
                  ? 'Continue with Free Tier'
                  : `Pay R${currentTierData.priceZAR} & Activate ${currentTierData.name.split(' ')[1]}`}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
