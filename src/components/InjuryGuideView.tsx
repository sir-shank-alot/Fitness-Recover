import React, { useState } from 'react';
import { ATHLETE_PROFILES } from '../data/athleteProfiles';
import { AlertTriangle, CheckCircle2, XCircle, Info, Activity, ShieldAlert, Award } from 'lucide-react';

export const InjuryGuideView: React.FC = () => {
  const [activeAthlete, setActiveAthlete] = useState<'arwel' | 'helen'>('arwel');
  const profile = ATHLETE_PROFILES[activeAthlete];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            Clinical Injury & Biomechanical Deep-Dives
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Pathomechanics, running gait adaptations, and evidence-based safety rules following the Auckland Marathon.
          </p>
        </div>

        {/* Athlete Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0">
          <button
            onClick={() => setActiveAthlete('arwel')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeAthlete === 'arwel'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Arwel Thomas (63M, 71kg)
          </button>
          <button
            onClick={() => setActiveAthlete('helen')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeAthlete === 'helen'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Helen Shanley (58F, 59kg)
          </button>
        </div>
      </div>

      {/* Clinical Overview Card */}
      <div className="bg-amber-500/10 dark:bg-amber-950/20 rounded-2xl p-6 border border-amber-500/20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <Info className="w-4 h-4" />
          Clinical Assessment Summary: {profile.name} ({profile.age}yo, {profile.weightKg}kg)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">Primary Clinical Focus:</span>
            <ul className="space-y-1 text-stone-600 dark:text-stone-300">
              {profile.focusAreas.map((area, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">Recommended Home Rehab Equipment:</span>
            <ul className="space-y-1 text-stone-600 dark:text-stone-300">
              {profile.equipmentRecommended.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specific Injuries Grid */}
      <div className="grid grid-cols-1 gap-6">
        {profile.injuries.map((injury, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <div>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">
                  Condition {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-stone-950 dark:text-stone-50 mt-0.5">
                  {injury.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-md self-start">
                {injury.clinicalName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {injury.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              {/* Gait impact */}
              <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700/60">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-sky-500" />
                  Running Gait & Biomechanical Impact
                </h4>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {injury.gaitImpact}
                </p>
              </div>

              {/* Rehab Strategy */}
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Targeted Rehabilitation Solution
                </h4>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  {injury.rehabStrategy}
                </p>
              </div>
            </div>

            {/* Banned Movements */}
            <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40 text-xs">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-1.5 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                Contraindicated Movements (Strictly Avoid During Rehab):
              </h4>
              <ul className="space-y-1 text-stone-700 dark:text-stone-300">
                {injury.bannedMovements.map((move, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>{move}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
