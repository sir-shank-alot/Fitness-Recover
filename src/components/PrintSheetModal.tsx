import React from 'react';
import { Exercise } from '../types/training';
import { X, Printer, Download } from 'lucide-react';

interface PrintSheetModalProps {
  exercises: Exercise[];
  selectedAthlete: 'all' | 'arwel' | 'helen';
  onClose: () => void;
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({
  exercises,
  selectedAthlete,
  onClose,
}) => {
  const filtered = exercises.filter((ex) => {
    if (selectedAthlete === 'all') return true;
    return ex.athleteId === selectedAthlete || ex.athleteId === 'both';
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white text-stone-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar flex flex-col"
        role="dialog"
      >
        {/* Modal Controls */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 sticky top-0 bg-white z-10 print:hidden">
          <div>
            <h3 className="font-bold text-stone-900 text-base">
              Printable Strength Plan & Spreadsheet View
            </h3>
            <p className="text-xs text-stone-500">
              Clean high-contrast layout optimized for print or Save as PDF.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-500 rounded-lg shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Document / PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-stone-900 text-xs">
          {/* Document Header */}
          <div className="border-b-2 border-stone-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-stone-950">
                  Auckland Marathon Rehabilitation & Strength Training Plan
                </h1>
                <p className="text-stone-600 mt-1 font-medium">
                  Prepared for: <span className="text-stone-950 font-bold">Arwel Thomas</span> (63yo, 71kg) & <span className="text-stone-950 font-bold">Helen Shanley</span> (58yo, 59kg)
                </p>
              </div>
              <div className="text-right text-[11px] text-stone-500 font-mono">
                <div>Post-Race Protocol</div>
                <div>Auckland, NZ</div>
              </div>
            </div>
          </div>

          {/* Key Clinical Guidelines Box */}
          <div className="p-4 bg-stone-100 rounded-lg border border-stone-300">
            <h2 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
              Core Clinical Directives:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-stone-700">
              <div>
                <strong>Arwel Thomas:</strong> Maintain neutral lumbar spine during all core/quad work. Never allow lower back to arch. Focus on active toe clearance during hip flexion.
              </div>
              <div>
                <strong>Helen Shanley:</strong> Adhere to Rathleff protocol with rolled towel under big toe. Strictly avoid crossing knees past midline (GTPS protection). Zero hand/finger gripping.
              </div>
            </div>
          </div>

          {/* Full Spreadsheet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-stone-300 text-[11px]">
              <thead>
                <tr className="bg-stone-200 text-stone-900 font-bold border-b border-stone-400">
                  <th className="p-2 border border-stone-300 w-8">#</th>
                  <th className="p-2 border border-stone-300 min-w-[100px]">Runner</th>
                  <th className="p-2 border border-stone-300 min-w-[150px]">Exercise</th>
                  <th className="p-2 border border-stone-300 min-w-[130px]">Target Injury</th>
                  <th className="p-2 border border-stone-300 min-w-[100px]">Sets & Reps</th>
                  <th className="p-2 border border-stone-300 min-w-[80px]">Tempo</th>
                  <th className="p-2 border border-stone-300 min-w-[160px]">Video Demo Link</th>
                  <th className="p-2 border border-stone-300 min-w-[180px]">Key Cue & Caution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300">
                {filtered.map((ex, i) => (
                  <tr key={ex.id} className="odd:bg-white even:bg-stone-50">
                    <td className="p-2 border border-stone-300 font-mono text-center">{i + 1}</td>
                    <td className="p-2 border border-stone-300 font-medium">
                      {ex.athleteId === 'both' ? 'Both' : ex.athleteId === 'arwel' ? 'Arwel' : 'Helen'}
                      <div className="text-[10px] text-stone-500 font-mono">Phase {ex.phase} · {ex.day}</div>
                    </td>
                    <td className="p-2 border border-stone-300 font-bold text-stone-950">
                      {ex.name}
                    </td>
                    <td className="p-2 border border-stone-300">
                      {ex.targetInjury}
                    </td>
                    <td className="p-2 border border-stone-300 font-mono">
                      <div>{ex.sets}</div>
                      <div className="text-[10px] text-stone-600">{ex.reps}</div>
                    </td>
                    <td className="p-2 border border-stone-300 font-mono">
                      <div>{ex.tempo}</div>
                      <div className="text-[10px] text-stone-500">Rest: {ex.rest}</div>
                    </td>
                    <td className="p-2 border border-stone-300">
                      <div className="font-medium text-stone-900">{ex.videoTitle}</div>
                      <div className="text-[10px] text-blue-700 underline truncate max-w-[200px]">
                        {ex.videoUrl}
                      </div>
                    </td>
                    <td className="p-2 border border-stone-300 text-[10px] text-stone-700 space-y-1">
                      <div><strong>Cue:</strong> {ex.keyCues[0]}</div>
                      <div className="text-amber-800"><strong>Caution:</strong> {ex.safetyCaution}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Sign-off */}
          <div className="pt-4 border-t border-stone-300 text-[10px] text-stone-500 flex justify-between items-center">
            <span>Auckland Marathon Strength Training Hub · Evidence-Based Running Physiotherapy</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
