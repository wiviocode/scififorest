import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlowMaterial } from '../../effects/GlowMaterial';

interface Plant {
  position: [number, number, number];
  scale: number;
  pulsePhase: number;
}

export function GlowingPlants() {
  const plantsRef = useRef<THREE.InstancedMesh>(null);
  
  const plants = useMemo(() => 
    Array.from({ length: 500 }, (): Plant => ({
      position: [
        (Math.random() - 0.5) * 60,
        0.1,
        (Math.random() - 0.5) * 60
      ],
      scale: 0.1 + Math.random() * 0.2,
      pulsePhase: Math.random() * Math.PI * 2
    }))
  , []);

  useFrame((state) => {
    if (!plantsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    plants.forEach((plant, i) => {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3(...plant.position);
      position.y += Math.sin(time + plant.pulsePhase) * 0.02;
      
      matrix.compose(
        position,
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, time * 0.5 + plant.pulsePhase, 0)
        ),
        new THREE.Vector3(plant.scale, plant.scale, plant.scale)
      );
      
      plantsRef.current.setMatrixAt(i, matrix);
    });
    plantsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={plantsRef}
      args={[undefined, undefined, plants.length]}
      castShadow
    >
      <coneGeometry args={[0.2, 0.8, 4]} />
      <GlowMaterial color="#4ade80" intensity={0.6} />
    </instancedMesh>
  );
}