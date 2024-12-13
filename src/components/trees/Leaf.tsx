import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlowMaterial } from '../effects/GlowMaterial';

interface LeafProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  swaySpeed?: number;
  swayIntensity?: number;
}

export function Leaf({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1,
  swaySpeed = 1,
  swayIntensity = 0.1
}: LeafProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Add subtle rotation and position changes
    meshRef.current.rotation.x = rotation[0] + Math.sin(time * swaySpeed) * swayIntensity;
    meshRef.current.rotation.z = rotation[2] + Math.cos(time * swaySpeed) * swayIntensity;
    meshRef.current.position.y = initialY + Math.sin(time * swaySpeed * 0.5) * (swayIntensity * 0.2);
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <coneGeometry args={[0.2, 0.4, 3]} />
      <GlowMaterial color="#4ade80" intensity={0.4} />
    </mesh>
  );
}