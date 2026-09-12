'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ThresholdGateway from '@/views/threshold/ThresholdGateway';
import RecruiterStructureView from '@/views/recruiter/RecruiterStructureView';
import ExpressionView from '@/views/immersive/ExpressionView';
import { setDynamicFavicon } from '@/lib/favicon';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLens = searchParams.get('lens');

  // Internal reactive lens state to enable seamless transitions across lenses
  const [currentLens, setCurrentLens] = useState<'threshold' | 'structure' | 'expression'>(
    queryLens === 'structure'
      ? 'structure'
      : queryLens === 'expression'
      ? 'expression'
      : 'threshold'
  );

  // Sync state if user navigates via browser back/forward buttons
  useEffect(() => {
    if (queryLens === 'structure') {
      setCurrentLens('structure');
    } else if (queryLens === 'expression') {
      setCurrentLens('expression');
    } else {
      setCurrentLens('threshold');
    }
  }, [queryLens]);

  // Synchronize browser tab favicon dynamically with active modality
  useEffect(() => {
    setDynamicFavicon(currentLens);
  }, [currentLens]);

  // Transition handler when user selects a lens
  const handleSelectLens = useCallback(
    (lens: 'structure' | 'expression') => {
      if (lens === 'structure') {
        setCurrentLens('structure');
        window.history.pushState(null, '', '/?lens=structure');
      } else {
        setCurrentLens('expression');
        window.history.pushState(null, '', '/?lens=expression');
      }
    },
    []
  );

  // Return handler when user presses ESC or clicks "Threshold"
  const handleBackToThreshold = useCallback(() => {
    setCurrentLens('threshold');
    window.history.pushState(null, '', '/');
  }, []);

  if (currentLens === 'structure') {
    return <RecruiterStructureView onBackToThreshold={handleBackToThreshold} />;
  }

  if (currentLens === 'expression') {
    return (
      <ExpressionView
        onBackToThreshold={handleBackToThreshold}
        onGoToStructure={() => handleSelectLens('structure')}
      />
    );
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
