import React, { useState, useEffect, useRef } from 'react';
import { Creator, LanguageCode } from '../types';
import { CreatorCard } from './CreatorCard';
import { 
  ChevronLeft, ChevronRight, Pause, Play, RefreshCw, 
  Sparkles, LayoutGrid, SlidersHorizontal, FastForward, Rewind
} from 'lucide-react';

interface InfiniteCreatorsCarouselProps {
  creators: Creator[];
  onViewDetails: (creator: Creator) => void;
  onToggleShortlist: (creator: Creator) => void;
  shortlist: Creator[];
  onToggleCompare: (creator: Creator) => void;
  comparisonList: Creator[];
  lang: LanguageCode;
}

export const InfiniteCreatorsCarousel: React.FC<InfiniteCreatorsCarouselProps> = ({
  creators,
  onViewDetails,
  onToggleShortlist,
  shortlist,
  onToggleCompare,
  comparisonList,
  lang,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Speed in pixels per frame
  const speedPxMap = {
    slow: 0.6,
    normal: 1.2,
    fast: 2.5
  };

  // Continuous auto-scroll loop effect
  useEffect(() => {
    if (viewMode !== 'carousel') return;

    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const step = () => {
      if (isPlaying && !isHovered && scrollContainer) {
        const stepPx = speedPxMap[speed];
        
        if (direction === 'left') {
          scrollContainer.scrollLeft += stepPx;
          // Loop seamlessly: if we scroll halfway through the duplicated content, jump back
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        } else {
          scrollContainer.scrollLeft -= stepPx;
          if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, isHovered, speed, direction, viewMode, creators.length]);

  // Manual scroll by buttons
  const handleManualScroll = (dir: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 380;
      containerRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (creators.length === 0) {
    return null;
  }

  // Duplicate items array to ensure seamless infinite loop
  // Multiply array if creators count is small to fill wide screens
  const displayCountMultiplier = creators.length < 5 ? 4 : 3;
  const loopedCreators = Array.from({ length: displayCountMultiplier }, () => creators).flat();

  return (
    <div className="space-y-4">
      
      {/* Carousel Controls & Mode Switcher Header */}
      <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        {/* Left Status & Auto-play Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {isPlaying && !isHovered && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isPlaying && !isHovered ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
            </span>
            <span className="text-xs font-black tracking-tight text-slate-200 uppercase">
              Carrusel Infinito En Vivo
            </span>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline">•</span>

          <span className="text-xs text-slate-300 font-bold hidden sm:inline">
            {creators.length} Creadores Auditados
          </span>
        </div>

        {/* Center / Right Control Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Pause / Play Button */}
          {viewMode === 'carousel' && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying 
                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-500 border border-emerald-400 shadow-xs'
              }`}
              title={isPlaying ? 'Pausar desplazamiento automático' : 'Iniciar desplazamiento automático'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
            </button>
          )}

          {/* Direction Toggle */}
          {viewMode === 'carousel' && (
            <button
              onClick={() => setDirection(prev => prev === 'left' ? 'right' : 'left')}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1 cursor-pointer"
              title="Cambiar dirección del carrusel"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">{direction === 'left' ? '⬅️ Izq' : '➡️ Der'}</span>
            </button>
          )}

          {/* Speed Selector */}
          {viewMode === 'carousel' && (
            <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700 text-xs font-extrabold">
              <button
                onClick={() => setSpeed('slow')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${speed === 'slow' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                1x
              </button>
              <button
                onClick={() => setSpeed('normal')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${speed === 'normal' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                1.5x
              </button>
              <button
                onClick={() => setSpeed('fast')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${speed === 'fast' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                2.5x
              </button>
            </div>
          )}

          {/* Manual Scroll Arrows */}
          {viewMode === 'carousel' && (
            <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
              <button
                onClick={() => handleManualScroll('left')}
                className="p-1.5 bg-slate-800 hover:bg-blue-600 text-white rounded-xl transition-all cursor-pointer border border-slate-700"
                title="Desplazar a la izquierda"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleManualScroll('right')}
                className="p-1.5 bg-slate-800 hover:bg-blue-600 text-white rounded-xl transition-all cursor-pointer border border-slate-700"
                title="Desplazar a la derecha"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* View Mode Toggle (Carousel vs Grid) */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700 text-xs font-bold ml-1">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'carousel' ? 'bg-blue-600 text-white font-black' : 'text-slate-400 hover:text-white'
              }`}
              title="Ver en carrusel horizontal continuo"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Carrusel</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-blue-600 text-white font-black' : 'text-slate-400 hover:text-white'
              }`}
              title="Ver en cuadrícula tradicional"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cuadrícula</span>
            </button>
          </div>

        </div>

      </div>

      {/* Mode 1: Infinite Horizontal Scrolling Carousel Container - Full Window Width Bleed */}
      {viewMode === 'carousel' ? (
        <div className="relative group/carousel w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-4 bg-slate-900/5 backdrop-blur-3xs border-y border-slate-200">
          
          {/* Edge Gradient Fades for depth */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-slate-100 via-slate-100/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-slate-100 via-slate-100/90 to-transparent z-10 pointer-events-none"></div>

          {/* Manual Side Scroll Floating Buttons */}
          <button
            onClick={() => handleManualScroll('left')}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-slate-900/90 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl border border-slate-700 transition-all opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
            title="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => handleManualScroll('right')}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-slate-900/90 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl border border-slate-700 transition-all opacity-90 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
            title="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Horizontal Track across entire window */}
          <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-6 sm:px-12 md:px-16 scroll-smooth select-none cursor-grab active:cursor-grabbing touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loopedCreators.map((creator, index) => (
              <div 
                key={`${creator.id}-loop-${index}`} 
                className="w-[280px] sm:w-[330px] md:w-[360px] shrink-0 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CreatorCard
                  creator={creator}
                  onViewDetails={onViewDetails}
                  onToggleShortlist={onToggleShortlist}
                  isShortlisted={shortlist.some((s) => s.id === creator.id)}
                  onToggleCompare={onToggleCompare}
                  isCompared={comparisonList.some((c) => c.id === creator.id)}
                  lang={lang}
                />
              </div>
            ))}
          </div>

          {/* Hover Pause Toast Indicator */}
          {isHovered && isPlaying && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black tracking-tight z-20 border border-amber-500/40 shadow-xl pointer-events-none animate-in fade-in">
              ⏸️ Desplazamiento pausado al pasar el cursor (mueve fuera para reanudar)
            </div>
          )}

        </div>
      ) : (
        /* Mode 2: Traditional Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onViewDetails={onViewDetails}
              onToggleShortlist={onToggleShortlist}
              isShortlisted={shortlist.some((s) => s.id === creator.id)}
              onToggleCompare={onToggleCompare}
              isCompared={comparisonList.some((c) => c.id === creator.id)}
              lang={lang}
            />
          ))}
        </div>
      )}

    </div>
  );
};
