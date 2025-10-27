import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function BarcelonaCrest({ position, rotation = [0, 0, 0], scale = 1 }) {
  // Load the SVG as a texture
  const texture = useLoader(TextureLoader, '/FCBCrest.svg');
  
  // Configure texture for best quality
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return (
    <group position={position} rotation={rotation} name="Barcelona_Crest">
      {/* Optional gold frame */}
      <mesh castShadow>
        <boxGeometry args={[0.44 * scale, 0.54 * scale, 0.02]} />
        <meshStandardMaterial
          color={0xFFCC00}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Crest with SVG texture */}
      <mesh position={[0, 0, 0.011]} castShadow>
        <planeGeometry args={[0.4 * scale, 0.5 * scale]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.1}
          side={THREE.DoubleSide}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

// Wrap with Suspense fallback for loading
function BarcelonaCrestWithSuspense(props) {
  return (
    <Suspense fallback={null}>
      <BarcelonaCrest {...props} />
    </Suspense>
  );
}

export default BarcelonaCrestWithSuspense;
