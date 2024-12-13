import { useMemo } from 'react';

export function useControls() {
  // In a real app, these could be controlled via UI or environment
  return useMemo(() => ({
    bloomIntensity: 1.5,
    bloomThreshold: 0.2,
  }), []);
}