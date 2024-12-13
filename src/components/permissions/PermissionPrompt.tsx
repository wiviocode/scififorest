import React from 'react';
import { Shield } from 'lucide-react';
import { PermissionState } from '../../hooks/usePermissions';

interface PermissionPromptProps {
  permissions: PermissionState;
  onRequestPermissions: () => void;
}

export function PermissionPrompt({ permissions, onRequestPermissions }: PermissionPromptProps) {
  if (permissions.orientation === 'granted' && permissions.motion === 'granted') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-50">
      <div className="bg-black/90 p-8 rounded-lg max-w-md text-center">
        <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-400 mb-4">Enable AR Experience</h2>
        <p className="text-green-300 mb-6">
          To fully experience the Bioluminal Frontier, we need access to your device's motion and orientation sensors.
          This allows you to explore the forest by moving your device.
        </p>
        <button
          onClick={onRequestPermissions}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold py-3 px-6 rounded-lg 
                   transition-colors duration-200 transform hover:scale-105"
        >
          Enable AR Experience
        </button>
        <p className="text-green-400/60 text-sm mt-4">
          You can always adjust these permissions in your browser settings
        </p>
      </div>
    </div>
  );
}