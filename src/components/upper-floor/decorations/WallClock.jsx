import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';
import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { DECORATIONS } from '../../../config/upperFloorCoordinates';

function WallClock({ position = [0, 2, -3.6], scale = 1 }) {
  const { toggle } = useInteractiveAudio('einstein');
  const { materials: mat, frame, text, glow } = DECORATIONS.wallClock;
  const [time, setTime] = useState('00:00:00');

  // Update time every frame
  useFrame(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    if (timeString !== time) {
      setTime(timeString);
    }
  });

  return (
    <group position={position} name="Digital_Clock"
      onClick={event => { event.stopPropagation(); toggle(); }}
      onPointerOver={event => { event.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
      {/* Clock frame/background */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[frame.widthScale * scale, frame.heightScale * scale, frame.depth]} />
        <meshStandardMaterial {...mat.frame} />
      </mesh>

      {/* Digital display */}
      <Text
        position={[0, 0, text.positionZ]}
        fontSize={text.fontSizeScale * scale}
        color={mat.textColor}
        anchorX="center"
        anchorY="middle"
      >
        {time}
      </Text>

      {/* Glow effect behind text */}
      <mesh position={[0, 0, glow.positionZ]}>
        <boxGeometry args={[glow.widthScale * scale, glow.heightScale * scale, glow.depth]} />
        <meshStandardMaterial {...mat.glow} />
      </mesh>
    </group>
  );
}

export default WallClock;
