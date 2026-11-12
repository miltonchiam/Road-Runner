import React from 'react';
import { 
  Car, 
  Newspaper, 
  Compass, 
  Building2, 
  LayoutGrid, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon,
  Zap
} from 'lucide-react';

interface TopNavProps {
  activeTab: 'rides' | 'news' | 'tourist' | 'corporate' | 'canvas';
  onSelectTab: (tab: 'rides' | 'news' | 'tourist' | 'corporate' | 'canvas') => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  isPeakHour: boolean;
  onTogglePeakHour: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenOriginalCanvas: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  isMobileFrame,
  onToggleMobileFrame,
  isPeakHour,
  onTogglePeakHour,
  isDarkMode,
  onToggleDarkMode,
  onOpenOriginalCanvas,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 md:gap-8 h-16">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('rides')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              RR
            </div>
            <div className="leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
                Road Runner
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 block">
                Singapore Smart Commute
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean 4–5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectTab('rides')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rides'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Compare Rides</span>
          </button>

          <button
            onClick={() => onSelectTab('news')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'news'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Commute Feed</span>
          </button>

          <button
            onClick={() => onSelectTab('tourist')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tourist'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tourist & eSIM</span>
          </button>

          <button
            onClick={() => onSelectTab('corporate')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'corporate'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Corporate</span>
          </button>

          <button
            onClick={() => onSelectTab('canvas')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'canvas'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Model Canvas</span>
          </button>
        </nav>

        {/* Zone 3: Interactive controls and device viewport switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Peak hour simulation button */}
          <button
            onClick={onTogglePeakHour}
            title={isPeakHour ? 'Peak Hour active (surges applied)' : 'Normal Traffic'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isPeakHour
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isPeakHour ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span className="tabular-nums">{isPeakHour ? 'AM Peak Surge (1.5x)' : 'Standard Off-Peak'}</span>
          </button>

          {/* Desktop/Mobile Device Frame Toggle */}
          <button
            onClick={onToggleMobileFrame}
            title={isMobileFrame ? 'Switch to Full Web View' : 'Preview Mobile Phone Layout'}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Web Layout</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Mobile App View</span>
              </>
            )}
          </button>

          {/* View Original BMC sticky board */}
          <button
            onClick={onOpenOriginalCanvas}
            title="View original uploaded Business Model Canvas whiteboard"
            className="hidden xl:inline-flex px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer whitespace-nowrap"
          >
            Original Canvas
          </button>

          {/* Dark / Light toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
