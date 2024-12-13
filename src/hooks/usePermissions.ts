import { useState, useCallback } from 'react';

export interface PermissionState {
  orientation: PermissionStatus | null;
  motion: PermissionStatus | null;
}

export function usePermissions() {
  const [permissionState, setPermissionState] = useState<PermissionState>({
    orientation: null,
    motion: null
  });

  const requestOrientationPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        // @ts-ignore - iOS specific API
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const permission = await DeviceOrientationEvent.requestPermission();
        setPermissionState(prev => ({ ...prev, orientation: permission }));
        return permission;
      } catch (error) {
        console.error('Error requesting orientation permission:', error);
        return 'denied';
      }
    }
    return 'granted'; // Default for browsers that don't require permission
  }, []);

  const requestMotionPermission = useCallback(async () => {
    if (typeof DeviceMotionEvent !== 'undefined' &&
        // @ts-ignore - iOS specific API
        typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const permission = await DeviceMotionEvent.requestPermission();
        setPermissionState(prev => ({ ...prev, motion: permission }));
        return permission;
      } catch (error) {
        console.error('Error requesting motion permission:', error);
        return 'denied';
      }
    }
    return 'granted'; // Default for browsers that don't require permission
  }, []);

  const requestAllPermissions = useCallback(async () => {
    const orientationPermission = await requestOrientationPermission();
    const motionPermission = await requestMotionPermission();
    
    return {
      orientation: orientationPermission,
      motion: motionPermission
    };
  }, [requestOrientationPermission, requestMotionPermission]);

  return {
    permissions: permissionState,
    requestOrientationPermission,
    requestMotionPermission,
    requestAllPermissions
  };
}