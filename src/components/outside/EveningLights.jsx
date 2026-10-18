import React from 'react';

const PATH_LIGHTS = [[-1.05, -.25, 4.65], [1.05, -.25, 4.65], [-1.05, -.25, 6.3], [1.05, -.25, 6.3]];
const GYM_LIGHT = [-5.65, -.25, -1.65];

function Bollard({ position, active }) {
  return <group position={position} name="Garden_Bollard">
    <mesh position={[0,.19,0]} castShadow>
      <cylinderGeometry args={[.045,.055,.38,16]} />
      <meshStandardMaterial color="#333a34" roughness={.7} metalness={.25} />
    </mesh>
    <mesh position={[0,.365,0]}>
      <cylinderGeometry args={[.048,.048,.055,24]} />
      <meshStandardMaterial color={active ? '#fff0d2' : '#b9b7ac'} emissive="#ffd398" emissiveIntensity={active ? 1.8 : 0} roughness={.6} toneMapped={!active} />
    </mesh>
    <mesh position={[0,.405,0]} castShadow>
      <cylinderGeometry args={[.075,.075,.026,24]} />
      <meshStandardMaterial color="#333a34" roughness={.7} metalness={.25} />
    </mesh>
    {/* Short-range fill lights avoid additional shadow-map passes. */}
    {active && <pointLight position={[0,.33,0]} color="#ffcf94" intensity={1.2} distance={2.3} decay={2} />}
  </group>;
}

export default function EveningLights({ active = false }) {
  return <group name="Evening_Landscape_Lights">
    {PATH_LIGHTS.map((position,i)=><Bollard key={i} position={position} active={active} />)}
    <Bollard position={GYM_LIGHT} active={active} />
  </group>;
}
