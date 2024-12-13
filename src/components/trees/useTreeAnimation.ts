import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';
import * as THREE from 'three';

export function useTreeAnimation(
  materialRef: RefObject<THREE.MeshStandardMaterial>,
  pulsePhase: number
) {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 
        0.2 + Math.sin(time * 2 + pulsePhase) * 0.1;
    }
  });
}