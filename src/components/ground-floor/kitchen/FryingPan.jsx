import React from 'react';
import { Vector2 } from 'three';
import { RoundedBox } from '@react-three/drei';

// Closed cross-section gives the pan a real inner bowl, rim and flat underside.
const profile = [[0,0],[.115,0],[.145,.052],[.139,.056],[.109,.009],[0,.009]].map(([x,y]) => new Vector2(x,y));
export default function FryingPan() {
  return <group name="Frying_Pan" position={[-.15,.025,.15]}>
    <mesh castShadow receiveShadow><latheGeometry args={[profile,48]} /><meshStandardMaterial color="#303335" roughness={.65} metalness={.35} /></mesh>
    <mesh position={[0,.038,.155]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.013,.013,.065,16]} /><meshStandardMaterial color="#a4a6a7" roughness={.3} metalness={.8} /></mesh>
    <RoundedBox args={[.036,.025,.19]} radius={.012} smoothness={3} position={[0,.038,.265]} castShadow><meshStandardMaterial color="#302923" roughness={.85} /></RoundedBox>
  </group>;
}
