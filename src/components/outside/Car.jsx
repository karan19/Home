import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { OUTSIDE } from '../../config/outsideCoordinates';
import FittedModel from '../FittedModel';

export default function Car({ onReady }) {
  const { position, rotation, targetSize, modelPath } = OUTSIDE.car;
  const group = useRef();
  const progress = useRef(0);
  useEffect(() => {
    if (progress.current === 1) onReady?.('car', true);
    return () => onReady?.('car', false);
  }, [onReady]);
  useFrame((_, delta) => {
    if (!group.current || progress.current === 1) return;
    progress.current = Math.min(progress.current + Math.min(delta, 0.05) / 0.6, 1);
    const t = progress.current;
    const eased = 1 - Math.pow(1 - t, 3);
    group.current.scale.setScalar(eased);
    if (t === 1) onReady?.('car', true);
  });
  return <group name="Outdoor_Car" position={position} rotation={[0, rotation, 0]}>
    <group ref={group} scale={0}>
      <FittedModel modelPath={modelPath} targetSize={targetSize} name="Car_Model" />
    </group>
  </group>;
}
useGLTF.preload(OUTSIDE.car.modelPath);
