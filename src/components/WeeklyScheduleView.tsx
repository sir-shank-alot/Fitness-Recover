import React, { useState } from 'react';
import { Exercise } from '../types/training';
import { Calendar, Play, Clock, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

interface WeeklyScheduleViewProps {
  exercises: Exercise[];
  selectedAthlete: 'all' | 'arwel' | 'helen';
  onSelectAthlete: (athlete: 'all' | 'arwel' | 'helen') => void;
  onOpenVideo: (exercise: Exercise) => void;
  onStartSession: (dayName: string, exercises: Exercise[]) => void;
}

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({
  exercises,
  selectedAthlete,
  onSelectAthlete,
  onOpenVideo,
  onStartSession,
}) => {
  const [activeDay, setActiveDay] = useState<string>('Monday');

  const scheduleDays = [
    {
      day: 'Monday',
      sessionTag: 'Day A',
      title: 'Lower Body & Acute Injury Rehab',
      subtitle: 'Tendon loading, Rathleff protocol & isometric joint stabilization',
      duration: '35 - 40 mins',
      focus: 'Adductors, Plantar Fascia, Trochanteric Bursa, Arthritic Knee VMO',
      isWorkout: true,
    },
    {
      day: 'Tuesday',
      sessionTag: 'Daily Mobility',
      title: 'Spinal Decompression & Joint Glides',
      subtitle: 'Restorative mobility and upper extremity synovial circulation',
      duration: '15 - 20 mins',
      focus: 'Thoracic Extension, Tendon Gliding, Gentle Walking',
      isWorkout: false,
    },
    {
      day: 'Wednesday',
      sessionTag: 'Day B',
      title: 'Anti-Extension Core & Pelvic Alignment',
      subtitle: 'McGill Big 3, glute bridge alignment & neutral-spine hinging',
      duration: '30 - 35 mins',
      focus: 'Lumbar Facet Relief, Pelvic Leveling, Forearm Core',
      isWorkout: true,
    },
    {
      day: 'Thursday',
      sessionTag: 'Active Recovery',
      title: 'Rest & Gentle Walking',
      subtitle: 'Collagen remodeling downtime; avoid heavy eccentric load',
      duration: '20 - 30 mins easy walk',
      focus: 'Tissue Recovery & Hydration',
      isWorkout: false,
    },
    {
      day: 'Friday',
      sessionTag: 'Day C',
      title: 'Runner Kinetic Integration & Foot Clearance',
      subtitle: 'Single leg balance, step-downs & psoas dorsiflexion pull',
      duration: '35 - 40 mins',
      focus: 'Toe Clearance, Single-Leg Deceleration, Dynamic Stability',
      isWorkout: true,
    },
    {
      day: 'Saturday',
      sessionTag: 'Cross-Training',
      title: 'Low-Impact Aerobic Flush',
      subtitle: 'Stationary cycling or pool running (zero ground impact)',
      duration: '30 - 45 mins',
      focus: 'Aerobic Maintenance & Joint Synovial Washout',
      isWorkout: false,
    },
    {
      day: 'Sunday',
      sessionTag: 'Rest Day',
      title: 'Complete Rest & Weekly Pain Audit',
      subtitle: 'Log recovery pain score; inspect heel & groin reactivity',
      duration: 'Full Rest',
      focus: 'Systemic Nervous System Recovery',
      isWorkout: false,
    },
  ];

  // Get exercises for the selected day tag
  const currentDayInfo = scheduleDays.find((d) => d.day === activeDay)!;
  const dayExercises = exercises.filter((ex) => {
    // Match athlete
    if (selectedAthlete !== 'all' && ex.athleteId !== selectedAthlete && ex.athleteId !== 'both') {
      return false;
    }
    // Match day tag
    if (currentDayInfo.sessionTag === 'Day A' && ex.day === 'Day A') return true;
    if (currentDayInfo.sessionTag === 'Day B' && ex.day === 'Day B') return true;
    if (currentDayInfo.sessionTag === 'Day C' && ex.day === 'Day C') return true;
    if (currentDayInfo.sessionTag === 'Daily Mobility' && ex.day === 'Daily Mobility') return true;
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Header and Athlete Switcher */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            7-Day Weekly Training & Recovery Calendar
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Structured periodization alternating high-load tendon days with active mobility and nervous system deload.
          </p>
        </div>

        {/* Athlete filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0">
          <button
            onClick={() => onSelectAthlete('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedAthlete === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Combined
          </button>
          <button
            onClick={() => onSelectAthlete('arwel')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedAthlete === 'arwel'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Arwel (63M)
          </button>
          <button
            onClick={() => onSelectAthlete('helen')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedAthlete === 'helen'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Helen (58F)
          </button>
        </div>
      </div>

      {/* Day Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {scheduleDays.map((item) => {
          const isSelected = activeDay === item.day;
          return (
            <button
              key={item.day}
              onClick={() => setActiveDay(item.day)}
              className={`p-3.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-md font-semibold'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-amber-400'
              }`}
            >
              <div className="text-[11px] uppercase tracking-wider opacity-80">
                {item.day.slice(0, 3)}
              </div>
              <div className="text-sm font-bold mt-0.5">{item.sessionTag}</div>
              <div className="text-[10px] mt-1 truncate opacity-75">{item.duration}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Detailed View */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>{activeDay}</span>
              <span>·</span>
              <span>{currentDayInfo.sessionTag}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {currentDayInfo.duration}
              </span>
            </div>
            <h3 className="text-xl font-bold text-stone-950 dark:text-white mt-1">
              {currentDayInfo.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {currentDayInfo.subtitle}
            </p>
          </div>

          {dayExercises.length > 0 && (
            <button
              onClick={() => onStartSession(`${activeDay} - ${currentDayInfo.title}`, dayExercises)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-all shadow-xs shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Interactive Workout ({dayExercises.length} Exercises)
            </button>
          )}
        </div>

        {/* Exercises List for the Day */}
        {dayExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayExercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 hover:border-amber-300 dark:hover:border-amber-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      {exercise.athleteId === 'both' ? 'Both Runners' : exercise.athleteId === 'arwel' ? 'Arwel Thomas' : 'Helen Shanley'}
                    </span>
                    <span className="font-mono text-[11px]">Phase {exercise.phase}</span>
                  </div>

                  <h4 className="font-bold text-stone-950 dark:text-stone-100 text-sm">
                    {exercise.name}
                  </h4>

                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Target: <span className="font-medium text-stone-700 dark:text-stone-300">{exercise.targetInjury}</span>
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono tabular-nums bg-white dark:bg-stone-800/80 p-2.5 rounded-lg border border-stone-200 dark:border-stone-700/60">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block font-sans">Sets & Reps</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{exercise.sets}</span>
                      <span className="block text-[11px] text-stone-500">{exercise.reps}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block font-sans">Tempo & Rest</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{exercise.tempo}</span>
                      <span className="block text-[11px] text-stone-500">Rest {exercise.rest}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-[170px]" title={exercise.equipment}>
                    {exercise.equipment}
                  </span>

                  <button
                    onClick={() => onOpenVideo(exercise)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/30 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 space-y-3">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto opacity-80" />
            <h4 className="font-bold text-stone-800 dark:text-stone-200">Active Recovery & Tissue Adaptation</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
              No heavy eccentric strength loading scheduled for today. Focus on light walking, hydration, gentle joint range of motion, and tendon recovery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
