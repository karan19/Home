import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function BarcelonaCrest({ position, rotation = [0, 0, 0], scale = 1 }) {
  const { texturePath, frame, crest } = LIVING_ROOM.barcelonaCrest;
  
  // Load the SVG as a texture
  const texture = useLoader(TextureLoader, texturePath);
  
  // Configure texture for best quality
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return (
    <group position={position} rotation={rotation} name="Barcelona_Crest">
      {/* Optional gold frame */}
      <mesh castShadow>
        <boxGeometry args={[frame.widthScale * scale, frame.heightScale * scale, frame.depth]} />
        <meshStandardMaterial
          color={frame.color}
          roughness={frame.roughness}
          metalness={frame.metalness}
        />
      </mesh>

      {/* Crest with SVG texture */}
      <mesh position={[0, 0, crest.positionZ]} castShadow>
        <planeGeometry args={[crest.widthScale * scale, crest.heightScale * scale]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={crest.alphaTest}
          side={THREE.DoubleSide}
          roughness={crest.roughness}
          metalness={crest.metalness}
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
