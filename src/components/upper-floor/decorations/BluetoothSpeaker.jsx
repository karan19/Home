import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DECORATIONS } from '../../../config/upperFloorCoordinates';

function BluetoothSpeaker({ position = [0, 0, 0] }) {
  const { materials: mat, body, light, animation } = DECORATIONS.bluetoothSpeaker;
  const lightRef = useRef();

  // Blinking animation
  useFrame((state) => {
    if (lightRef.current) {
      // Blink every second (smooth sine wave)
      const time = state.clock.elapsedTime;
      const intensity = Math.sin(time * animation.speed) * 0.5 + 0.5; // Oscillates 0-1
      lightRef.current.material.emissiveIntensity = intensity * animation.intensityMultiplier;
    }
  });

  return (
    <group position={position} name="Furniture_BluetoothSpeaker">
      {/* Main cylindrical body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[body.radius, body.radius, body.height, body.segments]} />
        <meshStandardMaterial {...mat.body} />
      </mesh>

      {/* Blinking light on top */}
      <mesh ref={lightRef} position={[0, light.positionY, 0]}>
        <sphereGeometry args={[light.radius, light.segments, light.segments]} />
        <meshStandardMaterial {...mat.light} />
      </mesh>
    </group>
  );
}

export default BluetoothSpeaker;
