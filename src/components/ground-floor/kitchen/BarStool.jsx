import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { HOUSE_PROPS } from '../../../config/houseProps';

export default function BarStool({ position }) {
  return <group position={position} name="Kitchen_Stool">
    <FittedModel {...HOUSE_PROPS.stool} name="Oak_Island_Stool" />
  </group>;
}
useGLTF.preload(HOUSE_PROPS.stool.modelPath);
