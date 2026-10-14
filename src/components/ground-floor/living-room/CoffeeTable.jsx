import React from 'react';
import {useTVPlayback} from '../../../context/TVPlaybackContext';
import FittedModel from '../../FittedModel';
import { RoundedBox } from '@react-three/drei';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function CoffeeTable({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const playback=useTVPlayback();
  const useRemote=e=>{e.stopPropagation();playback.playNext();};
  const { material, tabletop, leg } = LIVING_ROOM.coffeeTable;

  return (
    <group position={position} rotation={rotation} name="Coffee_Table">
      {/* Tabletop */}
      <RoundedBox position={[0, tabletop.positionY, 0]} args={[tabletop.width, tabletop.height, tabletop.depth]} radius={Math.min(0.025, tabletop.height / 3)} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial 
          color={material.color} 
          roughness={material.roughness} 
          metalness={material.metalness} 
        />
      </RoundedBox>

      <group position={[-.23, tabletop.positionY + tabletop.height / 2 + .001, -.02]} rotation={[0,.28,0]} name="TV_Remote_On_Table" onClick={useRemote}
        onPointerOver={()=>{document.body.style.cursor='pointer';}}
        onPointerOut={()=>{document.body.style.cursor='auto';}}>
        <mesh visible={false}><boxGeometry args={[.12,.065,.30]}/><meshBasicMaterial/></mesh>
        <FittedModel modelPath="/models/tv-remote/remote.glb" modelSize={[.075,.028,.28]} name="TV_Remote" />

      </group>
      {/* Legs (4 corners) */}
      {leg.positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[leg.width, leg.height, leg.depth]} />
          <meshStandardMaterial 
            color={material.color} 
            roughness={material.roughness} 
            metalness={material.metalness} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default CoffeeTable;
