import React from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

interface OriginalCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalCanvasModal: React.FC<OriginalCanvasModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Original Road Runner Business Model Canvas
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              User uploaded whiteboard specification for Singapore Ride Aggregator & Commute Feed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/aistudio/Road_Runner_fcd826ee.png"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Open raw image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
          <img
            src="/assets/aistudio/Road_Runner_fcd826ee.png"
            alt="Road Runner Business Model Canvas"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[72vh] object-contain rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 bg-white"
          />
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Source: Road Runner Business Model Canvas sticky notes</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Back to Interactive Canvas
          </button>
        </div>

      </div>
    </div>
  );
};
