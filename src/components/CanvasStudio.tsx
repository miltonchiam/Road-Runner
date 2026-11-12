import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Image as ImageIcon, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  Layers, 
  Check, 
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { CANVAS_BLOCKS, INITIAL_STICKY_NOTES, CanvasBlockDefinition } from '../data/canvasData';
import { StickyNote, CanvasBlockId, SegmentFilter } from '../types';

interface CanvasStudioProps {
  onTestFeatureInApp: (tab: 'rides' | 'news' | 'tourist' | 'corporate') => void;
  onOpenOriginalImageModal: () => void;
}

export const CanvasStudio: React.FC<CanvasStudioProps> = ({
  onTestFeatureInApp,
  onOpenOriginalImageModal,
}) => {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(INITIAL_STICKY_NOTES);
  const [activeSegmentFilter, setActiveSegmentFilter] = useState<SegmentFilter>('all');
  const [selectedNote, setSelectedNote] = useState<StickyNote | null>(null);

  // Add Note Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [targetBlockId, setTargetBlockId] = useState<CanvasBlockId>('value_propositions');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteSegment, setNewNoteSegment] = useState<'working_adults' | 'tourists' | 'corporates' | 'all'>('all');
  const [newNoteColor, setNewNoteColor] = useState<'blue' | 'yellow' | 'peach' | 'pink' | 'green' | 'teal'>('yellow');

  // Revenue projection model states
  const [monthlyRides, setMonthlyRides] = useState<number>(65000);
  const [avgFareSgd, setAvgFareSgd] = useState<number>(18.50);
  const [commissionRate, setCommissionRate] = useState<number>(4.0); // 4%
  const [monthlyAdRevenueSgd, setMonthlyAdRevenueSgd] = useState<number>(4800);
  const [monthlyEsimSignups, setMonthlyEsimSignups] = useState<number>(1200);
  const [esimCommissionSgd, setEsimCommissionSgd] = useState<number>(3.20);
  const [monthlyMarketingSpendSgd, setMonthlyMarketingSpendSgd] = useState<number>(15000);
  const [cloudApiCostSgd, setCloudApiCostSgd] = useState<number>(3500);

  // Financial calculations
  const rideCommissionRevenue = (monthlyRides * avgFareSgd * (commissionRate / 100));
  const esimRevenue = monthlyEsimSignups * esimCommissionSgd;
  const totalMonthlyRevenue = rideCommissionRevenue + monthlyAdRevenueSgd + esimRevenue;
  const totalMonthlyCosts = monthlyMarketingSpendSgd + cloudApiCostSgd;
  const netMonthlyProfit = totalMonthlyRevenue - totalMonthlyCosts;

  // Colors matching the original whiteboard sticky notes
  const colorStyles = {
    blue: 'bg-[#bfe3f9] text-slate-900 border-[#93cbf1] shadow-sm',
    yellow: 'bg-[#fff59d] text-slate-900 border-[#fde047] shadow-sm',
    peach: 'bg-[#ffccbc] text-slate-900 border-[#ffab91] shadow-sm',
    pink: 'bg-[#f8bbd0] text-slate-900 border-[#f48fb1] shadow-sm',
    green: 'bg-[#c8e6c9] text-slate-900 border-[#a5d6a7] shadow-sm',
    teal: 'bg-[#b2dfdb] text-slate-900 border-[#80cbc4] shadow-sm',
  };

  const handleResetToOriginal = () => {
    if (confirm('Reset all sticky notes back to the original Road Runner Canvas?')) {
      setStickyNotes(INITIAL_STICKY_NOTES);
      setSelectedNote(null);
    }
  };

  const handleCreateNote = () => {
    if (!newNoteContent.trim()) return;
    const newNote: StickyNote = {
      id: `custom-${Date.now()}`,
      blockId: targetBlockId,
      content: newNoteContent.trim(),
      color: newNoteColor,
      segmentTag: newNoteSegment,
    };
    setStickyNotes([...stickyNotes, newNote]);
    setNewNoteContent('');
    setIsAddModalOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    setStickyNotes(stickyNotes.filter(n => n.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const openAddForBlock = (blockId: CanvasBlockId, defaultColor: 'blue' | 'yellow' | 'peach' | 'pink' | 'green' | 'teal') => {
    setTargetBlockId(blockId);
    setNewNoteColor(defaultColor);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Canvas Top Bar & Segment Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>Interactive Strategic Canvas</span>
            <span className="text-slate-400">·</span>
            <span>Digital Twin of Uploaded Whiteboard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Road Runner Business Model Canvas
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Explore value propositions, ride operator APIs, revenue streams, and customer segment alignment.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Segment Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <span className="px-2 text-slate-400 font-medium hidden sm:inline">Highlight:</span>
            <button
              onClick={() => setActiveSegmentFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSegmentFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveSegmentFilter('working_adults')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSegmentFilter === 'working_adults'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Working Adults
            </button>
            <button
              onClick={() => setActiveSegmentFilter('tourists')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSegmentFilter === 'tourists'
                  ? 'bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tourists
            </button>
            <button
              onClick={() => setActiveSegmentFilter('corporates')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSegmentFilter === 'corporates'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Corporates
            </button>
          </div>

          {/* Inspect Original Canvas Modal Button */}
          <button
            onClick={onOpenOriginalImageModal}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            title="Inspect user uploaded Road Runner image"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
            <span>Original Image</span>
          </button>

          {/* Reset Notes */}
          <button
            onClick={handleResetToOriginal}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Reset to default sticky notes"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 9-Box Business Model Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        
        {/* ROW 1: Core 5 Pillars */}
        {CANVAS_BLOCKS.map((block) => {
          const notesInBlock = stickyNotes.filter(n => n.blockId === block.id);

          return (
            <div
              key={block.id}
              className={`${block.columnClass} bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between transition-colors min-h-[220px]`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                      {block.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                      {block.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => openAddForBlock(block.id, block.colorScheme)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                    title={`Add sticky note to ${block.title}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Sticky Notes Container */}
                <div className="grid grid-cols-1 gap-2.5 mt-3">
                  {notesInBlock.map((note) => {
                    const isDimmed = activeSegmentFilter !== 'all' && 
                                     note.segmentTag !== 'all' && 
                                     note.segmentTag !== activeSegmentFilter;

                    return (
                      <div
                        key={note.id}
                        onClick={() => setSelectedNote(note)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${colorStyles[note.color]} ${
                          isDimmed ? 'opacity-30 grayscale-[50%]' : 'hover:scale-[1.02] hover:shadow-md'
                        }`}
                      >
                        <p className="text-xs font-semibold whitespace-pre-line leading-relaxed">
                          {note.content}
                        </p>

                        {/* Delete trigger on hover */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-rose-600 transition-opacity cursor-pointer"
                          title="Delete note"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Action for this Block */}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">
                  {notesInBlock.length} {notesInBlock.length === 1 ? 'card' : 'cards'}
                </span>

                {block.id === 'value_propositions' && (
                  <button
                    onClick={() => onTestFeatureInApp('rides')}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Test Rides <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {block.id === 'customer_relationships' && (
                  <button
                    onClick={() => onTestFeatureInApp('news')}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Test News <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {block.id === 'customer_segments' && (
                  <button
                    onClick={() => onTestFeatureInApp('tourist')}
                    className="font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Tourist Mode <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {block.id === 'channels' && (
                  <button
                    onClick={() => onTestFeatureInApp('corporate')}
                    className="font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Corporate <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

      </div>

      {/* Financial Unit Economics & Monetization Simulator (Directly mapping Cost Structure vs Revenue Streams) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Cost Structure vs. Revenue Streams Simulator</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Road Runner Unit Economics & Financial Projection
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Simulate monthly revenue from operator commissions (Zig, Grab, Gojek, Tada, Ryde), in-app advertisements, and tourist eSIM passes against minimal asset-light operating costs.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Net Monthly Margin</div>
              <div className={`text-xl font-black font-mono tabular-nums ${netMonthlyProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                S${netMonthlyProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          
          {/* Parameter 1: Monthly Completed Rides */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Monthly Completed Rides:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{monthlyRides.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={monthlyRides}
              onChange={(e) => setMonthlyRides(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Avg. Fare: S${avgFareSgd.toFixed(2)} across 5 operators
            </div>
          </div>

          {/* Parameter 2: Operator Commission Rate */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Operator Commission:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{commissionRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="7.0"
              step="0.5"
              value={commissionRate}
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium font-mono">
              = S${rideCommissionRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })} / mo from rides
            </div>
          </div>

          {/* Parameter 3: Tourist eSIM Signups */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Monthly eSIM Signups:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{monthlyEsimSignups.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={monthlyEsimSignups}
              onChange={(e) => setMonthlyEsimSignups(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium font-mono">
              = S${esimRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })} / mo affiliate income
            </div>
          </div>

          {/* Parameter 4: Marketing & Voucher Cost */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Marketing & Vouchers:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">S${monthlyMarketingSpendSgd.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="2500"
              value={monthlyMarketingSpendSgd}
              onChange={(e) => setMonthlyMarketingSpendSgd(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="text-[11px] text-slate-400">
              Cloud APIs: S${cloudApiCostSgd} (Asset-light model)
            </div>
          </div>

        </div>

        {/* Breakdown Summary */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-500">Revenue Breakdown:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              Rides: S${rideCommissionRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              Ads: S${monthlyAdRevenueSgd.toLocaleString()}
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              eSIM: S${esimRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="text-slate-500">
            Total Revenue: <strong className="text-slate-900 dark:text-white font-mono">S${totalMonthlyRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            {' '} vs Costs: <strong className="text-slate-900 dark:text-white font-mono">S${totalMonthlyCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
          </div>
        </div>
      </section>

      {/* Selected Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full ${colorStyles[selectedNote.color]}`} />
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Canvas Card Details
                </h4>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className={`p-4 rounded-xl border mb-4 ${colorStyles[selectedNote.color]}`}>
              <p className="text-sm font-semibold whitespace-pre-line leading-relaxed">
                {selectedNote.content}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Canvas Pillar:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {CANVAS_BLOCKS.find(b => b.id === selectedNote.blockId)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Segment:</span>
                <span className="font-semibold text-slate-900 dark:text-white capitalize">
                  {selectedNote.segmentTag === 'all' ? 'All Commuters & Visitors' : selectedNote.segmentTag?.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDeleteNote(selectedNote.id)}
                className="px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Delete Card
              </button>

              <div className="flex-1" />

              <button
                onClick={() => {
                  if (selectedNote.blockId === 'value_propositions') onTestFeatureInApp('rides');
                  else if (selectedNote.blockId === 'customer_relationships') onTestFeatureInApp('news');
                  else if (selectedNote.blockId === 'customer_segments') onTestFeatureInApp('tourist');
                  else if (selectedNote.blockId === 'channels') onTestFeatureInApp('corporate');
                  else onTestFeatureInApp('rides');
                  setSelectedNote(null);
                }}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Test in App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Note Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Add Sticky Note to Canvas
              </h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Canvas Block</label>
                <select
                  value={targetBlockId}
                  onChange={(e) => setTargetBlockId(e.target.value as CanvasBlockId)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
                >
                  {CANVAS_BLOCKS.map(b => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Sticky Note Content</label>
                <textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="e.g. Partner with tourist attractions for bundled ride vouchers..."
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Sticky Color</label>
                <div className="flex items-center gap-2">
                  {(['blue', 'yellow', 'peach', 'pink', 'green', 'teal'] as const).map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewNoteColor(color)}
                      className={`w-7 h-7 rounded-lg border cursor-pointer transition-transform ${colorStyles[color]} ${
                        newNoteColor === color ? 'scale-125 ring-2 ring-slate-900 dark:ring-white' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Target Segment</label>
                <select
                  value={newNoteSegment}
                  onChange={(e) => setNewNoteSegment(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
                >
                  <option value="all">All / Cross-Cutting</option>
                  <option value="working_adults">Young Working Adults</option>
                  <option value="tourists">Tourists in Singapore</option>
                  <option value="corporates">Corporates</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 min-h-[44px] py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateNote}
                  disabled={!newNoteContent.trim()}
                  className="flex-1 min-h-[44px] py-2 px-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
