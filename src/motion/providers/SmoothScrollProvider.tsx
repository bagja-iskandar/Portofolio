'use client';

import React, { createContext, useContext } from 'react';
import { useSmoothScroll, type UseSmoothScrollProps, type UseSmoothScrollReturn } from '../hooks/useSmoothScroll';

export const SmoothScrollContext = createContext<UseSmoothScrollReturn | null>(null);

export interface SmoothScrollProviderProps extends Partial<UseSmoothScrollProps> {
  children: React.ReactNode;
  value?: UseSmoothScrollReturn;
}

export function SmoothScrollProvider({
  children,
  value,
  wrapperRef,
  contentRef,
  options,
  enabled = true,
}: SmoothScrollProviderProps) {
  const internalSmoothScroll = useSmoothScroll({
    wrapperRef,
    contentRef,
    options,
    enabled: value ? false : enabled,
  });

  const contextValue = value ?? internalSmoothScroll;

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScrollContext(): UseSmoothScrollReturn {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    // Fallback safe dummy if invoked outside provider
    return {
      lenis: null,
      scrollTo: () => {},
      resize: () => {},
      stop: () => {},
      start: () => {},
    };
  }
  return context;
}
