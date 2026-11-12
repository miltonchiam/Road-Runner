/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { BottomTabBar } from './components/BottomTabBar';
import { RideComparator } from './components/RideComparator';
import { CommuteNews } from './components/CommuteNews';
import { TouristAndEsim } from './components/TouristAndEsim';
import { CorporateCommute } from './components/CorporateCommute';
import { CanvasStudio } from './components/CanvasStudio';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { OriginalCanvasModal } from './components/OriginalCanvasModal';
import { Car, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'rides' | 'news' | 'tourist' | 'corporate' | 'canvas'>('rides');
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isPeakHour, setIsPeakHour] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOriginalImageOpen, setIsOriginalImageOpen] = useState(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleBookRideToStop = (stopName: string) => {
    setActiveTab('rides');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-blue-500 selection:text-white">
      
      {/* Top Bar adhering to Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        isPeakHour={isPeakHour}
        onTogglePeakHour={() => setIsPeakHour(!isPeakHour)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenOriginalCanvas={() => setIsOriginalImageOpen(true)}
      />

      {/* Main Content Area: Supports both Fluid Web Layout and Mobile Device Frame */}
      <main className="flex-1 pb-20 md:pb-12">
        <MobileDeviceFrame
          isMobileFrame={isMobileFrame}
          onCloseMobileFrame={() => setIsMobileFrame(false)}
        >
          <div className={isMobileFrame ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8'}>
            
            {activeTab === 'rides' && (
              <RideComparator
                isPeakHour={isPeakHour}
                onOpenNews={() => setActiveTab('news')}
                onOpenCanvas={() => setActiveTab('canvas')}
              />
            )}

            {activeTab === 'news' && (
              <CommuteNews />
            )}

            {activeTab === 'tourist' && (
              <TouristAndEsim
                onBookRideToStop={handleBookRideToStop}
                onOpenCanvas={() => setActiveTab('canvas')}
              />
            )}

            {activeTab === 'corporate' && (
              <CorporateCommute
                onOpenCanvas={() => setActiveTab('canvas')}
                onBookRide={() => setActiveTab('rides')}
              />
            )}

            {activeTab === 'canvas' && (
              <CanvasStudio
                onTestFeatureInApp={(tab) => setActiveTab(tab)}
                onOpenOriginalImageModal={() => setIsOriginalImageOpen(true)}
              />
            )}

          </div>
        </MobileDeviceFrame>
      </main>

      {/* Mobile Bottom Tab Bar for ergonomic one-handed thumb navigation */}
      {!isMobileFrame && (
        <BottomTabBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />
      )}

      {/* Modal for viewing the user's uploaded original Business Model Canvas */}
      <OriginalCanvasModal
        isOpen={isOriginalImageOpen}
        onClose={() => setIsOriginalImageOpen(false)}
      />

      {/* Subtle Footer for Desktop Web View */}
      {!isMobileFrame && (
        <footer className="hidden md:block border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white">Road Runner</span>
              <span>·</span>
              <span>Singapore Multi-Operator Mobility Anchor Platform</span>
              <span>·</span>
              <span>ComfortDelGro Zig, Grab, Gojek, Tada & Ryde</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('canvas')}
                className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                Business Model Canvas
              </button>
              <button
                onClick={() => setIsOriginalImageOpen(true)}
                className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                Original Canvas Photo
              </button>
              <span className="text-slate-400 font-mono">v1.0 Clean & Simple</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
