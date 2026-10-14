import React from 'react';
import { RoundedBox } from '@react-three/drei';
import FittedModel from '../../FittedModel';

// Low display table to the left of the TV when viewed from the couch.
export default function WorldCupDisplay() {
  return (
    <group position={[2.7,.1,3.4]} scale={.7} name="World_Cup_Display">
      <RoundedBox position={[0,.43,0]} args={[.55,.055,.48]} radius={.025} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color="#8b6848" roughness={.65} />
      </RoundedBox>
      {[-1,1].flatMap(x=>[-1,1].map(z=>(
        <mesh key={`${x}-${z}`} position={[x*.215,.20125,z*.18]} castShadow receiveShadow>
          <boxGeometry args={[.045,.4025,.045]} />
          <meshStandardMaterial color="#503b2d" roughness={.7} />
        </mesh>
      )))}
      <pointLight position={[.25,1.12,-.4]} intensity={.8} distance={2.2} color="#fff0d5" />
      <FittedModel modelPath="/models/world-cup/worldcup.glb" targetSize={.42} floorOffset={.4575} name="World_Cup_Trophy" />
    </group>
  );
}
