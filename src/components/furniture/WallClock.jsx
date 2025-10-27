import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function WallClock({ position = [0, 2, -3.6], scale = 1 }) {
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
    <group position={position} name="Digital_Clock">
      {/* Clock frame/background */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.6 * scale, 0.25 * scale, 0.05]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Digital display */}
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.12 * scale}
        color="#00FF00"
        anchorX="center"
        anchorY="middle"
      >
        {time}
      </Text>

      {/* Glow effect behind text */}
      <mesh position={[0, 0, 0.026]}>
        <boxGeometry args={[0.55 * scale, 0.18 * scale, 0.001]} />
        <meshStandardMaterial 
          color="#003300"
          emissive="#00FF00"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default WallClock;
