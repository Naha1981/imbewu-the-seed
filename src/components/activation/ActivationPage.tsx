import React, { useState, useEffect } from 'react';
import { Sparkles, Check, School, Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/images/imbewu_brand_logo_1789894767533.jpg';

interface ActivationPageProps {
  token: string;
  onActivationSuccess: (centreName: string) => void;
  onCancel: () => void;
}

export const ActivationPage: React.FC<ActivationPageProps> = ({
  token,
  onActivationSuccess,
  onCancel
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Centre details from token
  const [centreData, setCentreData] = useState<{
    centreName: string;
    area: string;
    suggestedManagerName?: string;
    suggestedEmail?: string;
  } | null>(null);

  // Form states
  const [managerName, setManagerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState('zu');
  const [firstClassName, setFirstClassName] = useState('Little Stars (Ages 4-5)');
  const [learnerCount, setLearnerCount] = useState(15);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch activation invitation details from server
    fetch(`/api/ecd/activate/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setCentreData({
            centreName: data.centreName,
            area: data.area,
            suggestedManagerName: data.suggestedManagerName,
            suggestedEmail: data.suggestedEmail
          });
          if (data.suggestedManagerName) setManagerName(data.suggestedManagerName);
          if (data.suggestedEmail) setEmail(data.suggestedEmail);
        }
      })
      .catch(err => {
        setError('Could not verify activation token: ' + err.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/ecd/activate/${token}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          managerEmail: email,
          managerName,
          className: firstClassName,
          learnerCount,
          preferredLanguage: preferredLang
        })
      });
      const result = await res.json();
      if (result.success) {
        setStep(5);
      } else {
        setError(result.error || 'Failed to activate workspace');
      }
    } catch (err: any) {
      setError(err.message || 'Activation failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <img src={logoImg} alt="Imbewu" className="w-12 h-12 rounded-2xl mx-auto animate-pulse" />
          <p className="text-xs font-bold text-[#14213D]">Verifying Imbewu Workspace Invitation…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EADFCF] text-center space-y-4 shadow-sm">
          <span className="text-3xl">⚠️</span>
          <h2 className="font-editorial text-2xl font-bold text-[#14213D]">Invitation Notice</h2>
          <p className="text-xs text-[#6B7280]">{error}</p>
          <button
            onClick={onCancel}
            className="w-full py-3 rounded-full bg-[#14213D] text-white text-xs font-bold"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#EADFCF] shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-[#FAF7F2]">
          <img src={logoImg} alt="Imbewu" className="w-12 h-12 rounded-2xl object-cover" />
          <div>
            <h1 className="font-editorial text-2xl font-bold text-[#14213D]">Welcome to Imbewu 🌱</h1>
            <p className="text-xs text-[#6B7280]">
              Workspace prepared for <strong className="text-[#14213D]">{centreData?.centreName}</strong>
            </p>
          </div>
        </div>

        {/* STEP 1: CONFIRM CENTRE DETAILS */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Centre Name:</span>
                <span className="font-bold text-[#14213D]">{centreData?.centreName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Location:</span>
                <span className="font-bold text-[#14213D]">{centreData?.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Security Token:</span>
                <span className="font-mono text-[#2A9D8F]">{token.slice(0, 14)}…</span>
              </div>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed">
              NahaLabs has verified your preschool facility. Claim this workspace to immediately access lesson planning, printable classroom worksheets, and bilingual curriculum in English & isiZulu.
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
            >
              <span>Confirm & Set Up Manager Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: MANAGER ACCOUNT & CREDENTIALS */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#14213D]">
              Create Principal / Manager Login
            </h3>
            <p className="text-xs text-[#6B7280]">
              Secured with Firebase Authentication. You will use these credentials to access your ECD dashboard.
            </p>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={managerName}
                onChange={e => setManagerName(e.target.value)}
                placeholder="e.g. Nomvula Sithole"
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">Official Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="manager@creche.co.za"
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">Choose Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D]"
              />
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!managerName || !email || password.length < 6}
              className="w-full py-3.5 rounded-full bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
            >
              Continue to Classroom Setup →
            </button>
          </div>
        )}

        {/* STEP 3 & 4: CLASSROOM & SUBMIT */}
        {step === 3 && (
          <form onSubmit={handleClaim} className="space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#14213D]">
              Setup Your First Classroom
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">First Class Name</label>
              <input
                type="text"
                required
                value={firstClassName}
                onChange={e => setFirstClassName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1">Estimated Learners</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={learnerCount}
                  onChange={e => setLearnerCount(Number(e.target.value))}
                  className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1">Language Priority</label>
                <select
                  value={preferredLang}
                  onChange={e => setPreferredLang(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3.5 py-2.5 text-xs text-[#14213D]"
                >
                  <option value="zu">isiZulu + English</option>
                  <option value="en">English + isiZulu</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white font-bold text-xs shadow-sm transition-all"
            >
              {submitting ? 'Claiming Workspace…' : 'Activate Workspace Now 🌱'}
            </button>
          </form>
        )}

        {/* STEP 5: READY */}
        {step === 5 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2A9D8F]/20 text-[#2A9D8F] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="font-editorial text-3xl font-bold text-[#14213D]">
              Your Imbewu Centre is Ready! 🌱
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mx-auto">
              <strong>{centreData?.centreName}</strong> is now configured. Your initial classroom is ready to receive structured lesson packs.
            </p>
            <button
              onClick={() => onActivationSuccess(centreData?.centreName || 'Your Centre')}
              className="w-full py-4 rounded-full bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs shadow-sm transition-all"
            >
              Build My First Week →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
