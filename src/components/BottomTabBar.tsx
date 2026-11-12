import React from 'react';
import { Car, Newspaper, Compass, Building2, LayoutGrid } from 'lucide-react';

interface BottomTabBarProps {
  activeTab: 'rides' | 'news' | 'tourist' | 'corporate' | 'canvas';
  onSelectTab: (tab: 'rides' | 'news' | 'tourist' | 'corporate' | 'canvas') => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs = [
    { id: 'rides' as const, label: 'Rides', icon: Car },
    { id: 'news' as const, label: 'News Feed', icon: Newspaper },
    { id: 'tourist' as const, label: 'Tourist', icon: Compass },
    { id: 'corporate' as const, label: 'Corporate', icon: Building2 },
    { id: 'canvas' as const, label: 'Canvas', icon: LayoutGrid },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors"
            >
              <div
                className={`w-7 h-7 flex items-center justify-center rounded-lg transition-transform ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 scale-110 font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 truncate max-w-[56px] ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
