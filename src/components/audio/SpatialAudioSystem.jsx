import React, { useRef, useEffect } from 'react';
import { PositionalAudio } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

/**
 * Spatial Audio System Component
 * 
 * Features:
 * - 3D positional audio that changes with camera position
 * - Ambient sounds (birds, wind, indoor ambience)
 * - Distance-based volume
 * - Looping background sounds
 */

function SpatialAudioSystem({ dayMode = true, enabled = true }) {
  const { camera } = useThree();
  
  if (!enabled) return null;

  return (
    <group name="Spatial_Audio_System">
      {/* Outdoor Ambient - Birds chirping (day only) */}
      {dayMode && (
        <PositionalAudio
          url="/sounds/birds.mp3"
          distance={15}
          loop
          autoplay
          position={[0, 5, 10]}
        />
      )}

      {/* Outdoor Ambient - Wind (always) */}
      <PositionalAudio
        url="/sounds/wind.mp3"
        distance={20}
        loop
        autoplay
        position={[0, 8, 0]}
      />

      {/* Indoor Ambient - Living Room */}
      <PositionalAudio
        url="/sounds/indoor-ambience.mp3"
        distance={8}
        loop
        autoplay
        position={[1.5, 1, 1]}
      />

      {/* Indoor Ambient - Kitchen */}
      <PositionalAudio
        url="/sounds/kitchen-ambience.mp3"
        distance={6}
        loop
        autoplay
        position={[-1.5, 1, -2.5]}
      />

      {/* Indoor Ambient - Bedroom (upper floor) */}
      <PositionalAudio
        url="/sounds/bedroom-ambience.mp3"
        distance={6}
        loop
        autoplay
        position={[2.5, 4, -2.5]}
      />
    </group>
  );
}

export default SpatialAudioSystem;
