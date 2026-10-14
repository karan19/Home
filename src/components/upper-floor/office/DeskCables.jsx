import React, { useMemo, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { CatmullRomCurve3, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useResident } from '../../../context/ResidentContext';
import { OFFICE } from '../../../config/upperFloorCoordinates';

function Cable({ name, points, color = '#303638', radius = 0.003 }) {
  const curve = useMemo(() => new CatmullRomCurve3(points.map(p => new Vector3(...p)), false, 'centripetal'), [points]);
  return <mesh name={name}>
    <tubeGeometry args={[curve, 40, radius, 6, false]} />
    <meshStandardMaterial color={color} roughness={0.9} />
  </mesh>;
}

// All coordinates are local to the desk; wiring follows its rotation and exports as geometry.
export default function DeskCables() {
  const connector=useRef();
  const resident=useResident();
  useFrame(()=>{if(connector.current)connector.current.visible=!resident || resident.current.laptop==='desk';});
  const { desk, macbook, macMini, monitor } = OFFICE.workDesk;
  const top = desk.modelSize[1];
  const laptopPort = [macbook.positionX - macbook.base.width / 2 - 0.004, top + 0.007, macbook.positionZ - 0.045];
  const miniPower = [macMini.positionX + 0.026, top + 0.025, macMini.positionZ - 0.066];
  const miniDisplay = [macMini.positionX - 0.025, top + 0.025, macMini.positionZ - 0.066];
  const monitorPower = [monitor.positionX + 0.09, top + monitor.frame.positionY - 0.1, monitor.positionZ - 0.018];
  const monitorDisplay = [monitor.positionX - 0.075, monitorPower[1], monitorPower[2]];
  return <group name="Office_Wiring">
    {/* A mounted strip keeps plugs and the laptop adapter off the desktop. */}
    <RoundedBox name="Desk_Power_Strip" args={[0.38, 0.034, 0.075]} radius={0.008} smoothness={3} position={[0.30, 0.55, -0.30]}>
      <meshStandardMaterial color="#E2E1DA" roughness={0.8} />
    </RoundedBox>
    {[0.18, 0.30, 0.42].map(x => <RoundedBox key={x} args={[0.053, 0.003, 0.055]} radius={0.001} smoothness={2} position={[x, 0.568, -0.30]}>
      <meshStandardMaterial color="#767B77" roughness={0.9} />
    </RoundedBox>)}
    <RoundedBox name="Laptop_Power_Adapter" args={[0.055, 0.055, 0.055]} radius={0.008} smoothness={3} position={[0.18, 0.598, -0.30]}>
      <meshStandardMaterial color="#F0EEE7" roughness={0.8} />
    </RoundedBox>
    {[0.30, 0.42].map(x => <RoundedBox key={x} args={[0.038, 0.032, 0.04]} radius={0.007} smoothness={2} position={[x, 0.586, -0.30]}>
      <meshStandardMaterial color="#303638" roughness={0.9} />
    </RoundedBox>)}
    {/* Short brackets attach the strip to the underside of the tabletop. */}
    {[0.13, 0.47].map(x => <mesh key={x} position={[x, 0.651, -0.30]}>
      <boxGeometry args={[0.015, 0.168, 0.02]} />
      <meshStandardMaterial color="#6F736D" roughness={0.8} />
    </mesh>)}
    <Cable name="Laptop_Charging_Cable" color="#DDDCD5" radius={0.0025} points={[
      [0.18,0.598,-0.331],[0.10,0.61,-0.47],[-0.25,0.66,-0.49],[-0.54,top+0.04,-0.47],
      [-0.59,top+0.025,-0.20],[-0.59,top+0.012,macbook.positionZ-0.03],laptopPort]} />
    <Cable name="Mac_Mini_Power_Cable" points={[
      [0.30,0.602,-0.30],[0.37,0.63,-0.47],[0.56,top+0.035,-0.49],
      [0.60,top+0.015,-0.20],miniPower]} />
    <Cable name="Monitor_Power_Cable" points={[
      [0.42,0.602,-0.30],[0.48,0.65,-0.48],[0.39,top+0.035,-0.48],
      [monitorPower[0],top+0.05,-0.32],monitorPower]} />
    <Cable name="Mac_Mini_Display_Cable" radius={0.0028} points={[
      miniDisplay,[0.43,top+0.014,-0.07],[0.28,top+0.014,-0.10],
      [0.06,top+0.065,-0.27],monitorDisplay]} />
    <RoundedBox ref={connector} name="Laptop_Charging_Connector" args={[0.014,0.007,0.012]} radius={0.002} smoothness={2} position={laptopPort}>
      <meshStandardMaterial color="#D5D8D8" roughness={0.7} />
    </RoundedBox>
    {[miniPower, miniDisplay, monitorPower, monitorDisplay].map((port,i) => <RoundedBox key={i} name={`Device_Cable_Connector_${i}`} args={[0.014,0.01,0.016]} radius={0.003} smoothness={2} position={port}>
      <meshStandardMaterial color="#22292C" roughness={0.9} />
    </RoundedBox>)}
    {/* The rear room wall is at local X=1.75 after the office's quarter turn. */}
    <group name="Office_Wall_Outlet" position={[1.735,0.30,-0.20]} rotation={[0,-Math.PI/2,0]}>
      <RoundedBox args={[0.075,0.12,0.012]} radius={0.005} smoothness={3}>
        <meshStandardMaterial color="#F1EFE8" roughness={0.85} />
      </RoundedBox>
      <RoundedBox args={[0.033,0.04,0.026]} radius={0.006} smoothness={2} position={[0,-0.022,0.018]}>
        <meshStandardMaterial color="#303638" roughness={0.9} />
      </RoundedBox>
      {[-0.009,0.009].map(x => <mesh key={x} position={[x,0.032,0.0065]}>
        <planeGeometry args={[0.004,0.013]} />
        <meshStandardMaterial color="#555C58" roughness={0.9} />
      </mesh>)}
    </group>
    <Cable name="Desk_Mains_Cord" radius={0.004} points={[
      [0.49,0.55,-0.30],[0.68,0.50,-0.48],[0.83,0.16,-0.49],
      [1.12,0.04,-0.47],[1.53,0.04,-0.31],[1.68,0.13,-0.20],[1.70,0.278,-0.20]]} />
  </group>;
}
