import React from 'react';
import { RoundedBox } from '@react-three/drei';
import RepeatedMesh from '../../RepeatedMesh';

// Compact wireless Apple-style peripherals; dimensions in metres.
export default function MacPeripherals({ deskHeight }) {
  const keyPositions = [];
  const pitch = 0.018;
  // Small function row, then four staggered rows of low-profile keycaps.
  for (let row = 0; row < 5; row++) {
    const count = row === 0 ? 14 : 13;
    for (let col = 0; col < count; col++) {
      keyPositions.push([-0.12 + col * pitch + (row % 2 ? 0.004 : 0), 0.012, -0.043 + row * 0.018]);
    }
  }
  const bottomKeys = [-0.117, -0.096, -0.074, 0.069, 0.092, 0.116].map(x => [x, 0.012, 0.047]);
  return <group name="Mac_Desk_Peripherals">
    <group name="Magic_Keyboard" position={[0.10, deskHeight, 0.16]}>
      <RoundedBox name="Keyboard_Aluminum_Case" args={[0.279,0.010,0.115]} radius={0.004} smoothness={3} position={[0,0.006,0]} castShadow receiveShadow>
        <meshStandardMaterial color="#BCC4C9" roughness={0.65} metalness={0.25} />
      </RoundedBox>
      <RepeatedMesh name="Keyboard_Keys" args={[0.015,0.003,0.013]}
        positions={[...keyPositions,...bottomKeys]} material={{color:'#F4F2EB',roughness:0.85}} />
      <RoundedBox name="Keyboard_Spacebar" args={[0.102,0.003,0.013]} radius={0.001} smoothness={2} position={[-0.003,0.012,0.047]}>
        <meshStandardMaterial color="#F4F2EB" roughness={0.85} />
      </RoundedBox>
      {/* Touch ID key: a dark inset ring on the top-right keycap. */}
      <mesh name="Keyboard_Touch_ID" position={[0.114,0.0136,-0.043]} rotation={[-Math.PI/2,0,0]}>
        <ringGeometry args={[0.0034,0.004,20]} />
        <meshStandardMaterial color="#9CA4A7" roughness={0.8} />
      </mesh>
    </group>
    <group name="Magic_Mouse" position={[0.34,deskHeight,0.17]}>
      <RoundedBox name="Mouse_Aluminum_Base" args={[0.052,0.008,0.105]} radius={0.0035} smoothness={3} position={[0,0.005,0]}>
        <meshStandardMaterial color="#B6BEC3" roughness={0.65} metalness={0.25} />
      </RoundedBox>
      {/* Smooth continuous touch surface, without a scroll wheel or split buttons. */}
      <mesh name="Mouse_Touch_Surface" position={[0,0.009,0]} scale={[0.0285,0.012,0.0565]} castShadow receiveShadow>
        <sphereGeometry args={[1,28,16,0,Math.PI*2,0,Math.PI/2]} />
        <meshStandardMaterial color="#F6F5EF" roughness={0.38} metalness={0} />
      </mesh>
      {[-0.032,0.032].map(z => <mesh key={z} position={[0,0.001,z]}>
        <boxGeometry args={[0.035,0.002,0.006]} />
        <meshStandardMaterial color="#454A4D" roughness={0.9} />
      </mesh>)}
    </group>
  </group>;
}
