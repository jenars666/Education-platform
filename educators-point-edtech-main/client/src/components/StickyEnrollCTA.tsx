import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronUp } from 'lucide-react';

/**
 * StickyEnrollCTA Component
 * Displays a sticky "Enroll Now" button at the bottom on mobile
 * Only shown on non-home pages
 * Design: Mobile-first, fixed positioning, full-width on mobile
 */
export function StickyEnrollCTA() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const isHome = location === '/';

  // Only show on non-home pages
  if (isHome) return null;

  const handleEnroll = () => {
    window.location.href = '/enroll';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E7FF] shadow-2xl z-40 md:hidden">
      <div className="container mx-auto px-4 py-3">
        <Button
          onClick={handleEnroll}
          className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>{t('cta.enrollNow')}</span>
          <ChevronUp size={18} className="animate-bounce" />
        </Button>
      </div>
    </div>
  );
}
