import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Atmosphere() {
  const fogRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (fogRef.current) {
      fogRef.current.density = 0.015 + Math.sin(time * 0.5) * 0.005;
    }
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={['#0a1f1a', 1, 30]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        color="#88ff88"
        castShadow
      />
    </>
  );
}