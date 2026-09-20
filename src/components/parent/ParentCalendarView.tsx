import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Circle, Plus, Trash2, Sparkles, BookOpen, Play, Check, ChevronLeft, ChevronRight, Zap, Flame, Info } from 'lucide-react';
import type { ChildProfile, LanguageCode, ScheduledActivity, DayOfWeek } from '../../types';
import { OfflineStorageService, SEED_WEEKLY_PACKS } from '../../services/offlineStorage';

interface ParentCalendarViewProps {
  child: ChildProfile;
  language: LanguageCode;
  onStartActivity: () => void;
  onOpenWorksheet: (packId?: string, dayIndex?: number) => void;
  onActivityCompleted?: () => void;
}

const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const ParentCalendarView: React.FC<ParentCalendarViewProps> = ({
  child,
  language,
  onStartActivity,
  onOpenWorksheet,
  onActivityCompleted,
}) => {
  const [scheduledList, setScheduledList] = useState<ScheduledActivity[]>(() =>
    OfflineStorageService.getScheduledActivities(child.id)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedPackId, setSelectedPackId] = useState<string>(SEED_WEEKLY_PACKS[0].id);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [customTitle, setCustomTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState<'Morning (08:00)' | 'Afternoon (14:00)' | 'Evening (18:00)' | 'Anytime'>('Morning (08:00)');
  const [customNote, setCustomNote] = useState('');
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  // Auto-schedule notification state
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const activePack = SEED_WEEKLY_PACKS.find(p => p.id === selectedPackId) || SEED_WEEKLY_PACKS[0];

  // Stats
  const totalScheduled = scheduledList.length;
  const completedCount = scheduledList.filter(s => s.completed).length;
  const completionPercent = totalScheduled > 0 ? Math.round((completedCount / totalScheduled) * 100) : 0;

  // Toggle activity completion
  const handleToggle = (id: string) => {
    const updated = OfflineStorageService.toggleScheduleCompletion(child.id, id);
    setScheduledList(updated);

    const justCompletedItem = updated.find(i => i.id === id);
    if (justCompletedItem?.completed) {
      setShowCelebration(id);
      setTimeout(() => setShowCelebration(null), 3000);
      if (onActivityCompleted) onActivityCompleted();
    }
  };

  // Delete activity
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = OfflineStorageService.deleteScheduledActivity(child.id, id);
    setScheduledList(updated);
  };

  // Auto-schedule entire pack
  const handleAutoSchedule = (packId: string) => {
    const updated = OfflineStorageService.autoSchedulePack(child.id, packId);
    setScheduledList(updated);
    const pack = SEED_WEEKLY_PACKS.find(p => p.id === packId);
    setFeedbackMessage(`Scheduled all 5 days of "${pack?.title.split('(')[0]}" across Monday-Friday!`);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  // Add individual activity
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();

    const chosenDayActivity = activePack.days[selectedDayIdx] || activePack.days[0];
    const finalTitle = customTitle.trim() || `${activePack.title.split('(')[0].trim()} · ${chosenDayActivity.focus}`;

    const newActivity: ScheduledActivity = {
      id: `sched-${child.id}-${Date.now()}`,
      childId: child.id,
      packId: activePack.id,
      dayName: selectedDay,
      activityTitle: finalTitle,
      focus: chosenDayActivity.focus,
      learningObjective: chosenDayActivity.learningObjective,
      durationMinutes: chosenDayActivity.durationMinutes || 15,
      timeSlot,
      completed: false,
      notes: customNote.trim() || undefined,
    };

    const updated = OfflineStorageService.addScheduledActivity(child.id, newActivity);
    setScheduledList(updated);
    setIsModalOpen(false);
    setCustomTitle('');
    setCustomNote('');
  };

  // Determine current day of week to highlight
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const todayDayName: DayOfWeek =
    currentDayIndex === 1
      ? 'Monday'
      : currentDayIndex === 2
      ? 'Tuesday'
      : currentDayIndex === 3
      ? 'Wednesday'
      : currentDayIndex === 4
      ? 'Thursday'
      : currentDayIndex === 5
      ? 'Friday'
      : currentDayIndex === 6
      ? 'Saturday'
      : 'Sunday';

  return (
    <div className="space-y-6">
      
      {/* Calendar Header with Weekly Pack scheduler */}
      <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#2A9D8F] bg-[#2A9D8F]/10 px-3 py-1 rounded-full">
              {language === 'zu' ? 'Uhlelo Lwesonto' : 'Weekly Activity Schedule'}
            </span>
            <span className="text-xs font-semibold text-[#6B7280]">
              Term 3 · Week 1
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D]">
            {child.nickname}'s Learning Calendar
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1 max-w-xl">
            Schedule specific activities from weekly packs to specific days. Spreading 10–15 minutes across the week develops steady learning confidence.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Auto-schedule pack dropdown */}
          <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#EADFCF]">
            <Zap className="w-3.5 h-3.5 text-[#E07A5F] ml-2" />
            <select
              value={selectedPackId}
              onChange={e => {
                setSelectedPackId(e.target.value);
                handleAutoSchedule(e.target.value);
              }}
              className="bg-transparent text-xs font-bold text-[#14213D] py-1 px-2 focus:outline-hidden cursor-pointer"
            >
              {SEED_WEEKLY_PACKS.map(p => (
                <option key={p.id} value={p.id}>
                  Auto-Schedule: {p.title.split('(')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Add custom activity button */}
          <button
            onClick={() => {
              setSelectedDay(todayDayName);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Activity</span>
          </button>
        </div>
      </div>

      {/* Temporary Feedback Banner */}
      {feedbackMessage && (
        <div className="bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 rounded-2xl p-4 text-xs font-bold text-[#2A9D8F] flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Weekly Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#EADFCF] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#6B7280]">Scheduled This Week</span>
            <p className="font-editorial text-2xl font-bold text-[#14213D]">{totalScheduled} Sessions</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EADFCF] flex items-center justify-center text-[#14213D]">
            <CalendarIcon className="w-5 h-5 text-[#E07A5F]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EADFCF] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#6B7280]">Completed Sessions</span>
            <p className="font-editorial text-2xl font-bold text-[#2A9D8F]">{completedCount} of {totalScheduled}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#2A9D8F]/15 flex items-center justify-center text-[#2A9D8F]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#EADFCF] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#6B7280]">Schedule Completion</span>
            <p className="font-editorial text-2xl font-bold text-[#14213D]">{completionPercent}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 7-Day Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5">
        {DAYS_OF_WEEK.map((dayName, idx) => {
          const isToday = dayName === todayDayName;
          const dayActivities = scheduledList.filter(s => s.dayName === dayName);
          const isWeekend = dayName === 'Saturday' || dayName === 'Sunday';

          return (
            <div
              key={dayName}
              className={`rounded-3xl border transition-all flex flex-col justify-between ${
                isToday
                  ? 'bg-white border-[#E07A5F] shadow-md ring-2 ring-[#E07A5F]/20'
                  : 'bg-white/80 border-[#EADFCF]'
              } min-h-[320px] p-4`}
            >
              <div>
                {/* Day Header */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#EADFCF]">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-editorial text-base font-bold text-[#14213D]">
                        {dayName.slice(0, 3)}
                      </span>
                      {isToday && (
                        <span className="text-[9px] font-bold uppercase bg-[#E07A5F] text-white px-1.5 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#6B7280]">
                      {dayActivities.length} {dayActivities.length === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDay(dayName);
                      setIsModalOpen(true);
                    }}
                    title={`Schedule activity for ${dayName}`}
                    className="p-1 rounded-lg bg-[#FAF7F2] hover:bg-[#EADFCF] text-[#14213D] transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Scheduled Activities for this Day */}
                <div className="space-y-2.5">
                  {dayActivities.map(item => {
                    const isCelebrating = showCelebration === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`group relative rounded-2xl p-3 border transition-all text-xs ${
                          item.completed
                            ? 'bg-green-50/70 border-green-200 text-green-950'
                            : 'bg-[#FAF7F2] border-[#EADFCF] text-[#14213D] hover:border-[#14213D]/40'
                        }`}
                      >
                        {/* Celebration ping */}
                        {isCelebrating && (
                          <div className="absolute -top-2 -right-2 bg-[#2A9D8F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                            +1 Streak! 🌱
                          </div>
                        )}

                        {/* Top line: Time slot & delete */}
                        <div className="flex items-center justify-between text-[10px] text-[#6B7280] mb-1">
                          <span className="font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#E07A5F]" />
                            {item.timeSlot.split(' ')[0]}
                          </span>
                          <button
                            onClick={e => handleDelete(item.id, e)}
                            className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition p-0.5"
                            title="Remove activity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Activity Title */}
                        <p className={`font-bold text-xs leading-snug ${item.completed ? 'line-through text-gray-500' : 'text-[#14213D]'}`}>
                          {item.activityTitle}
                        </p>

                        {/* Focus / Objective */}
                        <p className="text-[10px] text-[#6B7280] mt-1 line-clamp-2">
                          {item.focus}
                        </p>

                        {/* Action buttons & completion checkbox */}
                        <div className="mt-2 pt-2 border-t border-[#EADFCF]/60 flex items-center justify-between">
                          <button
                            onClick={() => handleToggle(item.id)}
                            className="flex items-center gap-1.5 text-[11px] font-bold transition"
                          >
                            {item.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400 hover:text-[#2A9D8F]" />
                            )}
                            <span className={item.completed ? 'text-green-700' : 'text-[#4B5563]'}>
                              {item.completed ? 'Done' : 'Mark done'}
                            </span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={onStartActivity}
                              className="p-1 rounded-md text-[#E07A5F] hover:bg-[#E07A5F]/10"
                              title="Play Activity"
                            >
                              <Play className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onOpenWorksheet(item.packId)}
                              className="p-1 rounded-md text-[#2A9D8F] hover:bg-[#2A9D8F]/10"
                              title="View Worksheet"
                            >
                              <BookOpen className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {item.notes && (
                          <p className="mt-1.5 text-[9px] italic text-[#6B7280] bg-white/70 p-1 rounded-md">
                            Note: {item.notes}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {dayActivities.length === 0 && (
                    <div className="py-8 text-center text-[#9CA3AF]">
                      <p className="text-[11px] italic">
                        {isWeekend ? 'Rest / Family Story' : 'No activity scheduled'}
                      </p>
                      <button
                        onClick={() => {
                          setSelectedDay(dayName);
                          setIsModalOpen(true);
                        }}
                        className="mt-2 text-[10px] font-bold text-[#E07A5F] hover:underline"
                      >
                        + Add activity
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Suggestion if empty on weekday */}
              {dayActivities.length === 0 && !isWeekend && (
                <div className="mt-3 pt-2 border-t border-dashed border-[#EADFCF] text-center">
                  <span className="text-[9px] text-[#6B7280]">
                    10 mins daily goal
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Schedule Learning Activity */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EADFCF] my-8 text-[#14213D]">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EADFCF]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
                  Weekly Learning Planner
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#14213D] mt-1">
                  Schedule an Activity
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="space-y-4 my-4">
              
              {/* Day of Week */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">
                  Day of the Week
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {DAYS_OF_WEEK.map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        selectedDay === d
                          ? 'bg-[#14213D] text-white'
                          : 'bg-[#FAF7F2] text-[#4B5563] hover:bg-[#F4EDE2]'
                      }`}
                    >
                      {d.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Pack Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                  Select Curriculum Pack
                </label>
                <select
                  value={selectedPackId}
                  onChange={e => {
                    setSelectedPackId(e.target.value);
                    setSelectedDayIdx(0);
                  }}
                  className="w-full text-xs rounded-xl border border-[#EADFCF] bg-[#FAF7F2] px-3.5 py-2.5 font-medium text-[#14213D] focus:outline-hidden focus:border-[#E07A5F]"
                >
                  {SEED_WEEKLY_PACKS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.theme})
                    </option>
                  ))}
                </select>
              </div>

              {/* Specific Day Activity from that Pack */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                  Select Pack Activity
                </label>
                <select
                  value={selectedDayIdx}
                  onChange={e => setSelectedDayIdx(Number(e.target.value))}
                  className="w-full text-xs rounded-xl border border-[#EADFCF] bg-[#FAF7F2] px-3.5 py-2.5 font-medium text-[#14213D] focus:outline-hidden focus:border-[#E07A5F]"
                >
                  {activePack.days.map((day, idx) => (
                    <option key={idx} value={idx}>
                      Day {idx + 1}: {day.focus} (⏱️ {day.durationMinutes} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                  Preferred Time of Day
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value as any)}
                  className="w-full text-xs rounded-xl border border-[#EADFCF] bg-[#FAF7F2] px-3.5 py-2.5 font-medium text-[#14213D] focus:outline-hidden focus:border-[#E07A5F]"
                >
                  <option value="Morning (08:00)">Morning (08:00 AM) — Best for focus</option>
                  <option value="Afternoon (14:00)">Afternoon (02:00 PM) — After school snack</option>
                  <option value="Evening (18:00)">Evening (06:00 PM) — Before dinner</option>
                  <option value="Anytime">Anytime / Flexible</option>
                </select>
              </div>

              {/* Custom Note or Parent Extension */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                  Parent Reminder / Tip (Optional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={e => setCustomNote(e.target.value)}
                  placeholder="e.g. Practice outside with chalk or sand tray"
                  className="w-full text-xs rounded-xl border border-[#EADFCF] bg-[#FAF7F2] px-3.5 py-2.5 text-[#14213D] focus:outline-hidden focus:border-[#E07A5F]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#EADFCF]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#6B7280] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E07A5F] hover:bg-[#D46A4F] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xs transition"
                >
                  Save to {selectedDay}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
