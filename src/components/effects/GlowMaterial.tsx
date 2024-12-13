import { forwardRef } from 'react';
import * as THREE from 'three';

interface GlowMaterialProps {
  color?: THREE.ColorRepresentation;
  intensity?: number;
}

export const GlowMaterial = forwardRef<THREE.MeshStandardMaterial, GlowMaterialProps>(
  ({ color = '#2ecc71', intensity = 0.2 }, ref) => (
    <meshStandardMaterial
      ref={ref}
      color={color}
      roughness={0.8}
      emissive={color}
      emissiveIntensity={intensity}
      toneMapped={false}
    />
  )
);