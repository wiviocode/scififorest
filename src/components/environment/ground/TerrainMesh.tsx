import { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { TerrainMaterial } from '../materials/TerrainMaterial';

// Extend Three.js with our custom material
extend({ TerrainMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'terrainMaterial': any;
    }
  }
}

export function TerrainMesh() {
  const materialRef = useRef<any>();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60, 128, 128]} />
      <terrainMaterial ref={materialRef} />
    </mesh>
  );
}