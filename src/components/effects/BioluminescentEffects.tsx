import { useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useControls } from './useEffectControls';

export function BioluminescentEffects() {
  const { bloomIntensity, bloomThreshold } = useControls();
  
  return (
    <EffectComposer>
      <Bloom 
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
      />
      <DepthOfField
        focusDistance={0.0}
        focalLength={0.02}
        bokehScale={2}
      />
    </EffectComposer>
  );
}