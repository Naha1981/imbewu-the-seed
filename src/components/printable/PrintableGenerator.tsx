import React, { useRef, useState } from 'react';
import { 
  Printer, 
  Scissors, 
  Palette, 
  Sparkles, 
  PenTool, 
  Award, 
  Compass, 
  Shapes,
  CheckCircle2,
  FileText
} from 'lucide-react';
import type { LanguageCode, PlanTier } from '../../types';

export interface PrintableChildProfile {
  name: string;
  age: number;
  interest: string;
}

export interface PrintableGeneratorProps {
  /**
   * Child's name for personalized worksheets and tracing
   */
  name?: string;
  /**
   * Child's age (typically 2-6 for ECD / Grade R)
   */
  age?: number;
  /**
   * Child's primary interest (e.g., Taxis, Animals, Space, Music, Gardening)
   */
  interest?: string;
  /**
   * Optional full child object support if passed directly
   */
  child?: {
    name?: string;
    nickname?: string;
    age?: number;
    interest?: string;
    interests?: string[];
    preferredLanguage?: LanguageCode;
    [key: string]: any;
  };
  /**
   * Target UI language (defaults to 'en')
   */
  language?: LanguageCode;
  /**
   * Active plan tier
   */
  userPlan?: PlanTier;
  /**
   * Trigger print action or callback
   */
  onPrint?: () => void;
  /**
   * Whether to display on-screen control toolbar (hidden during printing automatically)
   */
  showToolbar?: boolean;
}

/**
 * PrintableGenerator
 * An A4-optimized printable activity kit component featuring:
 * 1. High-Contrast Coloring Area (personalized to child's name and interest)
 * 2. Dotted Pre-Writing Tracing Mat (dotted name tracing, pencil strokes, motor skill prep)
 * 3. Cut-Out Shape Puzzle (scissor-friendly geometric shapes & silhouette matching board)
 *
 * Utilizes the print media query utility classes defined in index.css:
 * - .printable-sheet & .print-area: A4 container dimensions
 * - .worksheet-frame: Single A4 page boundary with clean black ink-saver borders
 * - .page-break-after & .avoid-break: Strict A4 pagination enforcement
 * - .print-student-header & .print-underline: Standardized learner meta bar
 * - .trace-dotted-box & .trace-dotted-letter: Dashed handwriting stroke guides
 * - .print-cut-line: Dashed scissor cutting lines with custom ::before labels
 * - .print-notes-box: Teacher & parent assessment guide box
 * - .no-print: Hide interactive controls when generating paper printouts
 */
export const PrintableGenerator: React.FC<PrintableGeneratorProps> = ({
  name,
  age,
  interest,
  child,
  language = 'en',
  userPlan = 'FREE',
  onPrint,
  showToolbar = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize child data from props or child object
  const childName = (name || child?.nickname || child?.name || 'Thabo').trim();
  const childAge = age ?? child?.age ?? 4;
  const initialInterest = interest || (child?.interests && child.interests[0]) || child?.interest || 'Taxis & Township Transport';

  const [activeInterest, setActiveInterest] = useState<string>(initialInterest);

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  // Curated interests for quick preview toggles
  const sampleInterests = [
    'Taxis & Township Transport',
    'Safari Animals & Nature',
    'Orlando Towers & Stars',
    'Soccer & Highveld Games',
  ];

  // Letters of the child's name for tracing grids
  const upperLetters = (childName || 'THABO').toUpperCase().split('');

  return (
    <div className="printable-generator-wrapper w-full max-w-4xl mx-auto space-y-6">
      
      {/* ========================================================================= */}
      {/* SCREEN-ONLY TOOLBAR & CONTROLS (.no-print)                                 */}
      {/* ========================================================================= */}
      {showToolbar && (
        <div className="no-print bg-white rounded-3xl p-5 border border-[#EADFCF] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
                  A4 Print-Ready Kit · 3 Core Activities
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Learner: <strong>{childName}</strong> ({childAge} yrs)
                </span>
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#14213D] mt-1">
                Printable Activity Generator
              </h2>
              <p className="text-xs text-[#6B7280]">
                Optimized for standard desktop printers (A4 Portrait, Black & White ink-saver mode).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#14213D] hover:bg-black text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print A4 Worksheets</span>
              </button>
            </div>
          </div>

          {/* Child Interest Selector for quick live preview */}
          <div className="pt-3 border-t border-[#EADFCF]/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              Personalized Interest:
            </span>
            {sampleInterests.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveInterest(item)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  activeInterest === item
                    ? 'bg-[#14213D] text-white shadow-xs'
                    : 'bg-[#F4F1DE]/70 text-[#14213D] hover:bg-[#F4F1DE]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRINTABLE DOCUMENT ROOT                                                   */}
      {/* Uses .printable-sheet and .print-area classes defined in index.css        */}
      {/* ========================================================================= */}
      <div 
        ref={containerRef}
        className="printable-sheet print-area bg-white text-black font-sans w-full"
      >
        
        {/* ======================================================================= */}
        {/* SECTION 1: HIGH-CONTRAST COLORING AREA (A4 PAGE 1)                      */}
        {/* ======================================================================= */}
        <div className="worksheet-frame page-break-after avoid-break space-y-4">
          
          {/* Print Header */}
          <div className="print-student-header">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-2xl font-bold tracking-tight text-black m-0 p-0">
                  BANAPELE AI · IMBEWU
                </h1>
                <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Section 1 · Coloring Area
                </span>
              </div>
              <p className="text-[11px] text-gray-700 mt-0.5">
                Theme: <strong>{activeInterest}</strong> · NCF ELDA 5: Creativity & Fine Motor Control
              </p>
            </div>

            <div className="text-right text-xs space-y-1">
              <div>
                <strong>Learner Name:</strong>{' '}
                <span className="print-underline text-center font-bold px-2">{childName}</span>
              </div>
              <div className="text-[10px] text-gray-600">
                Age: <strong>{childAge} Years</strong> | Date: _________________
              </div>
            </div>
          </div>

          {/* Activity Objective & Instructions */}
          <div className="border border-black p-3 rounded-lg flex items-start justify-between gap-3 text-xs bg-gray-50/40">
            <div>
              <p className="font-bold text-black flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                Coloring Mission for {childName}:
              </p>
              <p className="text-gray-700 text-[11px] mt-0.5">
                Use your favorite wax crayons or colored pencils to bring your name and the high-contrast township scene to life! Stay inside the bold outline borders.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[9px] font-mono uppercase font-bold border border-black px-2 py-0.5 rounded">
                High-Contrast 100% Ink-Saver
              </span>
            </div>
          </div>

          {/* Child Name Giant Coloring Typography */}
          <div className="border-2 border-black rounded-xl p-4 text-center bg-white">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-1">
              ★ My Special Name Outline ★
            </span>
            <div 
              className="font-editorial text-5xl sm:text-6xl font-black tracking-widest text-transparent select-none py-1"
              style={{
                WebkitTextStroke: '2.5px #000000',
                letterSpacing: '0.18em',
              }}
            >
              {childName.toUpperCase()}
            </div>
            <p className="text-[11px] font-serif italic text-gray-700 mt-1">
              “Halala {childName}! You are a bright and shining star in our community.”
            </p>
          </div>

          {/* High-Contrast Vector Coloring Illustration (Pure Black & White Vector) */}
          <div className="border-2 border-black rounded-xl p-3 bg-white relative">
            <div className="absolute top-4 right-4 bg-white border border-black px-2 py-0.5 rounded text-[9px] font-bold">
              Scene: {activeInterest}
            </div>

            <svg
              viewBox="0 0 760 410"
              className="w-full h-auto max-h-[390px] stroke-black fill-none stroke-[2.5]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Sun with Rays */}
              <circle cx="95" cy="85" r="32" strokeWidth="2.5" />
              <line x1="95" y1="38" x2="95" y2="18" strokeWidth="2.5" />
              <line x1="95" y1="132" x2="95" y2="152" strokeWidth="2.5" />
              <line x1="48" y1="85" x2="28" y2="85" strokeWidth="2.5" />
              <line x1="142" y1="85" x2="162" y2="85" strokeWidth="2.5" />
              <line x1="62" y1="52" x2="48" y2="38" strokeWidth="2.5" />
              <line x1="128" y1="52" x2="142" y2="38" strokeWidth="2.5" />
              <line x1="62" y1="118" x2="48" y2="132" strokeWidth="2.5" />
              <line x1="128" y1="118" x2="142" y2="132" strokeWidth="2.5" />

              {/* Fluffy clouds to color */}
              <path d="M 210 70 Q 230 50 255 60 Q 280 45 305 60 Q 325 55 335 75 Q 345 95 325 105 L 220 105 Q 195 95 210 70 Z" strokeWidth="2" strokeDasharray="4 3" />
              <path d="M 440 60 Q 455 45 475 52 Q 495 40 515 52 Q 530 48 540 65 Q 550 82 530 90 L 445 90 Q 425 80 440 60 Z" strokeWidth="2" strokeDasharray="4 3" />

              {/* Orlando Cooling Towers in Background */}
              <g transform="translate(570, 40)">
                {/* Tower 1 */}
                <path d="M 15 160 L 28 40 C 36 35, 68 35, 76 40 L 90 160 Z" strokeWidth="2.5" />
                <ellipse cx="52" cy="40" rx="24" ry="6" strokeWidth="2" />
                {/* Tower 1 Mural Outlines to color */}
                <path d="M 24 80 Q 52 95 80 80" strokeWidth="1.5" />
                <path d="M 20 115 Q 52 130 84 115" strokeWidth="1.5" />
                <circle cx="52" cy="100" r="10" strokeWidth="1.5" />

                {/* Tower 2 */}
                <path d="M 98 160 L 108 55 C 115 50, 142 50, 148 55 L 160 160 Z" strokeWidth="2.5" />
                <ellipse cx="134" cy="55" rx="20" ry="5" strokeWidth="2" />
                <path d="M 104 95 Q 134 110 154 95" strokeWidth="1.5" />
              </g>

              {/* Highveld Peach Tree & Acacia */}
              <g transform="translate(30, 180)">
                <path d="M 35 150 Q 50 80 65 40 Q 80 80 95 150" strokeWidth="3" />
                {/* Canopy cloud outline */}
                <path d="M 20 50 Q 10 10 50 15 Q 85 -5 110 20 Q 140 25 130 65 Q 120 100 80 95 Q 50 110 30 85 Z" strokeWidth="2.5" />
                {/* Peaches */}
                <circle cx="45" cy="45" r="9" strokeWidth="2" />
                <circle cx="85" cy="35" r="9" strokeWidth="2" />
                <circle cx="100" cy="70" r="9" strokeWidth="2" />
                <circle cx="60" cy="80" r="9" strokeWidth="2" />
              </g>

              {/* Roadway & Pavement */}
              <line x1="10" y1="335" x2="750" y2="335" strokeWidth="3" />
              <line x1="30" y1="365" x2="90" y2="365" strokeWidth="3" strokeDasharray="14 14" />
              <line x1="140" y1="365" x2="250" y2="365" strokeWidth="3" strokeDasharray="14 14" />
              <line x1="300" y1="365" x2="420" y2="365" strokeWidth="3" strokeDasharray="14 14" />
              <line x1="470" y1="365" x2="590" y2="365" strokeWidth="3" strokeDasharray="14 14" />
              <line x1="640" y1="365" x2="730" y2="365" strokeWidth="3" strokeDasharray="14 14" />

              {/* Soweto Minibus Taxi (Centerpiece) */}
              <g transform="translate(205, 175)">
                {/* Body shell */}
                <path d="M 12 125 L 24 55 Q 34 26 75 26 L 225 26 Q 248 26 260 48 L 290 82 L 305 125 Z" strokeWidth="3" />
                {/* Front & rear bumpers */}
                <rect x="0" y="115" width="18" height="16" rx="4" strokeWidth="2.5" />
                <rect x="300" y="115" width="18" height="16" rx="4" strokeWidth="2.5" />
                
                {/* Windows */}
                <path d="M 32 60 L 72 34 L 108 34 L 108 76 L 36 76 Z" strokeWidth="2" />
                <rect x="118" y="34" width="48" height="42" rx="2" strokeWidth="2" />
                <rect x="176" y="34" width="48" height="42" rx="2" strokeWidth="2" />
                <path d="M 234 34 L 250 48 L 275 76 L 234 76 Z" strokeWidth="2" />

                {/* Siyaya Geometric Decal Stripes on Taxi Body */}
                <line x1="16" y1="92" x2="295" y2="92" strokeWidth="2" />
                <line x1="16" y1="106" x2="295" y2="106" strokeWidth="2" />
                <path d="M 28 106 L 38 92 L 48 106 L 58 92 L 68 106 L 78 92 L 88 106 L 98 92 L 108 106 L 118 92 L 128 106 L 138 92 L 148 106 L 158 92 L 168 106 L 178 92 L 188 106 L 198 92 L 208 106 L 218 92 L 228 106 L 238 92 L 248 106 L 258 92 L 268 106 L 278 92 L 288 106" strokeWidth="1.5" />

                {/* Roof Taxi Sign */}
                <rect x="130" y="10" width="55" height="16" rx="3" strokeWidth="2" />
                <text x="141" y="22" className="font-bold text-[10px] font-sans" stroke="none" fill="#000000">TAXI</text>

                {/* Wheels */}
                <g transform="translate(68, 125)">
                  <circle cx="0" cy="0" r="26" strokeWidth="3" />
                  <circle cx="0" cy="0" r="15" strokeWidth="2" />
                  <circle cx="0" cy="0" r="5" strokeWidth="2" />
                  {/* Wheel Spokes */}
                  <line x1="-15" y1="0" x2="15" y2="0" strokeWidth="1.5" />
                  <line x1="0" y1="-15" x2="0" y2="15" strokeWidth="1.5" />
                </g>
                <g transform="translate(235, 125)">
                  <circle cx="0" cy="0" r="26" strokeWidth="3" />
                  <circle cx="0" cy="0" r="15" strokeWidth="2" />
                  <circle cx="0" cy="0" r="5" strokeWidth="2" />
                  {/* Wheel Spokes */}
                  <line x1="-15" y1="0" x2="15" y2="0" strokeWidth="1.5" />
                  <line x1="0" y1="-15" x2="0" y2="15" strokeWidth="1.5" />
                </g>
              </g>

              {/* Wire Car Toy (Igalimoto) Guided by Child */}
              <g transform="translate(540, 255)">
                <path d="M 0 0 Q 35 40 55 70" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="11" strokeWidth="2" />
                <rect x="50" y="60" width="80" height="28" rx="4" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="68" cy="94" r="11" strokeWidth="2" />
                <circle cx="112" cy="94" r="11" strokeWidth="2" />
                <text x="65" y="78" className="text-[9px] font-mono font-bold" stroke="none" fill="#000000">WIRE CAR</text>
              </g>

              {/* JoJo Rainwater Tank */}
              <g transform="translate(130, 220)">
                <rect x="0" y="0" width="55" height="75" rx="6" strokeWidth="2.5" />
                <line x1="0" y1="20" x2="55" y2="20" strokeWidth="1.5" />
                <line x1="0" y1="40" x2="55" y2="40" strokeWidth="1.5" />
                <line x1="0" y1="60" x2="55" y2="60" strokeWidth="1.5" />
                <text x="14" y="34" className="text-[10px] font-bold font-mono" stroke="none" fill="#000000">JOJO</text>
                {/* Water tap */}
                <path d="M -8 55 L 0 55 M -8 55 L -8 63" strokeWidth="2.5" />
              </g>
            </svg>
          </div>

          {/* Teacher & Parent Guidance Box (.print-notes-box) */}
          <div className="print-notes-box flex justify-between items-center text-gray-700">
            <div>
              <strong>ECD Facilitator Note:</strong> Encourage tripod pencil/crayon grip. Prompt the learner to identify colors in their home language (e.g. <em>okubomvu</em> = red, <em>okuluhlaza</em> = green/blue).
            </div>
            <div className="text-right shrink-0 ml-4 font-mono text-[10px]">
              Page 1 of 3 · A4 Standard
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* SECTION 2: DOTTED PRE-WRITING TRACING MAT (A4 PAGE 2)                   */}
        {/* ======================================================================= */}
        <div className="worksheet-frame page-break-after avoid-break space-y-4">
          
          {/* Print Header */}
          <div className="print-student-header">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-editorial text-2xl font-bold tracking-tight text-black m-0 p-0">
                  BANAPELE AI · IMBEWU
                </h2>
                <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Section 2 · Pre-Writing Tracing Mat
                </span>
              </div>
              <p className="text-[11px] text-gray-700 mt-0.5">
                Pencil Control & Letter Formations · NCF ELDA 3 (Communicating) & ELDA 5 (Fine Motor)
              </p>
            </div>

            <div className="text-right text-xs space-y-1">
              <div>
                <strong>Learner Name:</strong>{' '}
                <span className="print-underline text-center font-bold px-2">{childName}</span>
              </div>
              <div className="text-[10px] text-gray-600">
                Grip Coordination | _________________
              </div>
            </div>
          </div>

          {/* Warmup 1: Fine-Motor Stroke Paths */}
          <div className="border-2 border-black rounded-xl p-4 bg-white space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5" />
                Step 1: Pencil Warm-Up Strokes (Trace Left to Right)
              </h3>
              <span className="text-[10px] text-gray-500 font-medium">Keep pencil tip on paper</span>
            </div>

            {/* Line 1: Straight horizontal track */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Straight Railway & Power Lines (Orlando Line)</span>
                <span>Steady motion</span>
              </div>
              <div className="h-10 border-b border-gray-400 flex items-center px-1">
                <span className="text-base mr-2 select-none">🚕</span>
                <svg className="w-full h-8 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                  <line x1="0" y1="16" x2="700" y2="16" />
                </svg>
                <span className="text-base ml-2 select-none">🏁</span>
              </div>
            </div>

            {/* Line 2: Rolling Highveld hill waves */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Highveld Hill Waves (Klipspruit Valley)</span>
                <span>Curved fluid motion</span>
              </div>
              <div className="h-12 border-b border-gray-400 flex items-center px-1">
                <span className="text-base mr-2 select-none">🌱</span>
                <svg className="w-full h-10 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                  <path d="M 0 20 Q 30 2 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 T 420 20 T 480 20 T 540 20 T 600 20 T 660 20 T 700 20" />
                </svg>
                <span className="text-base ml-2 select-none">🌻</span>
              </div>
            </div>

            {/* Line 3: Highveld lightning sharp zig-zags */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Highveld Summer Thunder Zig-Zags</span>
                <span>Sharp angle direction changes</span>
              </div>
              <div className="h-12 border-b border-gray-400 flex items-center px-1">
                <span className="text-base mr-2 select-none">⚡</span>
                <svg className="w-full h-10 stroke-black fill-none stroke-[2.5]" strokeDasharray="6 6">
                  <path d="M 0 24 L 25 4 L 50 24 L 75 4 L 100 24 L 125 4 L 150 24 L 175 4 L 200 24 L 225 4 L 250 24 L 275 4 L 300 24 L 325 4 L 350 24 L 375 4 L 400 24 L 425 4 L 450 24 L 475 4 L 500 24 L 525 4 L 550 24 L 575 4 L 600 24 L 625 4 L 650 24 L 675 4 L 700 24" />
                </svg>
                <span className="text-base ml-2 select-none">⛈️</span>
              </div>
            </div>
          </div>

          {/* Warmup 2: Dotted Name Tracing Grid for Child */}
          {/* Uses .trace-dotted-box and .trace-dotted-letter from index.css */}
          <div className="border-2 border-black rounded-xl p-4 bg-white space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Step 2: Dotted Name Tracing Mat for {childName}
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">Dashed guidelines</span>
            </div>

            <p className="text-[11px] text-gray-700">
              Trace inside the dotted guideline boxes from top to bottom, following the stroke numbers.
            </p>

            {/* Dotted Stroke Letter Boxes */}
            <div className="trace-dotted-box p-3 bg-gray-50/50 rounded-xl relative overflow-x-auto flex items-center justify-around gap-2">
              <div className="absolute inset-x-4 top-1/2 border-b border-dashed border-gray-400 pointer-events-none" />
              {upperLetters.map((char, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center min-w-[52px] h-24 relative z-10 bg-white border border-gray-300 rounded-lg shadow-2xs p-1"
                >
                  <span 
                    className="trace-dotted-letter text-5xl font-editorial font-bold select-none"
                    style={{
                      strokeDasharray: '4 3',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {char}
                  </span>
                  <span className="text-[8px] font-mono text-gray-500 mt-1">
                    stroke #{index + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Blank Practice Line for Independent Writing */}
            <div className="border border-black rounded-xl p-3 bg-white space-y-1">
              <span className="text-[9px] uppercase font-bold text-gray-600 block">
                Now try writing your name independently on the baseline:
              </span>
              <div className="flex items-center justify-around gap-2 pt-2">
                {upperLetters.map((_, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center justify-end min-w-[52px] h-14 border-b-2 border-black"
                  >
                    <span className="text-[9px] text-gray-400 font-mono mb-1">
                      [ letter {index + 1} ]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warmup 3: Numeracy Counting & Tracing (ELDA 4) */}
          <div className="border-2 border-black rounded-xl p-3 bg-white space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Step 3: Spaza Shop Number Tracing (1 to 5)
            </h3>

            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { num: '1', item: '1 Taxi', zu: 'Itekisi linye', icon: '🚕' },
                { num: '2', item: '2 Magwinya', zu: 'Amagwinya amabili', icon: '🥯' },
                { num: '3', item: '3 Wire Cars', zu: 'Izimoto ezintathu', icon: '🚗' },
                { num: '4', item: '4 Peaches', zu: 'Amapentshisi amane', icon: '🍑' },
                { num: '5', item: '5 Bottle Caps', zu: 'Izivalo ezinhlanu', icon: '🔘' },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="trace-dotted-box rounded-lg p-2 flex flex-col items-center justify-between bg-white"
                >
                  <span className="text-2xl font-mono font-bold text-gray-400 border-b border-dashed border-gray-300 pb-0.5 w-full">
                    {item.num}
                  </span>
                  <span className="text-xl my-0.5 select-none">{item.icon}</span>
                  <p className="font-bold text-[10px] text-black leading-tight">{item.item}</p>
                  <p className="text-[8px] text-gray-500 italic">{item.zu}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher & Parent Guidance Box (.print-notes-box) */}
          <div className="print-notes-box flex justify-between items-center text-gray-700">
            <div>
              <strong>Handwriting Assessment:</strong> Observe whether the learner forms letters from top to bottom. Praise steady grip and effort rather than perfect letter formation.
            </div>
            <div className="text-right shrink-0 ml-4 font-mono text-[10px]">
              Page 2 of 3 · A4 Standard
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* SECTION 3: CUT-OUT SHAPE PUZZLE (A4 PAGE 3)                             */}
        {/* ======================================================================= */}
        <div className="worksheet-frame avoid-break space-y-4">
          
          {/* Print Header */}
          <div className="print-student-header">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-editorial text-2xl font-bold tracking-tight text-black m-0 p-0">
                  BANAPELE AI · IMBEWU
                </h2>
                <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Section 3 · Cut-Out Shape Puzzle
                </span>
              </div>
              <p className="text-[11px] text-gray-700 mt-0.5">
                Bilateral Scissor Coordination & Spatial Reasoning · NCF ELDA 4 & ELDA 5
              </p>
            </div>

            <div className="text-right text-xs space-y-1">
              <div>
                <strong>Learner Name:</strong>{' '}
                <span className="print-underline text-center font-bold px-2">{childName}</span>
              </div>
              <div className="text-[10px] text-gray-600">
                ✂️ Scissors & Glue Session
              </div>
            </div>
          </div>

          {/* Scissor Safety & Cut-Out Area Guide */}
          <div className="border border-black p-3 rounded-lg flex items-center justify-between text-xs bg-gray-50/50">
            <p className="font-medium text-black">
              ✂️ <strong>Scissor Instructions:</strong> With adult supervision, carefully cut out the 4 geometric shapes along the dashed cut lines below. Then match each shape to its silhouette on the Soweto Landmark Board!
            </p>
            <span className="font-bold text-[9px] border border-black px-2 py-0.5 uppercase shrink-0 ml-3">
              Safety First
            </span>
          </div>

          {/* Part A: 4 Shape Cut-Out Pieces with Scissor Lines */}
          {/* Uses .print-cut-line from index.css */}
          <div className="border-2 border-black rounded-xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                Cut-Out Shape Pieces (Cut Along Dashed Lines)
              </span>
              <span className="text-[10px] text-gray-500 font-mono">4 Shapes to Match</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Shape 1: Circle (Taxi Wheel) */}
              <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50/50 relative">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-1.5 bg-white">
                  <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                    <span className="text-[8px] font-bold font-mono">1</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-black leading-tight">Circle · Isondo</p>
                <p className="text-[9px] text-gray-600">Minibus Taxi Wheel</p>
                <span className="text-[8px] text-gray-400 mt-1 font-mono">✂ cut circle</span>
              </div>

              {/* Shape 2: Triangle (Stoep Roof) */}
              <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50/50 relative">
                <svg viewBox="0 0 70 60" className="w-16 h-14 stroke-black fill-none stroke-2 mb-1.5">
                  <polygon points="35,6 64,54 6,54" />
                  <text x="35" y="42" textAnchor="middle" className="text-[9px] font-bold font-mono" stroke="none" fill="#000000">TRIANGLE</text>
                </svg>
                <p className="text-[11px] font-bold text-black leading-tight">Triangle · Uphahla</p>
                <p className="text-[9px] text-gray-600">House Stoep Roof</p>
                <span className="text-[8px] text-gray-400 mt-1 font-mono">✂ cut triangle</span>
              </div>

              {/* Shape 3: Square (Spaza Shop Window) */}
              <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50/50 relative">
                <div className="w-14 h-14 border-2 border-black flex flex-col items-center justify-center mb-1.5 bg-white">
                  <span className="text-[9px] font-bold font-mono">SQUARE</span>
                  <span className="text-[7px] text-gray-500">4 equal sides</span>
                </div>
                <p className="text-[11px] font-bold text-black leading-tight">Square · Ifasitela</p>
                <p className="text-[9px] text-gray-600">Spaza Shop Window</p>
                <span className="text-[8px] text-gray-400 mt-1 font-mono">✂ cut square</span>
              </div>

              {/* Shape 4: Star (Orlando Tower Beacon) */}
              <div className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center bg-gray-50/50 relative">
                <svg viewBox="0 0 60 60" className="w-14 h-14 stroke-black fill-none stroke-2 mb-1.5">
                  <polygon points="30,5 37,22 55,22 40,34 46,52 30,41 14,52 20,34 5,22 23,22" />
                </svg>
                <p className="text-[11px] font-bold text-black leading-tight">Star · Inkanyezi</p>
                <p className="text-[9px] text-gray-600">Orlando Night Beacon</p>
                <span className="text-[8px] text-gray-400 mt-1 font-mono">✂ cut star</span>
              </div>

            </div>
          </div>

          {/* Dotted Cut Separator line */}
          <div className="print-cut-line my-4" />

          {/* Part B: Silhouette Matching Board (Where cut shapes get pasted) */}
          <div className="border-2 border-black rounded-xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Shapes className="w-3.5 h-3.5" />
                Soweto Landmark Silhouette Board (Glue Cut Pieces Here)
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Match & Paste</span>
            </div>

            <div className="border border-black rounded-xl p-4 bg-gray-50/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              {/* Silhouette Target 1: Circle */}
              <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white shadow-2xs">
                <div className="w-14 h-14 rounded-full border-2 border-black/30 flex items-center justify-center mb-1">
                  <span className="text-xs text-gray-400 font-mono">●</span>
                </div>
                <p className="text-[10px] font-bold text-gray-700">Taxi Wheel Spot</p>
                <p className="text-[8px] text-gray-400">[ Paste Circle Here ]</p>
              </div>

              {/* Silhouette Target 2: Triangle */}
              <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white shadow-2xs">
                <svg viewBox="0 0 60 50" className="w-14 h-12 stroke-black/30 fill-none stroke-2 mb-1">
                  <polygon points="30,5 55,45 5,45" />
                </svg>
                <p className="text-[10px] font-bold text-gray-700">Stoep Roof Spot</p>
                <p className="text-[8px] text-gray-400">[ Paste Triangle Here ]</p>
              </div>

              {/* Silhouette Target 3: Square */}
              <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white shadow-2xs">
                <div className="w-12 h-12 border-2 border-black/30 flex items-center justify-center mb-1">
                  <span className="text-xs text-gray-400 font-mono">■</span>
                </div>
                <p className="text-[10px] font-bold text-gray-700">Window Spot</p>
                <p className="text-[8px] text-gray-400">[ Paste Square Here ]</p>
              </div>

              {/* Silhouette Target 4: Star */}
              <div className="h-32 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-2 bg-white shadow-2xs">
                <svg viewBox="0 0 50 50" className="w-14 h-14 stroke-black/30 fill-none stroke-2 mb-1">
                  <polygon points="25,4 31,18 46,18 34,28 39,43 25,34 11,43 16,28 4,18 19,18" />
                </svg>
                <p className="text-[10px] font-bold text-gray-700">Beacon Star Spot</p>
                <p className="text-[8px] text-gray-400">[ Paste Star Here ]</p>
              </div>

            </div>
          </div>

          {/* Teacher & Parent Guidance Box (.print-notes-box) */}
          <div className="print-notes-box flex justify-between items-center text-gray-700">
            <div>
              <strong>Spatial Reasoning Note:</strong> Praise the child's shape rotation and alignment efforts. Ask: <em>"How many sides does the triangle have?"</em> (3 sides / amacala amathathu).
            </div>
            <div className="text-right shrink-0 ml-4 font-mono text-[10px]">
              Page 3 of 3 · A4 Standard
            </div>
          </div>

          {/* Global Institutional DBE Footer */}
          <div className="pt-3 border-t-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] text-gray-700 gap-2">
            <div>
              <p><strong>BanaPele AI · Imbewu Foundation Phase Kit</strong></p>
              <p className="text-gray-500">Department of Basic Education NCF (Birth to 4) & CAPS Grade R Aligned.</p>
            </div>
            <div className="text-right">
              <p>Personalized for learner: <strong>{childName}</strong> ({childAge} yrs)</p>
              <p className="text-gray-500">BanaPele AI · Ink-Saver A4 Standard 🇿🇦</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PrintableGenerator;
