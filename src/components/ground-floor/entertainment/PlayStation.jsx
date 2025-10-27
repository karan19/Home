import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { ENTERTAINMENT } from '../../../config/groundFloorCoordinates';

function PlayStation({ position }) {
  const { mainBody, accentPanel, powerLight, discSlot, usbPort, stand } = ENTERTAINMENT.playstation;
  
  const consoleMaterial = new THREE.MeshStandardMaterial({
    color: accentPanel.color,
    roughness: accentPanel.roughness,
    metalness: accentPanel.metalness,
    polygonOffset: accentPanel.polygonOffset,
    polygonOffsetFactor: accentPanel.polygonOffsetFactor,
    polygonOffsetUnits: accentPanel.polygonOffsetUnits
  });

  const glossyMaterial = new THREE.MeshStandardMaterial({
    color: discSlot.color,
    roughness: discSlot.roughness,
    metalness: discSlot.metalness
  });

  const blueLightMaterial = new THREE.MeshStandardMaterial({
    color: powerLight.color,
    emissive: powerLight.emissive,
    emissiveIntensity: powerLight.emissiveIntensity,
    roughness: powerLight.roughness
  });

  return (
    <group position={position} name="PlayStation_Console">
      {/* Main console body (PS5-like shape) */}
      <RoundedBox
        args={[mainBody.width, mainBody.height, mainBody.depth]}
        radius={mainBody.radius}
        smoothness={mainBody.smoothness}
        position={[0, mainBody.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={mainBody.color} 
          roughness={mainBody.roughness} 
          metalness={mainBody.metalness} 
        />
      </RoundedBox>

      {/* Black accent panel */}
      <RoundedBox
        args={[accentPanel.width, accentPanel.height, accentPanel.depth]}
        radius={accentPanel.radius}
        smoothness={accentPanel.smoothness}
        position={[accentPanel.positionX, accentPanel.positionY, 0]}
        castShadow
      >
        <meshStandardMaterial {...consoleMaterial} />
      </RoundedBox>

      {/* Power indicator light */}
      <mesh position={[powerLight.positionX, powerLight.positionY, powerLight.positionZ]} material={blueLightMaterial}>
        <sphereGeometry args={[powerLight.radius, powerLight.widthSegments, powerLight.heightSegments]} />
      </mesh>

      {/* Disc slot (thin line) */}
      <mesh position={[0, discSlot.positionY, discSlot.positionZ]} material={glossyMaterial}>
        <boxGeometry args={[discSlot.width, discSlot.height, discSlot.depth]} />
      </mesh>

      {/* USB ports (small details) */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          position={[usbPort.basePositionX + i * usbPort.spacing, usbPort.positionY, usbPort.positionZ]}
          material={glossyMaterial}
        >
          <boxGeometry args={[usbPort.width, usbPort.height, usbPort.depth]} />
        </mesh>
      ))}

      {/* Stand/base */}
      <RoundedBox
        args={[stand.width, stand.height, stand.depth]}
        radius={stand.radius}
        smoothness={stand.smoothness}
        position={[0, stand.positionY, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={stand.color} roughness={stand.roughness} />
      </RoundedBox>
    </group>
  );
}

export default PlayStation;
