import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OUTSIDE } from '../../config/outsideCoordinates';

function Car() {
  const { position, rotation, targetSize, modelPath } = OUTSIDE.car;
  const groupRef = useRef();
  const baseScaleRef = useRef(0); // Start at 0 for spawn animation
  const { scene } = useGLTF(modelPath);
  const spawnProgressRef = useRef(0);
  const spawnedRef = useRef(false);
  const animationDuration = 0.6; // seconds

  // Initialize position and scale the model once
  useEffect(() => {
    if (groupRef.current && scene) {
      // Set fixed position and initial rotation once
      groupRef.current.position.set(position[0], position[1], position[2]);
      groupRef.current.rotation.y = rotation;
      
      // Calculate bounding box and scale
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = targetSize / maxDimension;
      baseScaleRef.current = scale;
      
      // Initial state
      groupRef.current.scale.setScalar(0);
    }
  }, [scene, targetSize, position, rotation]);

  // Animate spawn only
  useFrame((state, delta) => {
    if (groupRef.current && !spawnedRef.current) {
      spawnProgressRef.current = Math.min(spawnProgressRef.current + delta / animationDuration, 1);
      
      if (spawnProgressRef.current >= 1) {
        spawnedRef.current = true;
      }

      const eased = easeOutElastic(spawnProgressRef.current);
      groupRef.current.scale.setScalar(baseScaleRef.current * eased);
      
      // Subtle entry effects
      groupRef.current.rotation.y = rotation + (1 - eased) * 0.6;
      groupRef.current.position.y = position[1] + (1 - eased) * 0.6;
    }
  });

  if (!scene) return null;

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} // No need to clone if only one car exists
        castShadow 
        receiveShadow 
      />
    </group>
  );
}

const easeOutElastic = (t) => {
  if (t === 0 || t === 1) return t;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

export default Car;

useGLTF.preload(OUTSIDE.car.modelPath);
