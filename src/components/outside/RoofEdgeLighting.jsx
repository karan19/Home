import React from 'react';

const EDGES = [
  { position: [0,6.34,4.306], size: [8.58,.025,.014] },
  { position: [0,6.34,-4.306], size: [8.58,.025,.014] },
  { position: [-4.306,6.34,0], size: [.014,.025,8.58] },
  { position: [4.306,6.34,0], size: [.014,.025,8.58] },
];

export default function RoofEdgeLighting({ active = false }) {
  return <group name="Roof_Edge_Lighting">
    {EDGES.map(({position,size},i)=><mesh key={i} position={position} raycast={() => null}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={active ? '#ffdfae' : '#9b9a90'} emissive="#ffd197"
        emissiveIntensity={active ? 2.2 : 0} roughness={.6} toneMapped={!active} />
    </mesh>)}
  </group>;
}
