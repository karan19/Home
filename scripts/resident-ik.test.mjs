import test from 'node:test';
import assert from 'node:assert/strict';
import {Bone,Group,Vector3} from 'three';
import {solveLimb} from '../src/components/character/residentIK.js';
test('two-bone reach fits a target under a rotated and scaled parent',()=>{
 const root=new Group();root.rotation.y=1.2;root.scale.setScalar(.01);
 const upper=new Bone(),lower=new Bone(),hand=new Bone();root.add(upper);upper.add(lower);lower.add(hand);
 lower.position.y=25;hand.position.y=24;root.updateMatrixWorld(true);
 const target=new Vector3(.2,.2,.15),pole=new Vector3(-.3,0,.4);
 solveLimb(upper,lower,hand,target,pole);root.updateMatrixWorld(true);
 assert(hand.getWorldPosition(new Vector3()).distanceTo(target)<.001);
});
