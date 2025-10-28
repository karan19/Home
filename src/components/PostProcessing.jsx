import React from 'react';
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/**
 * Post-Processing Effects
 * 
 * Adds visual enhancements to the scene:
 * - Bloom: Makes lights and bright surfaces glow
 * - SSAO: Adds ambient occlusion for realistic shadows in corners
 */

function PostProcessing({ 
  bloomEnabled = true,
  bloomIntensity = 0.5,
  ssaoEnabled = true,
  ssaoIntensity = 30
}) {
  return (
    <EffectComposer>
      {/* Bloom Effect - Makes lights and emissive materials glow */}
      {bloomEnabled && (
        <Bloom
          intensity={bloomIntensity}   // Glow intensity (0.3-2.0)
          luminanceThreshold={0.9}     // Brightness threshold for bloom (0.8-1.0)
          luminanceSmoothing={0.9}     // Smoothness of bloom transition
          mipmapBlur={true}            // Better quality bloom
          blendFunction={BlendFunction.ADD}
        />
      )}
      
      {/* SSAO Effect - Ambient occlusion for depth and realism */}
      {ssaoEnabled && (
        <SSAO
          samples={31}                 // Quality (11-31, higher = better but slower)
          radius={0.1}                 // Effect radius (0.05-0.2)
          intensity={ssaoIntensity}    // Shadow intensity (10-50)
          luminanceInfluence={0.6}     // How much lighting affects AO
          color="black"                // Shadow color
          blendFunction={BlendFunction.MULTIPLY}
        />
      )}
    </EffectComposer>
  );
}

export default PostProcessing;
