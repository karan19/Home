import React, { useState } from 'react';
import { RoundedBox, useCursor } from '@react-three/drei';
import { useInteractiveAudio } from '../../hooks/useInteractiveAudio';

function Box({ position, size, color, radius = 0.012 }) {
  return <RoundedBox position={position} args={size} radius={radius} smoothness={3} castShadow receiveShadow><meshStandardMaterial color={color} roughness={0.65} /></RoundedBox>;
}

export default function SportsMemorabilia({ featureName }) {
  const { config, toggle } = useInteractiveAudio(featureName);
  const [hovered, setHovered] = useState(false);
  const ready = Boolean(config.poster.image || config.audio.files.length);
  useCursor(hovered && ready);
  const basketball = featureName === 'jordan';
  const cricket = featureName === 'sachin';
  return <group name={`${featureName}-memorabilia`} position={config.trigger.position} rotation={[0, -Math.PI / 2, 0]}
    onClick={e => { e.stopPropagation(); if (ready) toggle(); }}
    onPointerOver={e => { e.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)}>
    {basketball ? <group>
      <Box position={[0,.025,0]} size={[.36,.05,.36]} color="#574332" />
      <Box position={[0,.18,0]} size={[.24,.3,.24]} color="#795c43" />
      <Box position={[0,.345,0]} size={[.34,.03,.34]} color="#795c43" />
      <mesh position={[0,.377,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.07,.012,8,40]} /><meshStandardMaterial color="#302c28" roughness={.8} /></mesh>
      <group position={[0,.47,0]} rotation={[.2,.3,.15]}>
        <mesh castShadow receiveShadow><sphereGeometry args={[.12,40,28]} /><meshStandardMaterial color="#c57536" roughness={.85} /></mesh>
        {[[0,0,0],[Math.PI/2,0,0],[0,Math.PI/2,0]].map((rotation,i) => <mesh key={i} rotation={rotation}><torusGeometry args={[.1201,.0018,6,64]} /><meshStandardMaterial color="#332a22" roughness={.9} /></mesh>)}
      </group>
    </group> : <>
    <mesh position={[0,.43,0]}><boxGeometry args={[.32,.86,.15]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh>
    <Box position={[0,.025,0]} size={[.42,.05,.3]} color="#574332" />
    <group rotation={[0,0,cricket ? -.12 : .1]} position={[0,.06,0]}>
      {cricket ? <>
        <Box position={[0,.29,0]} size={[.115,.53,.055]} color="#ddc09a" radius={.018} />
        <Box position={[0,.55,0]} size={[.052,.06,.05]} color="#ddc09a" />
        <mesh position={[0,.7,0]} castShadow><cylinderGeometry args={[.021,.021,.26,20]} /><meshStandardMaterial color="#263b35" roughness={.9} /></mesh>
        <Box position={[0,.42,.029]} size={[.083,.1,.003]} color="#8c3030" radius={.001} />
        <mesh position={[.145,.03,.065]} castShadow><sphereGeometry args={[.035,24,16]} /><meshStandardMaterial color="#8b2929" roughness={.6} /></mesh>
        <mesh position={[.145,.03,.065]} rotation={[Math.PI/2,0,.3]}><torusGeometry args={[.035,.001,6,48]} /><meshStandardMaterial color="#e7d6b6" /></mesh>
      </> : <>
        <mesh position={[0,.49,0]} scale={[.135,.18,.135]} castShadow><torusGeometry args={[1,.025,8,64]} /><meshStandardMaterial color="#a23c31" roughness={.4} /></mesh>
        {Array.from({length:9},(_,i) => {const x=(i-4)*.026; const h=.17*Math.sqrt(1-(x/.13)**2); return <Box key={`v${i}`} position={[x,.49,0]} size={[.0018,h*2,.0018]} color="#ded7bd" radius={.0005} />;})}
        {Array.from({length:11},(_,i) => {const y=(i-5)*.028; const w=.125*Math.sqrt(1-(y/.175)**2); return <Box key={`h${i}`} position={[0,.49+y,0]} size={[w*2,.0018,.0018]} color="#ded7bd" radius={.0005} />;})}
        {[-1,1].map(side => <group key={side} position={[side*.029,.267,0]} rotation={[0,0,-side*.4]}><Box position={[0,0,0]} size={[.012,.14,.015]} color="#a23c31" radius={.004} /></group>)}
        <Box position={[0,.12,0]} size={[.035,.21,.03]} color="#ede8db" radius={.009} />
        <mesh position={[.15,.03,.06]} castShadow><sphereGeometry args={[.033,24,16]} /><meshStandardMaterial color="#b5c24a" roughness={1} /></mesh>
      </>}
    </group>
    </>}
  </group>;
}
