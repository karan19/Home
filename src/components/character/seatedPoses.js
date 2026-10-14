import { Vector3, Quaternion, Matrix4 } from 'three';
import { solveLimb } from './residentIK.js';

export const SEATED_VIEWS={
 desk:{label:'Desk chair',position:[-2.30,3,-2.10],heading:-Math.PI/2,camera:[.4,4.8,.6],seat:.515,hipForward:0,pelvisTilt:.03,lean:.06,feet:[[.13,.36],[-.13,.40]],worldHands:[[-2.77,3.805,-2.035],[-2.77,3.805,-2.165]],elbowHeight:.71},
 reading:{label:'Upstairs reading seat',position:[.01,3,1],heading:Math.PI/2,camera:[2.3,4.6,3.6],seat:.435,hipHeight:.145,soleLift:.009,hipForward:0,pelvisTilt:-.13,lean:-.32,feet:[[.14,.43],[-.14,.45]],hands:[[.15,.70,.28],[-.15,.70,.28]],elbowHeight:.55,book:[0,.64,.34]},
};
export function seatedRigData(scene,scale){
 const rotations={};
 for(const side of ['Left','Right'])rotations[side]=scene.getObjectByName(side+'Foot').getWorldQuaternion(new Quaternion());
 return {rotations,scale};
}
function rotateWorld(bone,axis,angle){
 const world=bone.getWorldQuaternion(new Quaternion());
 bone.quaternion.copy(bone.parent.getWorldQuaternion(new Quaternion()).invert().multiply(new Quaternion().setFromAxisAngle(axis,angle)).multiply(world));
 bone.updateWorldMatrix(false,true);
}
export function applySeatedPose(scene,root,spot,rig,contacts){
 const hips=scene.getObjectByName('Hips');
 const target=root.localToWorld(new Vector3(0,spot.seat+(spot.hipHeight??.12),spot.hipForward));
 hips.position.copy(hips.parent.worldToLocal(target));hips.updateWorldMatrix(false,true);
 const axis=new Vector3(1,0,0).applyQuaternion(root.quaternion);
 // Share the seated bend between the pelvis and lumbar spine.
 rotateWorld(hips,axis,spot.pelvisTilt);
 for(const [name,weight] of [['Spine02',.65],['Spine01',.35]])rotateWorld(scene.getObjectByName(name),axis,(spot.lean-spot.pelvisTilt)*weight);
 // Round the upper back independently instead of arching the chest with the recline.
 if(spot.tv){rotateWorld(scene.getObjectByName('Spine01'),axis,.12);rotateWorld(scene.getObjectByName('Spine'),axis,.18);}
 if(spot.book||spot.tv)rotateWorld(scene.getObjectByName('Head'),axis,spot.book?.38:.36);
 for(const [i,side]of ['Left','Right'].entries()){
  const sign=i===0?1:-1,foot=scene.getObjectByName(side+'Foot');
  const crossed=spot.crossed&&i===0;
  const footTarget=root.localToWorld(new Vector3(spot.feet[i][0],crossed?spot.seat+.22:contacts[side].height+(spot.soleLift??0),spot.feet[i][1]+(crossed?0:contacts[side].forward)));
  const pole=root.localToWorld(new Vector3(crossed?.44:sign*.16,spot.seat+.03,crossed?.38:.85));
  solveLimb(scene.getObjectByName(side+'UpLeg'),scene.getObjectByName(side+'Leg'),foot,footTarget,pole);
  const orientation=root.quaternion.clone();
  if(crossed){
   // Continue the lower-leg line through the ankle, instead of twisting the
   // shoe by a fixed ninety degrees independently of the shin.
   const knee=scene.getObjectByName(side+'Leg').getWorldPosition(new Vector3());
   const forward=footTarget.clone().sub(knee).normalize();
   const across=new Vector3(0,1,0).cross(forward).normalize();
   const up=forward.clone().cross(across).normalize();
   orientation.setFromRotationMatrix(new Matrix4().makeBasis(across,up,forward));
  }
  foot.quaternion.copy(foot.parent.getWorldQuaternion(new Quaternion()).invert().multiply(orientation).multiply(rig.rotations[side]));foot.updateWorldMatrix(false,true);
  const handTarget=spot.worldHands?new Vector3(...spot.worldHands[i]):root.localToWorld(new Vector3(...spot.hands[i]));
  const elbow=root.localToWorld(new Vector3(sign*(spot.sofaHands?.39:spot.foldedHands?.30:.37),spot.elbowHeight,spot.sofaHands?-.12:spot.foldedHands?-.10:.09));
  solveLimb(scene.getObjectByName(side+'Arm'),scene.getObjectByName(side+'ForeArm'),scene.getObjectByName(side+'Hand'),handTarget,elbow);
  // Rest the fingers forward over the keyboard or the book's outer edges.
  if(spot.worldHands||spot.hands){
   const hand=scene.getObjectByName(side+'Hand');
   // Constrain both finger direction AND palm roll: aiming one axis alone
   // leaves the hand edge-on, which reads as a fist over the keyboard.
   const fingers=spot.foldedHands?new Vector3(-sign,-.18,-.12).normalize():new Vector3(spot.sofaHands?sign*.20:0,spot.worldHands?-.05:spot.sofaHands?-.08:-.25,1).normalize();
   const across=fingers.clone().cross(new Vector3(0,1,0)).normalize();
   const back=across.clone().cross(fingers).normalize();
   const orientation=root.quaternion.clone().multiply(new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(across,fingers,back)));
   hand.quaternion.copy(hand.parent.getWorldQuaternion(new Quaternion()).invert().multiply(orientation));hand.updateWorldMatrix(false,true);
  }
 }
 root.updateMatrixWorld(true);
}
