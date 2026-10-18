import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { HOUSE_PROPS } from '../../../config/houseProps';

export default function CoffeeMachine({ position = [0, 0, 0] }) {
  return <group position={position} name="Furniture_CoffeeMachine">
    <FittedModel {...HOUSE_PROPS.espresso} name="Espresso_Machine" />
  </group>;
}
useGLTF.preload(HOUSE_PROPS.espresso.modelPath);
