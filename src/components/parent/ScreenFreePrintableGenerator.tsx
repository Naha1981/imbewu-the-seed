import React, { useState, useRef } from 'react';
import { 
  Printer, 
  Download, 
  Share2, 
  Sparkles, 
  Lock, 
  Check, 
  Scissors, 
  PenTool, 
  Palette, 
  Eye, 
  Smartphone, 
  FileText, 
  ExternalLink,
  MessageCircle,
  Copy,
  ChevronRight,
  Info
} from 'lucide-react';
import type { ChildProfile, LanguageCode, PlanTier } from '../../types';
import { WhatsAppSharingService, PrintableKitType } from '../../services/whatsappSharingService';

interface ScreenFreePrintableGeneratorProps {
  child: ChildProfile;
  language: LanguageCode;
  userPlan: PlanTier;
  onOpenPaywall: (feature: 'screen_free_printables' | 'pdf_download' | 'weekly_pack') => void;
  initialKitType?: PrintableKitType;
}

export const ScreenFreePrintableGenerator: React.FC<ScreenFreePrintableGeneratorProps> = ({
  child,
  language,
  userPlan,
  onOpenPaywall,
  initialKitType = 'coloring_sheet'
}) => {
  const [activeSheet, setActiveSheet] = useState<PrintableKitType>(initialKitType);
  const [customChildName, setCustomChildName] = useState(child.nickname);
  const [showLowResSuccess, setShowLowResSuccess] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [parentContactNumber, setParentContactNumber] = useState('');

  const printableRef = useRef<HTMLDivElement>(null);
  const isFreePlan = userPlan === 'FREE';

  const childNameDisplay = customChildName.trim() || child.nickname;

  // Handle Free Low-Res Sample Download
  const handleDownloadLowResSample = () => {
    // Generate low-res image from printable element or canvas
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1130;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Header
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 28px serif';
    ctx.fillText('IMBEWU / BANAPELE AI — SCREEN-FREE ACTIVITY', 50, 80);

    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#555555';
    ctx.fillText(`Learner: ${childNameDisplay} | Sheet: ${getSheetTitle(activeSheet)}`, 50, 115);
    ctx.fillText(`NCF CAPS Aligned · South African Township Discovery`, 50, 140);

    ctx.beginPath();
    ctx.moveTo(50, 160);
    ctx.lineTo(canvas.width - 50, 160);
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Body content simulation
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#222222';
    ctx.fillText(`HALALA! ${childNameDisplay.toUpperCase()}`, 160, 300);

    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#444444';
    ctx.fillText(`[Low-Resolution Preview Sample of Ink-Saver Worksheet]`, 140, 350);
    ctx.fillText(`1. High-contrast outlines of Soweto taxi, wire car, & peach tree`, 140, 420);
    ctx.fillText(`2. Pre-writing curved stroke guide & dotted pencil training`, 140, 470);
    ctx.fillText(`3. Hands-on cut-out shapes (circle, triangle, spaza window)`, 140, 520);

    // Diagonal Watermark
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 4);
    ctx.font = 'bold 38px sans-serif';
    ctx.fillStyle = 'rgba(224, 122, 95, 0.35)';
    ctx.textAlign = 'center';
    ctx.fillText('SAMPLE · UPGRADE TO PRINT · IMBEWU', 0, -80);
    ctx.fillText('BANAPELE AI · LOW-RES PREVIEW ONLY', 0, 0);
    ctx.fillText('UNLOCK HIGH-RES A4 FOR R49/MO', 0, 80);
    ctx.restore();

    // Footer
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#777777';
    ctx.fillText('Upgrade at imbewu.co.za to unlock watermark-free vector printing & WhatsApp export.', 50, canvas.height - 60);

    // Trigger download
    const link = document.createElement('a');
    link.download = `imbewu-sample-${activeSheet}-${childNameDisplay.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setShowLowResSuccess(true);
    setTimeout(() => setShowLowResSuccess(false), 4000);
  };

  // Handle Clean High-Res Print / PDF
  const handlePrintCleanA4 = () => {
    if (isFreePlan) {
      onOpenPaywall('screen_free_printables');
      return;
    }
    window.print();
  };

  // Handle WhatsApp Sharing
  const handleShareToWhatsApp = () => {
    if (isFreePlan) {
      onOpenPaywall('screen_free_printables');
      return;
    }
    setIsShareModalOpen(true);
  };

  const getSheetTitle = (type: PrintableKitType) => {
    switch (type) {
      case 'coloring_sheet':
        return 'Township Coloring Sheet (Name-Personalized)';
      case 'tracing_mat':
        return 'Pre-Writing & Dotted Name Tracing Mat';
      case 'shape_puzzle':
        return 'Cut-Out Shape Puzzle & Silhouette Board';
      case 'complete_weekly_pack':
        return 'Complete 3-Page Screen-Free Activity Kit';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Value Banner: Anti-Screen-Time Engine */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1E2E52] to-[#2B3A67] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-[#3A4B75]">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#2A9D8F]/25 text-[#2A9D8F] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Screen-Free Tactile Learning Engine</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
            High-Contrast Printable Activity Generator
          </h2>

          <p className="text-sm text-gray-200 leading-relaxed mb-4">
            Protect your child’s developing eyesight and develop fine-motor pencil grip. Every activity is pre-engineered in pure ink-saver black-and-white vector outlines with {childNameDisplay}’s name, local Soweto motifs, and NCF ELDA milestones.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
              <span className="text-emerald-400 font-bold">⚡ 80% Less Ink:</span>
              <span className="text-gray-300">Pure line art (cheap R2 print at spaza)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
              <span className="text-amber-300 font-bold">📵 Anti-Screen:</span>
              <span className="text-gray-300">Real paper tactile grip & scissors</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
              <span className="text-teal-300 font-bold">🇿🇦 Localised:</span>
              <span className="text-gray-300">Minibus taxis, stoeps & wire cars</span>
            </div>
          </div>
        </div>

        {/* Ambient Decorative Background Circles */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-[#E07A5F]/15 blur-2xl pointer-events-none" />
        <div className="absolute right-32 top-0 w-40 h-40 rounded-full bg-[#2A9D8F]/15 blur-2xl pointer-events-none" />
      </div>

      {/* Control Bar: Sheet Tabs & Personalization */}
      <div className="no-print bg-white rounded-3xl p-5 sm:p-6 border border-[#EADFCF] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Kit Type Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSheet('coloring_sheet')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeSheet === 'coloring_sheet'
                  ? 'bg-[#14213D] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>1. Name Coloring Sheet</span>
            </button>

            <button
              onClick={() => setActiveSheet('tracing_mat')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeSheet === 'tracing_mat'
                  ? 'bg-[#14213D] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>2. Pre-Writing Tracing Mat</span>
            </button>

            <button
              onClick={() => setActiveSheet('shape_puzzle')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeSheet === 'shape_puzzle'
                  ? 'bg-[#14213D] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-amber-500" />
              <span>3. Cut-Out Shape Puzzle</span>
            </button>

            <button
              onClick={() => setActiveSheet('complete_weekly_pack')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeSheet === 'complete_weekly_pack'
                  ? 'bg-[#2A9D8F] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full 3-in-1 Kit</span>
            </button>
          </div>

          {/* Child Name Personalizer */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-xs font-bold text-[#14213D] whitespace-nowrap">
              Child's Name:
            </label>
            <input
              type="text"
              value={customChildName}
              onChange={(e) => setCustomChildName(e.target.value)}
              placeholder="e.g. Thabo"
              className="bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-1.5 text-xs font-bold text-[#14213D] focus:outline-hidden focus:ring-2 focus:ring-[#2A9D8F] w-32"
            />
          </div>

        </div>

        {/* Freemium Status Bar & Primary Action Buttons */}
        <div className="pt-4 border-t border-[#FAF7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            {isFreePlan ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>Free Tier (Watermarked Sample Mode)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Paid Tier Active (Clean High-Res A4 Unlocked)</span>
              </span>
            )}
            <span className="text-xs text-[#6B7280]">
              Paper standard: A4 (210 × 297mm)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            
            {/* Free Tier: Download Low-Res Sample */}
            {isFreePlan && (
              <button
                onClick={handleDownloadLowResSample}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F4EDE2] border border-[#EADFCF] text-[#14213D] text-xs font-bold transition-all"
                title="Download a low-res preview sample image"
              >
                <Download className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Download Sample (Free)</span>
              </button>
            )}

            {/* High-Res A4 Print Button */}
            <button
              onClick={handlePrintCleanA4}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all ${
                isFreePlan 
                  ? 'bg-[#14213D] text-white hover:bg-black' 
                  : 'bg-[#2A9D8F] hover:bg-[#238276] text-white'
              }`}
            >
              {isFreePlan ? <Lock className="w-3.5 h-3.5 text-amber-300" /> : <Printer className="w-3.5 h-3.5" />}
              <span>{isFreePlan ? 'Unlock Clean A4 Print (R49/mo)' : 'Print Clean A4 (Ink-Saver)'}</span>
            </button>

            {/* Send to WhatsApp Button */}
            <button
              onClick={handleShareToWhatsApp}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all ${
                isFreePlan
                  ? 'bg-[#25D366]/15 text-[#1b7a3e] border border-[#25D366]/30 hover:bg-[#25D366]/25'
                  : 'bg-[#25D366] hover:bg-[#20ba59] text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isFreePlan ? '🔒 Send to WhatsApp (Paid)' : 'Send to WhatsApp'}</span>
            </button>

          </div>

        </div>

        {showLowResSuccess && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center justify-between animate-in fade-in">
            <span>📥 Watermarked sample downloaded! Upgrade to remove the watermark and unlock full vector A4 printing.</span>
            <button 
              onClick={() => onOpenPaywall('screen_free_printables')}
              className="underline font-bold ml-2 text-[#E07A5F]"
            >
              Upgrade for R49 →
            </button>
          </div>
        )}
      </div>

      {/* PRINTABLE PREVIEW CANVAS / FRAME */}
      <div 
        ref={printableRef}
        className="printable-sheet bg-white rounded-3xl p-6 sm:p-10 border-2 border-dashed border-[#14213D]/25 shadow-sm relative overflow-hidden text-[#111111]"
      >
        
        {/* FREE TIER DIAGONAL WATERMARK OVERLAY */}
        {isFreePlan && (
          <div className="no-print pointer-events-none absolute inset-0 z-20 flex flex-col justify-around overflow-hidden opacity-30 select-none">
            <div className="transform -rotate-12 text-center text-red-600 font-extrabold text-2xl sm:text-3xl tracking-widest whitespace-nowrap">
              SAMPLE · UPGRADE TO PRINT · IMBEWU / BANAPELE AI
            </div>
            <div className="transform -rotate-12 text-center text-red-600 font-extrabold text-2xl sm:text-3xl tracking-widest whitespace-nowrap">
              SAMPLE · UPGRADE TO PRINT · IMBEWU / BANAPELE AI
            </div>
            <div className="transform -rotate-12 text-center text-red-600 font-extrabold text-2xl sm:text-3xl tracking-widest whitespace-nowrap">
              SAMPLE · UPGRADE TO PRINT · IMBEWU / BANAPELE AI
            </div>
            <div className="transform -rotate-12 text-center text-red-600 font-extrabold text-2xl sm:text-3xl tracking-widest whitespace-nowrap">
              SAMPLE · UPGRADE TO PRINT · IMBEWU / BANAPELE AI
            </div>
          </div>
        )}

        {/* Free Plan Sticky Teaser Top Bar in UI */}
        {isFreePlan && (
          <div className="no-print mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-amber-200 text-amber-900 font-bold">🔒 SAMPLE PREVIEW</span>
              <p className="text-amber-900 font-medium">
                Watermark shown on preview. <strong>Imbewu Family (R49/mo)</strong> unlocks crisp vector line art, zero ink smudge, and direct WhatsApp internet-cafe printing.
              </p>
            </div>
            <button
              onClick={() => onOpenPaywall('screen_free_printables')}
              className="bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-5 py-2 rounded-full font-bold shadow-xs whitespace-nowrap"
            >
              Upgrade to Print (R49) →
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SHEET 1: HIGH-CONTRAST TOWNSHIP COLORING SHEET (CHILD'S NAME PERSONALIZED) */}
        {/* ========================================================================= */}
        {(activeSheet === 'coloring_sheet' || activeSheet === 'complete_weekly_pack') && (
          <div className="space-y-6 pb-12 mb-12 border-b-2 border-dashed border-[#14213D]/30 last:border-b-0 last:pb-0 last:mb-0">
            
            {/* Sheet Header */}
            <div className="border-b-2 border-black pb-4 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-editorial text-2xl font-bold tracking-tight text-black">
                    IMBEWU · The Seed
                  </span>
                  <span className="border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Sheet 1: Tactile Coloring
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-0.5">
                  Theme: South African Community & Transport · NCF ELDA 5 (Creativity)
                </p>
              </div>

              <div className="text-right text-xs">
                <p><strong>Learner:</strong> <span className="underline font-bold text-sm px-1">{childNameDisplay}</span></p>
                <p className="text-[11px] text-gray-600">Date: ________________</p>
              </div>
            </div>

            {/* Instruction Callout */}
            <div className="flex justify-between items-center text-xs border border-black p-3 rounded-lg">
              <p className="font-medium">
                🖍️ <strong>Learner Instructions:</strong> Color in the letters of your name and the township scene. Use bright crayons or colored pencils!
              </p>
              <span className="font-bold text-[11px] border border-black px-2 py-0.5 uppercase shrink-0 ml-2">
                Pure Ink Saver
              </span>
            </div>

            {/* Giant Bubbly Child Name Outline to Color In */}
            <div className="text-center py-4 border-2 border-black rounded-2xl bg-white">
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">
                Color Your Special Name:
              </p>
              <h1 className="font-editorial text-4xl sm:text-6xl font-extrabold tracking-wider text-transparent stroke-black stroke-2"
                  style={{ WebkitTextStroke: '2.5px #000000', letterSpacing: '0.15em' }}>
                {childNameDisplay.toUpperCase()}
              </h1>
              <p className="text-xs font-serif italic text-gray-700 mt-2">
                “Halala {childNameDisplay}! You are curious, brave, and full of sunshine.”
              </p>
            </div>

            {/* Pure Black & White Vector Outline Township Scene */}
            <div className="border-2 border-black rounded-2xl p-4 bg-white">
              <svg 
                viewBox="0 0 700 420" 
                className="w-full h-auto max-h-[420px] stroke-black fill-none stroke-[2.5]"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Sun & Rays */}
                <circle cx="100" cy="90" r="35" strokeWidth="2.5" />
                <line x1="100" y1="40" x2="100" y2="20" strokeWidth="2.5" />
                <line x1="100" y1="140" x2="100" y2="160" strokeWidth="2.5" />
                <line x1="45" y1="90" x2="25" y2="90" strokeWidth="2.5" />
                <line x1="155" y1="90" x2="175" y2="90" strokeWidth="2.5" />
                <line x1="60" y1="50" x2="45" y2="35" strokeWidth="2.5" />
                <line x1="140" y1="50" x2="155" y2="35" strokeWidth="2.5" />
                <line x1="60" y1="130" x2="45" y2="145" strokeWidth="2.5" />
                <line x1="140" y1="130" x2="155" y2="145" strokeWidth="2.5" />

                {/* Orlando Towers in distant horizon */}
                <path d="M 540 180 L 555 70 C 565 65, 595 65, 605 70 L 620 180 Z" strokeWidth="2.5" />
                <ellipse cx="580" cy="70" rx="25" ry="6" strokeWidth="2" />
                <path d="M 625 180 L 638 85 C 646 80, 670 80, 678 85 L 690 180 Z" strokeWidth="2.5" />
                <ellipse cx="658" cy="85" rx="20" ry="5" strokeWidth="2" />

                {/* Clouds */}
                <path d="M 280 80 Q 295 60 320 70 Q 345 55 370 75 Q 395 70 405 90 Q 415 110 395 115 L 290 115 Q 270 105 280 80 Z" strokeWidth="2" />

                {/* Peach Tree & Aloe */}
                <path d="M 40 320 Q 55 240 70 200 Q 85 240 100 320" strokeWidth="3" />
                <circle cx="70" cy="180" r="55" strokeWidth="2.5" strokeDasharray="6 3" />
                <circle cx="50" cy="170" r="10" strokeWidth="2" />
                <circle cx="85" cy="165" r="10" strokeWidth="2" />
                <circle cx="70" cy="205" r="10" strokeWidth="2" />

                {/* JoJo Tank with Tap */}
                <rect x="130" y="210" width="70" height="90" rx="8" strokeWidth="2.5" />
                <line x1="130" y1="235" x2="200" y2="235" strokeWidth="2" />
                <line x1="130" y1="260" x2="200" y2="260" strokeWidth="2" />
                <line x1="130" y1="285" x2="200" y2="285" strokeWidth="2" />
                <path d="M 125 210 Q 165 195 205 210 Z" strokeWidth="2.5" />
                <text x="145" y="250" className="font-bold text-xs font-mono" stroke="none" fill="#000000">JOJO</text>
                {/* Tap */}
                <path d="M 120 280 L 130 280 M 120 280 L 120 290" strokeWidth="2.5" />

                {/* Road Line */}
                <line x1="20" y1="350" x2="680" y2="350" strokeWidth="3" />
                <line x1="40" y1="385" x2="100" y2="385" strokeWidth="3" strokeDasharray="15 15" />
                <line x1="160" y1="385" x2="260" y2="385" strokeWidth="3" strokeDasharray="15 15" />
                <line x1="320" y1="385" x2="420" y2="385" strokeWidth="3" strokeDasharray="15 15" />
                <line x1="480" y1="385" x2="580" y2="385" strokeWidth="3" strokeDasharray="15 15" />

                {/* Iconic South African Minibus Taxi */}
                <g transform="translate(230, 200)">
                  {/* Taxi Body */}
                  <path d="M 10 120 L 20 60 Q 30 30 65 30 L 190 30 Q 210 30 220 50 L 245 80 L 255 120 Z" strokeWidth="3" />
                  {/* Taxi Front & Rear Bumpers */}
                  <rect x="0" y="110" width="15" height="15" rx="3" strokeWidth="2.5" />
                  <rect x="250" y="110" width="15" height="15" rx="3" strokeWidth="2.5" />
                  {/* Windows */}
                  <path d="M 28 62 L 65 38 L 95 38 L 95 75 L 30 75 Z" strokeWidth="2" />
                  <rect x="105" y="38" width="40" height="37" rx="2" strokeWidth="2" />
                  <rect x="153" y="38" width="40" height="37" rx="2" strokeWidth="2" />
                  <path d="M 200 38 L 215 50 L 235 75 L 200 75 Z" strokeWidth="2" />
                  {/* Geometric Side Stripe (Triangle Pattern) */}
                  <line x1="15" y1="88" x2="250" y2="88" strokeWidth="2" />
                  <line x1="15" y1="102" x2="250" y2="102" strokeWidth="2" />
                  <path d="M 25 102 L 35 88 L 45 102 L 55 88 L 65 102 L 75 88 L 85 102 L 95 88 L 105 102 L 115 88 L 125 102 L 135 88 L 145 102 L 155 88 L 165 102 L 175 88 L 185 102 L 195 88 L 205 102 L 215 88 L 225 102 L 235 88 L 245 102" strokeWidth="1.5" />
                  {/* Taxi Wheels */}
                  <g transform="translate(60, 120)">
                    <circle cx="0" cy="0" r="24" strokeWidth="3" />
                    <circle cx="0" cy="0" r="14" strokeWidth="2" />
                    <circle cx="0" cy="0" r="4" strokeWidth="2" />
                  </g>
                  <g transform="translate(195, 120)">
                    <circle cx="0" cy="0" r="24" strokeWidth="3" />
                    <circle cx="0" cy="0" r="14" strokeWidth="2" />
                    <circle cx="0" cy="0" r="4" strokeWidth="2" />
                  </g>
                  {/* Taxi Sign on Roof */}
                  <rect x="110" y="16" width="45" height="14" rx="2" strokeWidth="2" />
                  <text x="118" y="27" className="font-bold text-[9px] font-sans" stroke="none" fill="#000000">TAXI</text>
                </g>

                {/* Wire Car (Igalimoto) pushed by child silhouette */}
                <g transform="translate(530, 260)">
                  {/* Long wire steering handle */}
                  <path d="M 0 0 Q 30 40 50 70" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="10" strokeWidth="2" />
                  {/* Wire frame car */}
                  <rect x="45" y="60" width="70" height="25" rx="4" strokeWidth="2" strokeDasharray="3 2" />
                  <circle cx="60" cy="90" r="10" strokeWidth="2" />
                  <circle cx="100" cy="90" r="10" strokeWidth="2" />
                </g>

              </svg>
            </div>

            {/* Teacher / Parent Sign-off */}
            <div className="flex justify-between items-center text-[11px] text-gray-700 pt-2">
              <span>Parent / Teacher Observation: ____________________________________</span>
              <span>⭐ Effort: [ ] Great [ ] Super [ ] Halala!</span>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SHEET 2: PRE-WRITING TRACING MAT (FINE MOTOR PENCIL CONTROL & NAME TRACE) */}
        {/* ========================================================================= */}
        {(activeSheet === 'tracing_mat' || activeSheet === 'complete_weekly_pack') && (
          <div className="space-y-6 pb-12 mb-12 border-b-2 border-dashed border-[#14213D]/30 last:border-b-0 last:pb-0 last:mb-0">
            
            {/* Sheet Header */}
            <div className="border-b-2 border-black pb-4 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-editorial text-2xl font-bold tracking-tight text-black">
                    IMBEWU · The Seed
                  </span>
                  <span className="border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Sheet 2: Pre-Writing Tracing Mat
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-0.5">
                  Handwriting Warmups · NCF ELDA 3 (Communicating) & ELDA 5 (Fine Motor Dexterity)
                </p>
              </div>

              <div className="text-right text-xs">
                <p><strong>Learner:</strong> <span className="underline font-bold text-sm px-1">{childNameDisplay}</span></p>
                <p className="text-[11px] text-gray-600">Pencil Grip Practice</p>
              </div>
            </div>

            {/* Stroke Warmups: Highveld Waves & Wire Car Paths */}
            <div className="space-y-4 border-2 border-black rounded-2xl p-5 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Part 1: Finger-Trace & Pencil Warmup (Follow the Arrows)
                </h4>
                <span className="text-[10px] text-gray-600">Left ➔ Right stroke coordination</span>
              </div>

              {/* Line 1: Straight telephone wire strokes */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-gray-600">
                  <span>1. Straight paths (Telephone lines)</span>
                  <span>Keep pencil on paper</span>
                </div>
                <div className="relative h-10 border-b border-gray-400 flex items-center">
                  <span className="text-sm mr-2">🚗</span>
                  <svg className="w-full h-8 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                    <line x1="0" y1="16" x2="600" y2="16" />
                  </svg>
                  <span className="text-sm ml-2">🏁</span>
                </div>
              </div>

              {/* Line 2: Gentle rolling Highveld hill waves */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-gray-600">
                  <span>2. Rolling waves (Soweto hills & Klipspruit stream)</span>
                  <span>Smooth curve control</span>
                </div>
                <div className="relative h-12 border-b border-gray-400 flex items-center">
                  <span className="text-sm mr-2">🌿</span>
                  <svg className="w-full h-10 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                    <path d="M 0 20 Q 30 2 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 T 420 20 T 480 20 T 540 20 T 600 20" />
                  </svg>
                  <span className="text-sm ml-2">🌻</span>
                </div>
              </div>

              {/* Line 3: Wire car loops */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-gray-600">
                  <span>3. Highveld lightning zig-zags</span>
                  <span>Sharp angle stops</span>
                </div>
                <div className="relative h-12 border-b border-gray-400 flex items-center">
                  <span className="text-sm mr-2">⚡</span>
                  <svg className="w-full h-10 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                    <path d="M 0 25 L 25 5 L 50 25 L 75 5 L 100 25 L 125 5 L 150 25 L 175 5 L 200 25 L 225 5 L 250 25 L 275 5 L 300 25 L 325 5 L 350 25 L 375 5 L 400 25 L 425 5 L 450 25 L 475 5 L 500 25 L 525 5 L 550 25 L 575 5 L 600 25" />
                  </svg>
                  <span className="text-sm ml-2">⚡</span>
                </div>
              </div>
            </div>

            {/* Part 2: Dotted Name Tracing Grid */}
            <div className="border-2 border-black rounded-2xl p-5 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Part 2: Dotted Name Tracing Guide for {childNameDisplay}
                </h4>
                <span className="text-[10px] text-gray-600">Top-to-bottom strokes</span>
              </div>

              <div className="space-y-3">
                {/* Row 1: Large Dotted Letters with midline */}
                <div className="relative border border-black rounded-xl p-4 bg-gray-50 flex items-center justify-around overflow-x-auto">
                  <div className="absolute inset-x-4 top-1/2 border-b border-dashed border-gray-400 pointer-events-none" />
                  {childNameDisplay.toUpperCase().split('').map((char, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center min-w-[48px] h-20 relative z-10">
                      <span 
                        className="text-4xl font-editorial font-bold text-gray-300 stroke-black stroke-1"
                        style={{ 
                          fontFamily: 'monospace',
                          letterSpacing: '0.1em',
                          strokeDasharray: '4 3'
                        }}
                      >
                        {char}
                      </span>
                      <span className="text-[9px] text-gray-400 mt-1 font-mono">↓ {idx + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Row 2: Free practice underline boxes */}
                <div className="border border-black rounded-xl p-4 bg-white flex items-center justify-around">
                  {childNameDisplay.toUpperCase().split('').map((_, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center min-w-[48px] h-16 border-b-2 border-black">
                      <span className="text-xs text-gray-300 font-mono">[ try here ]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 3: Number Counting & Trace (1 to 5) */}
            <div className="border-2 border-black rounded-2xl p-5 bg-white space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                Part 3: Spaza Shop Number Tracing (ELDA 4: Mathematics)
              </h4>
              <div className="grid grid-cols-5 gap-3 text-center">
                {[
                  { num: '1', item: '1 Taxi', zu: 'Itekisi linye', icon: '🚕' },
                  { num: '2', item: '2 Magwinya', zu: 'Amagwinya amabili', icon: '🥯' },
                  { num: '3', item: '3 Wire Cars', zu: 'Izimoto ezintathu', icon: '🚗' },
                  { num: '4', item: '4 Peaches', zu: 'Amapentshisi amane', icon: '🍑' },
                  { num: '5', item: '5 Bottle Caps', zu: 'Izivalo ezinhlanu', icon: '🔘' },
                ].map((n, i) => (
                  <div key={i} className="border border-black rounded-xl p-3 flex flex-col items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-gray-400 border-b border-dashed border-gray-300 pb-1 w-full">
                      {n.num}
                    </span>
                    <span className="text-xl my-1">{n.icon}</span>
                    <p className="font-bold text-[10px] text-black">{n.item}</p>
                    <p className="text-[9px] text-gray-600 italic">{n.zu}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SHEET 3: CUT-OUT SHAPE PUZZLE & SILHOUETTE MATCHING BOARD                */}
        {/* ========================================================================= */}
        {(activeSheet === 'shape_puzzle' || activeSheet === 'complete_weekly_pack') && (
          <div className="space-y-6 pb-6">
            
            {/* Sheet Header */}
            <div className="border-b-2 border-black pb-4 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-editorial text-2xl font-bold tracking-tight text-black">
                    IMBEWU · The Seed
                  </span>
                  <span className="border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Sheet 3: Cut-Out Shape Puzzle
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-0.5">
                  Hands-On Bilateral Coordination & Spatial Reasoning · NCF ELDA 4
                </p>
              </div>

              <div className="text-right text-xs">
                <p><strong>Learner:</strong> <span className="underline font-bold text-sm px-1">{childNameDisplay}</span></p>
                <p className="text-[11px] text-gray-600">✂️ Scissor & Paste Activity</p>
              </div>
            </div>

            {/* Instruction */}
            <div className="border border-black p-3 rounded-lg flex items-center justify-between text-xs">
              <p className="font-medium">
                ✂️ <strong>Step 1:</strong> Cut along the dotted dashed lines below. <strong>Step 2:</strong> Match and paste each shape onto its matching silhouette on the Soweto Neighborhood Board!
              </p>
            </div>

            {/* Section A: Cut-Out Shape Pieces with Scissors Guides */}
            <div className="border-2 border-black rounded-2xl p-5 bg-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
                <Scissors className="w-4 h-4" />
                <span>Cut-Out Pieces (Cut along the dotted scissor lines):</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                {/* Shape 1: Circle (Taxi Wheel) */}
                <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50">
                  <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-1">
                    <span className="text-xs font-bold font-mono">CIRCLE</span>
                  </div>
                  <p className="text-[11px] font-bold text-black">Taxi Wheel</p>
                  <p className="text-[9px] text-gray-600">Isondo</p>
                  <span className="text-[9px] text-gray-400 mt-1">✂ cut here</span>
                </div>

                {/* Shape 2: Triangle (Stoep Roof) */}
                <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50">
                  <svg viewBox="0 0 70 60" className="w-16 h-14 stroke-black fill-none stroke-2 mb-1">
                    <polygon points="35,5 65,55 5,55" />
                    <text x="35" y="42" textAnchor="middle" className="text-[9px] font-bold font-mono" stroke="none" fill="#000000">TRIANGLE</text>
                  </svg>
                  <p className="text-[11px] font-bold text-black">Stoep Roof</p>
                  <p className="text-[9px] text-gray-600">Uphahla</p>
                  <span className="text-[9px] text-gray-400 mt-1">✂ cut here</span>
                </div>

                {/* Shape 3: Square (Spaza Window) */}
                <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50">
                  <div className="w-14 h-14 border-2 border-black flex flex-col items-center justify-center mb-1">
                    <span className="text-[10px] font-bold font-mono">SQUARE</span>
                    <span className="text-[8px] text-gray-500">4 equal sides</span>
                  </div>
                  <p className="text-[11px] font-bold text-black">Spaza Window</p>
                  <p className="text-[9px] text-gray-600">Ifasitela</p>
                  <span className="text-[9px] text-gray-400 mt-1">✂ cut here</span>
                </div>

                {/* Shape 4: Star (Tower Beacon) */}
                <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50">
                  <svg viewBox="0 0 60 60" className="w-14 h-14 stroke-black fill-none stroke-2 mb-1">
                    <polygon points="30,5 37,22 55,22 40,34 46,52 30,41 14,52 20,34 5,22 23,22" />
                  </svg>
                  <p className="text-[11px] font-bold text-black">Orlando Star</p>
                  <p className="text-[9px] text-gray-600">Inkanyezi</p>
                  <span className="text-[9px] text-gray-400 mt-1">✂ cut here</span>
                </div>

              </div>
            </div>

            {/* Section B: Matching Silhouette Neighborhood Puzzle Board */}
            <div className="border-2 border-black rounded-2xl p-5 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Neighborhood Silhouette Board (Paste Cut Shapes Here)
                </h4>
                <span className="text-[10px] text-gray-600">Paste with starch glue or Prestik</span>
              </div>

              {/* Silhouette Layout */}
              <div className="border border-black rounded-xl p-6 bg-gray-50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                
                <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                  <div className="w-12 h-12 rounded-full border-2 border-black/30 flex items-center justify-center mb-1">
                    <span className="text-[10px] text-gray-400 font-mono">1</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-600">Wheel Spot</p>
                  <p className="text-[9px] text-gray-400">[ Paste Circle ]</p>
                </div>

                <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                  <svg viewBox="0 0 60 50" className="w-12 h-10 stroke-black/30 fill-none stroke-2 mb-1">
                    <polygon points="30,5 55,45 5,45" />
                  </svg>
                  <p className="text-[10px] font-bold text-gray-600">Roof Spot</p>
                  <p className="text-[9px] text-gray-400">[ Paste Triangle ]</p>
                </div>

                <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                  <div className="w-12 h-12 border-2 border-black/30 flex items-center justify-center mb-1">
                    <span className="text-[10px] text-gray-400 font-mono">3</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-600">Window Spot</p>
                  <p className="text-[9px] text-gray-400">[ Paste Square ]</p>
                </div>

                <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                  <svg viewBox="0 0 50 50" className="w-12 h-12 stroke-black/30 fill-none stroke-2 mb-1">
                    <polygon points="25,4 31,18 46,18 34,28 39,43 25,34 11,43 16,28 4,18 19,18" />
                  </svg>
                  <p className="text-[10px] font-bold text-gray-600">Beacon Spot</p>
                  <p className="text-[9px] text-gray-400">[ Paste Star ]</p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Global Printable Footer */}
        <div className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-gray-700 gap-2">
          <div>
            <p><strong>BanaPele AI · Imbewu Foundation Phase</strong></p>
            <p className="text-[10px] text-gray-500">Department of Basic Education NCF (0-4) & CAPS Grade R Aligned.</p>
          </div>
          <div className="text-right text-[10px]">
            <p>Printed for: <strong>{childNameDisplay}</strong></p>
            <p className="text-gray-500">www.imbewu.co.za · Made with pride in South Africa 🇿🇦</p>
          </div>
        </div>

      </div>

      {/* WHATSAPP SHARING MODAL FOR PARENTS */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADFCF]">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#25D366]/20 text-[#1b7a3e]">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#14213D]">
                  Send Printable to WhatsApp
                </h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#4B5563] mb-4">
              Share directly to your partner, Gogo, or send to your local internet cafe / spaza print shop for quick printing:
            </p>

            {/* Recipient Phone Input (Optional) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#14213D] mb-1">
                Recipient WhatsApp Number (Optional):
              </label>
              <input
                type="tel"
                value={parentContactNumber}
                onChange={(e) => setParentContactNumber(e.target.value)}
                placeholder="e.g. 082 123 4567 or leave blank for contact selector"
                className="w-full bg-white border border-[#EADFCF] rounded-xl px-3 py-2 text-xs text-[#14213D]"
              />
              <p className="text-[10px] text-[#6B7280] mt-1">
                Tip: Leave blank to open WhatsApp and choose any contact or group.
              </p>
            </div>

            {/* Message Preview Box */}
            <div className="bg-white rounded-2xl p-4 border border-[#EADFCF] mb-5 max-h-48 overflow-y-auto text-xs font-mono text-[#14213D] leading-relaxed whitespace-pre-line">
              {WhatsAppSharingService.formatParentActivityKitMessage({
                childName: childNameDisplay,
                kitType: activeSheet,
                kitTitle: getSheetTitle(activeSheet),
                theme: 'South African Transport & Community',
                ageGroup: `${child.age} Years`,
                teacherName: 'Imbewu Parent Studio',
                centreName: child.neighborhood || 'Soweto'
              })}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  const message = WhatsAppSharingService.formatParentActivityKitMessage({
                    childName: childNameDisplay,
                    kitType: activeSheet,
                    kitTitle: getSheetTitle(activeSheet),
                    theme: 'South African Transport & Community',
                    ageGroup: `${child.age} Years`,
                    teacherName: 'Imbewu Parent Studio',
                    centreName: child.neighborhood || 'Soweto'
                  });
                  const shareUrl = WhatsAppSharingService.getWhatsAppShareUrl(message, parentContactNumber);
                  window.open(shareUrl, '_blank');
                  setIsShareModalOpen(false);
                }}
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp & Send</span>
              </button>

              <button
                onClick={async () => {
                  const message = WhatsAppSharingService.formatParentActivityKitMessage({
                    childName: childNameDisplay,
                    kitType: activeSheet,
                    kitTitle: getSheetTitle(activeSheet),
                    theme: 'South African Transport & Community',
                    ageGroup: `${child.age} Years`,
                    teacherName: 'Imbewu Parent Studio',
                    centreName: child.neighborhood || 'Soweto'
                  });
                  await WhatsAppSharingService.copyToClipboard(message);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2500);
                }}
                className="w-full py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F4EDE2] border border-[#EADFCF] text-[#14213D] font-bold text-xs flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied Message & Link to Clipboard! ✓' : 'Copy Message & Deep Link'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
