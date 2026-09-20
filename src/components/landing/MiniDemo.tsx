import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, Volume2, Star } from 'lucide-react';
import type { LanguageCode } from '../../types';

interface MiniDemoProps {
  language: LanguageCode;
  onSignUp: () => void;
}

type DemoCategory = 'ABC' | '123' | 'Shapes' | 'Pencil';

export const MiniDemo: React.FC<MiniDemoProps> = ({ language, onSignUp }) => {
  const [selectedAge, setSelectedAge] = useState<number>(4);
  const [category, setCategory] = useState<DemoCategory>('ABC');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);

  // Sound pronunciation helper using standard Web Speech API where available
  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'zu' ? 'zu-ZA' : 'en-ZA';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (val: string, correct: string) => {
    setSelectedOption(val);
    const right = val.toLowerCase() === correct.toLowerCase();
    setIsCorrect(right);
    if (right) {
      playSound(val);
      setTimeout(() => setCompleted(true), 600);
    }
  };

  const reset = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCompleted(false);
  };

  return (
    <section id="mini-demo" className="py-16 bg-[#F4EDE2] border-y border-[#EADFCF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'zu' ? 'Zama Idemo Yesikhashana' : 'Try A Little Learning'}
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#14213D] mb-3">
            {language === 'zu' 
              ? 'Bona ukuthi i-Imbewu isebenza kanjani'
              : 'Feel how Imbewu makes learning intuitive'}
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base">
            {language === 'zu'
              ? 'Khetha iminyaka nendawo yokufunda ukuze uzame umsebenzi wemizuzwana.'
              : 'Choose an age and topic to test an interactive, child-friendly activity.'}
          </p>
        </div>

        {/* Interactive Playground Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EADFCF]">
          
          {/* Controls: Age and Topic */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#F4EDE2]">
            {/* Age selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                {language === 'zu' ? 'Iminyaka:' : 'Age:'}
              </span>
              <div className="flex gap-1.5">
                {[3, 4, 5, 6].map(age => (
                  <button
                    key={age}
                    onClick={() => { setSelectedAge(age); reset(); }}
                    className={`w-9 h-9 rounded-xl font-bold text-sm transition-all ${
                      selectedAge === age
                        ? 'bg-[#14213D] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['ABC', '123', 'Shapes', 'Pencil'] as DemoCategory[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); reset(); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    category === cat
                      ? 'bg-[#E07A5F] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#6B7280] hover:text-[#14213D]'
                  }`}
                >
                  {cat === 'ABC' && '🔤 ABC'}
                  {cat === '123' && '🔢 123'}
                  {cat === 'Shapes' && '🔺 Shapes'}
                  {cat === 'Pencil' && '✏️ Pencil Skills'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Game Body */}
          <div className="min-h-[260px] flex flex-col items-center justify-center text-center">
            
            {/* ABC Mini Challenge */}
            {category === 'ABC' && (
              <div className="w-full max-w-md">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-20 h-20 bg-[#FAF7F2] border-2 border-[#14213D] rounded-2xl flex items-center justify-center font-editorial text-4xl font-bold text-[#14213D] shadow-inner">
                    B
                  </div>
                  <button 
                    onClick={() => playSound('Letter B. Sound buh. Buh as in ball and bread.')}
                    className="p-3 bg-[#FAF7F2] hover:bg-[#F4EDE2] text-[#14213D] rounded-full transition-colors"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-5 h-5 text-[#E07A5F]" />
                  </button>
                </div>

                <p className="text-base font-semibold text-[#14213D] mb-6">
                  {language === 'zu'
                    ? 'Thola inhlamvu encane ehambisana no-B omkhulu:'
                    : 'Tap the small lowercase letter that matches uppercase B:'}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {['d', 'b', 'p'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt, 'b')}
                      className={`h-16 rounded-2xl font-editorial text-3xl font-bold transition-all border-2 ${
                        selectedOption === opt
                          ? opt === 'b'
                            ? 'bg-[#2A9D8F]/15 border-[#2A9D8F] text-[#2A9D8F] scale-105'
                            : 'bg-red-50 border-red-400 text-red-600'
                          : 'bg-[#FAF7F2] border-[#EADFCF] hover:border-[#14213D] text-[#14213D]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#6B7280] mt-4">
                  🌱 B is for <span className="font-semibold text-[#14213D]">Ball</span> / <span className="font-semibold text-[#14213D]">Ibhola</span> & <span className="font-semibold text-[#14213D]">Bread</span> / <span className="font-semibold text-[#14213D]">Isinkwa</span>
                </p>
              </div>
            )}

            {/* 123 Mini Challenge */}
            {category === '123' && (
              <div className="w-full max-w-md">
                <div className="flex items-center justify-center gap-3 mb-6 text-4xl">
                  <span>🥭</span>
                  <span>🥭</span>
                  <span>🥭</span>
                  <span>🥭</span>
                </div>

                <p className="text-base font-semibold text-[#14213D] mb-6">
                  {language === 'zu'
                    ? 'Bala amamango. Mangaki amamango akhona?'
                    : 'Count the fresh mangoes. How many are there?'}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {['3', '4', '5'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt, '4')}
                      className={`h-16 rounded-2xl font-editorial text-3xl font-bold transition-all border-2 ${
                        selectedOption === opt
                          ? opt === '4'
                            ? 'bg-[#2A9D8F]/15 border-[#2A9D8F] text-[#2A9D8F] scale-105'
                            : 'bg-red-50 border-red-400 text-red-600'
                          : 'bg-[#FAF7F2] border-[#EADFCF] hover:border-[#14213D] text-[#14213D]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shapes Mini Challenge */}
            {category === 'Shapes' && (
              <div className="w-full max-w-md">
                <div className="w-16 h-16 rounded-full bg-[#E07A5F] mx-auto mb-5 shadow-xs" />
                <p className="text-base font-semibold text-[#14213D] mb-6">
                  {language === 'zu' ? 'Isiphi lesi simo sesiyingi?' : 'Which shape is this round one?'}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Circle', labelZu: 'Isiyingi', answer: true },
                    { label: 'Square', labelZu: 'Isikwele', answer: false },
                    { label: 'Triangle', labelZu: 'Unxantathu', answer: false }
                  ].map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.label, 'Circle')}
                      className={`h-14 px-2 rounded-2xl font-bold text-sm transition-all border-2 ${
                        selectedOption === opt.label
                          ? opt.answer
                            ? 'bg-[#2A9D8F]/15 border-[#2A9D8F] text-[#2A9D8F] scale-105'
                            : 'bg-red-50 border-red-400 text-red-600'
                          : 'bg-[#FAF7F2] border-[#EADFCF] hover:border-[#14213D] text-[#14213D]'
                      }`}
                    >
                      {language === 'zu' ? opt.labelZu : opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pencil Skills Mini Challenge */}
            {category === 'Pencil' && (
              <div className="w-full max-w-md">
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border-2 border-dashed border-[#14213D]/40 mb-5 flex items-center justify-between px-6">
                  <span className="text-2xl">🚌</span>
                  <div className="flex-1 mx-4 flex justify-between text-[#E07A5F] font-bold text-lg">
                    <span>•</span><span>•</span><span>•</span><span>•</span><span>•</span><span>•</span>
                  </div>
                  <span className="text-2xl">🏫</span>
                </div>
                <p className="text-base font-semibold text-[#14213D] mb-4">
                  {language === 'zu'
                    ? 'Landela umugqa wamachashaza ukuyisa ibhasi esikoleni!'
                    : 'Trace the dotted path to guide the bus to school!'}
                </p>
                <button
                  onClick={() => { setSelectedOption('traced'); setIsCorrect(true); setCompleted(true); }}
                  className="bg-[#2A9D8F] text-white px-6 py-3 rounded-full font-bold text-sm shadow-xs hover:bg-[#238276] transition-all"
                >
                  ✨ {language === 'zu' ? 'Qeda Umkhondo' : 'Complete Finger Tracing'}
                </button>
              </div>
            )}

          </div>

          {/* Outcome & Free Signup Prompt */}
          {completed && (
            <div className="mt-8 pt-6 border-t border-[#F4EDE2] bg-[#FAF7F2] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#14213D] text-sm sm:text-base">
                    {language === 'zu' ? 'Msebenzi omuhle kakhulu! 🌱' : 'Wonderful practice! 🌱'}
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    {language === 'zu'
                      ? 'Ufuna imisebenzi eklanyelwe umntwana wakho nama-pack aphrintiwe?'
                      : 'Want personalised activities and printable packs tailored to your child?'}
                  </p>
                </div>
              </div>

              <button
                onClick={onSignUp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-6 py-3 rounded-full font-bold text-xs shadow-sm transition-all shrink-0"
              >
                <span>{language === 'zu' ? 'Qala Mahhala' : 'Create Free Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
