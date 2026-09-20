import React, { useState } from 'react';
import { Share2, MessageCircle, Mail, Copy, Check, X, Printer, Sparkles, Award, Flame, Calendar, BookOpen } from 'lucide-react';
import type { ChildProfile, LanguageCode, SkillProgress } from '../../types';
import { OfflineStorageService, SEED_WEEKLY_PACKS } from '../../services/offlineStorage';
import { CURRICULUM_SKILLS } from '../../services/learningGraph';

interface ShareProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: ChildProfile;
  language: LanguageCode;
  skillsProgress: SkillProgress[];
}

export const ShareProgressModal: React.FC<ShareProgressModalProps> = ({
  isOpen,
  onClose,
  child,
  language,
  skillsProgress,
}) => {
  const [copied, setCopied] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [teacherName, setTeacherName] = useState('');

  if (!isOpen) return null;

  // Retrieve current active progress & streak
  const activePack = SEED_WEEKLY_PACKS[0];
  const weeklyProgress = OfflineStorageService.getWeeklyProgress(child.id, activePack.id);
  const streak = OfflineStorageService.getDailyStreak(child.id);
  const badges = OfflineStorageService.getBadges(child.id);
  const unlockedBadges = badges.filter(b => b.unlocked);

  // Filter skills
  const confidentSkills = skillsProgress
    .filter(s => s.status === 'CONFIDENT')
    .map(s => {
      const def = CURRICULUM_SKILLS.find(c => c.id === s.skillId);
      return def ? `${def.nameEn} (${def.nameZu})` : s.skillId;
    });

  const developingSkills = skillsProgress
    .filter(s => s.status === 'DEVELOPING' || s.status === 'PRACTISING')
    .map(s => {
      const def = CURRICULUM_SKILLS.find(c => c.id === s.skillId);
      return def ? `${def.nameEn} (${def.nameZu})` : s.skillId;
    });

  // Compose formatted text for WhatsApp & Email
  const greeting = teacherName.trim()
    ? `Dear Teacher ${teacherName.trim()},`
    : `Dear Teacher / ECD Educator,`;

  const reportPlainText = `${greeting}

🌱 *IMBEWU LEARNING PROGRESS UPDATE*
*Learner:* ${child.nickname} (Age: ${child.age})
*Date:* ${new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}

📚 *Current Weekly Theme:*
${activePack.title} — ${activePack.theme}
• *Completion Rate:* ${weeklyProgress.completionPercentage}% (${weeklyProgress.completedDaysCount} of 5 daily sessions completed)
• *Daily Learning Streak:* 🔥 ${streak.currentStreak} consecutive days active!
• *Total Practice Sessions:* ${streak.totalPracticeDays} completed
• *Milestone Badges Earned:* 🏆 ${unlockedBadges.length} of ${badges.length} collected (${unlockedBadges.map(b => `${b.stickerEmoji} ${b.title}`).join(', ')})

🌟 *Skills Mastered & Confident:*
${confidentSkills.length > 0 ? confidentSkills.map(s => `• ✅ ${s}`).join('\n') : '• Foundational letter shapes & early listening'}

🌱 *Currently Practising & Growing:*
${developingSkills.length > 0 ? developingSkills.map(s => `• 🔄 ${s}`).join('\n') : '• Uppercase and lowercase letter pairing'}

${customNote.trim() ? `💬 *Parent Note:*\n"${customNote.trim()}"\n\n` : ''}Shared from Imbewu (The Seed) — Nourishing early childhood development in South African homes & classrooms.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportPlainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(reportPlainText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Imbewu Progress Report: ${child.nickname} (${new Date().toLocaleDateString('en-ZA')})`);
    const body = encodeURIComponent(reportPlainText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EADFCF] my-8 text-[#14213D]">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#EADFCF]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2A9D8F]/15 flex items-center justify-center text-[#2A9D8F]">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#2A9D8F] bg-[#2A9D8F]/10 px-2.5 py-0.5 rounded-full">
                {language === 'zu' ? 'Yabelana Ngombiko' : 'Teacher Progress Report'}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#14213D] mt-1">
                Share {child.nickname}'s Learning Journey
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optional Customization Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">
              Teacher's Name (Optional)
            </label>
            <input
              type="text"
              value={teacherName}
              onChange={e => setTeacherName(e.target.value)}
              placeholder="e.g. Mrs. Khumalo or Teacher Sarah"
              className="w-full text-xs rounded-xl border border-[#EADFCF] bg-[#FAF7F2] px-3.5 py-2 text-[#14213D] focus:outline-hidden focus:border-[#2A9D8F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">
              Add a Parent Note
            </label>
            <input
              type="text"
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              placeholder="e.g. Sipho loved the /b/ sound and ball game!"
              className="w-full text-xs rounded-xl border border-[#EADFCF] bg-[#FAF7F2] px-3.5 py-2 text-[#14213D] focus:outline-hidden focus:border-[#2A9D8F]"
            />
          </div>
        </div>

        {/* Report Preview Card */}
        <div className="rounded-2xl border border-[#EADFCF] bg-[#FAF7F2] p-5 space-y-4 max-h-[320px] overflow-y-auto text-xs text-[#4B5563]">
          <div className="flex items-center justify-between pb-3 border-b border-[#EADFCF]">
            <div>
              <p className="font-editorial text-base font-bold text-[#14213D]">
                🌱 Imbewu ECD Progress Summary
              </p>
              <p className="text-[11px] text-[#6B7280]">
                Learner: <strong className="text-[#14213D]">{child.nickname}</strong> · Age {child.age}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 font-bold text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>{streak.currentStreak} Day Streak</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl border border-[#EADFCF]/80">
              <span className="text-[10px] text-[#6B7280] uppercase font-bold">Current Theme</span>
              <p className="font-bold text-[#14213D] text-xs mt-0.5">{activePack.theme}</p>
              <p className="text-[11px] text-[#2A9D8F] font-semibold mt-1">
                {weeklyProgress.completionPercentage}% weekly completion
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#EADFCF]/80">
              <span className="text-[10px] text-[#6B7280] uppercase font-bold">Practice Consistency</span>
              <p className="font-bold text-[#14213D] text-xs mt-0.5">
                {weeklyProgress.completedDaysCount} of 5 days completed
              </p>
              <p className="text-[11px] text-[#6B7280] mt-1">
                {streak.totalPracticeDays} lifetime sessions
              </p>
            </div>
          </div>

          {/* Earned Milestone Badges */}
          {unlockedBadges.length > 0 && (
            <div className="bg-white p-3.5 rounded-xl border border-[#EADFCF]/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-[#6B7280] uppercase font-bold flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#E07A5F]" />
                  <span>Milestone Stickers & Badges Earned ({unlockedBadges.length}/{badges.length})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {unlockedBadges.map(b => (
                  <span
                    key={b.id}
                    className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#FAF7F2] border border-[#EADFCF] text-[#14213D] px-2 py-0.5 rounded-md"
                  >
                    <span>{b.stickerEmoji}</span>
                    <span>{b.title}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <span className="text-[11px] font-bold text-[#14213D] uppercase tracking-wide">
              Mastered & Confident Skills:
            </span>
            <ul className="mt-1 space-y-1">
              {confidentSkills.map((s, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-xs text-green-800">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#14213D] uppercase tracking-wide">
              Currently Developing:
            </span>
            <ul className="mt-1 space-y-1">
              {developingSkills.map((s, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-xs text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {customNote.trim() && (
            <div className="bg-white p-3 rounded-xl border border-dashed border-[#E07A5F]/40 text-[#14213D]">
              <span className="text-[10px] font-bold uppercase text-[#E07A5F]">Note from Parent</span>
              <p className="text-xs italic mt-0.5">"{customNote.trim()}"</p>
            </div>
          )}
        </div>

        {/* Action Sharing Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#EADFCF]">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share via WhatsApp</span>
            </button>

            <button
              onClick={handleEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#14213D] hover:bg-[#1E2D4A] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-sm transition"
            >
              <Mail className="w-4 h-4" />
              <span>Email Teacher</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 border border-[#EADFCF] bg-[#FAF7F2] hover:bg-[#F4EDE2] px-4 py-2 rounded-full text-xs font-semibold text-[#14213D] transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 border border-[#EADFCF] bg-[#FAF7F2] hover:bg-[#F4EDE2] px-4 py-2 rounded-full text-xs font-semibold text-[#14213D] transition"
            >
              <Printer className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Print</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
