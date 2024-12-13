import { useState, useEffect } from 'react';
import { usePermissions } from './usePermissions';
import type { DeviceOrientation, DeviceMotion, Location } from '../types';

export function useDeviceSensors() {
  const { permissions, requestAllPermissions } = usePermissions();
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null
  });
  
  const [motion, setMotion] = useState<DeviceMotion>({
    acceleration: { x: null, y: null, z: null }
  });
  
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null
  });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta
      });
    };

    const handleMotion = (event: DeviceMotionEvent) => {
      setMotion({
        acceleration: {
          x: event.acceleration?.x || null,
          y: event.acceleration?.y || null,
          z: event.acceleration?.z || null
        }
      });
    };

    if (permissions.orientation === 'granted') {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    
    if (permissions.motion === 'granted') {
      window.addEventListener('devicemotion', handleMotion);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [permissions]);

  return {
    orientation,
    motion,
    location,
    permissions,
    requestPermissions: requestAllPermissions
  };
}