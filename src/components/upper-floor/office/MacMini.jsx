import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { Shape } from 'three';

export default function MacMini({ position }) {
  const emblem = useMemo(() => {
    const apple = new Shape();
    apple.moveTo(0, 0.3);
    apple.bezierCurveTo(-0.5, 0.65, -0.8, 0.2, -0.65, -0.25);
    apple.bezierCurveTo(-0.5, -0.75, -0.25, -0.8, 0, -0.65);
    apple.bezierCurveTo(0.25, -0.8, 0.5, -0.65, 0.65, -0.25);
    apple.bezierCurveTo(0.25, -0.15, 0.25, 0.2, 0.6, 0.3);
    apple.bezierCurveTo(0.4, 0.6, 0.15, 0.5, 0, 0.3);
    const leaf = new Shape();
    leaf.moveTo(0, 0.5);
    leaf.quadraticCurveTo(0.05, 0.88, 0.4, 0.85);
    leaf.quadraticCurveTo(0.38, 0.53, 0, 0.5);
    return [apple, leaf];
  }, []);

  return <group name="Mac_Mini" position={position}>
    <RoundedBox name="Mac_Mini_Foot" args={[0.108, 0.006, 0.108]} radius={0.0025} smoothness={3} position={[0, 0.003, 0]}>
      <meshStandardMaterial color="#303336" roughness={0.9} />
    </RoundedBox>
    <RoundedBox name="Mac_Mini_Enclosure" args={[0.128, 0.046, 0.128]} radius={0.012} smoothness={4} position={[0, 0.029, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#C6CDD1" roughness={0.65} metalness={0.25} />
    </RoundedBox>
    <mesh name="Mac_Mini_Logo" position={[0, 0.0522, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.014}>
      <shapeGeometry args={[emblem, 16]} />
      <meshStandardMaterial color="#42474B" roughness={0.8} />
    </mesh>
    {[-0.027, -0.010].map(x => <RoundedBox key={x} args={[0.009, 0.0035, 0.001]} radius={0.00045} smoothness={2} position={[x, 0.025, 0.064]}>
      <meshStandardMaterial color="#20262A" roughness={0.9} />
    </RoundedBox>)}
    <mesh position={[0.018, 0.025, 0.0645]}>
      <circleGeometry args={[0.002, 16]} />
      <meshStandardMaterial color="#20262A" roughness={0.9} />
    </mesh>
    <mesh position={[0.037, 0.025, 0.0645]}>
      <circleGeometry args={[0.0008, 12]} />
      <meshBasicMaterial color="#EEF4EE" toneMapped={false} />
    </mesh>
  </group>;
}
