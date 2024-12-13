import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlowMaterial } from '../effects/GlowMaterial';
import { useTreeAnimation } from './useTreeAnimation';

interface TreeProps {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  pulsePhase?: number;
}

export function Tree({ position, scale, rotation, pulsePhase = 0 }: TreeProps) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  useTreeAnimation(materialRef, pulsePhase);

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.4, 4, 8]} />
        <GlowMaterial ref={materialRef} />
      </mesh>
    </group>
  );
}