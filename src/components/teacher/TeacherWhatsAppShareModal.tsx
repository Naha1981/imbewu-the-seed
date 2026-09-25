import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Users, 
  User, 
  Sparkles, 
  Palette, 
  PenTool, 
  Scissors, 
  FileText,
  Send
} from 'lucide-react';
import type { Classroom, Learner, LanguageCode } from '../../types';
import { WhatsAppSharingService, PrintableKitType } from '../../services/whatsappSharingService';

interface TeacherWhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: Classroom[];
  learners: Learner[];
  teacherName?: string;
  centreName?: string;
  theme?: string;
  ageGroup?: string;
}

export const TeacherWhatsAppShareModal: React.FC<TeacherWhatsAppShareModalProps> = ({
  isOpen,
  onClose,
  classes,
  learners,
  teacherName = 'Teacher Thandi',
  centreName = 'Little Seeds ECD Centre',
  theme = 'South African Transport & Community',
  ageGroup = '4-5 Years'
}) => {
  const [shareMode, setShareMode] = useState<'individual' | 'class_broadcast'>('individual');
  const [selectedLearnerId, setSelectedLearnerId] = useState<string>(learners[0]?.id || '');
  const [customLearnerName, setCustomLearnerName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [selectedKitType, setSelectedKitType] = useState<PrintableKitType>('complete_weekly_pack');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [teacherPersonalNote, setTeacherPersonalNote] = useState('Please spend 10-15 minutes doing this together. No screens needed!');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Active Learner Name
  const activeLearner = learners.find(l => l.id === selectedLearnerId);
  const learnerName = customLearnerName.trim() || activeLearner?.nickname || 'Learner';
  const activeClass = classes.find(c => c.id === selectedClassId) || classes[0];

  const formattedMessage = shareMode === 'individual' 
    ? WhatsAppSharingService.formatParentActivityKitMessage({
        teacherName,
        centreName,
        childName: learnerName,
        parentPhone: parentPhoneNumber,
        kitType: selectedKitType,
        kitTitle: selectedKitType === 'coloring_sheet' ? 'Township Coloring Sheet' : selectedKitType === 'tracing_mat' ? 'Pre-Writing Tracing Mat' : selectedKitType === 'shape_puzzle' ? 'Cut-Out Shape Puzzle' : 'Complete 3-in-1 Screen-Free Activity Kit',
        theme,
        ageGroup,
        teacherNote: teacherPersonalNote
      })
    : WhatsAppSharingService.formatClassBroadcastMessage({
        teacherName,
        centreName,
        className: activeClass ? activeClass.name : 'Preschool Class',
        theme,
        ageGroup,
        kitCount: 3,
        printTip: 'Print at home or your local spaza internet cafe for R2.'
      });

  const handleOpenWhatsApp = () => {
    const url = WhatsAppSharingService.getWhatsAppShareUrl(
      formattedMessage, 
      shareMode === 'individual' ? parentPhoneNumber : undefined
    );
    window.open(url, '_blank');
  };

  const handleCopy = async () => {
    await WhatsAppSharingService.copyToClipboard(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADFCF] max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B7280] hover:text-[#14213D] hover:bg-[#F4EDE2] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/20 text-[#1b7a3e] text-xs font-bold uppercase tracking-wider w-fit mb-2">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Activity Kit Dispatch</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mb-1">
          Share Screen-Free Kits with Parents
        </h3>
        <p className="text-xs text-[#4B5563] mb-4">
          Send personalized, ink-saver printable kits with direct deep links directly to parent contacts or your class WhatsApp group.
        </p>

        <div className="flex-1 overflow-y-auto space-y-5 pr-1">
          
          {/* Share Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-2xl border border-[#EADFCF]">
            <button
              onClick={() => setShareMode('individual')}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                shareMode === 'individual' 
                  ? 'bg-[#14213D] text-white shadow-xs' 
                  : 'text-[#4B5563] hover:bg-[#FAF7F2]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Direct Parent Contact</span>
            </button>

            <button
              onClick={() => setShareMode('class_broadcast')}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                shareMode === 'class_broadcast' 
                  ? 'bg-[#14213D] text-white shadow-xs' 
                  : 'text-[#4B5563] hover:bg-[#FAF7F2]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Class WhatsApp Group</span>
            </button>
          </div>

          {/* Individual Learner Settings */}
          {shareMode === 'individual' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-[#EADFCF]">
              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1">Select Learner:</label>
                <select
                  value={selectedLearnerId}
                  onChange={(e) => {
                    setSelectedLearnerId(e.target.value);
                    setCustomLearnerName('');
                  }}
                  className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs text-[#14213D] font-medium"
                >
                  {learners.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.nickname} (Age {l.age})
                    </option>
                  ))}
                  <option value="custom">+ Other / Custom Learner Name</option>
                </select>
              </div>

              {selectedLearnerId === 'custom' && (
                <div>
                  <label className="block text-xs font-bold text-[#14213D] mb-1">Custom Child Name:</label>
                  <input
                    type="text"
                    value={customLearnerName}
                    onChange={(e) => setCustomLearnerName(e.target.value)}
                    placeholder="e.g. Mpho or Zola"
                    className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs text-[#14213D]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1">Parent WhatsApp Number (Optional):</label>
                <input
                  type="tel"
                  value={parentPhoneNumber}
                  onChange={(e) => setParentPhoneNumber(e.target.value)}
                  placeholder="e.g. 082 345 6789"
                  className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs text-[#14213D]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#14213D] mb-1">Activity Kit Type:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedKitType('coloring_sheet')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all ${
                      selectedKitType === 'coloring_sheet'
                        ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#14213D]'
                        : 'border-[#EADFCF] bg-[#FAF7F2] text-[#4B5563]'
                    }`}
                  >
                    🎨 Coloring Sheet
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedKitType('tracing_mat')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all ${
                      selectedKitType === 'tracing_mat'
                        ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#14213D]'
                        : 'border-[#EADFCF] bg-[#FAF7F2] text-[#4B5563]'
                    }`}
                  >
                    ✍️ Tracing Mat
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedKitType('shape_puzzle')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all ${
                      selectedKitType === 'shape_puzzle'
                        ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#14213D]'
                        : 'border-[#EADFCF] bg-[#FAF7F2] text-[#4B5563]'
                    }`}
                  >
                    ✂️ Shape Puzzle
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedKitType('complete_weekly_pack')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all ${
                      selectedKitType === 'complete_weekly_pack'
                        ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#14213D]'
                        : 'border-[#EADFCF] bg-[#FAF7F2] text-[#4B5563]'
                    }`}
                  >
                    📦 Full 3-in-1 Kit
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#14213D] mb-1">Teacher Personal Guidance Note:</label>
                <input
                  type="text"
                  value={teacherPersonalNote}
                  onChange={(e) => setTeacherPersonalNote(e.target.value)}
                  placeholder="e.g. Spend 10-15 minutes guiding pencil grip and praising effort."
                  className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs text-[#14213D]"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl border border-[#EADFCF] space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1">Target Classroom:</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs text-[#14213D] font-medium"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.learnerCount} Learners enrolled)
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-[#6B7280]">
                Broadcasts a unified link to your parents' WhatsApp group so every family can print with their own child's name.
              </p>
            </div>
          )}

          {/* Live Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#14213D]">
                WhatsApp Message Preview (With Deep Link):
              </span>
              <span className="text-[10px] text-[#6B7280]">
                Includes one-click printable launcher
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#EADFCF] max-h-48 overflow-y-auto font-mono text-xs text-[#14213D] leading-relaxed whitespace-pre-line shadow-inner">
              {formattedMessage}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-[#EADFCF] mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#EADFCF] text-[#14213D] font-bold text-xs transition-all shadow-xs"
          >
            <Copy className="w-4 h-4 text-[#6B7280]" />
            <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Message & Deep Link'}</span>
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{parentPhoneNumber ? `Send to ${parentPhoneNumber}` : 'Open WhatsApp to Share'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
