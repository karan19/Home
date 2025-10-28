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

function PostProcessing() {
  return (
    <EffectComposer>
      {/* Bloom Effect - Makes lights and emissive materials glow */}
      <Bloom
        intensity={0.5}              // Glow intensity (0.3-1.0)
        luminanceThreshold={0.9}     // Brightness threshold for bloom (0.8-1.0)
        luminanceSmoothing={0.9}     // Smoothness of bloom transition
        mipmapBlur={true}            // Better quality bloom
        blendFunction={BlendFunction.ADD}
      />
      
      {/* SSAO Effect - Ambient occlusion for depth and realism */}
      <SSAO
        samples={31}                 // Quality (11-31, higher = better but slower)
        radius={0.1}                 // Effect radius (0.05-0.2)
        intensity={30}               // Shadow intensity (20-50)
        luminanceInfluence={0.6}     // How much lighting affects AO
        color="black"                // Shadow color
        blendFunction={BlendFunction.MULTIPLY}
      />
    </EffectComposer>
  );
}

export default PostProcessing;
