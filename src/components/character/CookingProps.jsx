import React,{useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {useResident} from '../../context/ResidentContext';
export default function CookingProps(){
 const root=useRef();const resident=useResident();
 useFrame(()=>{if(root.current)root.current.visible=resident.current.location==='kitchen'&&!resident.current.hidden;});
 return <group ref={root} name="Resident_Cooking_Props" userData={{skipExport:true}} visible={false}>
  <group position={[-2.55,1.035,-3.34]}>
   <mesh><cylinderGeometry args={[.145,.125,.065,32,1,true]}/><meshStandardMaterial color="#373d3e" side={2} roughness={.5}/></mesh>
   <mesh position={[0,-.025,0]}><cylinderGeometry args={[.13,.13,.012,32]}/><meshStandardMaterial color="#343a38"/></mesh>
   <mesh position={[.12,0,.17]} rotation={[Math.PI/2,0,-.6]}><cylinderGeometry args={[.014,.017,.27,12]}/><meshStandardMaterial color="#313b3b"/></mesh>
   {[[-.055,0,.015],[.03,0,-.04],[.04,0,.06]].map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[.025,12,8]}/><meshStandardMaterial color={['#c57b49','#788c42','#e6b55c'][i]}/></mesh>)}
  </group>
  <mesh position={[-2.66,1.11,-3.24]} rotation={[.55,0,.12]}><cylinderGeometry args={[.006,.009,.26,10]}/><meshStandardMaterial color="#a87b50"/></mesh>
 </group>;
}
