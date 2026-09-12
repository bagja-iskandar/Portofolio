'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ThresholdGateway from '@/views/threshold/ThresholdGateway';
import RecruiterStructureView from '@/views/recruiter/RecruiterStructureView';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLens = searchParams.get('lens');

  // Internal reactive lens state to enable seamless GSAP-coordinated transitions without hard route flashing
  const [currentLens, setCurrentLens] = useState<'threshold' | 'structure'>(
    queryLens === 'structure' ? 'structure' : 'threshold'
  );

  // Sync state if user navigates via browser back/forward buttons
  useEffect(() => {
    if (queryLens === 'structure') {
      setCurrentLens('structure');
    } else {
      setCurrentLens('threshold');
    }
  }, [queryLens]);

  // Transition handler when user clicks "ENTER STRUCTURE"
  const handleSelectLens = useCallback(
    (lens: 'structure' | 'expression') => {
      if (lens === 'structure') {
        setCurrentLens('structure');
        window.history.pushState(null, '', '/?lens=structure');
      } else {
        router.push('/?lens=expression');
      }
    },
    [router]
  );

  // Return handler when user presses ESC or clicks "Threshold Gateway"
  const handleBackToThreshold = useCallback(() => {
    setCurrentLens('threshold');
    window.history.pushState(null, '', '/');
  }, []);

  if (currentLens === 'structure') {
    return <RecruiterStructureView onBackToThreshold={handleBackToThreshold} />;
  }

  return <ThresholdGateway onSelectLens={handleSelectLens} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<ThresholdGateway />}>
      <HomeContent />
    </Suspense>
  );
}
