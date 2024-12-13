import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Forest } from './components/Forest';
import { Atmosphere } from './components/environment/Atmosphere';
import { BioluminescentEffects } from './components/effects/BioluminescentEffects';
import { useDeviceSensors } from './hooks/useDeviceSensors';
import { PermissionPrompt } from './components/permissions/PermissionPrompt';
import { Loader } from 'lucide-react';

function App() {
  const { orientation, motion, location, permissions, requestPermissions } = useDeviceSensors();

  return (
    <div className="w-full h-screen bg-black">
      {/* Permission Management */}
      <PermissionPrompt 
        permissions={permissions}
        onRequestPermissions={requestPermissions}
      />

      {/* Main Canvas */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-green-400 animate-pulse flex flex-col items-center">
              <Loader className="w-8 h-8 animate-spin mb-2" />
              <p className="text-sm">Entering the Bioluminal Frontier...</p>
            </div>
          </div>
        }>
          <Canvas
            camera={{ fov: 75 }}
            shadows
            style={{ touchAction: 'none' }}
          >
            <Atmosphere />
            <Forest 
              deviceOrientation={orientation}
              location={location}
            />
            <BioluminescentEffects />
          </Canvas>
        </Suspense>
      </div>

      {/* Instructions Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-green-400 text-sm 
                    bg-black/50 px-4 py-2 rounded-lg text-center">
        Move your device to look around the bioluminescent forest
      </div>
    </div>
  );
}

export default App;