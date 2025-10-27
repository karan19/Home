import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function CoffeeMachine({ position = [0, 0, 0] }) {
  const { materials: mat, base, mainBody, waterTank, groupHead, portafilter, steamWand, dripSpouts, controlPanel, buttons, gauge, gaugeNeedle, cupWarmer, coffeeCup } = KITCHEN.coffeeMachine;

  return (
    <group position={position} name="Furniture_CoffeeMachine">
      {/* Base/Drip Tray (black) */}
      <RoundedBox
        args={[base.width, base.height, base.depth]}
        radius={base.radius}
        smoothness={base.smoothness}
        position={[0, base.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.base} />
      </RoundedBox>

      {/* Main Body (stainless steel) */}
      <RoundedBox
        args={[mainBody.width, mainBody.height, mainBody.depth]}
        radius={mainBody.radius}
        smoothness={mainBody.smoothness}
        position={[0, mainBody.positionY, 0]}
        castShadow
      >
        <meshStandardMaterial {...mat.mainBody} />
      </RoundedBox>

      {/* Water Tank (transparent, back) */}
      <RoundedBox
        args={[waterTank.width, waterTank.height, waterTank.depth]}
        radius={waterTank.radius}
        smoothness={waterTank.smoothness}
        position={[0, waterTank.positionY, waterTank.positionZ]}
        castShadow
      >
        <meshStandardMaterial {...mat.waterTank} />
      </RoundedBox>

      {/* Group Head (where coffee comes out) */}
      <mesh position={[0, groupHead.positionY, groupHead.positionZ]} castShadow>
        <cylinderGeometry args={[groupHead.radiusTop, groupHead.radiusBottom, groupHead.height, groupHead.segments]} />
        <meshStandardMaterial {...mat.groupHead} />
      </mesh>

      {/* Portafilter Handle (left side) */}
      <group position={[portafilter.positionX, portafilter.positionY, portafilter.positionZ]}>
        {/* Handle */}
        <mesh rotation={[0, 0, portafilter.handle.rotationZ]} castShadow>
          <cylinderGeometry args={[portafilter.handle.radius, portafilter.handle.radius, portafilter.handle.height, portafilter.handle.segments]} />
          <meshStandardMaterial {...mat.portafilterHandle} />
        </mesh>
        {/* Filter basket */}
        <mesh position={[0, portafilter.basket.positionY, 0]} castShadow>
          <cylinderGeometry args={[portafilter.basket.radius, portafilter.basket.radius, portafilter.basket.height, portafilter.basket.segments]} />
          <meshStandardMaterial {...mat.filterBasket} />
        </mesh>
      </group>

      {/* Steam Wand (right side) */}
      <group position={[steamWand.positionX, steamWand.positionY, steamWand.positionZ]}>
        {/* Wand arm */}
        <mesh rotation={[0, 0, steamWand.arm.rotationZ]} castShadow>
          <cylinderGeometry args={[steamWand.arm.radius, steamWand.arm.radius, steamWand.arm.height, steamWand.arm.segments]} />
          <meshStandardMaterial {...mat.steamWand} />
        </mesh>
        {/* Wand tip */}
        <mesh position={[steamWand.tip.positionX, steamWand.tip.positionY, 0]} castShadow>
          <coneGeometry args={[steamWand.tip.radius, steamWand.tip.height, steamWand.tip.segments]} />
          <meshStandardMaterial {...mat.steamWand} />
        </mesh>
      </group>

      {/* Dual Drip Spouts */}
      {dripSpouts.xPositions.map((x, i) => (
        <mesh key={i} position={[x, dripSpouts.positionY, dripSpouts.positionZ]} castShadow>
          <cylinderGeometry args={[dripSpouts.radiusTop, dripSpouts.radiusBottom, dripSpouts.height, dripSpouts.segments]} />
          <meshStandardMaterial {...mat.dripSpout} />
        </mesh>
      ))}

      {/* Control Panel (front, upper) */}
      <RoundedBox
        args={[controlPanel.width, controlPanel.height, controlPanel.depth]}
        radius={controlPanel.radius}
        smoothness={controlPanel.smoothness}
        position={[0, controlPanel.positionY, controlPanel.positionZ]}
        castShadow
      >
        <meshStandardMaterial {...mat.controlPanel} />
      </RoundedBox>

      {/* Buttons on control panel */}
      {buttons.xPositions.map((x, i) => (
        <mesh key={i} position={[x, buttons.positionY, buttons.positionZ]} castShadow>
          <cylinderGeometry args={[buttons.radius, buttons.radius, buttons.height, buttons.segments]} />
          <meshStandardMaterial {...(i === buttons.redIndex ? mat.buttonRed : mat.buttonBlue)} />
        </mesh>
      ))}

      {/* Pressure Gauge (circular dial) */}
      <mesh position={[0, gauge.positionY, gauge.positionZ]} rotation={[gauge.rotationX, 0, 0]} castShadow>
        <cylinderGeometry args={[gauge.radius, gauge.radius, gauge.height, gauge.segments]} />
        <meshStandardMaterial {...mat.gauge} />
      </mesh>

      {/* Gauge needle */}
      <mesh position={[0, gaugeNeedle.positionY, gaugeNeedle.positionZ]} rotation={[gaugeNeedle.rotationX, 0, gaugeNeedle.rotationZ]}>
        <boxGeometry args={[gaugeNeedle.width, gaugeNeedle.height, gaugeNeedle.depth]} />
        <meshStandardMaterial {...mat.gaugeNeedle} />
      </mesh>

      {/* Cup Warmer Platform (top) */}
      <RoundedBox
        args={[cupWarmer.width, cupWarmer.height, cupWarmer.depth]}
        radius={cupWarmer.radius}
        smoothness={cupWarmer.smoothness}
        position={[0, cupWarmer.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.cupWarmer} />
      </RoundedBox>

      {/* Coffee cup on warmer */}
      <group position={[coffeeCup.positionX, coffeeCup.positionY, coffeeCup.positionZ]}>
        <mesh castShadow>
          <cylinderGeometry args={[coffeeCup.radiusTop, coffeeCup.radiusBottom, coffeeCup.height, coffeeCup.segments]} />
          <meshStandardMaterial {...mat.coffeeCup} />
        </mesh>
        {/* Handle */}
        <mesh position={[coffeeCup.handle.positionX, 0, 0]} rotation={[0, 0, coffeeCup.handle.rotationZ]} castShadow>
          <torusGeometry args={[coffeeCup.handle.radius, coffeeCup.handle.tube, coffeeCup.handle.radialSegments, coffeeCup.handle.tubularSegments, coffeeCup.handle.angle]} />
          <meshStandardMaterial {...mat.coffeeCup} />
        </mesh>
      </group>
    </group>
  );
}

export default CoffeeMachine;
