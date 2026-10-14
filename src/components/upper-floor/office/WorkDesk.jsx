import React from 'react';
import BrainModel from './BrainModel';
import { RoundedBox, useGLTF } from '@react-three/drei';
import DeskLaptop from './MacBook';
import MacMini from './MacMini';
import DeskCables from './DeskCables';
import MacPeripherals from './MacPeripherals';
import FittedModel from '../../FittedModel';
import { OFFICE } from '../../../config/upperFloorCoordinates';

function WorkDesk({ position = [2, 3, -2], rotation = 0 }) {
  const { materials: mat, desk, macMini, monitor, chair } = OFFICE.workDesk;

  return (
    <group position={position} rotation={[0, rotation, 0]} name="Work_Desk">
      <FittedModel modelPath={desk.modelPath} modelSize={desk.modelSize} name="Meshy_OfficeDesk" />

      <DeskLaptop />
      <BrainModel position={[-.57, desk.modelSize[1], -.24]} />

      {/* Compact 24-inch display: thin bezel and a low, connected pedestal. */}
      <group name="Monitor" position={[monitor.positionX, desk.modelSize[1], monitor.positionZ]}>
        <RoundedBox args={[monitor.standBase.width, monitor.standBase.height, monitor.standBase.depth]}
          position={[0, monitor.standBase.height / 2, 0]} radius={0.005} smoothness={3} castShadow>
          <meshStandardMaterial {...mat.monitorStand} />
        </RoundedBox>
        <RoundedBox args={[monitor.standPole.width, monitor.standPole.height, monitor.standPole.depth]}
          position={[0, monitor.standBase.height + monitor.standPole.height / 2, -0.014]}
          radius={0.006} smoothness={3} castShadow>
          <meshStandardMaterial {...mat.monitorStand} />
        </RoundedBox>
        <RoundedBox position={[0, monitor.frame.positionY, 0]}
          args={[monitor.frame.width, monitor.frame.height, monitor.frame.depth]}
          radius={0.009} smoothness={3} castShadow>
          <meshStandardMaterial {...mat.monitorFrame} />
        </RoundedBox>
        <mesh position={[0, monitor.frame.positionY, monitor.frame.depth / 2 + 0.0005]}>
          <planeGeometry args={[monitor.screen.width, monitor.screen.height]} />
          <meshStandardMaterial {...mat.monitorScreen} />
        </mesh>
      </group>

      <MacMini position={[macMini.positionX, desk.modelSize[1], macMini.positionZ]} />

      <MacPeripherals deskHeight={desk.modelSize[1]} />
      <DeskCables />

      {/* OFFICE CHAIR */}
      <group name="Office_Chair" position={[0, chair.positionY, chair.positionZ]} rotation={[0, chair.rotationY, 0]}>
        <FittedModel modelPath={chair.modelPath} modelSize={chair.modelSize} name="Meshy_OfficeChair" />
      </group>
    </group>
  );
}

export default WorkDesk;

useGLTF.preload(OFFICE.workDesk.desk.modelPath);
useGLTF.preload(OFFICE.workDesk.chair.modelPath);
