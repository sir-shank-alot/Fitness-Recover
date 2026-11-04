import React, { useState, useMemo } from 'react';
import { Exercise } from '../types/training';
import { 
  Search, Download, Copy, Check, ExternalLink, Play, 
  Filter, Printer, ChevronRight, HelpCircle, Shield, AlertCircle
} from 'lucide-react';

interface SpreadsheetViewProps {
  exercises: Exercise[];
  selectedAthlete: 'all' | 'arwel' | 'helen';
  onSelectAthlete: (athlete: 'all' | 'arwel' | 'helen') => void;
  onOpenVideo: (exercise: Exercise) => void;
  onOpenPrint: () => void;
}

export const SpreadsheetView: React.FC<SpreadsheetViewProps> = ({
  exercises,
  selectedAthlete,
  onSelectAthlete,
  onOpenVideo,
  onOpenPrint,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      // Athlete filter
      if (selectedAthlete !== 'all') {
        if (ex.athleteId !== selectedAthlete && ex.athleteId !== 'both') {
          return false;
        }
      }

      // Phase filter
      if (selectedPhase !== 'all' && ex.phase !== selectedPhase) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && ex.category !== selectedCategory) {
        return false;
      }

      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = ex.name.toLowerCase().includes(query);
        const matchesInjury = ex.targetInjury.toLowerCase().includes(query);
        const matchesEquip = ex.equipment.toLowerCase().includes(query);
        const matchesCues = ex.keyCues.some((c) => c.toLowerCase().includes(query));
        if (!matchesName && !matchesInjury && !matchesEquip && !matchesCues) {
          return false;
        }
      }

      return true;
    });
  }, [exercises, selectedAthlete, selectedPhase, selectedCategory, searchTerm]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Athlete',
      'Phase',
      'Day/Schedule',
      'Exercise Name',
      'Target Injury / Area',
      'Category',
      'Sets',
      'Reps / Hold',
      'Tempo',
      'Rest',
      'Equipment',
      'Video Demonstration Title',
      'Video Link (URL)',
      'Key Coaching Cues',
      'Clinical Rationale',
      'Safety Precautions',
      'Grip-Free Modified'
    ];

    const rows = filteredExercises.map((ex) => [
      ex.athleteId === 'both' ? 'Both Runners' : ex.athleteId === 'arwel' ? 'Arwel Thomas' : 'Helen Shanley',
      `Phase ${ex.phase}`,
      ex.day,
      `"${ex.name.replace(/"/g, '""')}"`,
      `"${ex.targetInjury.replace(/"/g, '""')}"`,
      ex.category,
      `"${ex.sets.replace(/"/g, '""')}"`,
      `"${ex.reps.replace(/"/g, '""')}"`,
      `"${ex.tempo.replace(/"/g, '""')}"`,
      `"${ex.rest.replace(/"/g, '""')}"`,
      `"${ex.equipment.replace(/"/g, '""')}"`,
      `"${ex.videoTitle.replace(/"/g, '""')}"`,
      ex.videoUrl,
      `"${ex.keyCues.join('; ').replace(/"/g, '""')}"`,
      `"${ex.clinicalRationale.replace(/"/g, '""')}"`,
      `"${ex.safetyCaution.replace(/"/g, '""')}"`,
      ex.isGripFree ? 'Yes' : 'No'
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Auckland_Marathon_Strength_Plan_${selectedAthlete}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy as TSV (Tab Separated Values) for pasting directly into Excel or Google Sheets
  const handleCopyForSpreadsheet = () => {
    const headers = [
      'Athlete',
      'Phase',
      'Day',
      'Exercise Name',
      'Target Injury',
      'Sets',
      'Reps',
      'Tempo',
      'Rest',
      'Equipment',
      'Video Title',
      'Video Link',
      'Coaching Cues',
      'Safety Caution'
    ];

    const rows = filteredExercises.map((ex) => [
      ex.athleteId === 'both' ? 'Both' : ex.athleteId === 'arwel' ? 'Arwel Thomas' : 'Helen Shanley',
      `Phase ${ex.phase}`,
      ex.day,
      ex.name,
      ex.targetInjury,
      ex.sets,
      ex.reps,
      ex.tempo,
      ex.rest,
      ex.equipment,
      ex.videoTitle,
      ex.videoUrl,
      ex.keyCues.join(' | '),
      ex.safetyCaution
    ]);

    const tsvContent = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(tsvContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Spreadsheet Control Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 md:p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-stone-950 dark:text-stone-50 flex items-center gap-2">
              Master Strength & Rehabilitation Spreadsheet
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Referencing full video demonstrations, injury targets, and sets/reps for Auckland marathon recovery.
            </p>
          </div>

          {/* Action Buttons: Export CSV, Copy for Google Sheets, Print */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors whitespace-nowrap"
              title="Download formatted CSV spreadsheet for Excel or Google Sheets"
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </button>

            <button
              onClick={handleCopyForSpreadsheet}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors whitespace-nowrap"
              title="Copy spreadsheet table to clipboard to paste directly into Google Sheets or Excel"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy for Sheets/Excel'}
            </button>

            <button
              onClick={onOpenPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors whitespace-nowrap"
              title="Open print-ready layout"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Table
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search exercise, injury, cue..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Athlete Filter */}
          <div className="flex items-center gap-2">
            <label className="text-stone-500 dark:text-stone-400 font-medium shrink-0">Runner:</label>
            <select
              value={selectedAthlete}
              onChange={(e) => onSelectAthlete(e.target.value as any)}
              className="w-full py-2 px-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Runners (Combined)</option>
              <option value="arwel">Arwel Thomas (63M)</option>
              <option value="helen">Helen Shanley (58F)</option>
            </select>
          </div>

          {/* Phase Filter */}
          <div className="flex items-center gap-2">
            <label className="text-stone-500 dark:text-stone-400 font-medium shrink-0">Phase:</label>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full py-2 px-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Phases (1 - 3)</option>
              <option value="1">Phase 1: Deload & Isometric (Wk 1-2)</option>
              <option value="2">Phase 2: Kinetic Chain Restoration (Wk 3-6)</option>
              <option value="3">Phase 3: Runner Resilient Strength (Wk 7-10+)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label className="text-stone-500 dark:text-stone-400 font-medium shrink-0">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="Rehab Isometric">Rehab Isometric</option>
              <option value="Strength & Kinetic Chain">Strength & Kinetic Chain</option>
              <option value="Core & Spine">Core & Spine</option>
              <option value="Foot & Ankle">Foot & Ankle</option>
              <option value="Mobility & Control">Mobility & Control</option>
            </select>
          </div>
        </div>
      </div>

      {/* Spreadsheet Table View */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-stone-100/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-4 min-w-[120px]">Runner</th>
                <th className="py-3 px-4 min-w-[210px]">Exercise Name</th>
                <th className="py-3 px-4 min-w-[200px]">Injury Focus</th>
                <th className="py-3 px-4 min-w-[130px]">Sets & Reps</th>
                <th className="py-3 px-4 min-w-[110px]">Tempo / Rest</th>
                <th className="py-3 px-4 min-w-[160px]">Equipment</th>
                <th className="py-3 px-4 min-w-[230px]">Video Demo Link</th>
                <th className="py-3 px-4 min-w-[80px] text-center">Details</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-normal">
              {filteredExercises.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-stone-500 dark:text-stone-400">
                    No exercises match the selected filters. Try resetting search or category filters.
                  </td>
                </tr>
              ) : (
                filteredExercises.map((exercise, index) => {
                  const isExpanded = expandedId === exercise.id;
                  return (
                    <React.Fragment key={exercise.id}>
                      <tr 
                        className={`hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-colors ${
                          isExpanded ? 'bg-stone-50/80 dark:bg-stone-800/40' : ''
                        }`}
                      >
                        {/* Number */}
                        <td className="py-3.5 px-3 text-center text-stone-400 font-mono tabular-nums">
                          {index + 1}
                        </td>

                        {/* Runner / Phase */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-900 dark:text-stone-100">
                            {exercise.athleteId === 'both' ? 'Both Runners' : exercise.athleteId === 'arwel' ? 'Arwel Thomas' : 'Helen Shanley'}
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                            Phase {exercise.phase} · {exercise.day}
                          </div>
                        </td>

                        {/* Exercise Name */}
                        <td className="py-3.5 px-4 font-semibold text-stone-950 dark:text-white">
                          <button
                            onClick={() => onOpenVideo(exercise)}
                            className="text-left hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                          >
                            {exercise.name}
                          </button>
                          {exercise.isGripFree && (
                            <span className="block text-[10px] text-teal-700 dark:text-teal-400 font-normal mt-0.5">
                              Grip-free (joint protected)
                            </span>
                          )}
                        </td>

                        {/* Target Injury */}
                        <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300">
                          <div className="font-medium text-stone-800 dark:text-stone-200">
                            {exercise.targetInjury}
                          </div>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400">
                            {exercise.category}
                          </div>
                        </td>

                        {/* Sets & Reps */}
                        <td className="py-3.5 px-4 font-mono tabular-nums text-stone-800 dark:text-stone-200">
                          <div className="font-medium">{exercise.sets}</div>
                          <div className="text-[11px] text-stone-500">{exercise.reps}</div>
                        </td>

                        {/* Tempo / Rest */}
                        <td className="py-3.5 px-4 font-mono tabular-nums text-stone-700 dark:text-stone-300">
                          <div>{exercise.tempo}</div>
                          <div className="text-[11px] text-stone-500">Rest: {exercise.rest}</div>
                        </td>

                        {/* Equipment */}
                        <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400">
                          {exercise.equipment}
                        </td>

                        {/* Video Demonstration Link */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            {/* Watch Modal Button */}
                            <button
                              onClick={() => onOpenVideo(exercise)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-800 rounded-md transition-colors"
                            >
                              <Play className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                              Watch Demo
                            </button>

                            {/* Direct URL link in spreadsheet */}
                            <a
                              href={exercise.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors truncate max-w-[210px]"
                              title={exercise.videoTitle}
                            >
                              <span className="truncate">{exercise.videoTitle}</span>
                              <ExternalLink className="w-3 h-3 shrink-0 text-stone-400" />
                            </a>
                          </div>
                        </td>

                        {/* Expandable Details Button */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : exercise.id)}
                            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                            aria-label={isExpanded ? 'Collapse row details' : 'Expand row details'}
                          >
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-90 text-amber-500' : ''
                              }`}
                            />
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Details Row */}
                      {isExpanded && (
                        <tr className="bg-stone-50/90 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-700">
                          <td colSpan={9} className="p-4 sm:p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Key Cues */}
                              <div className="bg-white dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                                <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                  Coaching Technique Cues
                                </h4>
                                <ul className="space-y-1.5 text-stone-600 dark:text-stone-300 text-xs">
                                  {exercise.keyCues.map((cue, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <span className="text-amber-500 font-bold">•</span>
                                      <span>{cue}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Clinical Rationale */}
                              <div className="bg-white dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                                <h4 className="font-semibold text-emerald-800 dark:text-emerald-400 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                  <Shield className="w-3.5 h-3.5" />
                                  Why This Helps ({exercise.targetInjury})
                                </h4>
                                <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                                  {exercise.clinicalRationale}
                                </p>
                              </div>

                              {/* Safety Warning */}
                              <div className="bg-white dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                                <h4 className="font-semibold text-amber-800 dark:text-amber-400 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  Safety Rules & Contraindications
                                </h4>
                                <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                                  {exercise.safetyCaution}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Spreadsheet Footer Summary */}
        <div className="p-4 bg-stone-50/80 dark:bg-stone-800/40 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-2">
          <div>
            Showing <span className="font-semibold text-stone-800 dark:text-stone-200">{filteredExercises.length}</span> of {exercises.length} prescribed exercises
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <span>Video Links: Verified YouTube Demonstrations</span>
            <span>·</span>
            <span>Tabular Figures: Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
