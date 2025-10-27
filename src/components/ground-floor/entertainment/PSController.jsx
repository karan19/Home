import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { ENTERTAINMENT } from '../../../config/groundFloorCoordinates';

function PSController({ position, rotation = [0, 0, 0] }) {
  const { 
    mainBody, 
    grip, 
    touchpad, 
    psButton, 
    analogStick, 
    dpad, 
    actionButtons 
  } = ENTERTAINMENT.psController;

  const controllerMaterial = new THREE.MeshStandardMaterial({
    color: mainBody.color,
    roughness: mainBody.roughness,
    metalness: mainBody.metalness
  });

  const blackMaterial = new THREE.MeshStandardMaterial({
    color: analogStick.color,
    roughness: analogStick.roughness,
    metalness: analogStick.metalness
  });

  const blueMaterial = new THREE.MeshStandardMaterial({
    color: psButton.color,
    emissive: psButton.emissive,
    emissiveIntensity: psButton.emissiveIntensity,
    roughness: psButton.roughness
  });

  return (
    <group position={position} rotation={rotation} name="PS_Controller">
      {/* Main controller body */}
      <RoundedBox
        args={[mainBody.width, mainBody.height, mainBody.depth]}
        radius={mainBody.radius}
        smoothness={mainBody.smoothness}
        position={[0, mainBody.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...controllerMaterial} />
      </RoundedBox>

      {/* Left grip */}
      <RoundedBox
        args={[grip.width, grip.height, grip.depth]}
        radius={grip.radius}
        smoothness={grip.smoothness}
        position={[grip.leftPositionX, grip.positionY, grip.positionZ]}
        rotation={[grip.rotationX, 0, 0]}
        castShadow
      >
        <meshStandardMaterial {...controllerMaterial} />
      </RoundedBox>

      {/* Right grip */}
      <RoundedBox
        args={[grip.width, grip.height, grip.depth]}
        radius={grip.radius}
        smoothness={grip.smoothness}
        position={[grip.rightPositionX, grip.positionY, grip.positionZ]}
        rotation={[grip.rotationX, 0, 0]}
        castShadow
      >
        <meshStandardMaterial {...controllerMaterial} />
      </RoundedBox>

      {/* Touchpad (center) */}
      <RoundedBox
        args={[touchpad.width, touchpad.height, touchpad.depth]}
        radius={touchpad.radius}
        smoothness={touchpad.smoothness}
        position={[0, touchpad.positionY, touchpad.positionZ]}
        castShadow
      >
        <meshStandardMaterial 
          color={touchpad.color} 
          roughness={touchpad.roughness} 
          metalness={touchpad.metalness} 
        />
      </RoundedBox>

      {/* PlayStation button (center) */}
      <mesh 
        position={[0, psButton.positionY, psButton.positionZ]} 
        material={blueMaterial}
      >
        <cylinderGeometry args={[psButton.radius, psButton.radius, psButton.height, psButton.segments]} />
      </mesh>

      {/* Left analog stick */}
      <group position={[analogStick.leftPositionX, analogStick.positionY, analogStick.positionZ]}>
        <mesh castShadow material={blackMaterial}>
          <cylinderGeometry args={[analogStick.baseRadius, analogStick.baseRadius, analogStick.baseHeight, analogStick.segments]} />
        </mesh>
        <mesh position={[0, analogStick.topPositionY, 0]} material={blackMaterial}>
          <cylinderGeometry args={[analogStick.topRadius, analogStick.topRadius, analogStick.topHeight, analogStick.segments]} />
        </mesh>
      </group>

      {/* Right analog stick */}
      <group position={[analogStick.rightPositionX, analogStick.positionY, analogStick.positionZ]}>
        <mesh castShadow material={blackMaterial}>
          <cylinderGeometry args={[analogStick.baseRadius, analogStick.baseRadius, analogStick.baseHeight, analogStick.segments]} />
        </mesh>
        <mesh position={[0, analogStick.topPositionY, 0]} material={blackMaterial}>
          <cylinderGeometry args={[analogStick.topRadius, analogStick.topRadius, analogStick.topHeight, analogStick.segments]} />
        </mesh>
      </group>

      {/* D-pad (left side) */}
      {[
        [0, dpad.upOffsetZ],
        [0, dpad.downOffsetZ],
        [dpad.leftOffsetX, 0],
        [dpad.rightOffsetX, 0]
      ].map((offset, i) => (
        <RoundedBox
          key={i}
          args={i < 2 
            ? [dpad.verticalWidth, dpad.verticalHeight, dpad.verticalDepth] 
            : [dpad.horizontalWidth, dpad.horizontalHeight, dpad.horizontalDepth]
          }
          radius={dpad.radius}
          smoothness={dpad.smoothness}
          position={[dpad.basePositionX + offset[0], dpad.positionY, dpad.basePositionZ + offset[1]]}
          castShadow
        >
          <meshStandardMaterial color={dpad.color} roughness={dpad.roughness} />
        </RoundedBox>
      ))}

      {/* Action buttons (right side - X, O, Square, Triangle) */}
      {[
        actionButtons.triangle,
        actionButtons.x,
        actionButtons.square,
        actionButtons.circle
      ].map((btn, i) => (
        <mesh
          key={i}
          position={[actionButtons.basePositionX + btn.offsetX, actionButtons.positionY, actionButtons.basePositionZ + btn.offsetZ]}
          castShadow
          material={new THREE.MeshStandardMaterial({ color: btn.color, roughness: actionButtons.roughness })}
        >
          <cylinderGeometry args={[actionButtons.radius, actionButtons.radius, actionButtons.height, actionButtons.segments]} />
        </mesh>
      ))}
    </group>
  );
}

export default PSController;
