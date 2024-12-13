import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { noise } from '../../utils/noise';

export function Terrain({ seed = 1, scale = 1 }) {
  const meshRef = useRef();
  const geometry = new THREE.PlaneGeometry(50, 50, 128, 128);
  
  // Generate heightmap using noise
  const vertices = geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i] * 0.1;
    const z = vertices[i + 2] * 0.1;
    vertices[i + 1] = noise(x * scale + seed, z * scale + seed) * 2;
  }
  
  geometry.computeVertexNormals();

  return (
    <mesh 
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2, 0]}
      receiveShadow
    >
      <primitive object={geometry} />
      <meshStandardMaterial
        color={0x1a472a}
        roughness={0.8}
        metalness={0.2}
        vertexColors={true}
      />
    </mesh>
  );
}