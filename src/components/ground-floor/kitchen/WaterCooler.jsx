import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function WaterCooler({ position = [0, 0, 0] }) {
  const { materials: mat, baseCabinet, mainBody, waterBottle, bottleCap, hotTap, coldTap, dripTray } = KITCHEN.waterCooler;

  return (
    <group position={position} name="Furniture_WaterCooler">
      {/* Base cabinet (dark gray) */}
      <RoundedBox
        args={[baseCabinet.width, baseCabinet.height, baseCabinet.depth]}
        radius={baseCabinet.radius}
        smoothness={baseCabinet.smoothness}
        position={[0, baseCabinet.positionY, 0]}
        castShadow
      >
        <meshStandardMaterial {...mat.baseCabinet} />
      </RoundedBox>

      {/* Main body (white/light gray) */}
      <RoundedBox
        args={[mainBody.width, mainBody.height, mainBody.depth]}
        radius={mainBody.radius}
        smoothness={mainBody.smoothness}
        position={[0, mainBody.positionY, 0]}
        castShadow
      >
        <meshStandardMaterial {...mat.mainBody} />
      </RoundedBox>

      {/* Water bottle (blue transparent) */}
      <mesh position={[0, waterBottle.positionY, 0]} castShadow>
        <cylinderGeometry args={[waterBottle.radius, waterBottle.radius, waterBottle.height, waterBottle.segments]} />
        <meshStandardMaterial {...mat.waterBottle} />
      </mesh>

      {/* Bottle cap (white) */}
      <mesh position={[0, bottleCap.positionY, 0]} castShadow>
        <cylinderGeometry args={[bottleCap.radius, bottleCap.radius, bottleCap.height, bottleCap.segments]} />
        <meshStandardMaterial {...mat.bottleCap} />
      </mesh>

      {/* Hot water tap (red) */}
      <mesh position={[hotTap.positionX, hotTap.positionY, hotTap.positionZ]} castShadow>
        <cylinderGeometry args={[hotTap.radius, hotTap.radius, hotTap.height, hotTap.segments]} />
        <meshStandardMaterial {...mat.hotTap} />
      </mesh>

      {/* Cold water tap (blue) */}
      <mesh position={[coldTap.positionX, coldTap.positionY, coldTap.positionZ]} castShadow>
        <cylinderGeometry args={[coldTap.radius, coldTap.radius, coldTap.height, coldTap.segments]} />
        <meshStandardMaterial {...mat.coldTap} />
      </mesh>

      {/* Drip tray (dark gray) */}
      <RoundedBox
        args={[dripTray.width, dripTray.height, dripTray.depth]}
        radius={dripTray.radius}
        smoothness={dripTray.smoothness}
        position={[0, dripTray.positionY, dripTray.positionZ]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.dripTray} />
      </RoundedBox>
    </group>
  );
}

export default WaterCooler;
