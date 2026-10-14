import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Fit imported furniture to its configured footprint without changing cached assets.
function FittedModel({ modelPath, modelSize, targetSize, floorOffset = 0, name }) {
  const { scene } = useGLTF(modelPath);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());

    const fitted = new THREE.Group();
    fitted.name = name;
    if (targetSize) fitted.scale.setScalar(targetSize / Math.max(size.x, size.y, size.z));
    else fitted.scale.set(...modelSize.map((dimension, index) => dimension / size.getComponent(index)));
    clone.position.sub(new THREE.Vector3(center.x, bounds.min.y, center.z));
    clone.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    fitted.add(clone);
    return fitted;
  }, [scene, modelSize, targetSize, name]);

  // Clones share the loader's cached geometry and textures; preserve those on unmount.
  return <primitive object={model} position={[0, floorOffset, 0]} dispose={null} />;
}

export default FittedModel;
