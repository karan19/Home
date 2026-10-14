import {createResidentFists} from '../src/components/character/residentFists.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { stabilizeResidentWaist } from '../src/components/character/residentWaist.js';

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


import {SEATED_VIEWS,seatedRigData,applySeatedPose} from '../src/components/character/seatedPoses.js';
import {measureBootContacts} from '../src/components/character/stairRig.js';
import {captureBonePose,restoreBonePose} from '../src/components/character/bookReachPose.js';
test('selected resident fits both seats with planted lower foot and finite skin',async()=>{
 const {scene}=await loadGeometry('public/models/lofi-resident-v4/resident.glb');scene.updateMatrixWorld(true);
 const box=new THREE.Box3().setFromObject(scene),center=box.getCenter(new THREE.Vector3()),scale=1.76/(box.max.y-box.min.y);
 stabilizeResidentWaist(scene);
 const stance=captureBonePose(scene),rig=seatedRigData(scene,scale),contacts=measureBootContacts(scene,scale);
 const root=new THREE.Group(),scaled=new THREE.Group();root.add(scaled);scaled.add(scene);scaled.scale.setScalar(scale);scene.position.set(-center.x,-box.min.y,-center.z);
 for(const [id,spot]of Object.entries(SEATED_VIEWS)){
  restoreBonePose(stance);root.position.set(...spot.position);root.rotation.y=spot.heading;root.updateMatrixWorld(true);
  applySeatedPose(scene,root,spot,rig,contacts);
  const bounds=new THREE.Box3().setFromObject(scene,true);
  assert(Number.isFinite(bounds.min.y));
  console.log(id,{floor:spot.position[1],lowestMeshPoint:bounds.min.y});
  assert(bounds.min.y>=spot.position[1]-.004,`${id}: feet penetrate floor`);
  for(const [i,side]of ['Left','Right'].entries()){
   if(id==='reading'){
    const knee=root.worldToLocal(scene.getObjectByName(side+'Leg').getWorldPosition(new THREE.Vector3()));
    const hip=root.worldToLocal(scene.getObjectByName(side+'UpLeg').getWorldPosition(new THREE.Vector3()));
    assert(knee.y>spot.seat+.06,`${id}: knee surface intersects seat cushion`);
    assert(hip.y>spot.seat+.045,`${id}: upper thigh buried in cushion`);
   }
   if(spot.crossed&&i===0)continue;
   const ankle=scene.getObjectByName(side+'Foot').getWorldPosition(new THREE.Vector3());
   const target=root.localToWorld(new THREE.Vector3(spot.feet[i][0],contacts[side].height+(spot.soleLift??0),spot.feet[i][1]+contacts[side].forward));
   assert(ankle.distanceTo(target)<.015,`${id} ${side}: unreachable planted foot`);
  }
 }
});


test('waist correction preserves bind geometry and removes thigh pull above the abdomen',async()=>{
 const {scene}=await loadGeometry('public/models/lofi-resident-v4/resident.glb');scene.updateMatrixWorld(true);
 const original=[];
 scene.traverse(mesh=>{if(mesh.isSkinnedMesh)original.push({mesh,points:Array.from({length:mesh.geometry.attributes.position.count},(_,i)=>mesh.localToWorld(mesh.getVertexPosition(i,new THREE.Vector3()))),geometry:mesh.geometry,indices:mesh.geometry.attributes.skinIndex.array.slice(),weights:mesh.geometry.attributes.skinWeight.array.slice()});});
 stabilizeResidentWaist(scene);
 let affected=0;
 const point=new THREE.Vector3(),before=new THREE.Vector3();
 for(const {mesh,points,geometry,indices,weights}of original){
  assert.notEqual(mesh.geometry,geometry,'cached geometry must not be mutated');
  assert.deepEqual(geometry.attributes.skinIndex.array,indices);
  assert.deepEqual(geometry.attributes.skinWeight.array,weights);
  const a=mesh.geometry.attributes,hip=mesh.skeleton.bones.find(b=>b.name==='Hips').getWorldPosition(new THREE.Vector3()).y;
  const spine=mesh.skeleton.bones.find(b=>b.name==='Spine02').getWorldPosition(new THREE.Vector3()).y;
  for(let i=0;i<a.position.count;i++){
   mesh.getVertexPosition(i,point);mesh.localToWorld(point);
   before.copy(points[i]);
   assert(point.distanceTo(before)<1e-5,'neutral silhouette changed');
   let sum=0;
   for(let c=0;c<4;c++){
    const w=a.skinWeight.getComponent(i,c);assert(Number.isFinite(w)&&w>=0);sum+=w;
    if(before.y>=hip+(spine-hip)*.65&&/^(Left|Right)UpLeg$/.test(mesh.skeleton.bones[a.skinIndex.getComponent(i,c)].name))assert(w<1e-6,'abdomen still follows thigh');
    if(Math.abs(w-weights[i*4+c])>1e-5)affected++;
   }
   assert(Math.abs(sum-1)<1e-5,'weights must sum to one');
  }
 }
 assert(affected>0,'correction did not affect the actual asset');
});

test('fist corrective is finite, localized and reverses to the open hand',async()=>{
 const {scene}=await loadGeometry('public/models/lofi-resident-v4/resident.glb');scene.updateMatrixWorld(true);
 stabilizeResidentWaist(scene);
 const meshes=[];scene.traverse(mesh=>{if(mesh.isSkinnedMesh)meshes.push({mesh,original:Array.from({length:mesh.geometry.attributes.position.count},(_,i)=>mesh.getVertexPosition(i,new THREE.Vector3()).clone())});});
 const setFists=createResidentFists(scene);setFists(1);
 let changed=0;
 for(const {mesh,original}of meshes)for(let i=0;i<original.length;i++){
  const point=mesh.getVertexPosition(i,new THREE.Vector3());assert(point.toArray().every(Number.isFinite));
  const distance=point.distanceTo(original[i])*.01;
  assert(distance<.20,'hand corrective deformed unrelated anatomy');if(distance>.001)changed++;
 }
 assert(changed>100,'fingers did not close');setFists(0);
 for(const {mesh,original}of meshes)for(let i=0;i<original.length;i++)assert(mesh.getVertexPosition(i,new THREE.Vector3()).distanceTo(original[i])<1e-5,'open hand was not restored');
});
