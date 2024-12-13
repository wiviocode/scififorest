import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Terrain } from './environment/Terrain';
import { TreeWithLeaves } from './trees/TreeWithLeaves';
import { FirstPersonCamera } from './camera/FirstPersonCamera';
import { Fireflies } from './particles/Fireflies';
import { ForestFloor } from './environment/ForestFloor';
import { generateTreePositions } from '../utils/forestGeneration';
import type { DeviceOrientation, Location } from '../types';

interface ForestProps {
  deviceOrientation: DeviceOrientation;
  location: Location;
}

export function Forest({ deviceOrientation, location }: ForestProps) {
  const groupRef = useRef<THREE.Group>(null);
  const trees = useMemo(() => generateTreePositions(100), []);

  return (
    <group ref={groupRef}>
      <FirstPersonCamera deviceOrientation={deviceOrientation} />
      <ForestFloor />
      {trees.map((props, i) => (
        <TreeWithLeaves key={i} {...props} />
      ))}
      <Fireflies />
    </group>
  );
}