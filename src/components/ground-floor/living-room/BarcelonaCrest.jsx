import React, { useLayoutEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function BarcelonaCrest({ position, rotation = [0, 0, 0], scale = 1 }) {
  const { texturePath, frame, crest } = LIVING_ROOM.barcelonaCrest;
  
  // Load the SVG as a texture
  const texture = useLoader(TextureLoader, texturePath);
  
  const gl = useThree(state => state.gl);
  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
  }, [texture, gl]);

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
      <mesh position={[0, 0, crest.positionZ]}>
        <planeGeometry args={[crest.widthScale * scale, crest.heightScale * scale]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={crest.alphaTest}
          toneMapped={false}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
    </group>
  );
}

// The furniture boundary waits for this texture before enabling export.
export default BarcelonaCrest;
