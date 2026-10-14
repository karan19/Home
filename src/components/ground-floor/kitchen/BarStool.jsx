import React from 'react';
import RepeatedMesh from '../../RepeatedMesh';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

export default function BarStool({ position }) {
  const { woodMaterial, legMaterial, seat, leg, footrest } = KITCHEN.barStool;
  return <group position={position} name="Kitchen_Stool">
    <mesh position={[0, seat.positionY, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[seat.radius, seat.radius, seat.height, seat.segments]} />
      <meshStandardMaterial {...woodMaterial} />
    </mesh>
    <RepeatedMesh name="Stool_Legs" shape="cylinder"
      args={[leg.radiusTop, leg.radiusBottom, leg.height, leg.segments]}
      positions={Array.from({length:leg.count}, (_, i) => [Math.cos(i / leg.count * Math.PI * 2) * leg.radialDistance, leg.positionY, Math.sin(i / leg.count * Math.PI * 2) * leg.radialDistance])}
      material={legMaterial} castShadow />
    <mesh position={[0, footrest.positionY, 0]} rotation={[footrest.rotationX, 0, 0]}>
      <torusGeometry args={[footrest.radius, footrest.tube, footrest.radialSegments, footrest.tubularSegments]} />
      <meshStandardMaterial {...legMaterial} />
    </mesh>
  </group>;
}
