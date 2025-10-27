import React from 'react';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';

function Pen({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { materials: mat, body, tip, cap, clip } = SEATING_AREA.pen;

  return (
    <group position={position} rotation={rotation} name="Furniture_Pen">
      {/* Pen body (main cylinder) */}
      <mesh castShadow>
        <cylinderGeometry args={[body.radius, body.radius, body.height, body.segments]} />
        <meshStandardMaterial {...mat.body} />
      </mesh>

      {/* Pen tip (cone) */}
      <mesh position={[0, tip.positionY, 0]} castShadow>
        <coneGeometry args={[tip.radius, tip.height, tip.segments]} />
        <meshStandardMaterial {...mat.tip} />
      </mesh>

      {/* Pen cap/top */}
      <mesh position={[0, cap.positionY, 0]} castShadow>
        <cylinderGeometry args={[cap.radiusTop, cap.radiusBottom, cap.height, cap.segments]} />
        <meshStandardMaterial {...mat.body} />
      </mesh>

      {/* Pen clip */}
      <mesh position={[clip.positionX, clip.positionY, 0]} rotation={[0, 0, clip.rotationZ]} castShadow>
        <boxGeometry args={[clip.width, clip.height, clip.depth]} />
        <meshStandardMaterial {...mat.clip} />
      </mesh>
    </group>
  );
}

export default Pen;
