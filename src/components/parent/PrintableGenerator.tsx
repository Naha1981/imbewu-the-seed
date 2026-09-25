import React, { useRef } from 'react';
import { Printer, Download, Scissors, Sparkles, Award, PenTool, Palette } from 'lucide-react';
import type { ChildProfile, LanguageCode, PlanTier } from '../../types';

export interface PrintableGeneratorProps {
  child: ChildProfile;
  language?: LanguageCode;
  userPlan?: PlanTier;
  onOpenPaywall?: (feature: any) => void;
  showPrintButton?: boolean;
}

/**
 * PrintableGenerator
 * Accepts child profile data and renders a high-contrast A4 layout containing:
 * 1. Personalized coloring area with the child's name
 * 2. Pre-writing tracing mat (Highveld hill strokes, dotted name tracing grid, number counting 1-5)
 * 3. Cut-out shape puzzle (Circle taxi wheel, triangle stoep roof, square spaza window, star tower beacon, silhouette board)
 * Uses CSS print media queries from index.css for correct A4 output styling.
 */
export const PrintableGenerator: React.FC<PrintableGeneratorProps> = ({
  child,
  language = 'en',
  userPlan = 'FREE',
  onOpenPaywall,
  showPrintButton = true
}) => {
  const printContainerRef = useRef<HTMLDivElement>(null);
  const childName = (child.nickname || 'Thabo').trim();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-generator-wrapper w-full max-w-4xl mx-auto space-y-6">
      
      {/* Screen Control Bar (Hidden when printed) */}
      {showPrintButton && (
        <div className="no-print bg-white rounded-3xl p-5 border border-[#EADFCF] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
                A4 Standard Layout · Ink-Saver
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Learner: <strong>{childName}</strong> ({child.age} Years)
              </span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#14213D] mt-1">
              Screen-Free Printable Activity Kit
            </h3>
            <p className="text-xs text-[#6B7280]">
              Coloring sheet, pre-writing tracing mat, and cut-out shape puzzle. Designed for standard A4 paper.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#14213D] hover:bg-black text-white text-xs font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print A4 Layout (Ink-Saver)</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Printable A4 Container using CSS print media queries from index.css */}
      <div 
        ref={printContainerRef}
        className="printable-sheet print-area bg-white rounded-3xl p-6 sm:p-10 border-2 border-dashed border-[#14213D]/30 shadow-sm relative overflow-hidden text-black font-sans"
      >
        
        {/* ========================================================================= */}
        {/* SECTION 1: PERSONALIZED HIGH-CONTRAST COLORING AREA (CHILD'S NAME)       */}
        {/* ========================================================================= */}
        <section className="printable-page space-y-5 pb-8 mb-8 border-b-2 border-dashed border-black/40">
          
          {/* Header */}
          <div className="border-b-2 border-black pb-3 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-black">
                  IMBEWU · The Seed
                </span>
                <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Part 1: Coloring Area
                </span>
              </div>
              <p className="text-xs text-gray-700 mt-0.5">
                Township Community Discovery · NCF ELDA 5 (Creativity & Fine Motor)
              </p>
            </div>

            <div className="text-right text-xs">
              <p><strong>Learner:</strong> <span className="underline font-bold text-sm px-1">{childName}</span></p>
              <p className="text-[11px] text-gray-600">Date: ________________</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="border border-black p-2.5 rounded-lg flex items-center justify-between text-xs">
            <p className="font-medium">
              🖍️ <strong>Coloring Instructions:</strong> Color in the letters of your name and the Soweto street scene with bright crayons!
            </p>
            <span className="font-bold text-[10px] border border-black px-2 py-0.5 uppercase shrink-0 ml-2">
              Ink-Saver Outline
            </span>
          </div>

          {/* Giant Bubbly Child Name Outline to Color In */}
          <div className="text-center py-4 border-2 border-black rounded-2xl bg-white">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-1">
              Color Your Special Name:
            </p>
            <h1 
              className="font-editorial text-4xl sm:text-6xl font-extrabold tracking-wider text-transparent stroke-black stroke-2"
              style={{ WebkitTextStroke: '2.5px #000000', letterSpacing: '0.15em' }}
            >
              {childName.toUpperCase()}
            </h1>
            <p className="text-xs font-serif italic text-gray-700 mt-2">
              “Halala {childName}! You are curious, brave, and full of sunshine.”
            </p>
          </div>

          {/* Pure Black & White Vector Outline Township Scene */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white">
            <svg 
              viewBox="0 0 700 380" 
              className="w-full h-auto max-h-[380px] stroke-black fill-none stroke-[2.5]"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Sun & Rays */}
              <circle cx="90" cy="80" r="30" strokeWidth="2.5" />
              <line x1="90" y1="35" x2="90" y2="15" strokeWidth="2.5" />
              <line x1="90" y1="125" x2="90" y2="145" strokeWidth="2.5" />
              <line x1="45" y1="80" x2="25" y2="80" strokeWidth="2.5" />
              <line x1="135" y1="80" x2="155" y2="80" strokeWidth="2.5" />
              <line x1="58" y1="48" x2="44" y2="34" strokeWidth="2.5" />
              <line x1="122" y1="48" x2="136" y2="34" strokeWidth="2.5" />
              <line x1="58" y1="112" x2="44" y2="126" strokeWidth="2.5" />
              <line x1="122" y1="112" x2="136" y2="126" strokeWidth="2.5" />

              {/* Orlando Towers in distant horizon */}
              <path d="M 540 160 L 555 60 C 565 55, 595 55, 605 60 L 620 160 Z" strokeWidth="2.5" />
              <ellipse cx="580" cy="60" rx="25" ry="6" strokeWidth="2" />
              <path d="M 625 160 L 638 75 C 646 70, 670 70, 678 75 L 690 160 Z" strokeWidth="2.5" />
              <ellipse cx="658" cy="75" rx="20" ry="5" strokeWidth="2" />

              {/* Peach Tree & Aloe */}
              <path d="M 40 300 Q 55 230 70 190 Q 85 230 100 300" strokeWidth="3" />
              <circle cx="70" cy="170" r="50" strokeWidth="2.5" strokeDasharray="6 3" />
              <circle cx="50" cy="160" r="8" strokeWidth="2" />
              <circle cx="85" cy="155" r="8" strokeWidth="2" />
              <circle cx="70" cy="195" r="8" strokeWidth="2" />

              {/* JoJo Tank with Tap */}
              <rect x="130" y="190" width="65" height="85" rx="8" strokeWidth="2.5" />
              <line x1="130" y1="215" x2="195" y2="215" strokeWidth="2" />
              <line x1="130" y1="240" x2="195" y2="240" strokeWidth="2" />
              <line x1="130" y1="265" x2="195" y2="265" strokeWidth="2" />
              <path d="M 125 190 Q 162 175 200 190 Z" strokeWidth="2.5" />
              <text x="145" y="230" className="font-bold text-xs font-mono" stroke="none" fill="#000000">JOJO</text>
              <path d="M 120 255 L 130 255 M 120 255 L 120 265" strokeWidth="2.5" />

              {/* Road Line */}
              <line x1="20" y1="320" x2="680" y2="320" strokeWidth="3" />
              <line x1="40" y1="350" x2="100" y2="350" strokeWidth="3" strokeDasharray="15 15" />
              <line x1="160" y1="350" x2="260" y2="350" strokeWidth="3" strokeDasharray="15 15" />
              <line x1="320" y1="350" x2="420" y2="350" strokeWidth="3" strokeDasharray="15 15" />
              <line x1="480" y1="350" x2="580" y2="350" strokeWidth="3" strokeDasharray="15 15" />

              {/* Minibus Taxi */}
              <g transform="translate(225, 175)">
                <path d="M 10 115 L 20 55 Q 30 28 65 28 L 190 28 Q 210 28 220 48 L 245 78 L 255 115 Z" strokeWidth="3" />
                <rect x="0" y="105" width="15" height="15" rx="3" strokeWidth="2.5" />
                <rect x="250" y="105" width="15" height="15" rx="3" strokeWidth="2.5" />
                <path d="M 28 58 L 65 35 L 95 35 L 95 72 L 30 72 Z" strokeWidth="2" />
                <rect x="105" y="35" width="40" height="37" rx="2" strokeWidth="2" />
                <rect x="153" y="35" width="40" height="37" rx="2" strokeWidth="2" />
                <path d="M 200 35 L 215 48 L 235 72 L 200 72 Z" strokeWidth="2" />
                <line x1="15" y1="85" x2="250" y2="85" strokeWidth="2" />
                <line x1="15" y1="98" x2="250" y2="98" strokeWidth="2" />
                <path d="M 25 98 L 35 85 L 45 98 L 55 85 L 65 98 L 75 85 L 85 98 L 95 85 L 105 98 L 115 85 L 125 98 L 135 85 L 145 98 L 155 85 L 165 98 L 175 85 L 185 98 L 195 85 L 205 98 L 215 85 L 225 98 L 235 85 L 245 98" strokeWidth="1.5" />
                <g transform="translate(60, 115)">
                  <circle cx="0" cy="0" r="23" strokeWidth="3" />
                  <circle cx="0" cy="0" r="13" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" strokeWidth="2" />
                </g>
                <g transform="translate(195, 115)">
                  <circle cx="0" cy="0" r="23" strokeWidth="3" />
                  <circle cx="0" cy="0" r="13" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" strokeWidth="2" />
                </g>
                <rect x="110" y="14" width="45" height="14" rx="2" strokeWidth="2" />
                <text x="118" y="25" className="font-bold text-[9px] font-sans" stroke="none" fill="#000000">TAXI</text>
              </g>

              {/* Wire Car (Igalimoto) */}
              <g transform="translate(530, 240)">
                <path d="M 0 0 Q 30 35 50 65" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="10" strokeWidth="2" />
                <rect x="45" y="55" width="70" height="25" rx="4" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx="60" cy="85" r="10" strokeWidth="2" />
                <circle cx="100" cy="85" r="10" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: PRE-WRITING TRACING MAT (FINE MOTOR PENCIL CONTROL & NAME)    */}
        {/* ========================================================================= */}
        <section className="printable-page space-y-5 pb-8 mb-8 border-b-2 border-dashed border-black/40">
          
          {/* Header */}
          <div className="border-b-2 border-black pb-3 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-black">
                  IMBEWU · The Seed
                </span>
                <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Part 2: Pre-Writing Tracing Mat
                </span>
              </div>
              <p className="text-xs text-gray-700 mt-0.5">
                Handwriting Warmups · NCF ELDA 3 (Communicating) & ELDA 5 (Fine Motor Control)
              </p>
            </div>

            <div className="text-right text-xs">
              <p><strong>Learner:</strong> <span className="underline font-bold text-sm px-1">{childName}</span></p>
              <p className="text-[11px] text-gray-600">Pencil Grip Coordination</p>
            </div>
          </div>

          {/* Stroke Warmups */}
          <div className="space-y-4 border-2 border-black rounded-2xl p-5 bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-black">
              1. Finger-Trace & Pencil Warmup (Left to Right):
            </h4>

            {/* Straight lines */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Straight line paths (Telephone lines)</span>
                <span>Keep pencil on paper</span>
              </div>
              <div className="h-9 border-b border-gray-400 flex items-center">
                <span className="text-sm mr-2">🚗</span>
                <svg className="w-full h-7 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                  <line x1="0" y1="14" x2="650" y2="14" />
                </svg>
                <span className="text-sm ml-2">🏁</span>
              </div>
            </div>

            {/* Rolling Highveld hill waves */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Rolling waves (Soweto hills & Klipspruit stream)</span>
                <span>Smooth curve control</span>
              </div>
              <div className="h-11 border-b border-gray-400 flex items-center">
                <span className="text-sm mr-2">🌿</span>
                <svg className="w-full h-9 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                  <path d="M 0 18 Q 30 2 60 18 T 120 18 T 180 18 T 240 18 T 300 18 T 360 18 T 420 18 T 480 18 T 540 18 T 600 18 T 660 18" />
                </svg>
                <span className="text-sm ml-2">🌻</span>
              </div>
            </div>

            {/* Lightning zigzags */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Highveld lightning zig-zags</span>
                <span>Sharp angle stops</span>
              </div>
              <div className="h-11 border-b border-gray-400 flex items-center">
                <span className="text-sm mr-2">⚡</span>
                <svg className="w-full h-9 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                  <path d="M 0 22 L 25 4 L 50 22 L 75 4 L 100 22 L 125 4 L 150 22 L 175 4 L 200 22 L 225 4 L 250 22 L 275 4 L 300 22 L 325 4 L 350 22 L 375 4 L 400 22 L 425 4 L 450 22 L 475 4 L 500 22 L 525 4 L 550 22 L 575 4 L 600 22 L 625 4 L 650 22" />
                </svg>
                <span className="text-sm ml-2">⚡</span>
              </div>
            </div>
          </div>

          {/* Dotted Name Tracing Grid */}
          <div className="border-2 border-black rounded-2xl p-5 bg-white space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-black">
              2. Dotted Name Tracing Guide for {childName}:
            </h4>

            <div className="relative border border-black rounded-xl p-4 bg-gray-50 flex items-center justify-around overflow-x-auto">
              <div className="absolute inset-x-4 top-1/2 border-b border-dashed border-gray-400 pointer-events-none" />
              {childName.toUpperCase().split('').map((char, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center min-w-[48px] h-20 relative z-10">
                  <span 
                    className="text-4xl font-editorial font-bold text-gray-300 stroke-black stroke-1"
                    style={{ fontFamily: 'monospace', letterSpacing: '0.1em', strokeDasharray: '4 3' }}
                  >
                    {char}
                  </span>
                  <span className="text-[9px] text-gray-400 mt-1 font-mono">↓ stroke {idx + 1}</span>
                </div>
              ))}
            </div>

            <div className="border border-black rounded-xl p-4 bg-white flex items-center justify-around">
              {childName.toUpperCase().split('').map((_, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center min-w-[48px] h-14 border-b-2 border-black">
                  <span className="text-xs text-gray-300 font-mono">[ try here ]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Number Tracing 1 to 5 */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-black">
              3. Spaza Shop Number Tracing (ELDA 4: Mathematics):
            </h4>
            <div className="grid grid-cols-5 gap-3 text-center">
              {[
                { num: '1', item: '1 Taxi', zu: 'Itekisi linye', icon: '🚕' },
                { num: '2', item: '2 Magwinya', zu: 'Amagwinya amabili', icon: '🥯' },
                { num: '3', item: '3 Wire Cars', zu: 'Izimoto ezintathu', icon: '🚗' },
                { num: '4', item: '4 Peaches', zu: 'Amapentshisi amane', icon: '🍑' },
                { num: '5', item: '5 Bottle Caps', zu: 'Izivalo ezinhlanu', icon: '🔘' },
              ].map((n, i) => (
                <div key={i} className="border border-black rounded-xl p-2.5 flex flex-col items-center justify-between">
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
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: HANDS-ON CUT-OUT SHAPE PUZZLE & SILHOUETTE MATCHING BOARD     */}
        {/* ========================================================================= */}
        <section className="printable-page space-y-5">
          
          {/* Header */}
          <div className="border-b-2 border-black pb-3 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight text-black">
                  IMBEWU · The Seed
                </span>
                <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Part 3: Cut-Out Shape Puzzle
                </span>
              </div>
              <p className="text-xs text-gray-700 mt-0.5">
                Hands-On Bilateral Coordination & Spatial Reasoning · NCF ELDA 4
              </p>
            </div>

            <div className="text-right text-xs">
              <p><strong>Learner:</strong> <span className="underline font-bold text-sm px-1">{childName}</span></p>
              <p className="text-[11px] text-gray-600">✂️ Scissor & Paste Activity</p>
            </div>
          </div>

          <div className="border border-black p-2.5 rounded-lg flex items-center justify-between text-xs">
            <p className="font-medium">
              ✂️ <strong>Scissor Guide:</strong> Cut along the dotted dashed lines below. Match and paste each shape onto its silhouette spot on the Soweto board!
            </p>
          </div>

          {/* Cut-Out Shape Pieces */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
              <Scissors className="w-4 h-4" />
              <span>Cut-Out Shape Pieces (Follow Scissor Dotted Lines):</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Circle */}
              <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-1">
                  <span className="text-xs font-bold font-mono">CIRCLE</span>
                </div>
                <p className="text-[11px] font-bold text-black">Taxi Wheel</p>
                <p className="text-[9px] text-gray-600">Isondo</p>
                <span className="text-[9px] text-gray-400 mt-1">✂ cut here</span>
              </div>

              {/* Triangle */}
              <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50">
                <svg viewBox="0 0 70 60" className="w-16 h-14 stroke-black fill-none stroke-2 mb-1">
                  <polygon points="35,5 65,55 5,55" />
                  <text x="35" y="42" textAnchor="middle" className="text-[9px] font-bold font-mono" stroke="none" fill="#000000">TRIANGLE</text>
                </svg>
                <p className="text-[11px] font-bold text-black">Stoep Roof</p>
                <p className="text-[9px] text-gray-600">Uphahla</p>
                <span className="text-[9px] text-gray-400 mt-1">✂ cut here</span>
              </div>

              {/* Square */}
              <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50">
                <div className="w-14 h-14 border-2 border-black flex flex-col items-center justify-center mb-1">
                  <span className="text-[10px] font-bold font-mono">SQUARE</span>
                  <span className="text-[8px] text-gray-500">4 equal sides</span>
                </div>
                <p className="text-[11px] font-bold text-black">Spaza Window</p>
                <p className="text-[9px] text-gray-600">Ifasitela</p>
                <span className="text-[9px] text-gray-400 mt-1">✂ cut here</span>
              </div>

              {/* Star */}
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

          {/* Silhouette Neighborhood Board */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-black">
              Neighborhood Silhouette Board (Paste Cut Shapes Here):
            </h4>

            <div className="border border-black rounded-xl p-5 bg-gray-50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              <div className="h-28 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                <div className="w-12 h-12 rounded-full border-2 border-black/30 flex items-center justify-center mb-1">
                  <span className="text-[10px] text-gray-400 font-mono">1</span>
                </div>
                <p className="text-[10px] font-bold text-gray-600">Wheel Spot</p>
                <p className="text-[9px] text-gray-400">[ Paste Circle ]</p>
              </div>

              <div className="h-28 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                <svg viewBox="0 0 60 50" className="w-12 h-10 stroke-black/30 fill-none stroke-2 mb-1">
                  <polygon points="30,5 55,45 5,45" />
                </svg>
                <p className="text-[10px] font-bold text-gray-600">Roof Spot</p>
                <p className="text-[9px] text-gray-400">[ Paste Triangle ]</p>
              </div>

              <div className="h-28 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                <div className="w-12 h-12 border-2 border-black/30 flex items-center justify-center mb-1">
                  <span className="text-[10px] text-gray-400 font-mono">3</span>
                </div>
                <p className="text-[10px] font-bold text-gray-600">Window Spot</p>
                <p className="text-[9px] text-gray-400">[ Paste Square ]</p>
              </div>

              <div className="h-28 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                <svg viewBox="0 0 50 50" className="w-12 h-12 stroke-black/30 fill-none stroke-2 mb-1">
                  <polygon points="25,4 31,18 46,18 34,28 39,43 25,34 11,43 16,28 4,18 19,18" />
                </svg>
                <p className="text-[10px] font-bold text-gray-600">Beacon Spot</p>
                <p className="text-[9px] text-gray-400">[ Paste Star ]</p>
              </div>

            </div>
          </div>
        </section>

        {/* Global Footer */}
        <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-gray-700 gap-2">
          <div>
            <p><strong>BanaPele AI · Imbewu Foundation Phase</strong></p>
            <p className="text-[10px] text-gray-500">Department of Basic Education NCF (0-4) & CAPS Grade R Aligned.</p>
          </div>
          <div className="text-right text-[10px]">
            <p>Prepared for: <strong>{childName}</strong></p>
            <p className="text-gray-500">www.imbewu.co.za · Ink-Saver A4 Standard 🇿🇦</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PrintableGenerator;
