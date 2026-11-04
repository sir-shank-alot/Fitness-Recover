import React from 'react';
import { ATHLETE_PROFILES } from '../data/athleteProfiles';
import { ShieldCheck, UserCheck, Activity, Award } from 'lucide-react';

interface HeroBannerProps {
  selectedAthlete: 'all' | 'arwel' | 'helen';
  onSelectAthlete: (athlete: 'all' | 'arwel' | 'helen') => void;
  onOpenQuickSession: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedAthlete,
  onSelectAthlete,
  onOpenQuickSession,
}) => {
  return (
    <div className="relative overflow-hidden bg-stone-900 text-stone-100 rounded-3xl border border-stone-800 shadow-xl mb-8">
      {/* Background Image with subtle scrim overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/marathon_rehab_hero_1793759030910.jpg"
          alt="Arwel Thomas and Helen Shanley training post Auckland Marathon"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-900/60" />
      </div>

      <div className="relative z-10 p-6 md:p-10 max-w-5xl">
        {/* Subtle unboxed metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-400 tracking-wide uppercase mb-3">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> Auckland Marathon Post-Race Recovery
          </span>
          <span aria-hidden="true">·</span>
          <span>Dual-Athlete Clinical Protocol</span>
          <span aria-hidden="true">·</span>
          <span>Evidence-Based Rehabilitation</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white max-w-3xl text-balance">
          Individualized Strength & Injury Rehabilitation for Arwel & Helen
        </h1>

        <p className="mt-3 text-stone-300 text-sm md:text-base leading-relaxed max-w-2xl">
          Targeting adductor toe-scuffing, lumbar facet extension overload, arthritic knee joint sparing for Arwel (63M, 71kg), 
          paired with Rathleff protocol for plantar fasciitis, anti-compressive GTPS hip stability, and grip-free training for Helen (58F, 59kg).
        </p>

        {/* Functional Athlete Segmented Selector */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-stone-800/80">
          <div className="flex items-center gap-1.5 p-1 bg-stone-950/80 rounded-xl border border-stone-800 shrink-0">
            <button
              onClick={() => onSelectAthlete('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedAthlete === 'all'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Combined View (All Exercises)
            </button>
            <button
              onClick={() => onSelectAthlete('arwel')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedAthlete === 'arwel'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Arwel Thomas (63, 71kg)
            </button>
            <button
              onClick={() => onSelectAthlete('helen')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedAthlete === 'helen'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Helen Shanley (58, 59kg)
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Video Demonstrations
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-sky-400" /> 3-Phase Periodization
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
