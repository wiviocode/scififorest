import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlowMaterial } from '../effects/GlowMaterial';
import { Leaf } from './Leaf';

interface TreeWithLeavesProps {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  pulsePhase?: number;
}

export function TreeWithLeaves({ position, scale, rotation, pulsePhase = 0 }: TreeWithLeavesProps) {
  const trunkRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const leaves = useMemo(() => {
    const leafPositions = [];
    const leafCount = 12;
    
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const radius = 0.8 + Math.random() * 0.4;
      const height = 2 + Math.random() * 2;
      
      leafPositions.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [
          Math.random() * 0.5,
          angle,
          Math.random() * 0.5
        ] as [number, number, number],
        scale: 0.6 + Math.random() * 0.4,
        swaySpeed: 1 + Math.random() * 0.5,
        swayIntensity: 0.1 + Math.random() * 0.1
      });
    }
    return leafPositions;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      const time = state.clock.getElapsedTime();
      materialRef.current.emissiveIntensity = 0.2 + Math.sin(time * 2 + pulsePhase) * 0.1;
    }
  });

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Trunk */}
      <mesh ref={trunkRef} castShadow>
        <cylinderGeometry args={[0.2, 0.4, 4, 8]} />
        <GlowMaterial ref={materialRef} color="#2d4a3e" intensity={0.2} />
      </mesh>
      
      {/* Leaves */}
      {leaves.map((leaf, index) => (
        <Leaf
          key={index}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
          swaySpeed={leaf.swaySpeed}
          swayIntensity={leaf.swayIntensity}
        />
      ))}
    </group>
  );
}