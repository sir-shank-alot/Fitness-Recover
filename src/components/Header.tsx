import React from 'react';
import { PlayCircle, Moon, Sun, LogIn, LogOut, Cloud, CloudCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentTab: 'spreadsheet' | 'schedule' | 'injuries' | 'tracker';
  onSelectTab: (tab: 'spreadsheet' | 'schedule' | 'injuries' | 'tracker') => void;
  onOpenQuickSession: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickSession,
  isDark,
  onToggleDark,
}) => {
  const { currentUser, signIn, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md sticky top-0 z-30">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('spreadsheet');
          }}
          className="text-lg font-extrabold tracking-tight text-stone-950 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          Auckland Marathon Rehab
        </a>
      </div>

      {/* Zone 2: 4-5 concise single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
        <button
          onClick={() => onSelectTab('spreadsheet')}
          className={`hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'spreadsheet'
              ? 'text-stone-950 dark:text-white border-b-2 border-amber-500 font-semibold'
              : ''
          }`}
        >
          Spreadsheet Plan
        </button>
        <button
          onClick={() => onSelectTab('schedule')}
          className={`hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'schedule'
              ? 'text-stone-950 dark:text-white border-b-2 border-amber-500 font-semibold'
              : ''
          }`}
        >
          Weekly Schedule
        </button>
        <button
          onClick={() => onSelectTab('injuries')}
          className={`hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'injuries'
              ? 'text-stone-950 dark:text-white border-b-2 border-amber-500 font-semibold'
              : ''
          }`}
        >
          Injury Deep-Dives
        </button>
        <button
          onClick={() => onSelectTab('tracker')}
          className={`hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
            currentTab === 'tracker'
              ? 'text-stone-950 dark:text-white border-b-2 border-amber-500 font-semibold'
              : ''
          }`}
        >
          Recovery Log
        </button>
      </nav>

      {/* Zone 3: 1 primary action + theme toggle + Firebase Auth */}
      <div className="flex items-center gap-2.5 shrink-0">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-xs text-stone-500 dark:text-stone-400 truncate max-w-[140px]" title={currentUser.email || 'User'}>
              {currentUser.displayName || currentUser.email?.split('@')[0]}
            </span>
            <button
              onClick={signOut}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Sign Out of Firebase"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={signIn}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Sign In with Google to sync recovery logs to Firestore"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign In (Cloud Sync)</span>
          </button>
        )}

        <button
          onClick={onToggleDark}
          className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle color theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenQuickSession}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-500 dark:bg-amber-400 dark:hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
        >
          <PlayCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Start Workout Mode</span>
        </button>
      </div>
    </header>
  );
};

