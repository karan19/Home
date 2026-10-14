import React, { useMemo, useState } from 'react';
import { useCursor } from '@react-three/drei';
import { CatmullRomCurve3, Vector3 } from 'three';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

// A small sculptural brain on a desk stand, with two hemispheres and raised folds.
export default function BrainModel({ position }) {
  const { toggle } = useInteractiveAudio('huberman');
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const folds = useMemo(() => [-1,1].flatMap(side =>
    [0,1,2,3].map(row => new CatmullRomCurve3(Array.from({length:25},(_,i) => {
      const a = .2 + i / 24 * (Math.PI - .4);
      const latitude = -.75 + row * .5 + Math.sin(a * 5) * .085;
      return new Vector3(side * .044 + Math.cos(a) * .047 * Math.cos(latitude),
        .13 + Math.sin(a) * .063 * Math.cos(latitude), Math.sin(latitude) * .079);
    })))), []);
  return <group name="Huberman_Brain" position={position}
    onClick={e => {e.stopPropagation(); toggle();}}
    onPointerOver={e => {e.stopPropagation(); setHovered(true);}} onPointerOut={() => setHovered(false)}>
    <mesh position={[0,.012,0]} castShadow><cylinderGeometry args={[.085,.085,.024,40]} /><meshStandardMaterial color="#51483e" roughness={.65} /></mesh>
    <mesh position={[0,.057,0]} castShadow><cylinderGeometry args={[.009,.014,.07,16]} /><meshStandardMaterial color="#ad9270" metalness={.55} roughness={.4} /></mesh>
    {[-1,1].map(side => <mesh key={side} position={[side*.044,.13,0]} scale={[.048,.06,.08]} castShadow><sphereGeometry args={[1,32,24]} /><meshStandardMaterial color="#b9a291" roughness={.8} /></mesh>)}
    {folds.map((curve,i) => <mesh key={i} castShadow><tubeGeometry args={[curve,40,.0035,6,false]} /><meshStandardMaterial color="#d4c1af" roughness={.8} /></mesh>)}
    <mesh position={[0,.12,0]}><boxGeometry args={[.21,.19,.18]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh>
  </group>;
}
