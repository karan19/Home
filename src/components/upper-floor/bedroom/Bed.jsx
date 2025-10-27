import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { BEDROOM } from '../../../config/upperFloorCoordinates';

function Bed({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { materials: mat, frame, mattress, blanket, pillows, legs } = BEDROOM.bed;

  return (
    <group position={position} rotation={rotation} name="Bed">
      {/* Bed Frame Base */}
      <mesh position={[0, frame.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[frame.width, frame.height, frame.depth]} />
        <meshStandardMaterial {...mat.frame} />
      </mesh>

      {/* Mattress/Cushion - with rounded corners */}
      <RoundedBox 
        args={[mattress.width, mattress.height, mattress.depth]} 
        radius={mattress.radius} 
        smoothness={mattress.smoothness}
        position={[0, mattress.positionY, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...mat.mattress} />
      </RoundedBox>

      {/* Blanket - Folded and Flowing Design */}
      {/* Main blanket body - draped over bed */}
      <mesh position={[0, blanket.mainBody.positionY, blanket.mainBody.positionZ]} rotation={[blanket.mainBody.rotationX, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[blanket.mainBody.width, blanket.mainBody.height, blanket.mainBody.depth]} />
        <meshStandardMaterial {...mat.blanket} />
      </mesh>

      {/* Blanket fold 1 - creates wave effect */}
      <mesh position={[0, blanket.fold1.positionY, blanket.fold1.positionZ]} rotation={[blanket.fold1.rotationX, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[blanket.fold1.width, blanket.fold1.height, blanket.fold1.depth]} />
        <meshStandardMaterial {...mat.blanket} />
      </mesh>

      {/* Blanket fold 2 - another wave */}
      <mesh position={[0, blanket.fold2.positionY, blanket.fold2.positionZ]} rotation={[blanket.fold2.rotationX, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[blanket.fold2.width, blanket.fold2.height, blanket.fold2.depth]} />
        <meshStandardMaterial {...mat.blanket} />
      </mesh>

      {/* Blanket edge - draped over side */}
      <mesh position={[blanket.edge.positionX, blanket.edge.positionY, blanket.edge.positionZ]} rotation={[0, 0, blanket.edge.rotationZ]} castShadow receiveShadow>
        <boxGeometry args={[blanket.edge.width, blanket.edge.height, blanket.edge.depth]} />
        <meshStandardMaterial {...mat.blanket} />
      </mesh>

      {/* Blanket corner fold - adds asymmetry */}
      <mesh position={[blanket.corner.positionX, blanket.corner.positionY, blanket.corner.positionZ]} rotation={[blanket.corner.rotationX, blanket.corner.rotationY, blanket.corner.rotationZ]} castShadow receiveShadow>
        <boxGeometry args={[blanket.corner.width, blanket.corner.height, blanket.corner.depth]} />
        <meshStandardMaterial {...mat.blanket} />
      </mesh>

      {/* Pillows */}
      {pillows.map((pillow, i) => (
        <React.Fragment key={i}>
          {/* Main pillow body */}
          <mesh position={[pillow.body.positionX, pillow.body.positionY, pillow.body.positionZ]} rotation={[pillow.body.rotationX, 0, pillow.body.rotationZ]} castShadow receiveShadow>
            <boxGeometry args={[pillow.body.width, pillow.body.height, pillow.body.depth]} />
            <meshStandardMaterial {...mat.pillow} />
          </mesh>
          
          {/* Pillow soft rounded top */}
          <mesh position={[pillow.top.positionX, pillow.top.positionY, pillow.top.positionZ]} rotation={[pillow.top.rotationX, 0, pillow.top.rotationZ]} castShadow receiveShadow>
            <boxGeometry args={[pillow.top.width, pillow.top.height, pillow.top.depth]} />
            <meshStandardMaterial {...mat.pillow} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Bed Legs (4 corners) */}
      {legs.positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[legs.width, legs.height, legs.depth]} />
          <meshStandardMaterial {...mat.legs} />
        </mesh>
      ))}
    </group>
  );
}

export default Bed;
