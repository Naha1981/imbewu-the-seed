import React, { useState } from 'react';
import { 
  Headphones, 
  Sparkles, 
  Mic, 
  BookOpen, 
  Play, 
  Moon, 
  Heart, 
  School, 
  Lock, 
  Check, 
  Clock, 
  Plus, 
  ChevronRight,
  ShieldCheck,
  Volume2
} from 'lucide-react';
import type { ChildProfile, PlanTier, VoiceProfile, AudioBook } from '../../types';
import { FishAudioService } from '../../services/FishAudioService';
import { AudioBookGeneratorService, TOWNSHIP_STORY_TEMPLATES } from '../../services/AudioBookGeneratorService';
import { VoiceCloningStudio } from '../voice/VoiceCloningStudio';
import { AudioBookPlayer } from './AudioBookPlayer';

interface AudioBookStudioProps {
  role: 'parent' | 'teacher';
  child: ChildProfile;
  userPlan: PlanTier;
  onOpenPaywall: (feature: any) => void;
  onUpgradePlan: (plan: PlanTier) => void;
}

export const AudioBookStudio: React.FC<AudioBookStudioProps> = ({
  role,
  child,
  userPlan,
  onOpenPaywall,
  onUpgradePlan
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'generator' | 'voice_studio'>('stories');
  const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>(() => FishAudioService.getSavedVoiceProfiles());
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(() => voiceProfiles[0]?.id || '');
  
  // Story Generation Form State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(TOWNSHIP_STORY_TEMPLATES[0].id);
  const [customChildName, setCustomChildName] = useState(child.nickname || 'Thabo');
  const [suburb, setSuburb] = useState(child.neighborhood || 'Orlando West, Soweto');
  const [favoriteSnack, setFavoriteSnack] = useState(child.favoriteSnack || 'warm magwinya with apricot jam');
  const [friendOrPet, setFriendOrPet] = useState(child.favoriteToy || 'wire car Jabu');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active playing audio book
  const [activeAudioBook, setActiveAudioBook] = useState<AudioBook | null>(null);

  // Saved audio books
  const [audioBooks, setAudioBooks] = useState<AudioBook[]>(() => {
    const existing = AudioBookGeneratorService.getAllAudioBooks();
    if (existing.length > 0) return existing;

    // Seed one starter personalized book for instant delight
    const initialVoice = FishAudioService.getSavedVoiceProfiles()[0];
    const starter = AudioBookGeneratorService.generateAudioBook({
      templateId: TOWNSHIP_STORY_TEMPLATES[0].id,
      child,
      voiceProfile: initialVoice,
      suburb: child.neighborhood || 'Orlando West, Soweto',
      favoriteSnack: child.favoriteSnack || 'warm magwinya with apricot jam',
      friendOrPet: child.favoriteToy || 'wire car Jabu'
    });
    return [starter];
  });

  const handleVoiceCalibrated = (newProfile: VoiceProfile) => {
    setVoiceProfiles(FishAudioService.getSavedVoiceProfiles());
    setSelectedVoiceId(newProfile.id);
    setActiveTab('generator');
  };

  const handleGenerateStory = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const activeVoice = voiceProfiles.find(v => v.id === selectedVoiceId) || voiceProfiles[0];
      const newBook = AudioBookGeneratorService.generateAudioBook({
        templateId: selectedTemplateId,
        child: { ...child, nickname: customChildName },
        voiceProfile: activeVoice,
        suburb,
        favoriteSnack,
        friendOrPet
      });

      setAudioBooks(AudioBookGeneratorService.getAllAudioBooks());
      setIsGenerating(false);
      setActiveAudioBook(newBook);
    }, 1200);
  };

  // If currently playing a book, render the dedicated player view
  if (activeAudioBook) {
    return (
      <AudioBookPlayer
        audioBook={activeAudioBook}
        userPlan={userPlan}
        onUpgradePlan={onUpgradePlan}
        onBackToStudio={() => setActiveAudioBook(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Bedtime & Classroom Audio Studio */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1F2C4C] to-[#2B3A67] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-[#3A4B75]">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Headphones className="w-3.5 h-3.5" />
            <span>Kasi Bedtime & Classroom Audio Studio</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
            Personalized Bedtime Audiobooks Cloned in Your Voice
          </h2>

          <p className="text-sm text-gray-200 leading-relaxed mb-4">
            {role === 'parent'
              ? 'Give your child the comforting feeling of Mommy or Papa reading them to sleep—even when you are working late or night-shifts. Powered by authentic Fish Audio s2.1-pro voice cloning.'
              : 'Create classroom group rest-time stories narrated in Teacher’s calm voice, where each learner is celebrated as the hero in familiar Soweto landmarks.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs rounded-xl px-3 py-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Fish Audio s2.1-pro Neural Model</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs rounded-xl px-3 py-2">
              <Moon className="w-4 h-4 text-indigo-300" />
              <span>Anti-Blue Light Bedtime Mode</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs rounded-xl px-3 py-2">
              <Volume2 className="w-4 h-4 text-teal-300" />
              <span>African Lullaby & Crickets Ambient Mix</span>
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-3xl p-3 border border-[#EADFCF] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'stories'
                ? 'bg-[#14213D] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>1. Audio Books ({audioBooks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'generator'
                ? 'bg-[#14213D] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#2A9D8F]" />
            <span>2. Create New Audio Story</span>
          </button>

          <button
            onClick={() => setActiveTab('voice_studio')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'voice_studio'
                ? 'bg-[#E07A5F] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>3. Clone Voice Studio ({voiceProfiles.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 text-xs text-[#6B7280]">
          <span>Current Plan: <strong>{userPlan}</strong></span>
          {userPlan === 'FREE' && (
            <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
              30s Teaser Active
            </span>
          )}
        </div>
      </div>

      {/* TAB 1: AUDIO BOOKS LIST */}
      {activeTab === 'stories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-xl font-bold text-[#14213D]">
              Bedtime & Classroom Stories Library
            </h3>
            <button
              onClick={() => setActiveTab('generator')}
              className="text-xs font-bold text-[#2A9D8F] hover:underline flex items-center gap-1"
            >
              <span>+ Generate Another Story</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audioBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      {book.theme}
                    </span>
                    <span className="text-xs text-[#6B7280] font-mono">
                      ⏱️ 3 Chapters (~6 mins)
                    </span>
                  </div>

                  <h4 className="font-editorial text-xl font-bold text-[#14213D] mb-1 group-hover:text-[#E07A5F] transition-colors">
                    {book.title}
                  </h4>

                  <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                    Featuring <strong>{book.childName}</strong> in {book.suburb}, with {book.friendOrPet} and {book.favoriteSnack}.
                  </p>

                  <div className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-2xl border border-[#EADFCF]/60 text-xs mb-4">
                    <Volume2 className="w-4 h-4 text-[#E07A5F] shrink-0" />
                    <div>
                      <p className="font-bold text-[#14213D]">{book.voiceProfileName}</p>
                      <p className="text-[10px] text-[#6B7280]">Fish Audio s2.1-pro Cloned Voice</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#FAF7F2]">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cached Offline (Load-Shedding Ready)</span>
                  </span>

                  <button
                    onClick={() => setActiveAudioBook(book)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14213D] group-hover:bg-[#E07A5F] text-white font-bold text-xs shadow-xs transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Audio Story</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STORY GENERATION FORM */}
      {activeTab === 'generator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs space-y-6">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#14213D] mb-1">
              Synthesize a New Personalized Story
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Select a township adventure template and inject {child.nickname}’s neighborhood, favorite snacks, and toys.
            </p>
          </div>

          {/* Step 1: Select Story Template */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#14213D]">
              1. Choose Township Adventure:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TOWNSHIP_STORY_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedTemplateId === tpl.id
                      ? 'border-[#E07A5F] bg-[#E07A5F]/5 shadow-xs'
                      : 'border-[#EADFCF] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#E07A5F] block mb-1">
                    {tpl.theme}
                  </span>
                  <h4 className="font-editorial font-bold text-base text-[#14213D] mb-1">
                    {tpl.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-2">
                    {tpl.synopsis.replace('{{CHILD_NAME}}', customChildName)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Child Variable Customization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#FAF7F2]">
            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">Hero Child Name:</label>
              <input
                type="text"
                value={customChildName}
                onChange={(e) => setCustomChildName(e.target.value)}
                placeholder="e.g. Thabo or Lesedi"
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-bold text-[#14213D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">Soweto Suburb / Street:</label>
              <input
                type="text"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="e.g. Orlando West, Meadowlands Zone 2"
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-bold text-[#14213D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">Favorite Kasi Snack:</label>
              <input
                type="text"
                value={favoriteSnack}
                onChange={(e) => setFavoriteSnack(e.target.value)}
                placeholder="e.g. warm magwinya, chappies, roast mealie"
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-bold text-[#14213D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1">Best Friend or Special Toy:</label>
              <input
                type="text"
                value={friendOrPet}
                onChange={(e) => setFriendOrPet(e.target.value)}
                placeholder="e.g. his wire car Jabu, her best friend Buhle"
                className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-bold text-[#14213D]"
              />
            </div>
          </div>

          {/* Step 3: Select Cloned Voice */}
          <div className="pt-4 border-t border-[#FAF7F2] space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#14213D]">
                2. Select Cloned Voice Narrator:
              </label>
              <button
                onClick={() => setActiveTab('voice_studio')}
                className="text-xs font-bold text-[#E07A5F] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record New Voice Clone</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {voiceProfiles.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoiceId(v.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedVoiceId === v.id
                      ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 shadow-xs'
                      : 'border-[#EADFCF] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-white border border-[#EADFCF] text-[#14213D]">
                      {v.role === 'parent' ? <Heart className="w-4 h-4 text-[#E07A5F]" /> : <School className="w-4 h-4 text-[#2A9D8F]" />}
                    </span>
                    <div>
                      <p className="font-bold text-xs text-[#14213D]">{v.speakerName}</p>
                      <p className="text-[10px] text-[#6B7280]">
                        Language: {v.language.toUpperCase()} · Fish Audio s2.1-pro
                      </p>
                    </div>
                  </div>
                  {selectedVoiceId === v.id && (
                    <span className="w-5 h-5 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-4 border-t border-[#EADFCF] flex justify-end">
            <button
              onClick={handleGenerateStory}
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Synthesizing 3-Chapter Audiobook...' : 'Generate Personalized Audio Book'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: VOICE CLONING STUDIO */}
      {activeTab === 'voice_studio' && (
        <VoiceCloningStudio
          initialRole={role}
          onVoiceCalibrated={handleVoiceCalibrated}
          onCancel={() => setActiveTab('stories')}
        />
      )}

    </div>
  );
};
