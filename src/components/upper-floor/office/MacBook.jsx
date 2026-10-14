import React, { forwardRef, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { OFFICE } from '../../../config/upperFloorCoordinates';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';
import { useResident } from '../../../context/ResidentContext';
export const MacBook = forwardRef(function MacBook({lidRef, ...props},ref) {
 const {macbook,materials:mat}=OFFICE.workDesk;
 const {toggle}=useInteractiveAudio('musk');
 return <group ref={ref} name="MacBook" {...props} onClick={e=>{e.stopPropagation();toggle();}}>
        {/* Laptop base (keyboard) */}
        <RoundedBox args={[macbook.base.width, macbook.base.height, macbook.base.depth]} radius={macbook.base.radius} smoothness={macbook.base.smoothness} castShadow>
          <meshStandardMaterial {...mat.macbookBody} />
        </RoundedBox>

        {/* The screen rotates around the rear hinge, with its display on the front face. */}
        <group ref={lidRef} position={[0, macbook.base.height / 2, -macbook.base.depth / 2 + 0.015]} rotation={[macbook.screen.rotationX, 0, 0]}>
          <RoundedBox position={[0, macbook.screen.height / 2, 0]}
            args={[macbook.screen.width, macbook.screen.height, macbook.screen.depth]}
            radius={0.003} smoothness={3} castShadow>
            <meshStandardMaterial {...mat.macbookBody} />
          </RoundedBox>
          <mesh position={[0, macbook.screen.height / 2, macbook.screen.depth / 2 + 0.001]}>
            <planeGeometry args={[macbook.display.width, macbook.display.height]} />
            <meshStandardMaterial {...mat.macbookDisplay} />
          </mesh>
        </group>
        <RoundedBox args={[macbook.base.width - 0.045, 0.001, 0.085]} radius={0.0004} smoothness={2} position={[0, macbook.base.height / 2 + 0.0006, -0.025]}>
          <meshStandardMaterial color="#454b51" roughness={0.8} />
        </RoundedBox>
        <RoundedBox args={[0.085, 0.001, 0.044]} radius={0.0004} smoothness={2} position={[0, macbook.base.height / 2 + 0.0006, 0.064]}>
          <meshStandardMaterial color="#9fa8ae" roughness={0.7} />
        </RoundedBox>
</group>;
});
export default function DeskLaptop(){
 const group=useRef(); const resident=useResident(); const {macbook,desk}=OFFICE.workDesk;
 useFrame(()=>{if(group.current)group.current.visible=!resident || resident.current.laptop==='desk';});
 return <MacBook ref={group} position={[macbook.positionX,desk.modelSize[1]+macbook.base.height/2,macbook.positionZ]} />;
}
