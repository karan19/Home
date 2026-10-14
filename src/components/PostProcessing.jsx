import React from 'react';
import { EffectComposer, Bloom, SSAO, ToneMapping } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';

export default function PostProcessing({
  bloomEnabled = true, bloomIntensity = 0.2,
  ssaoEnabled = true, ssaoIntensity = 1.5,
}) {
  // No offscreen render targets or fullscreen passes in the low quality tier.
  if (!bloomEnabled && !ssaoEnabled) return null;
  return (
    <EffectComposer enableNormalPass={ssaoEnabled} multisampling={4}>
      {bloomEnabled && <Bloom intensity={bloomIntensity} luminanceThreshold={1}
        luminanceSmoothing={0.5} mipmapBlur blendFunction={BlendFunction.ADD} />}
      {ssaoEnabled && <SSAO samples={16} rings={4} radius={0.05} bias={0.025} worldProximityThreshold={0.3} worldProximityFalloff={0.1}
        intensity={ssaoIntensity} luminanceInfluence={0.6}
        color="black" blendFunction={BlendFunction.MULTIPLY} />}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
