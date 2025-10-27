import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function Refrigerator({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { materials: mat, mainBody, frenchDoors, dispenser, freezerDrawer, doorSeam, brandLogo } = KITCHEN.refrigerator;

  return (
    <group position={position} rotation={rotation} name="Refrigerator">
      {/* Main refrigerator body */}
      <RoundedBox 
        args={[mainBody.width, mainBody.height, mainBody.depth]} 
        radius={mainBody.radius} 
        smoothness={mainBody.smoothness}
        position={[0, mainBody.positionY, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...mat.body} />
      </RoundedBox>

      {/* FRENCH DOORS (Top Section) */}
      <group name="French_Doors" position={[0, frenchDoors.positionY, 0]}>
        {/* Left door */}
        <mesh position={[frenchDoors.leftDoor.positionX, 0, frenchDoors.leftDoor.positionZ]} castShadow>
          <boxGeometry args={[frenchDoors.leftDoor.width, frenchDoors.leftDoor.height, frenchDoors.leftDoor.depth]} />
          <meshStandardMaterial {...mat.door} />
        </mesh>

        {/* Right door */}
        <mesh position={[frenchDoors.rightDoor.positionX, 0, frenchDoors.rightDoor.positionZ]} castShadow>
          <boxGeometry args={[frenchDoors.rightDoor.width, frenchDoors.rightDoor.height, frenchDoors.rightDoor.depth]} />
          <meshStandardMaterial {...mat.door} />
        </mesh>

        {/* Left door handle (vertical bar) */}
        <mesh position={[frenchDoors.leftHandle.positionX, 0, frenchDoors.leftHandle.positionZ]} castShadow>
          <boxGeometry args={[frenchDoors.leftHandle.width, frenchDoors.leftHandle.height, frenchDoors.leftHandle.depth]} />
          <meshStandardMaterial {...mat.handle} />
        </mesh>

        {/* Right door handle (vertical bar) */}
        <mesh position={[frenchDoors.rightHandle.positionX, 0, frenchDoors.rightHandle.positionZ]} castShadow>
          <boxGeometry args={[frenchDoors.rightHandle.width, frenchDoors.rightHandle.height, frenchDoors.rightHandle.depth]} />
          <meshStandardMaterial {...mat.handle} />
        </mesh>

        {/* Water/Ice dispenser on left door */}
        <group position={[dispenser.positionX, dispenser.positionY, dispenser.positionZ]}>
          {/* Dispenser panel */}
          <mesh castShadow>
            <boxGeometry args={[dispenser.panel.width, dispenser.panel.height, dispenser.panel.depth]} />
            <meshStandardMaterial {...mat.dispenserPanel} />
          </mesh>
          
          {/* Dispenser opening */}
          <mesh position={[0, dispenser.opening.positionY, dispenser.opening.positionZ]}>
            <boxGeometry args={[dispenser.opening.width, dispenser.opening.height, dispenser.opening.depth]} />
            <meshStandardMaterial {...mat.dispenserOpening} />
          </mesh>

          {/* Control buttons */}
          <mesh position={[dispenser.buttons.leftPositionX, dispenser.buttons.positionY, dispenser.buttons.positionZ]}>
            <boxGeometry args={[dispenser.buttons.width, dispenser.buttons.height, dispenser.buttons.depth]} />
            <meshStandardMaterial {...mat.controlButton} />
          </mesh>
          <mesh position={[dispenser.buttons.rightPositionX, dispenser.buttons.positionY, dispenser.buttons.positionZ]}>
            <boxGeometry args={[dispenser.buttons.width, dispenser.buttons.height, dispenser.buttons.depth]} />
            <meshStandardMaterial {...mat.controlButton} />
          </mesh>
        </group>
      </group>

      {/* FREEZER DRAWER (Bottom Section) */}
      <group name="Freezer_Drawer" position={[0, freezerDrawer.positionY, 0]}>
        {/* Drawer front */}
        <mesh position={[0, 0, freezerDrawer.front.positionZ]} castShadow>
          <boxGeometry args={[freezerDrawer.front.width, freezerDrawer.front.height, freezerDrawer.front.depth]} />
          <meshStandardMaterial {...mat.door} />
        </mesh>

        {/* Drawer handle (horizontal bar) */}
        <mesh position={[0, freezerDrawer.handle.positionY, freezerDrawer.handle.positionZ]} castShadow>
          <boxGeometry args={[freezerDrawer.handle.width, freezerDrawer.handle.height, freezerDrawer.handle.depth]} />
          <meshStandardMaterial {...mat.handle} />
        </mesh>
      </group>

      {/* Door seam (center vertical line) */}
      <mesh position={[0, doorSeam.positionY, doorSeam.positionZ]}>
        <boxGeometry args={[doorSeam.width, doorSeam.height, doorSeam.depth]} />
        <meshStandardMaterial {...mat.doorSeam} />
      </mesh>

      {/* Brand logo area (optional subtle detail) */}
      <mesh position={[0, brandLogo.positionY, brandLogo.positionZ]}>
        <boxGeometry args={[brandLogo.width, brandLogo.height, brandLogo.depth]} />
        <meshStandardMaterial {...mat.brandLogo} />
      </mesh>
    </group>
  );
}

export default Refrigerator;
