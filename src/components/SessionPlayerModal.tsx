import React, { useState, useEffect } from 'react';
import { Exercise, WorkoutLogEntry } from '../types/training';
import { 
  X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, 
  CheckCircle, ShieldCheck, AlertTriangle, ExternalLink 
} from 'lucide-react';

interface SessionPlayerModalProps {
  sessionTitle: string;
  exercises: Exercise[];
  onClose: () => void;
  onSessionComplete: (log: WorkoutLogEntry) => void;
}

export const SessionPlayerModal: React.FC<SessionPlayerModalProps> = ({
  sessionTitle,
  exercises,
  onClose,
  onSessionComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<number, boolean[]>>({});
  const [timerActive, setTimerActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45);
  const [prePain, setPrePain] = useState<number>(2);
  const [postPain, setPostPain] = useState<number>(2);
  const [isFinished, setIsFinished] = useState(false);
  const [notes, setNotes] = useState('');

  const currentExercise = exercises[currentIndex];

  // Initialize completed sets array for current exercise
  const currentSetsCount = 3; // Standard 3 sets default
  const activeExerciseSets = completedSets[currentIndex] || Array(currentSetsCount).fill(false);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (timerActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsRemaining]);

  const toggleSet = (setIdx: number) => {
    const updated = [...activeExerciseSets];
    updated[setIdx] = !updated[setIdx];
    setCompletedSets({
      ...completedSets,
      [currentIndex]: updated,
    });

    // Automatically trigger rest timer on set completion
    if (updated[setIdx]) {
      setSecondsRemaining(45);
      setTimerActive(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimerActive(false);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTimerActive(false);
    }
  };

  const handleCompleteAndSave = () => {
    const newLog: WorkoutLogEntry = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      athleteId: currentExercise.athleteId === 'helen' ? 'helen' : 'arwel',
      sessionName: sessionTitle,
      prePainScore: prePain,
      postPainScore: postPain,
      exercisesCompleted: exercises.map((e) => e.name),
      notes: notes || 'Completed guided interactive strength workout session.'
    };
    onSessionComplete(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs">
      <div 
        className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <span>Interactive Session</span>
              <span>·</span>
              <span>{sessionTitle}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-950 dark:text-white mt-0.5">
              Exercise {currentIndex + 1} of {exercises.length}: {currentExercise.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Split layout: Video & Timer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Video preview / embed */}
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 relative">
                  {currentExercise.youtubeId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${currentExercise.youtubeId}?autoplay=0&rel=0`}
                      title={currentExercise.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="p-6 text-center text-white flex flex-col items-center justify-center h-full space-y-2">
                      <p className="font-semibold text-sm">{currentExercise.videoTitle}</p>
                      <a
                        href={currentExercise.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs"
                      >
                        Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span className="truncate max-w-[220px]">Target: {currentExercise.targetInjury}</span>
                  <a
                    href={currentExercise.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    Open Full Video <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Set Tracker & Rest Timer */}
              <div className="space-y-4 flex flex-col justify-between">
                {/* Prescription card */}
                <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono tabular-nums">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-sans">Sets & Reps</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{currentExercise.sets}</span>
                      <span className="block text-[11px] text-stone-500">{currentExercise.reps}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-sans">Tempo</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{currentExercise.tempo}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-sans">Rest Cadence</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{currentExercise.rest}</span>
                    </div>
                  </div>
                </div>

                {/* Set completion buttons */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                    Check Off Completed Sets:
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {activeExerciseSets.map((isDone, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleSet(idx)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-white border-emerald-600 font-bold'
                            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                        }`}
                      >
                        <div className="text-xs">Set {idx + 1}</div>
                        <div className="text-[11px] mt-0.5">{isDone ? '✓ Completed' : 'Tap to Log'}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rest Timer Widget */}
                <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block font-semibold">
                      Rest Interval Timer
                    </span>
                    <span className="text-2xl font-extrabold font-mono tabular-nums text-stone-950 dark:text-white">
                      {secondsRemaining}s
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTimerActive(!timerActive)}
                      className="p-2.5 bg-amber-400 hover:bg-amber-500 text-stone-950 rounded-xl transition-colors font-semibold"
                    >
                      {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerActive(false);
                        setSecondsRemaining(45);
                      }}
                      className="p-2.5 bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-xl transition-colors"
                      title="Reset timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Technique Cues & Safety */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Key Coaching Points
                </h4>
                <ul className="space-y-1 text-stone-600 dark:text-stone-300">
                  {currentExercise.keyCues.map((cue, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 space-y-2">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Injury Precaution
                </h4>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {currentExercise.safetyCaution}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Finished Workout Summary & Pain Rating */
          <div className="p-6 sm:p-10 text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-950 dark:text-white">Workout Complete!</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Excellent work adhering to post-marathon rehabilitation protocols. Please log your recovery response.
              </p>
            </div>

            {/* Pain rating input */}
            <div className="p-5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700 text-left space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-stone-800 dark:text-stone-200 mb-1">
                  <span>Post-Workout Pain/Tightness Score:</span>
                  <span className="font-mono text-amber-600 font-bold">{postPain} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={postPain}
                  onChange={(e) => setPostPain(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Session Notes:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Adductor held up well; great toe felt loaded properly..."
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <button
              onClick={handleCompleteAndSave}
              className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition-all shadow-md text-sm"
            >
              Save to Recovery History & Finish
            </button>
          </div>
        )}

        {/* Footer Navigation */}
        {!isFinished && (
          <div className="p-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-900/60 rounded-b-3xl">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 disabled:opacity-30 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <span className="text-xs text-stone-400 font-mono tabular-nums">
              {currentIndex + 1} / {exercises.length}
            </span>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors shadow-xs"
            >
              {currentIndex === exercises.length - 1 ? 'Finish Workout' : 'Next Exercise'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
