import React from 'react';
import { useGLTF, RoundedBox } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { HOUSE_PROPS } from '../../../config/houseProps';

export default function PersonalProps() {
  const { bench, backpack, lamp, throw: blanket, dumbbells } = HOUSE_PROPS;
  return <group name="Personal_Props">
    <group position={bench.position} rotation-y={Math.PI / 2}>
      <FittedModel modelPath={bench.modelPath} modelSize={bench.modelSize} name="Garden_Bench" />
    </group>
    <group position={blanket.position} rotation-y={-.10}>
      <FittedModel modelPath={blanket.modelPath} modelSize={blanket.modelSize} name="Folded_Sofa_Throw" />
    </group>
    <group position={dumbbells.position} rotation-y={Math.PI / 2}>
      <FittedModel modelPath={dumbbells.modelPath} modelSize={dumbbells.modelSize} name="Dumbbell_Rack" />
    </group>
    <group position={backpack.position} rotation-y={.3}>
      <FittedModel modelPath={backpack.modelPath} modelSize={backpack.modelSize} name="Canvas_Backpack" />
    </group>
    <group position={lamp.position}>
      <FittedModel modelPath={lamp.modelPath} modelSize={lamp.modelSize} name="Bedside_Lamp" />
      <RoundedBox args={[.4,.035,.4]} radius={.015} position={[0,-.0175,0]} castShadow receiveShadow>
        <meshStandardMaterial color="#ad8b61" roughness={.8} />
      </RoundedBox>
      {[-.15,.15].flatMap(x=>[-.15,.15].map(z=><mesh key={`${x}-${z}`} position={[x,-.29,z]} castShadow>
        <boxGeometry args={[.035,.52,.035]} /><meshStandardMaterial color="#98764f" roughness={.8} />
      </mesh>))}
    </group>
  </group>;
}
useGLTF.preload(HOUSE_PROPS.bench.modelPath);
useGLTF.preload(HOUSE_PROPS.throw.modelPath);
useGLTF.preload(HOUSE_PROPS.dumbbells.modelPath);
useGLTF.preload(HOUSE_PROPS.backpack.modelPath);
useGLTF.preload(HOUSE_PROPS.lamp.modelPath);
