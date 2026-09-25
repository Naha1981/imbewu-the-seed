import React, { useState } from 'react';
import { Sparkles, Calendar, Printer, Users, Plus, Check, Clock, School, ArrowRight, ExternalLink, Download, FileText, MessageCircle, Headphones, Moon } from 'lucide-react';
import type { Classroom, Learner, WeeklyLearningPack, LanguageCode, PlanTier } from '../../types';
import { EntitlementService } from '../../services/entitlementEngine';
import { TeacherWhatsAppShareModal } from './TeacherWhatsAppShareModal';
import { AudioBookStudio } from '../audiobook/AudioBookStudio';

interface TeacherDashboardProps {
  language: LanguageCode;
  userPlan: PlanTier;
  onOpenPaywall: (feature: any) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  language,
  userPlan,
  onOpenPaywall
}) => {
  const [activeTab, setActiveTab] = useState<'build_week' | 'classes' | 'worksheets' | 'calendar' | 'audiobook'>('build_week');
  const [isWhatsAppShareModalOpen, setIsWhatsAppShareModalOpen] = useState(false);
  
  // Weekly pack generation state
  const [theme, setTheme] = useState('South African Transport & Community');
  const [ageGroup, setAgeGroup] = useState('4-5 Years');
  const [langSelect, setLangSelect] = useState<LanguageCode>(language);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPack, setGeneratedPack] = useState<WeeklyLearningPack | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<Array<{ dayName: string; title: string; details: string; googleCalendarUrl: string }> | null>(null);

  // Demo classroom state
  const [classes, setClasses] = useState<Classroom[]>([
    {
      id: 'cls-1',
      centreId: 'cntr-1',
      name: 'Sunflowers (Ages 4-5)',
      ageRange: '4-5 Years',
      teacherName: 'Teacher Thandi',
      learnerCount: 18,
      createdAt: '2026-09-01'
    },
    {
      id: 'cls-2',
      centreId: 'cntr-1',
      name: 'Little Sprouts (Ages 3-4)',
      ageRange: '3-4 Years',
      teacherName: 'Teacher Thandi',
      learnerCount: 14,
      createdAt: '2026-09-01'
    }
  ]);

  const [learners, setLearners] = useState<Learner[]>([
    { id: 'lrn-1', classId: 'cls-1', centreId: 'cntr-1', nickname: 'Sipho', age: 4, preferredLanguage: 'zu', observationsCount: 4, skillsActiveCount: 3 },
    { id: 'lrn-2', classId: 'cls-1', centreId: 'cntr-1', nickname: 'Lesedi', age: 5, preferredLanguage: 'en', observationsCount: 5, skillsActiveCount: 4 },
    { id: 'lrn-3', classId: 'cls-1', centreId: 'cntr-1', nickname: 'Buhle', age: 4, preferredLanguage: 'zu', observationsCount: 3, skillsActiveCount: 2 }
  ]);

  const handleGenerateWeeklyPack = async () => {
    // Check entitlement: weekly pack generation is a paid feature
    const canGenerate = EntitlementService.canGenerateWeeklyPack(userPlan);
    if (!canGenerate) {
      onOpenPaywall('weekly_pack');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-weekly-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, language: langSelect, ageGroup })
      });
      const data = await response.json();
      if (data.pack) {
        setGeneratedPack(data.pack);
        // Automatically request Google Calendar events
        const calRes = await fetch('/api/calendar/generate-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packTitle: data.pack.title, theme, days: data.pack.days })
        });
        const calData = await calRes.json();
        if (calData.events) {
          setCalendarEvents(calData.events);
        }
      }
    } catch (err) {
      console.error('Failed to generate weekly pack', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#2A9D8F]/15 text-[#2A9D8F]">
                <School className="w-5 h-5" />
              </span>
              <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D]">
                Teacher & ECD Workspace
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Create → Print → Teach → Track. CAPS-aligned South African preschool planning.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('build_week')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'build_week' ? 'bg-[#2A9D8F] text-white shadow-xs' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              🌱 Build My Week
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'classes' ? 'bg-[#14213D] text-white shadow-xs' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              🏫 Classes & Learners
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'calendar' ? 'bg-[#E07A5F] text-white shadow-xs' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              📅 Google Calendar
            </button>
            <button
              onClick={() => setActiveTab('audiobook')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'audiobook' ? 'bg-[#14213D] text-amber-300 shadow-xs' : 'bg-[#FAF7F2] text-[#4B5563]'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              <span>🎧 Classroom Audio Studio</span>
              <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded-full font-extrabold">PRO</span>
            </button>
            <button
              onClick={() => setIsWhatsAppShareModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs inline-flex items-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Share Kit to Parents</span>
            </button>
          </div>
        </div>

        {/* TAB 1: BUILD MY WEEK WIZARD */}
        {activeTab === 'build_week' && (
          <div className="space-y-8">
            
            {/* Input Config Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] text-xs font-bold uppercase tracking-wider w-fit mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Weekly Curriculum Planner</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D] mb-2">
                Build My Week
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mb-6">
                Choose your weekly theme and goals. Imbewu prepares a structured 5-day plan with teacher instructions, learner worksheets, and Google Calendar sync.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-[#14213D] mb-1.5">Weekly Theme</label>
                  <select
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2.5 text-xs text-[#14213D] font-medium"
                  >
                    <option value="South African Transport & Community">🚌 Transport & Community Helpers</option>
                    <option value="My Body & Healthy Foods (Amamango, Ubisi)">🍎 Healthy Foods (Amamango, Ubisi)</option>
                    <option value="Local South African Animals & Nature">🦁 Animals & Nature (Inkomo, Ikati)</option>
                    <option value="Shapes, Patterns & Colours in Soweto">🔺 Shapes & Patterns Around Us</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14213D] mb-1.5">Age Group</label>
                  <select
                    value={ageGroup}
                    onChange={e => setAgeGroup(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2.5 text-xs text-[#14213D] font-medium"
                  >
                    <option value="3-4 Years">3–4 Years (Nursery)</option>
                    <option value="4-5 Years">4–5 Years (Pre-Grade R)</option>
                    <option value="5-6 Years">5–6 Years (Grade R)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14213D] mb-1.5">Primary Language</label>
                  <select
                    value={langSelect}
                    onChange={e => setLangSelect(e.target.value as LanguageCode)}
                    className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2.5 text-xs text-[#14213D] font-medium"
                  >
                    <option value="en">English with isiZulu highlights</option>
                    <option value="zu">isiZulu (Full immersion)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#FAF7F2]">
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <Clock className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Includes Monday–Friday progression + Teacher Guides</span>
                </div>

                <button
                  onClick={handleGenerateWeeklyPack}
                  disabled={isGenerating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2A9D8F] hover:bg-[#238276] text-white px-8 py-3.5 rounded-full font-bold text-xs shadow-sm transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? '🌱 Generating Week Plan…' : 'Generate 5-Day Weekly Pack'}</span>
                </button>
              </div>
            </div>

            {/* Generated Weekly Pack Output */}
            {generatedPack && (
              <div className="printable-pack bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs space-y-6">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EADFCF]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#2A9D8F] tracking-wider">
                      Prepared Weekly Pack · Imbewu (The Seed)
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-[#14213D]">
                      {generatedPack.title}
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Theme: {generatedPack.theme} · {generatedPack.totalActivities} Activities · {generatedPack.ageGroup}
                    </p>
                  </div>

                  <div className="no-print flex items-center gap-2">
                    <button
                      onClick={() => setIsWhatsAppShareModalOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Share via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('calendar')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white font-bold text-xs shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Sync to Google Calendar</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EADFCF] text-[#14213D] font-bold text-xs hover:bg-[#F4EDE2]"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Pack (A4)</span>
                    </button>
                  </div>
                </div>

                {/* 5-Day Progression Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {generatedPack.days.map((d, idx) => (
                    <div key={idx} className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADFCF] flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-xs text-[#14213D]">{d.dayName}</span>
                          <span className="text-[10px] text-[#6B7280]">{d.durationMinutes}m</span>
                        </div>
                        <h4 className="font-bold text-xs text-[#E07A5F] mb-1.5">{d.focus}</h4>
                        <p className="text-[11px] text-[#4B5563] leading-relaxed mb-3">{d.learningObjective}</p>
                      </div>

                      <div className="pt-2 border-t border-[#EADFCF]/60 text-[10px] text-[#6B7280]">
                        <p><strong>Teacher:</strong> {d.teacherGuide.slice(0, 55)}…</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: CLASSES & LEARNERS */}
        {activeTab === 'classes' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#14213D]">Classrooms</h2>
                <p className="text-xs text-[#6B7280]">Manage classes and learner observations</p>
              </div>
              <button
                onClick={() => {
                  const newName = prompt('Enter class name (e.g., Little Lions):');
                  if (newName) {
                    setClasses(prev => [...prev, {
                      id: `cls-${Date.now()}`,
                      centreId: 'cntr-1',
                      name: newName,
                      ageRange: '4-5 Years',
                      teacherName: 'Teacher Thandi',
                      learnerCount: 0,
                      createdAt: new Date().toISOString()
                    }]);
                  }
                }}
                className="inline-flex items-center gap-1.5 bg-[#2A9D8F] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Class</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {classes.map(c => (
                <div key={c.id} className="bg-white rounded-2xl p-6 border border-[#EADFCF] shadow-xs flex justify-between items-center">
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#14213D]">{c.name}</h3>
                    <p className="text-xs text-[#6B7280]">{c.ageRange} · {c.teacherName}</p>
                    <span className="inline-block mt-2 text-[11px] font-semibold px-2 py-0.5 rounded bg-[#FAF7F2] text-[#4B5563] border border-[#EADFCF]">
                      {c.learnerCount} Learners enrolled
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt(`Add learner to ${c.name}:`);
                      if (name) {
                        setLearners(prev => [...prev, {
                          id: `lrn-${Date.now()}`,
                          classId: c.id,
                          centreId: 'cntr-1',
                          nickname: name,
                          age: 4,
                          preferredLanguage: 'en',
                          observationsCount: 0,
                          skillsActiveCount: 1
                        }]);
                        c.learnerCount += 1;
                      }
                    }}
                    className="p-2 rounded-xl text-[#2A9D8F] hover:bg-[#2A9D8F]/10 transition-colors"
                    title="Add learner"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Learner Roster & Observations */}
            <div className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-xs">
              <h3 className="font-editorial text-lg font-bold text-[#14213D] mb-4">Learner Observation Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] text-[#6B7280] font-semibold border-b border-[#EADFCF]">
                    <tr>
                      <th className="p-3">Learner</th>
                      <th className="p-3">Age</th>
                      <th className="p-3">Language</th>
                      <th className="p-3">Active Skills</th>
                      <th className="p-3">Observations</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF7F2]">
                    {learners.map(l => (
                      <tr key={l.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="p-3 font-bold text-[#14213D]">{l.nickname}</td>
                        <td className="p-3">{l.age} Years</td>
                        <td className="p-3 uppercase font-semibold text-[#E07A5F]">{l.preferredLanguage}</td>
                        <td className="p-3">{l.skillsActiveCount} skills</td>
                        <td className="p-3">{l.observationsCount} logged</td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => alert(`Observing ${l.nickname}: Showing steady letter recognition progress.`)}
                              className="text-[#2A9D8F] font-bold hover:underline"
                            >
                              + Record Observation
                            </button>
                            <button
                              onClick={() => setIsWhatsAppShareModalOpen(true)}
                              className="inline-flex items-center gap-1 text-[#25D366] font-bold hover:underline"
                              title={`Share printable kit for ${l.nickname}`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Send Kit</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: GOOGLE CALENDAR SYNC */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#EADFCF]">
              <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/15 flex items-center justify-center text-[#E07A5F]">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#14213D]">
                  Google Calendar Lesson Synchronization
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Sync weekly themes and 5-day early learning schedules directly into your personal or ECD school calendar.
                </p>
              </div>
            </div>

            {calendarEvents && calendarEvents.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs text-[#4B5563]">
                  Click each day below to add to your Google Calendar with pre-filled learning objectives, instructions, and duration:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {calendarEvents.map((evt, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] flex justify-between items-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#E07A5F]">{evt.dayName}</span>
                        <h4 className="font-bold text-xs text-[#14213D]">{evt.title}</h4>
                        <p className="text-[11px] text-[#6B7280] line-clamp-1">{evt.details}</p>
                      </div>
                      <a
                        href={evt.googleCalendarUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14213D] text-white text-xs font-semibold hover:bg-black transition-all shrink-0 ml-3"
                      >
                        <span>Add</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#EADFCF]">
                <Calendar className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
                <h4 className="font-bold text-sm text-[#14213D] mb-1">No Schedule Generated Yet</h4>
                <p className="text-xs text-[#6B7280] max-w-sm mx-auto mb-4">
                  Click 'Build My Week' to generate a 5-day theme plan, and we'll format the complete Google Calendar schedule for you.
                </p>
                <button
                  onClick={() => setActiveTab('build_week')}
                  className="bg-[#2A9D8F] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-xs"
                >
                  Go to Build My Week
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 4: CRECHE CLASSROOM AUDIO STUDIO */}
        {activeTab === 'audiobook' && (
          <AudioBookStudio
            role="teacher"
            child={{
              id: learners[0]?.id || 'lrn-demo',
              parentId: 'usr-parent-1',
              nickname: learners[0]?.nickname || 'Sipho',
              age: learners[0]?.age || 4,
              preferredLanguage: language,
              interests: ['Stories', 'Singing'],
              learningAreas: ['Listening', 'Vocabulary'],
              learningMode: 'both',
              neighborhood: 'Orlando West, Soweto',
              createdAt: new Date().toISOString()
            }}
            userPlan={userPlan}
            onOpenPaywall={onOpenPaywall}
            onUpgradePlan={onOpenPaywall}
          />
        )}

        {/* WhatsApp Sharing Modal for Teachers */}
        <TeacherWhatsAppShareModal
          isOpen={isWhatsAppShareModalOpen}
          onClose={() => setIsWhatsAppShareModalOpen(false)}
          classes={classes}
          learners={learners}
          theme={theme}
          ageGroup={ageGroup}
        />

      </div>
    </div>
  );
};
