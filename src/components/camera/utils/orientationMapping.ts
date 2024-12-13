import * as THREE from 'three';
import type { DeviceOrientation } from '../../../types';

export function mapDeviceOrientationToCamera(orientation: DeviceOrientation) {
  const { alpha, beta } = orientation;
  
  if (beta === null || alpha === null) {
    return { pitch: 0, yaw: 0 };
  }

  // Convert beta (device tilt forward/backward) to pitch (looking up/down)
  // Subtract 90 to make the default position (device upright) the center
  const normalizedBeta = beta - 90;
  const pitch = THREE.MathUtils.degToRad(
    THREE.MathUtils.clamp(normalizedBeta, -45, 45)
  );

  // Use alpha for horizontal rotation (yaw)
  // Normalize alpha to be between -180 and 180 degrees
  const normalizedAlpha = alpha > 180 ? alpha - 360 : alpha;
  const yaw = THREE.MathUtils.degToRad(normalizedAlpha);

  return { pitch, yaw };
}