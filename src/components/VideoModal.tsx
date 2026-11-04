import React from 'react';
import { Exercise } from '../types/training';
import { X, ExternalLink, AlertTriangle, CheckCircle2, ShieldCheck, Play } from 'lucide-react';

interface VideoModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
              <span className="capitalize">{exercise.athleteId === 'both' ? 'Both Runners' : exercise.athleteId === 'arwel' ? 'Arwel Thomas' : 'Helen Shanley'}</span>
              <span>·</span>
              <span>Phase {exercise.phase}</span>
              <span>·</span>
              <span>{exercise.day}</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              {exercise.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player / External Embed */}
        <div className="p-5 space-y-5">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-950 relative border border-stone-800 flex flex-col items-center justify-center">
            {exercise.youtubeId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${exercise.youtubeId}?autoplay=0&rel=0`}
                title={exercise.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-6 text-white space-y-3">
                <Play className="w-12 h-12 text-amber-400 mx-auto opacity-80" />
                <p className="font-semibold">{exercise.videoTitle}</p>
                <a
                  href={exercise.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-medium rounded-lg text-sm transition-colors"
                >
                  Watch on YouTube <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Quick link button to original video */}
          <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 text-sm">
            <div className="truncate pr-3">
              <span className="font-medium text-stone-700 dark:text-stone-300">Video Source: </span>
              <span className="text-stone-500 dark:text-stone-400">{exercise.videoTitle}</span>
            </div>
            <a
              href={exercise.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg shrink-0 transition-colors"
            >
              Open in YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Prescription Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="text-xs text-stone-500 dark:text-stone-400">Sets & Reps</div>
              <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 text-sm">{exercise.sets}</div>
              <div className="text-xs text-stone-600 dark:text-stone-400">{exercise.reps}</div>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="text-xs text-stone-500 dark:text-stone-400">Tempo</div>
              <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 text-sm font-mono">{exercise.tempo}</div>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="text-xs text-stone-500 dark:text-stone-400">Rest</div>
              <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 text-sm">{exercise.rest}</div>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="text-xs text-stone-500 dark:text-stone-400">Equipment</div>
              <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 text-sm truncate" title={exercise.equipment}>
                {exercise.equipment}
              </div>
            </div>
          </div>

          {/* Form Cues */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Key Technique Cues
            </h4>
            <ul className="space-y-1.5 text-sm text-stone-600 dark:text-stone-300">
              {exercise.keyCues.map((cue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Rationale */}
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 text-sm">
            <div className="flex items-center gap-2 font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
              <ShieldCheck className="w-4 h-4" />
              Rehab Rationale for {exercise.targetInjury}
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
              {exercise.clinicalRationale}
            </p>
          </div>

          {/* Safety Warning */}
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 text-sm">
            <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Precautions & What to Avoid
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
              {exercise.safetyCaution}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-3 bg-stone-50 dark:bg-stone-900/60 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
