import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { getFeatureConfig } from '../../../config/interactiveFeatures';
import { OFFICE } from '../../../config/upperFloorCoordinates';
import { mediaManager } from '../../../utils/mediaManager';

function WorkDesk({ position = [2, 3, -2], rotation = 0 }) {
  const config = getFeatureConfig('musk');
  const { materials: mat, desk, macbook, monitor, chair } = OFFICE.workDesk;
  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(config.audio.file);
    audioRef.current.loop = false;
    audioRef.current.addEventListener('ended', () => {
      window.dispatchEvent(new CustomEvent(config.audio.endEvent, { detail: false }));
    });
  }

  const handleMacBookClick = async (e) => {
    e.stopPropagation();
    await mediaManager.toggle(audioRef.current, config.audio.playEvent, config.audio.endEvent);
  };

  return (
    <group position={position} rotation={[0, rotation, 0]} name="Work_Desk">
      {/* DESK */}
      <group name="Desk">
        {/* Desktop surface */}
        <mesh position={[0, desk.desktop.positionY, 0]} castShadow receiveShadow>
          <boxGeometry args={[desk.desktop.width, desk.desktop.height, desk.desktop.depth]} />
          <meshStandardMaterial {...mat.desktop} />
        </mesh>

        {/* Desk legs (4 corners) */}
        {desk.leg.positions.map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[desk.leg.width, desk.leg.height, desk.leg.depth]} />
            <meshStandardMaterial {...mat.desktop} />
          </mesh>
        ))}
      </group>

      {/* MACBOOK LAPTOP */}
      <group 
        name="MacBook" 
        position={[macbook.positionX, macbook.positionY, 0]}
        onClick={handleMacBookClick}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
      >
        {/* Laptop base (keyboard) */}
        <RoundedBox args={[macbook.base.width, macbook.base.height, macbook.base.depth]} radius={macbook.base.radius} smoothness={macbook.base.smoothness} castShadow>
          <meshStandardMaterial {...mat.macbookBody} />
        </RoundedBox>

        {/* Laptop screen */}
        <mesh position={[0, macbook.screen.positionY, macbook.screen.positionZ]} rotation={[macbook.screen.rotationX, 0, 0]} castShadow>
          <boxGeometry args={[macbook.screen.width, macbook.screen.height, macbook.screen.depth]} />
          <meshStandardMaterial {...mat.macbookScreen} />
        </mesh>

        {/* Screen display (glowing) */}
        <mesh position={[0, macbook.display.positionY, macbook.display.positionZ]} rotation={[macbook.display.rotationX, 0, 0]}>
          <boxGeometry args={[macbook.display.width, macbook.display.height, macbook.display.depth]} />
          <meshStandardMaterial {...mat.macbookDisplay} />
        </mesh>

        {/* Apple logo (optional - small circle) */}
        <mesh position={[0, macbook.logo.positionY, macbook.logo.positionZ]} rotation={[macbook.logo.rotationX, 0, 0]}>
          <circleGeometry args={[macbook.logo.radius, macbook.logo.segments]} />
          <meshStandardMaterial {...mat.appleLogo} />
        </mesh>
      </group>

      {/* EXTERNAL MONITOR */}
      <group name="Monitor" position={[monitor.positionX, monitor.positionY, monitor.positionZ]}>
        {/* Monitor stand base */}
        <mesh position={[0, monitor.standBase.positionY, 0]} castShadow>
          <cylinderGeometry args={[monitor.standBase.radius, monitor.standBase.radius, monitor.standBase.height, monitor.standBase.segments]} />
          <meshStandardMaterial {...mat.monitorStand} />
        </mesh>

        {/* Monitor stand pole */}
        <mesh position={[0, monitor.standPole.positionY, 0]} castShadow>
          <cylinderGeometry args={[monitor.standPole.radius, monitor.standPole.radius, monitor.standPole.height, monitor.standPole.segments]} />
          <meshStandardMaterial {...mat.monitorStand} />
        </mesh>

        {/* Monitor frame */}
        <mesh position={[0, monitor.frame.positionY, 0]} castShadow>
          <boxGeometry args={[monitor.frame.width, monitor.frame.height, monitor.frame.depth]} />
          <meshStandardMaterial {...mat.monitorFrame} />
        </mesh>

        {/* Monitor screen (glowing) */}
        <mesh position={[0, monitor.screen.positionY, monitor.screen.positionZ]}>
          <boxGeometry args={[monitor.screen.width, monitor.screen.height, monitor.screen.depth]} />
          <meshStandardMaterial {...mat.monitorScreen} />
        </mesh>
      </group>

      {/* OFFICE CHAIR */}
      <group name="Office_Chair" position={[0, chair.positionY, chair.positionZ]} rotation={[0, chair.rotationY, 0]}>
        {/* Seat */}
        <RoundedBox args={[chair.seat.width, chair.seat.height, chair.seat.depth]} radius={chair.seat.radius} smoothness={chair.seat.smoothness} position={[0, chair.seat.positionY, 0]} castShadow>
          <meshStandardMaterial {...mat.chairFabric} />
        </RoundedBox>

        {/* Backrest */}
        <RoundedBox args={[chair.backrest.width, chair.backrest.height, chair.backrest.depth]} radius={chair.backrest.radius} smoothness={chair.backrest.smoothness} position={[0, chair.backrest.positionY, chair.backrest.positionZ]} castShadow>
          <meshStandardMaterial {...mat.chairFabric} />
        </RoundedBox>

        {/* Chair base (5-star) */}
        <mesh position={[0, chair.base.positionY, 0]} castShadow>
          <cylinderGeometry args={[chair.base.radius, chair.base.radius, chair.base.height, chair.base.segments]} />
          <meshStandardMaterial {...mat.chairBase} />
        </mesh>

        {/* Center pole */}
        <mesh position={[0, chair.pole.positionY, 0]} castShadow>
          <cylinderGeometry args={[chair.pole.radius, chair.pole.radius, chair.pole.height, chair.pole.segments]} />
          <meshStandardMaterial {...mat.chairBase} />
        </mesh>

        {/* Wheels (5 casters) */}
        {chair.wheels.angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * chair.wheels.radialDistance;
          const z = Math.sin(rad) * chair.wheels.radialDistance;
          return (
            <mesh key={i} position={[x, chair.wheels.positionY, z]} castShadow>
              <sphereGeometry args={[chair.wheels.radius, chair.wheels.segments, chair.wheels.segments]} />
              <meshStandardMaterial {...mat.wheels} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default WorkDesk;
