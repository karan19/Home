import { Vector3, Quaternion } from 'three';
import { solveLimb } from './residentIK.js';

export const BOOK_WRIST_TARGET=[3.06,1.49,-3.27];
export const BOOK_ELBOW_POLE=[2.82,1.16,-3.03];
// The left hand approaches the book spine; the other arm and both legs keep
// the standing source pose. This first stage reaches, but does not claim a grip.
export function applyBookReach(scene,amount){
 if(amount<=0)return;
 const upper=scene.getObjectByName('LeftArm'),lower=scene.getObjectByName('LeftForeArm'),hand=scene.getObjectByName('LeftHand');
 solveLimb(upper,lower,hand,new Vector3(...BOOK_WRIST_TARGET),new Vector3(...BOOK_ELBOW_POLE),amount);
 const original=hand.quaternion.clone(),world=hand.getWorldQuaternion(new Quaternion());
 const turn=new Quaternion().setFromUnitVectors(new Vector3(0,1,0).applyQuaternion(world).normalize(),new Vector3(0,.18,-1).normalize());
 const desired=hand.parent.getWorldQuaternion(new Quaternion()).invert().multiply(turn).multiply(world);
 hand.quaternion.slerpQuaternions(original,desired,amount);hand.updateWorldMatrix(false,true);
}

// AnimationMixer can skip unchanged tracks when sampling the same timestamp.
// Restore the sampled bone transforms explicitly before applying each reach,
// including the return to zero, so IK changes cannot accumulate across frames.
export function captureBonePose(scene){
 const pose=[];
 scene.traverse(bone=>{if(bone.isBone)pose.push({bone,position:bone.position.clone(),quaternion:bone.quaternion.clone(),scale:bone.scale.clone()});});
 return pose;
}
export function restoreBonePose(pose){
 for(const {bone,position,quaternion,scale} of pose){bone.position.copy(position);bone.quaternion.copy(quaternion);bone.scale.copy(scale);}
}

export function applyRelaxedArms(scene,root){
 for(const [side,sign] of [['Left',1],['Right',-1]]){
  const target=root.localToWorld(new Vector3(sign*.23,.84,.04));
  const pole=root.localToWorld(new Vector3(sign*.30,1.15,.10));
  solveLimb(scene.getObjectByName(side+'Arm'),scene.getObjectByName(side+'ForeArm'),scene.getObjectByName(side+'Hand'),target,pole);
 }
}
