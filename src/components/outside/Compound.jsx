import React from 'react';
import { RoundedBox } from '@react-three/drei';
import EveningLights from './EveningLights';
import RepeatedMesh from '../RepeatedMesh';

function Compound({ dayMode = false }) {
  // Simple toggle: ON = day (white), OFF = night (orange)
  const lightColor = '#ffe0ac';
  return (
    <group name="Compound">
      <EveningLights active={!dayMode} />
      {/* GROUND PLANE - Mixed surfaces */}
      {/* Grass areas - very light green with texture (lowered to prevent z-fighting) */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <boxGeometry args={[16, 0.1, 16]} />
        <meshStandardMaterial 
          color="#9eb38b"
          roughness={0.9} 
          metalness={0}
          flatShading={false}
        />
      </mesh>

      {/* Grass texture stripes (subtle ridges) */}
      <RepeatedMesh name="Lawn_Stripes" args={[0.5, 0.005, 16]}
        positions={[-6, -4, -2, 0, 2, 4, 6].map(x => [x, -0.24, 0])}
        material={{color:'#91aa83',roughness:0.95}} receiveShadow />

      {/* Spaced stones leave the existing lawn visible between each step. */}
      <group name="Grass_Stepping_Stone_Walkway">
        {[4.45, 5.15, 5.85, 6.55, 7.25].map((z, i) => (
          <RoundedBox key={z} args={[1.12, .055, .50]} radius={.025} smoothness={3}
            position={[i % 2 ? .025 : -.025, -.2225, z]} castShadow receiveShadow>
            <meshStandardMaterial color={i % 2 ? '#c5bfb0' : '#d0c9b9'} roughness={.95} />
          </RoundedBox>
        ))}
      </group>

      {/* Slanted ramp to platform */}
      <mesh 
        position={[0, -0.05, -1]} 
        rotation={[Math.atan(0.3 / 2), 0, 0]}
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[1.5, 0.02, 2]} />
        <meshStandardMaterial color="#CCCCCC" roughness={0.6} metalness={0} />
      </mesh>

      {/* Concrete patio around house entrance (shortened to not overlap walls) */}
      <mesh position={[0, -0.18, -1]} receiveShadow>
        <boxGeometry args={[10, 0.02, 4]} />
        <meshStandardMaterial color="#CCCCCC" roughness={0.6} metalness={0} />
      </mesh>



      {/* MAILBOX (at edge of green grass, facing outward) */}
      <group name="Mailbox" position={[-1.9, -0.25, 7.45]} rotation={[0, Math.PI, 0]}>
        {/* Post */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.5} metalness={0} />
        </mesh>

        {/* Mailbox body */}
        <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.2, 0.15]} />
          <meshStandardMaterial color="#CC0000" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Mailbox door (front) */}
        <mesh position={[0, 1.3, 0.076]} castShadow>
          <boxGeometry args={[0.28, 0.18, 0.002]} />
          <meshStandardMaterial color="#AA0000" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Flag */}
        <mesh position={[0.16, 1.35, 0]} castShadow>
          <boxGeometry args={[0.08, 0.03, 0.01]} />
          <meshStandardMaterial color="#CC0000" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Flag pole */}
        <mesh position={[0.15, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.1, 6]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* LAMP POSTS (4 at corners of green field) */}
      <RepeatedMesh name="Lamp_Posts" shape="cylinder" args={[0.05, 0.05, 3, 8]}
        positions={[[-7, 1.25, -7],[7, 1.25, -7],[-7, 1.25, 7],[7, 1.25, 7]]}
        material={{color:'#35332e',roughness:0.4,metalness:0.6}} castShadow />
      <RepeatedMesh name="Lamp_Fixtures" args={[0.2, 0.2, 0.2]}
        positions={[[-7, 2.75, -7],[7, 2.75, -7],[-7, 2.75, 7],[7, 2.75, 7]]}
        material={{color:lightColor,emissive:lightColor,emissiveIntensity:dayMode ? 0 : 1.2,roughness:0.2}} />

    </group>
  );
}

export default Compound;
