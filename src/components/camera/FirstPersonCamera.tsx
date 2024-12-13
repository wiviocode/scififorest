import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { DeviceOrientation } from '../../types';
import { mapDeviceOrientationToCamera } from './utils/orientationMapping';

interface FirstPersonCameraProps {
  deviceOrientation: DeviceOrientation;
}

export function FirstPersonCamera({ deviceOrientation }: FirstPersonCameraProps) {
  const { camera } = useThree();
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  useEffect(() => {
    camera.position.set(0, 2, 0); // Set initial camera height to human eye level
  }, [camera]);

  useFrame(() => {
    if (deviceOrientation.beta !== null && deviceOrientation.alpha !== null) {
      const { pitch, yaw } = mapDeviceOrientationToCamera(deviceOrientation);
      
      // Apply the mapped rotations
      targetRotation.current.x = pitch;
      targetRotation.current.y = yaw;
      
      // Smooth camera rotation
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        targetRotation.current.x,
        0.1
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        targetRotation.current.y,
        0.1
      );
    }
  });

  return null;
}