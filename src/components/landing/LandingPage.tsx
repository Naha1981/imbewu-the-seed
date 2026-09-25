import React from 'react';
import { Sparkles, ArrowRight, Printer, BookOpen, Heart, School, ShieldCheck, Check, Star, ChevronDown, Layers } from 'lucide-react';
import type { LanguageCode } from '../../types';
import { MiniDemo } from './MiniDemo';
import logoImg from '../../assets/images/imbewu_brand_logo_1789894767533.jpg';

interface LandingPageProps {
  language: LanguageCode;
  onStartParent: () => void;
  onStartTeacher: () => void;
  onSelectPlan: (plan: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onStartParent,
  onStartTeacher,
  onSelectPlan
}) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#14213D] selection:bg-[#E07A5F] selection:text-white">
      
      {/* 01 HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E07A5F]/10 border border-[#E07A5F]/20 text-[#E07A5F] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
                {language === 'zu' ? 'Uhlelo Lokufunda LwaseNingizimu Afrika' : 'South African Early Learning'}
              </div>

              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#14213D] leading-[1.08]">
                {language === 'zu' ? (
                  <>
                    Izingqondo ezincane. <br />
                    <span className="text-[#E07A5F] italic">Ukuqala okukhulu.</span>
                  </>
                ) : (
                  <>
                    Little minds. <br />
                    <span className="text-[#E07A5F] italic">Big beginnings.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-xl text-[#4B5563] max-w-2xl font-normal leading-relaxed">
                {language === 'zu' ? (
                  'I-Imbewu iletha ukufunda empilweni yansuku zonke — ngemisebenzi yokudlala, ama-pack okufunda aphrintiwe, kanye namathuluzi alula entuthuko enzelwe imindeni yaseNingizimu Afrika nezikhungo ze-ECD.'
                ) : (
                  'Imbewu brings learning into everyday life — with playful activities, printable learning packs and simple progress tools made for South African families and ECD centres.'
                )}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onStartParent}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-8 py-4 rounded-full font-bold text-base shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'zu' ? 'Qala Ukufunda Mahhala' : 'Start Learning Free'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onStartTeacher}
                  className="inline-flex items-center justify-center gap-2 bg-[#2A9D8F] hover:bg-[#238276] text-white px-7 py-4 rounded-full font-bold text-base shadow-sm transition-all"
                >
                  <School className="w-4 h-4" />
                  <span>{language === 'zu' ? 'Ngingumthisha wase-ECD' : "I'm an ECD Teacher"}</span>
                </button>
              </div>

              {/* Trust & Promise Bar */}
              <div className="pt-6 border-t border-[#EADFCF] flex flex-wrap items-center gap-6 text-xs text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>English & isiZulu Bilingual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Print-First A4 Worksheets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Ages 3–6 Progression</span>
                </div>
              </div>

            </div>

            {/* Right Column: Tactile Seed & Learning Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-xl border border-[#EADFCF]">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#FAF7F2]">
                  <div className="flex items-center gap-2.5">
                    <img src={logoImg} alt="Imbewu" className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-[#14213D]">Daily Seed 🌱</h4>
                      <p className="text-[11px] text-[#6B7280]">Lerato · 4 Years</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F]">
                    Practising
                  </span>
                </div>

                {/* Activity preview */}
                <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EADFCF]/60 text-center mb-4">
                  <span className="text-[10px] uppercase font-bold text-[#E07A5F] tracking-wider">
                    5-Minute Activity
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#14213D] mt-1 mb-2">
                    Match B → b
                  </h3>
                  <p className="text-xs text-[#6B7280] mb-4">
                    B is for Ball (Ibhola) & Bread (Isinkwa)
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="w-12 h-12 rounded-xl bg-white border border-[#EADFCF] flex items-center justify-center font-editorial text-2xl font-bold text-[#14213D] shadow-xs">
                      B
                    </span>
                    <span className="self-center text-[#E07A5F] font-bold">➔</span>
                    <span className="w-12 h-12 rounded-xl bg-[#2A9D8F] text-white flex items-center justify-center font-editorial text-2xl font-bold shadow-xs">
                      b
                    </span>
                  </div>
                </div>

                {/* Printable Pack highlight */}
                <div className="flex items-center justify-between p-3.5 bg-[#F4EDE2] rounded-xl text-xs font-semibold text-[#14213D]">
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-[#E07A5F]" />
                    <span>Printable A4 Pack Ready</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#E07A5F]">A4 PDF</span>
                </div>

              </div>

              {/* Floating accent badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#14213D] text-white p-4 rounded-2xl shadow-lg hidden sm:block max-w-[210px] border border-white/10">
                <p className="text-xs font-bold text-[#F4A261] mb-1">“Learn → Practise → Play → Print → Track”</p>
                <p className="text-[10px] text-gray-300">Nourishment for young growing minds.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 02 WATERFALL CARD EXPERIENCE (SECTION 36) */}
      <section className="py-16 bg-[#F4EDE2]/70 border-t border-[#EADFCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
              The Imbewu Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#14213D] mt-2">
              Everything young minds need to thrive
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Letters */}
            <div className="bg-white rounded-2xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-editorial text-2xl font-bold mb-4">
                Aa
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#14213D] mb-2">Letters & Sounds</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Uppercase and lowercase matching, stroke tracing, and South African phonemic awareness (B = Bus, Bread, Ball).
              </p>
            </div>

            {/* Card 2: Numbers */}
            <div className="bg-white rounded-2xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center font-editorial text-2xl font-bold mb-4">
                123
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#14213D] mb-2">Numbers & Counting</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                One-to-one counting up to 10 with familiar local objects: mangoes, cows, soccer balls, and everyday household items.
              </p>
            </div>

            {/* Card 3: Stories */}
            <div className="bg-white rounded-2xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F4A261]/20 text-[#D46A4F] flex items-center justify-center font-bold text-xl mb-4">
                📖
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#14213D] mb-2">Bilingual Stories</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Rich stories in English and isiZulu with local vocabulary, comprehension questions, and colouring activities.
              </p>
            </div>

            {/* Card 4: Fine Motor & Pencil */}
            <div className="bg-white rounded-2xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl mb-4">
                ✏️
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#14213D] mb-2">Pencil Control & Mazes</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Gentle line tracing, curves, and hand-eye coordination paths built for 3 to 6-year-old physical motor progression.
              </p>
            </div>

            {/* Card 5: Print First */}
            <div className="bg-white rounded-2xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xl mb-4">
                🖨️
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#14213D] mb-2">Print-First Philosophy</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                “Sometimes the best screen is no screen.” Generate, download high-resolution A4 PDFs, print, and use offline.
              </p>
            </div>

            {/* Card 6: Progress Tracking */}
            <div className="bg-white rounded-2xl p-6 border border-[#EADFCF] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl mb-4">
                🌱
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#14213D] mb-2">Gentle Progress Tracking</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                No stressful diagnostic tests. Just clear practice signals (Introduced → Practising → Developing → Confident).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 03 PUBLIC MINI DEMO (SECTION 37) */}
      <MiniDemo language={language} onSignUp={onStartParent} />

      {/* 04 FOR PARENTS & FOR ECD CENTRES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* For Parents Box */}
            <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#EADFCF]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-bold uppercase mb-4">
                <Heart className="w-3.5 h-3.5" />
                For Parents
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mb-4">
                “This understands my child.”
              </h3>
              <p className="text-[#6B7280] text-sm sm:text-base mb-6 leading-relaxed">
                You don't need a teaching degree or hours of prep. Imbewu gives you one daily recommended 5-minute activity, easy printable worksheets, and bilingual support you can do around the kitchen table.
              </p>
              <ul className="space-y-3 text-sm text-[#4B5563] mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Simple daily recommendation answering “What should we do today?”</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Interactive activities with large touch targets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Printable A4 worksheets with South African vocabulary</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Support in English and isiZulu</span>
                </li>
              </ul>
              <button
                onClick={onStartParent}
                className="bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-6 py-3 rounded-full text-xs font-bold shadow-sm transition-all"
              >
                Start Parent Experience →
              </button>
            </div>

            {/* For ECD Teachers Box */}
            <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#EADFCF]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] text-xs font-bold uppercase mb-4">
                <School className="w-3.5 h-3.5" />
                For ECD Teachers & Creches
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mb-4">
                “This makes my work easier.”
              </h3>
              <p className="text-[#6B7280] text-sm sm:text-base mb-6 leading-relaxed">
                ECD teachers juggle large classrooms and limited time. Imbewu's <strong>Build My Week</strong> generator creates structured 5-day lesson plans, classroom printable packs, and Google Calendar schedules in seconds.
              </p>
              <ul className="space-y-3 text-sm text-[#4B5563] mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span><strong>Build My Week</strong> 5-day structured lesson generator</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Google Calendar integration for teacher planning</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Classroom print packs for up to 50 learners</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Simple learner observation and progress logging</span>
                </li>
              </ul>
              <button
                onClick={onStartTeacher}
                className="bg-[#2A9D8F] hover:bg-[#238276] text-white px-6 py-3 rounded-full text-xs font-bold shadow-sm transition-all"
              >
                Open Teacher Portal →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 05 PRICING ARCHITECTURE (SECTION 8) */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#EADFCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
              BanaPele AI Transparent Pricing
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#14213D] mt-2 mb-3">
              Priced for Soweto Households & Community Creches
            </h2>
            <p className="text-sm text-[#4B5563] max-w-2xl mx-auto">
              Real education without competing with grocery essentials. Cheaper than Showmax Mobile (R45), with weekly R12 micro-billing and spaza shop cash vouchers.
            </p>
          </div>

          {/* 4-Tier Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tier 1: Ubuntu Free */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADFCF] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-editorial text-lg font-bold text-[#14213D]">1. Ubuntu Free</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    Forever R0
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-[#14213D] mb-1">
                  R0 <span className="text-xs text-[#6B7280] font-normal">/ forever</span>
                </div>
                <p className="text-[11px] text-[#6B7280] mb-4">
                  Organic viral hook & WhatsApp sharing. Always free for every South African child.
                </p>
                <ul className="space-y-2 text-xs text-[#4B5563] mb-6">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Daily Encouragement 5-minute activity card with audio</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>2 personalized digital stories per month</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>1 low-res watermarked printable sample</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Fish Audio studio trial with 30s Golden Teaser</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onStartParent}
                className="w-full py-3 rounded-full border-2 border-[#14213D] text-[#14213D] font-bold text-xs hover:bg-[#14213D] hover:text-white transition-all"
              >
                Start Free Forever
              </button>
            </div>

            {/* Tier 2: Parent Pro */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E07A5F] shadow-lg relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E07A5F] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-xs whitespace-nowrap">
                Zero-Guilt Price
              </div>
              <div>
                <div className="flex justify-between items-center mb-3 pt-1">
                  <h3 className="font-editorial text-lg font-bold text-[#14213D]">2. Parent Pro</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F]">
                    Kasi Hero Pass
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-[#14213D] mb-0.5">
                  R39 <span className="text-xs text-[#6B7280] font-normal">/ month</span>
                </div>
                <p className="text-[11px] font-bold text-[#2A9D8F] mb-3">
                  or R12 / week micro-billing (R349/yr)
                </p>
                <p className="text-[11px] text-[#6B7280] mb-4">
                  Working parents, shift workers, and Gogos. Cost of a loaf of bread and cold drink.
                </p>
                <ul className="space-y-2 text-xs text-[#4B5563] mb-6">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span><strong>Unlimited Bedtime Audiobooks</strong> in Mommy's cloned voice</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>2 Voice Clones (Mother + Gogo/Father)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Bedtime Dark Mode (anti-blue light)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span><strong>Direct-to-WhatsApp Voice Notes</strong> for night shifts (Bara nurses)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Clean ink-saver A4 printables without watermark</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onSelectPlan('PARENT_PRO')}
                className="w-full py-3.5 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white font-bold text-xs shadow-sm transition-all"
              >
                Join Parent Pro (R39/mo)
              </button>
            </div>

            {/* Tier 3: Creche Starter */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADFCF] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-editorial text-lg font-bold text-[#14213D]">3. Creche Starter</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    &lt; R6 / child
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-[#14213D] mb-1">
                  R149 <span className="text-xs text-[#6B7280] font-normal">/ month</span>
                </div>
                <p className="text-[11px] text-[#6B7280] mb-4">
                  For home-based creches & playgroups (up to 25 kids). Less than half of one child's fee.
                </p>
                <ul className="space-y-2 text-xs text-[#4B5563] mb-6">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Up to 25 learners capacity</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>1 Teacher Voice Clone (resting-time stories)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Unlimited classroom printable mats</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Replaces generic exercise books (saves R150+/kid)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Basic NCF/ELDA milestone tracking</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onSelectPlan('CRECHE_STARTER')}
                className="w-full py-3 rounded-full bg-[#14213D] hover:bg-black text-white font-bold text-xs transition-all"
              >
                Get Creche Starter (R149)
              </button>
            </div>

            {/* Tier 4: Creche Champion */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#2A9D8F] shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2A9D8F] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-xs whitespace-nowrap">
                DBE Subsidy Protection
              </div>
              <div>
                <div className="flex justify-between items-center mb-3 pt-1">
                  <h3 className="font-editorial text-lg font-bold text-[#14213D]">4. Creche Champion</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F]">
                    Up to 60 Kids
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-[#14213D] mb-1">
                  R289 <span className="text-xs text-[#6B7280] font-normal">/ month</span>
                </div>
                <p className="text-[11px] text-[#6B7280] mb-4">
                  For formal Soweto community centres. Protects the R24/day/child government subsidy.
                </p>
                <ul className="space-y-2 text-xs text-[#4B5563] mb-6">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Up to 60 learners capacity</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span><strong>Auto-Generated DBE Portfolio of Evidence (PoE)</strong> with stamp</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>3 Teacher Voice Clones (Baby, Toddler, Grade R)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Weekly WhatsApp Parent Broadcaster</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span>Bulk ink-saving print queues</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onSelectPlan('CRECHE_CHAMPION')}
                className="w-full py-3.5 rounded-full bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs shadow-sm transition-all"
              >
                Get Creche Champion (R289)
              </button>
            </div>

          </div>

          {/* Localized Payment Rails Callout */}
          <div className="mt-10 p-5 rounded-3xl bg-[#FAF7F2] border border-[#EADFCF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇿🇦</span>
              <div>
                <p className="font-bold text-[#14213D]">
                  No Credit Card Required: Township Local Payment Rails Supported
                </p>
                <p className="text-[#6B7280]">
                  Pay via <strong>Capitec Pay & Instant EFT</strong>, buy a voucher at any <strong>spaza shop (Flash, 1Voucher, Kazang)</strong>, or charge <strong>R12/week</strong> directly to your MTN / Vodacom airtime.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="bg-white border border-[#EADFCF] px-2.5 py-1 rounded-lg font-bold text-[11px]">Capitec Pay</span>
              <span className="bg-white border border-[#EADFCF] px-2.5 py-1 rounded-lg font-bold text-[11px]">Flash Spaza</span>
              <span className="bg-white border border-[#EADFCF] px-2.5 py-1 rounded-lg font-bold text-[11px]">1Voucher</span>
            </div>
          </div>

        </div>
      </section>

      {/* 06 FOOTER */}
      <footer className="bg-[#14213D] text-white py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <img src={logoImg} alt="Imbewu" className="w-10 h-10 rounded-xl object-cover" />
                <span className="font-editorial text-2xl font-bold tracking-tight">IMBEWU</span>
              </div>
              <p className="text-xs text-gray-300 max-w-sm mb-4">
                The Seed. South African early learning platform for children ages 3–6, parents, and ECD centres.
              </p>
              <p className="text-[11px] text-gray-400">
                Powered by <strong className="text-white">NahaLabs (PTY) Ltd</strong> · Johannesburg, South Africa
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4A261] mb-3">Platform</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><button onClick={onStartParent} className="hover:text-white">For Parents</button></li>
                <li><button onClick={onStartTeacher} className="hover:text-white">For ECD Teachers</button></li>
                <li><button onClick={() => window.location.hash = '#mini-demo'} className="hover:text-white">Public Mini Demo</button></li>
                <li><span className="text-gray-400">English + isiZulu</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4A261] mb-3">Compliance & Security</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><span>Child Privacy First</span></li>
                <li><span>Google Data Compliant</span></li>
                <li><span>PayFast South African Payments</span></li>
                <li><span>Firebase Authentication</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400">
            <p>© {new Date().getFullYear()} NahaLabs (PTY) Ltd. All rights reserved. Imbewu — The Seed.</p>
            <p className="mt-2 sm:mt-0">Built for South African families and ECD centres.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
