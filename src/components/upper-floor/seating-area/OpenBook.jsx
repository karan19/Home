import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useResident } from '../../../context/ResidentContext';
import { RoundedBox } from '@react-three/drei';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

function OpenBook({ position = [0, 0, 0], rotation = [0, 0, 0], held = false }) {
  const group=useRef();
  const resident=useResident();
  useFrame(()=>{if(group.current){const reading=resident?.current?.location==='reading'&&!resident.current.hidden;group.current.visible=held?reading:!reading;
   if(held)group.current.traverse(object=>{if(object.isMesh){object.material.transparent=true;object.material.opacity=resident.current.formation??1;object.castShadow=object.material.opacity>.95;}});}});
  const { toggle } = useInteractiveAudio('bezos');
  const { materials: mat, leftPage, rightPage, binding, cover, pageStack } = SEATING_AREA.openBook;
  const [isHovered, setIsHovered] = useState(false);

  // Handle cursor change on hover
  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isHovered]);

  const handleClick = async (e) => {
    e.stopPropagation();
    await toggle();
  };

  return (
    <group ref={group}
      position={position} 
      rotation={rotation} 
      name="Furniture_OpenBook"
      onClick={handleClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Left page */}
      <RoundedBox
        args={[leftPage.width, leftPage.height, leftPage.depth]}
        radius={leftPage.radius}
        smoothness={leftPage.smoothness}
        position={[leftPage.positionX, 0, 0]}
        rotation={[0, leftPage.rotationY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.page} />
      </RoundedBox>

      {/* Right page */}
      <RoundedBox
        args={[rightPage.width, rightPage.height, rightPage.depth]}
        radius={rightPage.radius}
        smoothness={rightPage.smoothness}
        position={[rightPage.positionX, 0, 0]}
        rotation={[0, rightPage.rotationY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.page} />
      </RoundedBox>

      {/* Spiral binding (metal coils) */}
      {Array.from({ length: binding.count }).map((_, i) => {
        const z = binding.startZ + i * binding.spacing;
        return (
          <mesh key={i} position={[0, binding.positionY, z]} rotation={[binding.rotationX, 0, 0]} castShadow>
            <torusGeometry args={[binding.radius, binding.tube, binding.radialSegments, binding.tubularSegments]} />
            <meshStandardMaterial {...mat.binding} />
          </mesh>
        );
      })}

      {/* Cardboard cover (bottom) */}
      <RoundedBox
        args={[cover.width, cover.height, cover.depth]}
        radius={cover.radius}
        smoothness={cover.smoothness}
        position={[0, cover.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.cover} />
      </RoundedBox>

      {/* Page stack (shows thickness) */}
      <mesh position={[0, pageStack.positionY, 0]} castShadow>
        <boxGeometry args={[pageStack.width, pageStack.height, pageStack.depth]} />
        <meshStandardMaterial {...mat.page} />
      </mesh>
    </group>
  );
}

export default OpenBook;
