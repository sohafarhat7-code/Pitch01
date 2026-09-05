import React from 'react';
import { SlideIndex } from '../types';

interface NavigationControlsProps {
  currentSlide: SlideIndex;
  onNavigate: (index: SlideIndex) => void;
  isDark: boolean;
  totalSlides?: number;
  onOpenGoogleSlides?: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  onNavigate,
  isDark,
  totalSlides = 7,
  onOpenGoogleSlides,
}) => {
  const formattedCurrent = currentSlide < 10 ? `0${currentSlide}` : `${currentSlide}`;
  const formattedTotal = totalSlides < 10 ? `0${totalSlides}` : `${totalSlides}`;

  const hasPrev = currentSlide > 1;
  const hasNext = currentSlide < totalSlides;

  const handlePrev = () => {
    if (hasPrev) onNavigate((currentSlide - 1) as SlideIndex);
  };

  const handleNext = () => {
    if (hasNext) onNavigate((currentSlide + 1) as SlideIndex);
  };

  const textColor = isDark ? 'text-[#F3F3F3]' : 'text-[#1B1B1B]';
  const mutedColor = isDark ? 'text-[#777777]' : 'text-[#666666]';
  const borderColor = isDark ? 'border-[#333333]' : 'border-[#CCCCCC]';
  const hoverBg = isDark ? 'hover:bg-[#2A2A2A]' : 'hover:bg-[#E5E5E5]';

  return (
    <>
      {/* Top Header / View Routing Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 font-mono text-[11px] tracking-wider pointer-events-none">
        <div className={`pointer-events-auto flex items-center gap-3 ${textColor}`}>
          <span className="font-bold tracking-widest uppercase font-display">SOHA FARHAT</span>
          <span className={`${mutedColor} hidden sm:inline`}>// ARCHITECTURAL_DECK_SYS</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
          {onOpenGoogleSlides && (
            <button
              onClick={onOpenGoogleSlides}
              className={`border ${borderColor} ${textColor} ${hoverBg} px-2.5 py-1 text-[10px] tracking-widest transition-colors cursor-pointer flex items-center gap-1.5`}
              title="Google Slides & Drive Integration"
            >
              <span className="inline-block w-1.5 h-1.5 bg-[#F9BC05] rounded-full" />
              <span>[ GOOGLE SLIDES ]</span>
            </button>
          )}

          <div className={`flex items-center gap-2 ${textColor}`}>
            <span className={`${mutedColor} hidden sm:inline`}>SYS_LOC:</span>
            <span className="font-mono tracking-widest text-[11px] sm:text-[12px]">
              {formattedCurrent} / {formattedTotal}
            </span>
          </div>
        </div>
      </header>

      {/* Left Minimalist Margin Arrow (<) */}
      <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          aria-label="Previous Slide"
          className={`w-9 h-12 flex items-center justify-center font-mono text-xl select-none transition-all cursor-pointer border ${borderColor} ${textColor} ${hoverBg} ${
            !hasPrev ? 'opacity-15 cursor-not-allowed pointer-events-none' : 'opacity-80 hover:opacity-100'
          }`}
        >
          &lt;
        </button>
      </div>

      {/* Right Minimalist Margin Arrow (>) */}
      <div className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={handleNext}
          disabled={!hasNext}
          aria-label="Next Slide"
          className={`w-9 h-12 flex items-center justify-center font-mono text-xl select-none transition-all cursor-pointer border ${borderColor} ${textColor} ${hoverBg} ${
            !hasNext ? 'opacity-15 cursor-not-allowed pointer-events-none' : 'opacity-80 hover:opacity-100'
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Bottom Floating Minimalist Status Track */}
      <footer className={`fixed bottom-0 left-0 right-0 z-40 px-6 py-2.5 flex justify-between items-center font-mono text-[10px] tracking-tight ${mutedColor} pointer-events-none`}>
        <div className="pointer-events-auto flex items-center gap-4">
          <span>KEYBOARD: [← / →]</span>
          <span className="hidden sm:inline">COORDINATE_TRACKING: 33.8938° N, 35.5018° E</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <span>STATE:</span>
          <span className={`${textColor}`}>{formattedCurrent} / {formattedTotal}</span>
        </div>
      </footer>
    </>
  );
};
