import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { OUTSIDE } from '../../config/outsideCoordinates';

function Gym() {
  const { position, rotation, targetSize, modelPath } = OUTSIDE.gym;
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);

  // Initialize position and scale the model once
  useEffect(() => {
    if (groupRef.current && scene) {
      // Set fixed position and rotation
      groupRef.current.position.set(position[0], position[1], position[2]);
      groupRef.current.rotation.y = rotation;
      
      // Calculate bounding box and scale
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = targetSize / maxDimension;
      
      groupRef.current.scale.setScalar(scale);
    }
  }, [scene, targetSize, position, rotation]);

  if (!scene) return null;

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} // No need to clone
        castShadow 
        receiveShadow 
      />
    </group>
  );
}

export default Gym;

useGLTF.preload(OUTSIDE.gym.modelPath);
