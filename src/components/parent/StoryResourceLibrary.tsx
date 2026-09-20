import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Filter, Printer, Sparkles, Volume2, ChevronLeft, ChevronRight, X, Heart, Star, Check, Award, Compass } from 'lucide-react';
import type { ChildProfile, LanguageCode, StoryResourceItem, StoryAgeGroup, StoryTheme, PlanTier } from '../../types';
import { CURATED_STORIES_RESOURCES } from '../../data/learningPromptsAndStories';

interface StoryResourceLibraryProps {
  child: ChildProfile;
  language: LanguageCode;
  userPlan: PlanTier;
  onOpenPaywall: (feature: 'pdf_download' | 'weekly_pack' | 'multi_child') => void;
  onOpenWorksheet?: (worksheetId: string) => void;
}

export const StoryResourceLibrary: React.FC<StoryResourceLibraryProps> = ({
  child,
  language,
  userPlan,
  onOpenPaywall,
  onOpenWorksheet
}) => {
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStory, setActiveStory] = useState<StoryResourceItem | null>(null);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [bilingualMode, setBilingualMode] = useState<'both' | 'en' | 'zu'>('both');

  // Filtered stories
  const filteredStories = useMemo(() => {
    return CURATED_STORIES_RESOURCES.filter(story => {
      if (selectedAge !== 'all' && story.ageGroup !== selectedAge) return false;
      if (selectedTheme !== 'all' && story.theme !== selectedTheme) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(q) || story.titleZu.toLowerCase().includes(q);
        const matchesSummary = story.summaryEn.toLowerCase().includes(q) || story.summaryZu.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary) return false;
      }
      return true;
    });
  }, [selectedAge, selectedTheme, searchQuery]);

  const playPageTurnSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio context restricted
    }
  };

  const openStoryReader = (story: StoryResourceItem) => {
    setActiveStory(story);
    setCurrentPageIdx(0);
    playPageTurnSound();
  };

  const handleNextPage = () => {
    if (!activeStory) return;
    if (currentPageIdx < activeStory.pages.length - 1) {
      playPageTurnSound();
      setCurrentPageIdx(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      playPageTurnSound();
      setCurrentPageIdx(prev => prev - 1);
    }
  };

  const handlePrintMiniBook = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14213D] to-[#2B3A67] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-[#2A9D8F]/25 text-[#2A9D8F] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'zu' ? 'Umtapo Wezincwadi Nezifundo' : 'Story & Resource Library'}</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2">
            South African Stories & Printable Home Resources
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Culturally resonant short stories, bilingual read-alouds, and printable activity packs categorized by age group (3–4, 4–5, 5–6) and early learning themes.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-white/70">
            <span>📚 {CURATED_STORIES_RESOURCES.length} Ready Stories</span>
            <span>🇿🇦 English & isiZulu Bilingual</span>
            <span>🖨️ Printable Mini-Booklets</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-[#EADFCF] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories by title, character (e.g. Sipho, Lulu), or theme..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] text-xs text-[#14213D] focus:outline-hidden focus:border-[#2A9D8F]"
            />
          </div>

          {/* Age Group Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-2xl border border-[#EADFCF] shrink-0">
            <span className="text-[11px] font-bold text-[#6B7280] px-2">Age:</span>
            {['all', '3-4', '4-5', '5-6'].map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedAge === age
                    ? 'bg-[#14213D] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#14213D]'
                }`}
              >
                {age === 'all' ? 'All Ages' : `Ages ${age}`}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-[#6B7280] shrink-0">Themes:</span>
          {[
            { id: 'all', label: 'All Themes' },
            { id: 'animals', label: '🐾 Animals & Veld' },
            { id: 'ubuntu_family', label: '🤝 Ubuntu & Family' },
            { id: 'nature_gardening', label: '🌻 Nature & Gardening' },
            { id: 'shapes_counting', label: '⭐ Shapes & Counting' },
            { id: 'food_culture', label: '🍉 Market & Food' }
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold border transition ${
                selectedTheme === theme.id
                  ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                  : 'bg-white text-[#6B7280] border-[#EADFCF] hover:bg-[#FAF7F2]'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-3xl border border-[#EADFCF] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition group"
          >
            <div>
              {/* Card Header Illustration */}
              <div className={`h-36 bg-gradient-to-tr ${story.themeColor} p-6 flex items-center justify-between text-white relative`}>
                <div className="text-6xl filter drop-shadow-md select-none group-hover:scale-110 transition duration-300">
                  {story.coverEmoji}
                </div>

                <div className="text-right space-y-1">
                  <span className="inline-block bg-black/20 backdrop-blur-xs text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    Ages {story.ageGroup}
                  </span>
                  <p className="text-[11px] text-white/90 font-medium">
                    ⏱️ {story.readingTimeMinutes} min read
                  </p>
                </div>
              </div>

              {/* Story Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#2A9D8F] bg-[#2A9D8F]/10 px-2.5 py-0.5 rounded-full">
                    {story.theme.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-[#6B7280] font-semibold">
                    {story.pages.length} illustrated pages
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#14213D] group-hover:text-[#2A9D8F] transition">
                  {language === 'zu' ? story.titleZu : story.title}
                </h3>
                <p className="text-xs font-semibold text-[#E07A5F] mt-0.5">
                  {language === 'zu' ? story.title : story.titleZu}
                </p>

                <p className="text-xs text-[#4B5563] mt-2.5 line-clamp-2 leading-relaxed">
                  {language === 'zu' ? story.summaryZu : story.summaryEn}
                </p>

                {/* Key Vocabulary Chips */}
                <div className="mt-4 pt-3 border-t border-[#EADFCF]/60">
                  <p className="text-[10px] uppercase font-bold text-[#6B7280] mb-1.5">
                    Vocabulary Highlights:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {story.keyVocabulary.slice(0, 3).map((v, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] bg-[#FAF7F2] text-[#14213D] px-2 py-0.5 rounded-md border border-[#EADFCF]"
                      >
                        <span>{v.icon}</span>
                        <span>{v.en} ({v.zu})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 border-t border-[#FAF7F2] flex items-center justify-between gap-2">
              <button
                onClick={() => openStoryReader(story)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#14213D] hover:bg-[#2A9D8F] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'zu' ? 'Funda Indaba' : 'Read Aloud'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveStory(story);
                  setTimeout(() => window.print(), 200);
                }}
                className="inline-flex items-center gap-1.5 bg-[#FAF7F2] hover:bg-[#EADFCF] text-[#14213D] px-3.5 py-2.5 rounded-xl text-xs font-bold border border-[#EADFCF] transition"
                title="Print story mini-booklet"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#EADFCF]">
          <Compass className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="font-editorial text-lg font-bold text-[#14213D]">No matching stories found</p>
          <p className="text-xs text-[#6B7280] mt-1">Try clearing your search query or selecting "All Ages".</p>
        </div>
      )}

      {/* Interactive Read-Aloud Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-[#EADFCF] shadow-2xl relative my-8 text-[#14213D]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EADFCF]">
              <div className="flex items-center gap-3">
                <div className="text-3xl select-none">{activeStory.coverEmoji}</div>
                <div>
                  <span className="text-[10px] uppercase font-black text-[#2A9D8F] bg-[#2A9D8F]/10 px-2.5 py-0.5 rounded-full">
                    Ages {activeStory.ageGroup} · {activeStory.readingTimeMinutes} min
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#14213D] mt-0.5">
                    {activeStory.title} ({activeStory.titleZu})
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintMiniBook}
                  className="p-2 text-[#6B7280] hover:text-[#14213D] hover:bg-[#FAF7F2] rounded-xl transition"
                  title="Print story cards"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveStory(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Language Display Toggle */}
            <div className="flex items-center justify-between mt-4 mb-3">
              <span className="text-xs font-bold text-[#6B7280]">
                Page {currentPageIdx + 1} of {activeStory.pages.length}
              </span>

              <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#EADFCF] text-xs">
                <button
                  onClick={() => setBilingualMode('both')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    bilingualMode === 'both' ? 'bg-[#14213D] text-white shadow-xs' : 'text-[#6B7280]'
                  }`}
                >
                  Both (EN + ZU)
                </button>
                <button
                  onClick={() => setBilingualMode('en')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    bilingualMode === 'en' ? 'bg-[#2A9D8F] text-white shadow-xs' : 'text-[#6B7280]'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setBilingualMode('zu')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    bilingualMode === 'zu' ? 'bg-[#E07A5F] text-white shadow-xs' : 'text-[#6B7280]'
                  }`}
                >
                  isiZulu
                </button>
              </div>
            </div>

            {/* Current Page Content Card */}
            {activeStory.pages[currentPageIdx] && (
              <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EADFCF] space-y-6">
                {/* Illustration Emoji */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border border-[#EADFCF] flex items-center justify-center text-5xl sm:text-6xl shadow-xs">
                    {activeStory.pages[currentPageIdx].illustrationEmoji}
                  </div>
                </div>

                {/* Story Text */}
                <div className="space-y-4 text-center max-w-xl mx-auto">
                  {(bilingualMode === 'both' || bilingualMode === 'en') && (
                    <p className="font-editorial text-lg sm:text-xl text-[#14213D] leading-relaxed">
                      "{activeStory.pages[currentPageIdx].textEn}"
                    </p>
                  )}

                  {(bilingualMode === 'both' || bilingualMode === 'zu') && (
                    <p className="font-editorial text-base sm:text-lg text-[#2A9D8F] font-semibold leading-relaxed">
                      "{activeStory.pages[currentPageIdx].textZu}"
                    </p>
                  )}
                </div>

                {/* Dialogue Prompt for Parents */}
                <div className="bg-white rounded-2xl p-4 border border-[#E07A5F]/40 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#E07A5F] mb-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Parent Connection Prompt:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#14213D] italic">
                    "{language === 'zu'
                      ? activeStory.pages[currentPageIdx].dialoguePromptZu
                      : activeStory.pages[currentPageIdx].dialoguePrompt}"
                  </p>
                </div>
              </div>
            )}

            {/* Parent Tip & Vocabulary Footer */}
            <div className="mt-4 pt-3 border-t border-[#EADFCF] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>
                  <strong>Tip: </strong>
                  {language === 'zu' ? activeStory.parentReadingTipZu : activeStory.parentReadingTipEn}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPageIdx === 0}
                  className="px-3 py-2 rounded-xl border border-[#EADFCF] bg-[#FAF7F2] text-[#14213D] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPageIdx === activeStory.pages.length - 1}
                  className="px-4 py-2 rounded-xl bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
