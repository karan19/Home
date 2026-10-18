import React, { useState } from 'react';
import { Text, useCursor } from '@react-three/drei';
import { Vector2 } from 'three';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

// Rounded bottle base and shoulders; the origin stays on the tabletop.
const profile = [[0,0],[.026,0],[.032,.004],[.034,.011],[.034,.095],[.031,.105],[.025,.112],[.025,.119],[0,.119]].map(([x,y]) => new Vector2(x,y));

export default function SupplementBox() {
  const { config, toggle } = useInteractiveAudio('huberman');
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return <group name="Huberman_VitaminBottle" position={config.trigger.position}
    onClick={event => { event.stopPropagation(); toggle(); }}
    onPointerOver={event => { event.stopPropagation(); setHovered(true); }}
    onPointerOut={() => setHovered(false)}>
    <mesh castShadow receiveShadow>
      <latheGeometry args={[profile,64]} />
      <meshStandardMaterial color="#8a481e" roughness={.35} />
    </mesh>
    <mesh position={[0,.058,0]}>
      <cylinderGeometry args={[.0343,.0343,.065,64,1,true]} />
      <meshStandardMaterial color="#f5f2e9" roughness={.85} />
    </mesh>
    {[.032,.084].map(y=><mesh key={y} position={[0,y,0]}>
      <cylinderGeometry args={[.0345,.0345,.007,64,1,true]} />
      <meshStandardMaterial color="#657361" roughness={.8} />
    </mesh>)}
    <mesh position={[0,.122,0]} castShadow>
      <cylinderGeometry args={[.032,.032,.022,64]} />
      <meshStandardMaterial color="#faf9f4" roughness={.65} />
    </mesh>
    {Array.from({length:32},(_,i)=>{
      const angle=i*Math.PI*2/32;
      return <mesh key={i} position={[Math.sin(angle)*.032,.122,Math.cos(angle)*.032]} rotation-y={angle}>
        <boxGeometry args={[.0013,.017,.0013]} />
        <meshStandardMaterial color="#e8e7e1" roughness={.75} />
      </mesh>;
    })}
    <Text position={[0,.067,.035]} fontSize={.0065} color="#344333" anchorX="center" anchorY="middle" raycast={() => null}>DAILY</Text>
    <Text position={[0,.056,.035]} fontSize={.005} color="#344333" anchorX="center" anchorY="middle" raycast={() => null}>VITAMINS</Text>
    <Text position={[0,.044,.035]} fontSize={.0035} color="#657361" anchorX="center" anchorY="middle" raycast={() => null}>60 CAPSULES</Text>
  </group>;
}
