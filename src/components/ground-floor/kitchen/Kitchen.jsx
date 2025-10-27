import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function Kitchen({ position = [0, 0, 0] }) {
  const { materials: mat, baseCabinets, countertop, stove, sink, faucet, toaster, backsplash, upperCabinets, rangeHood } = KITCHEN.kitchen;

  return (
    <group position={position} name="Kitchen_Counter">
      {/* BASE CABINETS */}
      <group name="Base_Cabinets">
        {/* Main cabinet body */}
        <mesh position={[0, baseCabinets.body.positionY, 0]} castShadow receiveShadow>
          <boxGeometry args={[baseCabinets.body.width, baseCabinets.body.height, baseCabinets.body.depth]} />
          <meshStandardMaterial {...mat.cabinetWhite} />
        </mesh>

        {/* Cabinet doors (3 sections) */}
        {baseCabinets.door.xPositions.map((x, i) => (
          <mesh key={i} position={[x, baseCabinets.door.positionY, baseCabinets.door.positionZ]} castShadow>
            <boxGeometry args={[baseCabinets.door.width, baseCabinets.door.height, baseCabinets.door.depth]} />
            <meshStandardMaterial {...mat.cabinetDoor} />
          </mesh>
        ))}

        {/* Cabinet handles (6 handles) */}
        {baseCabinets.handle.xPositions.map((x, i) => (
          <React.Fragment key={i}>
            {baseCabinets.handle.yPositions.map((y, j) => (
              <mesh key={j} position={[x, y, baseCabinets.handle.positionZ]} castShadow>
                <cylinderGeometry args={[baseCabinets.handle.radius, baseCabinets.handle.radius, baseCabinets.handle.height, baseCabinets.handle.segments]} />
                <meshStandardMaterial {...mat.handle} />
              </mesh>
            ))}
          </React.Fragment>
        ))}
      </group>

      {/* COUNTERTOP */}
      <mesh position={[0, countertop.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[countertop.width, countertop.height, countertop.depth]} />
        <meshStandardMaterial {...mat.countertop} />
      </mesh>

      {/* STOVE/COOKTOP - Clickable */}
      <group 
        name="Stove" 
        position={[stove.positionX, stove.positionY, 0]}
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://www.gordonramsayrestaurants.com/', '_blank');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
      >
        {/* Cooktop surface */}
        <mesh castShadow>
          <boxGeometry args={[stove.surface.width, stove.surface.height, stove.surface.depth]} />
          <meshStandardMaterial {...mat.stoveSurface} />
        </mesh>

        {/* 4 Burners */}
        {stove.burner.positions.map(([x, z], i) => (
          <group key={i} position={[x, stove.burner.grate.positionY, z]}>
            {/* Burner grate */}
            <mesh castShadow>
              <cylinderGeometry args={[stove.burner.grate.radius, stove.burner.grate.radius, stove.burner.grate.height, stove.burner.grate.segments]} />
              <meshStandardMaterial {...mat.burnerGrate} />
            </mesh>
            {/* Burner center */}
            <mesh position={[0, stove.burner.center.positionY, 0]}>
              <cylinderGeometry args={[stove.burner.center.radius, stove.burner.center.radius, stove.burner.center.height, stove.burner.center.segments]} />
              <meshStandardMaterial {...mat.burnerCenter} />
            </mesh>
          </group>
        ))}

        {/* Control knobs */}
        {stove.knobs.xPositions.map((x, i) => (
          <mesh key={i} position={[x, 0, stove.knobs.positionZ]} castShadow>
            <cylinderGeometry args={[stove.knobs.radius, stove.knobs.radius, stove.knobs.height, stove.knobs.segments]} />
            <meshStandardMaterial {...mat.controlKnob} />
          </mesh>
        ))}
      </group>

      {/* SINK */}
      <group name="Sink" position={[sink.positionX, sink.positionY, 0]}>
        {/* Sink basin */}
        <mesh position={[0, sink.basin.positionY, 0]} castShadow receiveShadow>
          <boxGeometry args={[sink.basin.width, sink.basin.height, sink.basin.depth]} />
          <meshStandardMaterial 
            {...mat.sinkBasin}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
        
        {/* Sink interior (darker) */}
        <mesh position={[0, sink.interior.positionY, 0]}>
          <boxGeometry args={[sink.interior.width, sink.interior.height, sink.interior.depth]} />
          <meshStandardMaterial 
            {...mat.sinkInterior}
            polygonOffset={true}
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>

        {/* Drain */}
        <mesh position={[0, sink.drain.positionY, 0]}>
          <cylinderGeometry args={[sink.drain.radius, sink.drain.radius, sink.drain.height, sink.drain.segments]} />
          <meshStandardMaterial {...mat.drain} />
        </mesh>
      </group>

      {/* FAUCET */}
      <group name="Faucet" position={[faucet.positionX, faucet.positionY, faucet.positionZ]}>
        {/* Faucet base */}
        <mesh position={[0, faucet.base.positionY, 0]} castShadow>
          <cylinderGeometry args={[faucet.base.radiusTop, faucet.base.radiusBottom, faucet.base.height, faucet.base.segments]} />
          <meshStandardMaterial {...mat.faucet} />
        </mesh>

        {/* Faucet neck (curved) */}
        <mesh position={[0, faucet.neck.positionY, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[faucet.neck.radius, faucet.neck.radius, faucet.neck.height, faucet.neck.segments]} />
          <meshStandardMaterial {...mat.faucet} />
        </mesh>

        {/* Faucet spout */}
        <mesh position={[0, faucet.spout.positionY, faucet.spout.positionZ]} rotation={[faucet.spout.rotationX, 0, 0]} castShadow>
          <cylinderGeometry args={[faucet.spout.radiusTop, faucet.spout.radiusBottom, faucet.spout.height, faucet.spout.segments]} />
          <meshStandardMaterial {...mat.faucet} />
        </mesh>

        {/* Faucet handle */}
        <mesh position={[faucet.handle.positionX, faucet.handle.positionY, 0]} rotation={[0, 0, faucet.handle.rotationZ]} castShadow>
          <cylinderGeometry args={[faucet.handle.radius, faucet.handle.radius, faucet.handle.height, faucet.handle.segments]} />
          <meshStandardMaterial {...mat.faucet} />
        </mesh>
      </group>

      {/* TOASTER */}
      <group name="Toaster" position={[toaster.positionX, toaster.positionY, 0]}>
        {/* Toaster body */}
        <RoundedBox args={[toaster.body.width, toaster.body.height, toaster.body.depth]} radius={toaster.body.radius} smoothness={toaster.body.smoothness} castShadow>
          <meshStandardMaterial {...mat.toasterBody} />
        </RoundedBox>

        {/* Toaster slots (2 slots) */}
        {toaster.slot.xPositions.map((x, i) => (
          <mesh key={i} position={[x, toaster.slot.positionY, 0]} castShadow>
            <boxGeometry args={[toaster.slot.width, toaster.slot.height, toaster.slot.depth]} />
            <meshStandardMaterial {...mat.toasterSlot} />
          </mesh>
        ))}

        {/* Control dial */}
        <mesh position={[toaster.dial.positionX, 0, 0]} rotation={[0, 0, toaster.dial.rotationZ]} castShadow>
          <cylinderGeometry args={[toaster.dial.radius, toaster.dial.radius, toaster.dial.height, toaster.dial.segments]} />
          <meshStandardMaterial {...mat.controlKnob} />
        </mesh>

        {/* Crumb tray (bottom accent) */}
        <mesh position={[0, toaster.crumbTray.positionY, 0]}>
          <boxGeometry args={[toaster.crumbTray.width, toaster.crumbTray.height, toaster.crumbTray.depth]} />
          <meshStandardMaterial {...mat.controlKnob} />
        </mesh>
      </group>

      {/* BACKSPLASH */}
      <mesh position={[0, backsplash.positionY, backsplash.positionZ]} castShadow receiveShadow>
        <boxGeometry args={[backsplash.width, backsplash.height, backsplash.depth]} />
        <meshStandardMaterial {...mat.backsplash} />
      </mesh>

      {/* UPPER CABINETS */}
      <group name="Upper_Cabinets" position={[0, upperCabinets.positionY, upperCabinets.positionZ]}>
        {/* Main cabinet body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[upperCabinets.body.width, upperCabinets.body.height, upperCabinets.body.depth]} />
          <meshStandardMaterial {...mat.cabinetWhite} />
        </mesh>

        {/* Cabinet doors (3 sections) */}
        {upperCabinets.door.xPositions.map((x, i) => (
          <mesh key={i} position={[x, 0, upperCabinets.door.positionZ]} castShadow>
            <boxGeometry args={[upperCabinets.door.width, upperCabinets.door.height, upperCabinets.door.depth]} />
            <meshStandardMaterial {...mat.cabinetDoor} />
          </mesh>
        ))}

        {/* Cabinet handles (3 handles) */}
        {upperCabinets.handle.xPositions.map((x, i) => (
          <mesh key={i} position={[x, upperCabinets.handle.positionY, upperCabinets.handle.positionZ]} castShadow>
            <cylinderGeometry args={[upperCabinets.handle.radius, upperCabinets.handle.radius, upperCabinets.handle.height, upperCabinets.handle.segments]} />
            <meshStandardMaterial {...mat.handle} />
          </mesh>
        ))}
      </group>

      {/* RANGE HOOD */}
      <group name="Range_Hood" position={[rangeHood.positionX, rangeHood.positionY, rangeHood.positionZ]}>
        {/* Hood body (trapezoidal shape approximation) */}
        <mesh position={[0, rangeHood.body.positionY, 0]} castShadow>
          <boxGeometry args={[rangeHood.body.width, rangeHood.body.height, rangeHood.body.depth]} />
          <meshStandardMaterial {...mat.rangeHood} />
        </mesh>

        {/* Hood vent (bottom) */}
        <mesh position={[0, 0, rangeHood.vent.positionZ]} castShadow>
          <boxGeometry args={[rangeHood.vent.width, rangeHood.vent.height, rangeHood.vent.depth]} />
          <meshStandardMaterial {...mat.hoodVent} />
        </mesh>

        {/* Hood light */}
        <mesh position={[0, rangeHood.light.positionY, rangeHood.light.positionZ]}>
          <boxGeometry args={[rangeHood.light.width, rangeHood.light.height, rangeHood.light.depth]} />
          <meshStandardMaterial {...mat.hoodLight} />
        </mesh>
      </group>
    </group>
  );
}

export default Kitchen;
