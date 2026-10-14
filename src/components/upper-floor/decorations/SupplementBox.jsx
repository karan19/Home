import React, { useState } from 'react';
import { RoundedBox, Text, useCursor } from '@react-three/drei';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

export default function SupplementBox() {
  const { config, toggle } = useInteractiveAudio('huberman');
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return <group name="Huberman_SupplementBox" position={config.trigger.position}
    onClick={event => { event.stopPropagation(); toggle(); }}
    onPointerOver={event => { event.stopPropagation(); setHovered(true); }}
    onPointerOut={() => setHovered(false)}>
    <RoundedBox args={[.1,.17,.07]} position={[0,.085,0]} radius={.004} smoothness={3} castShadow receiveShadow>
      <meshStandardMaterial color="#657361" roughness={.8} />
    </RoundedBox>
    <mesh position={[0,.087,.0355]}>
      <planeGeometry args={[.082,.12]} />
      <meshStandardMaterial color="#eee8d9" roughness={.9} />
    </mesh>
    <Text position={[0,.105,.0365]} fontSize={.0105} color="#344333" anchorX="center" anchorY="middle" raycast={() => null}>SUPPLEMENTS</Text>
    <Text position={[0,.079,.0365]} fontSize={.008} color="#657361" anchorX="center" anchorY="middle" raycast={() => null}>DAILY ROUTINE</Text>
    <mesh position={[0,.051,.0365]}><planeGeometry args={[.058,.002]} /><meshBasicMaterial color="#657361" /></mesh>
  </group>;
}
