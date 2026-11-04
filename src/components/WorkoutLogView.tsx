import React, { useState, useEffect } from 'react';
import { WorkoutLogEntry } from '../types/training';
import { PlusCircle, Trash2, Activity, Calendar, ShieldCheck, AlertTriangle } from 'lucide-react';

interface WorkoutLogViewProps {
  selectedAthlete: 'all' | 'arwel' | 'helen';
  onSelectAthlete: (athlete: 'all' | 'arwel' | 'helen') => void;
}

export const WorkoutLogView: React.FC<WorkoutLogViewProps> = ({
  selectedAthlete,
  onSelectAthlete,
}) => {
  const [logs, setLogs] = useState<WorkoutLogEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [athleteId, setAthleteId] = useState<'arwel' | 'helen'>(selectedAthlete === 'helen' ? 'helen' : 'arwel');
  const [sessionName, setSessionName] = useState('Day A: Lower Body & Tendon Rehab');
  const [prePainScore, setPrePainScore] = useState<number>(2);
  const [postPainScore, setPostPainScore] = useState<number>(2);
  const [notes, setNotes] = useState('');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('marathon_rehab_logs');
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial realistic marathon recovery entries
      const initialLogs: WorkoutLogEntry[] = [
        {
          id: 'log-1',
          date: '2026-11-02',
          athleteId: 'arwel',
          sessionName: 'Day A: Supine Adductor Ball Squeezes & TKEs',
          prePainScore: 3,
          postPainScore: 2,
          exercisesCompleted: ['Supine Isometric Adductor Ball Squeeze', 'Terminal Knee Extensions'],
          notes: 'Right adductor felt noticeably relieved after 5-sec isometric holds. Kept effort at 60%. Knee felt supported during TKEs.'
        },
        {
          id: 'log-2',
          date: '2026-11-03',
          athleteId: 'helen',
          sessionName: 'Day A: Rathleff Protocol & Wall Hip Abductions',
          prePainScore: 4,
          postPainScore: 2,
          exercisesCompleted: ['Rathleff Protocol Calf Raise', 'Standing Wall Hip Abduction'],
          notes: 'Towel under big toe engaged plantar fascia well. Morning heel ache settled down. Wall pushes kept hip completely out of painful adduction.'
        }
      ];
      setLogs(initialLogs);
      localStorage.setItem('marathon_rehab_logs', JSON.stringify(initialLogs));
    }
  }, []);

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WorkoutLogEntry = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      athleteId,
      sessionName,
      prePainScore,
      postPainScore,
      exercisesCompleted: [sessionName],
      notes
    };
    const updated = [newEntry, ...logs];
    setLogs(updated);
    localStorage.setItem('marathon_rehab_logs', JSON.stringify(updated));
    setIsAdding(false);
    setNotes('');
  };

  const handleDelete = (id: string) => {
    const updated = logs.filter((l) => l.id !== id);
    setLogs(updated);
    localStorage.setItem('marathon_rehab_logs', JSON.stringify(updated));
  };

  const filteredLogs = logs.filter((l) => {
    if (selectedAthlete === 'all') return true;
    return l.athleteId === selectedAthlete;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            Rehabilitation Session & Pain Monitoring Log
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Track pre/post session pain response (0-10 scale). Tendon load should remain $\le 3/10$ and settle within 24h.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Athlete Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs">
            <button
              onClick={() => onSelectAthlete('all')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                selectedAthlete === 'all' ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs' : 'text-stone-500'
              }`}
            >
              All Logs
            </button>
            <button
              onClick={() => onSelectAthlete('arwel')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                selectedAthlete === 'arwel' ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs' : 'text-stone-500'
              }`}
            >
              Arwel
            </button>
            <button
              onClick={() => onSelectAthlete('helen')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                selectedAthlete === 'helen' ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs' : 'text-stone-500'
              }`}
            >
              Helen
            </button>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            {isAdding ? 'Cancel' : 'Log New Session'}
          </button>
        </div>
      </div>

      {/* Add Entry Form Modal / Box */}
      {isAdding && (
        <form onSubmit={handleSaveLog} className="bg-stone-50 dark:bg-stone-800/40 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 space-y-4">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
            Record Completed Training Session
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Athlete:</label>
              <select
                value={athleteId}
                onChange={(e) => setAthleteId(e.target.value as any)}
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              >
                <option value="arwel">Arwel Thomas (63M)</option>
                <option value="helen">Helen Shanley (58F)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-500 dark:text-stone-400 font-medium mb-1">Session Routine:</label>
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                required
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Pain Score Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Pre-Workout Pain / Tightness (0-10):</span>
                <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">{prePainScore} / 10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={prePainScore}
                onChange={(e) => setPrePainScore(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-stone-400 block mt-1">0 = zero pain; 3 = acceptable mild sensation; &gt;5 = acute flare</span>
            </div>

            <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Post-Workout Pain / Tightness (0-10):</span>
                <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">{postPainScore} / 10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={postPainScore}
                onChange={(e) => setPostPainScore(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-stone-400 block mt-1">Immediate post-exercise reading</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-500 dark:text-stone-400 font-medium mb-1">Athlete Notes & Sensations:</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Scuffing improved during warmup walk, no groin pinch during ball squeeze..."
              className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-xs"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* Log History Cards */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-500 text-xs">
            No training sessions logged yet. Complete your first session to track rehabilitation progress!
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isFavorable = log.postPainScore <= log.prePainScore;
            return (
              <div
                key={log.id}
                className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {log.athleteId === 'arwel' ? 'Arwel Thomas' : 'Helen Shanley'}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {log.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {log.sessionName}
                  </h4>
                  {log.notes && (
                    <p className="text-xs text-stone-600 dark:text-stone-300 italic pt-0.5">
                      "{log.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-3 text-xs font-mono tabular-nums bg-stone-50 dark:bg-stone-800/80 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-sans">Pre</span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">{log.prePainScore}/10</span>
                    </div>
                    <span className="text-stone-300 dark:text-stone-600">→</span>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-sans">Post</span>
                      <span className={`font-bold ${log.postPainScore > 3 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {log.postPainScore}/10
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(log.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
