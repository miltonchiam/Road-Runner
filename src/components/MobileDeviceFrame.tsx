import React from 'react';
import { Smartphone, X, Wifi, Battery, Signal } from 'lucide-react';

interface MobileDeviceFrameProps {
  isMobileFrame: boolean;
  onCloseMobileFrame: () => void;
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  isMobileFrame,
  onCloseMobileFrame,
  children,
}) => {
  if (!isMobileFrame) {
    return <>{children}</>;
  }

  return (
    <div className="py-6 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      
      {/* Device frame header controls */}
      <div className="mb-4 flex items-center justify-between w-full max-w-[420px] px-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-4 h-4 text-blue-500" />
          <span>Mobile Device Emulator (390 × 844 px)</span>
        </div>
        <button
          onClick={onCloseMobileFrame}
          className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold cursor-pointer underline text-[11px]"
        >
          Expand to Web Layout
        </button>
      </div>

      {/* Simulated Phone Shell */}
      <div className="w-full max-w-[410px] bg-slate-900 dark:bg-black p-3.5 rounded-[48px] shadow-2xl border-4 border-slate-700/60 relative ring-1 ring-white/10">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          <div className="w-2 h-2 rounded-full bg-blue-950/80 ring-1 ring-blue-500/30" />
        </div>

        {/* Mobile Screen Surface */}
        <div className="w-full h-[780px] bg-slate-50 dark:bg-[#090d16] rounded-[38px] overflow-hidden flex flex-col relative">
          
          {/* iOS Style Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-900 dark:text-white shrink-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Scrollable Viewport Container */}
          <div className="flex-1 overflow-y-auto px-3.5 py-4 pb-20 custom-scrollbar">
            {children}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full z-50 pointer-events-none" />
        </div>

      </div>

    </div>
  );
};
