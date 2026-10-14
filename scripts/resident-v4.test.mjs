import {stabilizeResidentWaist} from '../src/components/character/residentWaist.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { inPlaceClip } from '../src/components/character/residentClips.js';

// The node loader does not need images to verify real mesh deformation.
async function loadGeometry(path) {
  const source = fs.readFileSync(path), length = source.readUInt32LE(12);
  const document = JSON.parse(source.subarray(20, 20 + length));
  delete document.images; delete document.textures; delete document.materials;
  for (const mesh of document.meshes ?? []) for (const primitive of mesh.primitives) delete primitive.material;
  const json = Buffer.from(JSON.stringify(document));
  const padded = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 32)]);
  const result = Buffer.concat([source.subarray(0, 20), padded, source.subarray(20 + length)]);
  result.writeUInt32LE(result.length, 8); result.writeUInt32LE(padded.length, 12);
  return new GLTFLoader().parseAsync(result.buffer.slice(result.byteOffset, result.byteOffset + result.length), '');
}


import {applyBookReach,BOOK_WRIST_TARGET,captureBonePose,restoreBonePose,applyRelaxedArms} from '../src/components/character/bookReachPose.js';
test('option 1 reaches and returns to neutral without moving its feet',async()=>{
 const {scene}=await loadGeometry('public/models/lofi-resident-v4/resident.glb');
 scene.updateMatrixWorld(true);
 stabilizeResidentWaist(scene);
 const box=new THREE.Box3().setFromObject(scene),center=box.getCenter(new THREE.Vector3());
 const root=new THREE.Group(),scaled=new THREE.Group();root.add(scaled);scaled.add(scene);
 scaled.scale.setScalar(1.76/(box.max.y-box.min.y));scene.position.set(-center.x,-box.min.y,-center.z);
 root.position.set(3.20,.1,-2.91);root.rotation.y=Math.PI;
 root.updateMatrixWorld(true);
 root.position.y+=.1-new THREE.Box3().setFromObject(scene,true).min.y;root.updateMatrixWorld(true);
 const bindPose=captureBonePose(scene);applyRelaxedArms(scene,root);
 const feet=['LeftFoot','RightFoot'].map(n=>scene.getObjectByName(n));
 const planted=feet.map(b=>b.getWorldPosition(new THREE.Vector3()));
 const head=scene.getObjectByName('Head');assert(head?.isBone);
 const stance=bindPose;
 const handStart=scene.getObjectByName('LeftHand').getWorldPosition(new THREE.Vector3());
 for(let i=0;i<=20;i++){
  restoreBonePose(stance);root.updateMatrixWorld(true);applyRelaxedArms(scene,root);applyBookReach(scene,i/20);
  feet.forEach((b,j)=>assert(b.getWorldPosition(new THREE.Vector3()).distanceTo(planted[j])<1e-6));
  scene.traverse(mesh=>{if(!mesh.isSkinnedMesh)return;for(let k=0;k<mesh.geometry.attributes.position.count;k+=29){const v=mesh.getVertexPosition(k,new THREE.Vector3()).applyMatrix4(mesh.matrixWorld);assert(v.toArray().every(Number.isFinite));}});
 }
 const error=scene.getObjectByName('LeftHand').getWorldPosition(new THREE.Vector3()).distanceTo(new THREE.Vector3(...BOOK_WRIST_TARGET));
 console.log({wristTargetError:error});assert(error<.003);
 for(let i=20;i>=0;i--){restoreBonePose(stance);root.updateMatrixWorld(true);applyRelaxedArms(scene,root);applyBookReach(scene,i/20);}
 assert(scene.getObjectByName('LeftHand').getWorldPosition(new THREE.Vector3()).distanceTo(handStart)<1e-6,'Arm must return to the exact neutral pose');
});
