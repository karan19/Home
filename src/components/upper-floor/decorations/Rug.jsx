import React from 'react';
import { useHousePalette } from '../../../context/HousePalette';
import * as THREE from 'three';
import { DECORATIONS } from '../../../config/upperFloorCoordinates';

function Rug({ position = [0, 0, 0], width = 2, depth = 2 }) {
  const palette = useHousePalette();
  const { materials: mat, surface, pattern } = DECORATIONS.rug;

  return (
    <group position={position} name="Rug">
      {/* Main rug surface */}
      <mesh position={[0, surface.positionY, 0]} receiveShadow>
        <boxGeometry args={[width, surface.height, depth]} />
        <meshStandardMaterial {...mat.surface} color={palette.rug} />
      </mesh>

      {/* Rug pattern (simple stripes) */}
      {pattern.offsets.map((offset, i) => (
        <mesh key={i} position={[0, pattern.positionY, offset * depth / 2]} receiveShadow>
          <boxGeometry args={[width * pattern.widthFactor, pattern.height, pattern.stripeWidth]} />
          <meshStandardMaterial {...mat.pattern} color={palette.stripe} />
        </mesh>
      ))}
    </group>
  );
}

export default Rug;
