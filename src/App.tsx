import { useState, useEffect, useCallback } from 'react';
import { SlideIndex } from './types';
import { NavigationControls } from './components/NavigationControls';
import { BehanceModal } from './components/BehanceModal';
import { SystemAlertModal } from './components/SystemAlertModal';
import { GoogleSlidesModal } from './components/GoogleSlidesModal';
import { Slide01Index } from './components/slides/Slide01Index';
import { Slide02Skills } from './components/slides/Slide02Skills';
import { Slide03Audience } from './components/slides/Slide03Audience';
import { Slide04Crisis } from './components/slides/Slide04Crisis';
import { Slide05Feasibility } from './components/slides/Slide05Feasibility';
import { Slide06Configurator } from './components/slides/Slide06Configurator';
import { Slide07Ecosystem } from './components/slides/Slide07Ecosystem';

const SLIDE_THEMES: Record<SlideIndex, { bg: string; isDark: boolean }> = {
  1: { bg: '#1B1B1B', isDark: true },
  2: { bg: '#F3F3F3', isDark: false },
  3: { bg: '#1B1B1B', isDark: true },
  4: { bg: '#E2E2E2', isDark: false },
  5: { bg: '#F3F3F3', isDark: false },
  6: { bg: '#1B1B1B', isDark: true },
  7: { bg: '#1B1B1B', isDark: true },
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<SlideIndex>(1);

  // Google Slides modal state
  const [googleSlidesOpen, setGoogleSlidesOpen] = useState<boolean>(false);

  // Behance iframe modal state
  const [behanceModal, setBehanceModal] = useState<{
    isOpen: boolean;
    title: string;
  }>({
    isOpen: false,
    title: '',
  });

  // System alert notification state
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const handleNavigate = useCallback((index: SlideIndex) => {
    if (index >= 1 && index <= 7) {
      setCurrentSlide(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const openGoogleSlides = useCallback(() => {
    setGoogleSlidesOpen(true);
  }, []);

  const closeGoogleSlides = useCallback(() => {
    setGoogleSlidesOpen(false);
  }, []);

  const openBehance = useCallback((title: string) => {
    setBehanceModal({ isOpen: true, title });
  }, []);

  const closeBehance = useCallback(() => {
    setBehanceModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const triggerAlert = useCallback((message: string, title = 'SECURITY_NOTIFICATION') => {
    setAlertModal({ isOpen: true, title, message });
  }, []);

  const closeAlert = useCallback(() => {
    setAlertModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Keyboard navigation: Left/Right arrows and number keys 1-7
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (googleSlidesOpen || behanceModal.isOpen || alertModal.isOpen) {
        if (e.key === 'Escape') {
          closeGoogleSlides();
          closeBehance();
          closeAlert();
        }
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'Left') {
        if (currentSlide > 1) {
          handleNavigate((currentSlide - 1) as SlideIndex);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        if (currentSlide < 7) {
          handleNavigate((currentSlide + 1) as SlideIndex);
        }
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        handleNavigate(Number(e.key) as SlideIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, googleSlidesOpen, behanceModal.isOpen, alertModal.isOpen, handleNavigate, closeGoogleSlides, closeBehance, closeAlert]);

  const currentTheme = SLIDE_THEMES[currentSlide];

  return (
    <main
      className="relative min-h-screen w-full transition-colors duration-200"
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Minimalist Ironclad Margin Arrows & Slide Status System */}
      <NavigationControls
        currentSlide={currentSlide}
        onNavigate={handleNavigate}
        isDark={currentTheme.isDark}
        totalSlides={7}
        onOpenGoogleSlides={openGoogleSlides}
      />

      {/* Slide Panels: Unique view for each state */}
      <div className="w-full min-h-screen">
        {currentSlide === 1 && (
          <Slide01Index
            onSelectSlide={handleNavigate}
            onOpenGoogleSlides={openGoogleSlides}
          />
        )}
        {currentSlide === 2 && <Slide02Skills onOpenBehance={openBehance} />}
        {currentSlide === 3 && <Slide03Audience onOpenBehance={openBehance} />}
        {currentSlide === 4 && <Slide04Crisis onTriggerAlert={triggerAlert} />}
        {currentSlide === 5 && <Slide05Feasibility />}
        {currentSlide === 6 && <Slide06Configurator onTriggerAlert={triggerAlert} />}
        {currentSlide === 7 && <Slide07Ecosystem onOpenBehance={openBehance} />}
      </div>

      {/* Google Slides & Drive Workspace Modal */}
      <GoogleSlidesModal
        isOpen={googleSlidesOpen}
        onClose={closeGoogleSlides}
      />

      {/* Pop-up Overlay for Behance embed */}
      <BehanceModal
        isOpen={behanceModal.isOpen}
        onClose={closeBehance}
        title={behanceModal.title}
      />

      {/* Native-feel Terminal Alert Notification */}
      <SystemAlertModal
        isOpen={alertModal.isOpen}
        onClose={closeAlert}
        title={alertModal.title}
        message={alertModal.message}
      />
    </main>
  );
}
