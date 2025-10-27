import React from 'react';
import * as THREE from 'three';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function BarStool({ position }) {
  const { woodMaterial, legMaterial, seat, leg, footrest } = KITCHEN.barStool;

  const woodMat = new THREE.MeshStandardMaterial(woodMaterial);
  const legMat = new THREE.MeshStandardMaterial(legMaterial);

  return (
    <group position={position} name="Kitchen_Stool">
      {/* Seat */}
      <mesh position={[0, seat.positionY, 0]} castShadow receiveShadow material={woodMat}>
        <cylinderGeometry args={[seat.radius, seat.radius, seat.height, seat.segments]} />
      </mesh>

      {/* Legs (4 legs angled outward) */}
      {[...Array(leg.count)].map((_, i) => {
        const angle = (i / leg.count) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * leg.radialDistance,
              leg.positionY,
              Math.sin(angle) * leg.radialDistance
            ]}
            castShadow
            material={legMat}
          >
            <cylinderGeometry args={[leg.radiusTop, leg.radiusBottom, leg.height, leg.segments]} />
          </mesh>
        );
      })}

      {/* Footrest ring */}
      <mesh position={[0, footrest.positionY, 0]} rotation={[footrest.rotationX, 0, 0]} material={legMat}>
        <torusGeometry args={[footrest.radius, footrest.tube, footrest.radialSegments, footrest.tubularSegments]} />
      </mesh>
    </group>
  );
}

export default BarStool;
