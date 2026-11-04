/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SpreadsheetView } from './components/SpreadsheetView';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { InjuryGuideView } from './components/InjuryGuideView';
import { WorkoutLogView } from './components/WorkoutLogView';
import { VideoModal } from './components/VideoModal';
import { SessionPlayerModal } from './components/SessionPlayerModal';
import { PrintSheetModal } from './components/PrintSheetModal';
import { EXERCISES_DATA } from './data/trainingPlanData';
import { Exercise, WorkoutLogEntry } from './types/training';
import { Heart, Activity, ShieldCheck, Download, Award } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'spreadsheet' | 'schedule' | 'injuries' | 'tracker'>('spreadsheet');
  const [selectedAthlete, setSelectedAthlete] = useState<'all' | 'arwel' | 'helen'>('all');
  const [activeVideoExercise, setActiveVideoExercise] = useState<Exercise | null>(null);
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [playerSessionTitle, setPlayerSessionTitle] = useState<string>('Day A: Lower Body & Acute Injury Rehab');
  const [playerExercises, setPlayerExercises] = useState<Exercise[]>([]);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize Dark Mode
  useEffect(() => {
    const isDarkStored = localStorage.getItem('marathon_rehab_theme') === 'dark';
    if (isDarkStored) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('marathon_rehab_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('marathon_rehab_theme', 'light');
    }
  };

  // Launch quick workout mode
  const handleOpenQuickSession = () => {
    // Determine exercises based on selected athlete
    const filtered = EXERCISES_DATA.filter((ex) => {
      if (selectedAthlete === 'all') return ex.day === 'Day A';
      return (ex.athleteId === selectedAthlete || ex.athleteId === 'both') && ex.day === 'Day A';
    });
    setPlayerSessionTitle(`Day A: Lower Body & Rehab (${selectedAthlete === 'all' ? 'Combined' : selectedAthlete === 'arwel' ? 'Arwel' : 'Helen'})`);
    setPlayerExercises(filtered.length > 0 ? filtered : EXERCISES_DATA.slice(0, 4));
    setIsPlayerOpen(true);
  };

  const handleStartCustomSession = (title: string, exercisesList: Exercise[]) => {
    setPlayerSessionTitle(title);
    setPlayerExercises(exercisesList);
    setIsPlayerOpen(true);
  };

  const handleSessionComplete = (newLog: WorkoutLogEntry) => {
    try {
      const existing = localStorage.getItem('marathon_rehab_logs');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [newLog, ...parsed];
      localStorage.setItem('marathon_rehab_logs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-150">
      {/* Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenQuickSession={handleOpenQuickSession}
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Hero Section */}
        <HeroBanner
          selectedAthlete={selectedAthlete}
          onSelectAthlete={setSelectedAthlete}
          onOpenQuickSession={handleOpenQuickSession}
        />

        {/* Tab Navigation Views */}
        {currentTab === 'spreadsheet' && (
          <SpreadsheetView
            exercises={EXERCISES_DATA}
            selectedAthlete={selectedAthlete}
            onSelectAthlete={setSelectedAthlete}
            onOpenVideo={setActiveVideoExercise}
            onOpenPrint={() => setIsPrintOpen(true)}
          />
        )}

        {currentTab === 'schedule' && (
          <WeeklyScheduleView
            exercises={EXERCISES_DATA}
            selectedAthlete={selectedAthlete}
            onSelectAthlete={setSelectedAthlete}
            onOpenVideo={setActiveVideoExercise}
            onStartSession={handleStartCustomSession}
          />
        )}

        {currentTab === 'injuries' && <InjuryGuideView />}

        {currentTab === 'tracker' && (
          <WorkoutLogView
            selectedAthlete={selectedAthlete}
            onSelectAthlete={setSelectedAthlete}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-8 px-6 mt-12 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 dark:text-stone-200">
              Auckland Marathon Strength Hub
            </span>
            <span>·</span>
            <span>Tailored for Arwel Thomas & Helen Shanley</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Evidence-Based Physiotherapy
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" /> Post-Marathon Periodization
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VideoModal
        exercise={activeVideoExercise}
        onClose={() => setActiveVideoExercise(null)}
      />

      {isPlayerOpen && (
        <SessionPlayerModal
          sessionTitle={playerSessionTitle}
          exercises={playerExercises}
          onClose={() => setIsPlayerOpen(false)}
          onSessionComplete={handleSessionComplete}
        />
      )}

      {isPrintOpen && (
        <PrintSheetModal
          exercises={EXERCISES_DATA}
          selectedAthlete={selectedAthlete}
          onClose={() => setIsPrintOpen(false)}
        />
      )}
    </div>
  );
}
