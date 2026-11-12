import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Clock, 
  Bell, 
  Bookmark, 
  Share2, 
  Headphones, 
  Sparkles, 
  Check, 
  TrendingUp, 
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { NEWS_ARTICLES } from '../data/mobilityData';
import { NewsArticle } from '../types';

export const CommuteNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [commuteMinutes, setCommuteMinutes] = useState<number>(15);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(NEWS_ARTICLES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(35);
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);
  const [savedArticles, setSavedArticles] = useState<string[]>(['news-1']);

  const categories = [
    { id: 'all', label: 'All Feeds' },
    { id: 'economy', label: 'Economy & Markets' },
    { id: 'local_news', label: 'Singapore Local' },
    { id: 'tech', label: 'Tech & Mobility' },
    { id: 'hobbies', label: 'Hobbies & Living' },
    { id: 'travel', label: 'Travel & Dining' },
  ];

  const filteredArticles = NEWS_ARTICLES.filter(art => {
    if (selectedCategory === 'all') return true;
    return art.category === selectedCategory;
  });

  const toggleBookmark = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(item => item !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };

  const handlePlayArticle = (article: NewsArticle) => {
    if (activeArticle?.id === article.id && isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setActiveArticle(article);
      setIsPlayingAudio(true);
      setAudioProgress(10);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner: BMC Value Proposition */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
              <Headphones className="w-4 h-4 text-blue-400" />
              <span>Personalised Commute Companion</span>
              <span className="text-slate-500">·</span>
              <span>Audio & Quick Reads</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Curated News for Your Transit Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              From Singapore economy and traffic updates to weekend hobbies, tailored to your 15-minute commute window.
            </p>
          </div>

          {/* Daily push notification preference toggle */}
          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors cursor-pointer shrink-0 ${
              pushEnabled
                ? 'bg-blue-600/30 text-blue-300 border-blue-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Bell className={`w-3.5 h-3.5 ${pushEnabled ? 'fill-blue-400 text-blue-400' : ''}`} />
            <span>{pushEnabled ? '8:15 AM Briefing Enabled' : 'Push Muted'}</span>
          </button>
        </div>

        {/* Commute Duration Matcher Slider */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
            <span>Tailor feed to your ride duration:</span>
            <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded tabular-nums">
              {commuteMinutes} Minutes
            </span>
          </div>

          <div className="flex items-center gap-2">
            {[10, 15, 20, 30].map(mins => (
              <button
                key={mins}
                onClick={() => setCommuteMinutes(mins)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  commuteMinutes === mins
                    ? 'bg-white text-slate-900 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Audio Player Widget (Simulating Commute Audio Reader) */}
      {activeArticle && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">Audio Brief</span>
                <span>·</span>
                <span>{activeArticle.source}</span>
                <span>·</span>
                <span>{activeArticle.readTimeMinutes} min audio</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {activeArticle.title}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full sm:w-64 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${isPlayingAudio ? audioProgress : 15}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-400 tabular-nums shrink-0">
              {isPlayingAudio ? '0:42 / 2:10' : 'Ready'}
            </span>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((article) => {
          const isSaved = savedArticles.includes(article.id);
          const isCurrentActive = activeArticle?.id === article.id;
          return (
            <div
              key={article.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isCurrentActive
                  ? 'border-blue-500/80 ring-1 ring-blue-500/30'
                  : 'border-slate-200 dark:border-slate-800 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{article.source}</span>
                    <span>·</span>
                    <span>{article.publishTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(article.id)}
                      className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer"
                      title={isSaved ? 'Remove Bookmark' : 'Save for later'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

                {/* Key Takeaway Box */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">Commute Takeaway: </span>
                  {article.keyTakeaway}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTimeMinutes} min read</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayArticle(article)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>{isCurrentActive && isPlayingAudio ? 'Pause Audio' : 'Listen'}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
