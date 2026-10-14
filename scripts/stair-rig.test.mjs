import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {inPlaceClip} from '../src/components/character/residentClips.js';
import {stabilizeBootWeights,measureBootContacts} from '../src/components/character/stairRig.js';
import {solveLimb} from '../src/components/character/residentIK.js';
import {sampleStairMotion,STAIR_DURATION} from '../src/components/character/stairMotion.js';
async function load(path){
 const b=fs.readFileSync(path),n=b.readUInt32LE(12),json=JSON.parse(b.subarray(20,20+n));
 delete json.images;delete json.textures;delete json.materials;
 for(const mesh of json.meshes??[])for(const p of mesh.primitives)delete p.material;
 const raw=Buffer.from(JSON.stringify(json));const padded=Buffer.concat([raw,Buffer.alloc((4-raw.length%4)%4,32)]);
 const result=Buffer.concat([b.subarray(0,20),padded,b.subarray(20+n)]);result.writeUInt32LE(result.length,8);result.writeUInt32LE(padded.length,12);
 return new GLTFLoader().parseAsync(result.buffer.slice(result.byteOffset,result.byteOffset+result.length),'');
}
test('actual resident rig reaches every stair contact without stretching',async()=>{
 const {scene}=await load('public/models/lofi-resident-v2/walking.glb');
 const idle=await load('public/models/lofi-resident-v2/idle.glb');
 scene.updateMatrixWorld(true);const box=new T.Box3().setFromObject(scene),center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3()),scale=1.7/size.y;
 stabilizeBootWeights(scene,scale,box.min.y);
 const contacts=measureBootContacts(scene,scale);
 const hips=scene.getObjectByName('Hips'),foot=scene.getObjectByName('LeftFoot');
 const hipHeight=(hips.getWorldPosition(new T.Vector3()).y-box.min.y)*scale;
 const footHeight=(foot.getWorldPosition(new T.Vector3()).y-box.min.y)*scale;
 const forward=(foot.getWorldPosition(new T.Vector3()).z-center.z)*scale;
 const orientations=Object.fromEntries(['Left','Right'].map(s=>[s,scene.getObjectByName(s+'Foot').getWorldQuaternion(new T.Quaternion())]));
 const clip=inPlaceClip(idle.animations[0],scene,'idle');
 const root=new T.Group(),sized=new T.Group();sized.scale.setScalar(scale);root.add(sized);sized.add(scene);scene.position.set(-center.x,-box.min.y,-center.z);
 const mixer=new T.AnimationMixer(scene);mixer.clipAction(clip).play();
 let worst=0;
 const soleVertices=[],bodyVertices=[];
 scene.traverse(mesh=>{if(!mesh.isSkinnedMesh)return;
  const pos=mesh.geometry.attributes.position,indices=mesh.geometry.attributes.skinIndex,weights=mesh.geometry.attributes.skinWeight;
  for(let i=0;i<pos.count;i++){
   bodyVertices.push([mesh,i]);
   let footWeight=0;for(let j=0;j<4;j++)if(/Foot|Toe/.test(mesh.skeleton.bones[indices.getComponent(i,j)].name))footWeight+=weights.getComponent(i,j);
   if(footWeight>.8)soleVertices.push([mesh,i]);
  }
 });
 let penetration=0, penetrationInfo;
 for(const descending of [false,true])for(let t=0;t<=STAIR_DURATION;t+=.06){
  const m=sampleStairMotion(t,descending);mixer.setTime(.25);root.position.set(...m.center);root.rotation.y=m.heading;root.updateMatrixWorld(true);
  root.position.y+=m.center[1]+hipHeight-m.crouch-hips.getWorldPosition(new T.Vector3()).y;root.updateMatrixWorld(true);
  for(const side of ['Left','Right']){
   const target=new T.Vector3(...m.targets[side]);target.y+=contacts[side].height;target.z+=Math.cos(m.heading)*contacts[side].forward;
   const pole=root.localToWorld(new T.Vector3(side==='Left'?.12:-.12,.45,.8));
   const f=scene.getObjectByName(side+'Foot');solveLimb(scene.getObjectByName(side+'UpLeg'),scene.getObjectByName(side+'Leg'),f,target,pole);
   f.quaternion.copy(f.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),m.heading)).multiply(orientations[side]));
   f.updateWorldMatrix(false,true);
   const error=f.getWorldPosition(new T.Vector3()).distanceTo(target);worst=Math.max(worst,error);
  }
  {

   for(const [mesh,i] of bodyVertices){
    const v=mesh.getVertexPosition(i,new T.Vector3()).applyMatrix4(mesh.matrixWorld);
    let floor=v.z<=.2?3:v.z>3.5?.1:Math.max(.1,Math.min(11,Math.floor((3.5-v.z)/.28))*.25+.05);
    if(floor-v.y>penetration){penetration=floor-v.y;penetrationInfo={t,descending,v:v.toArray(),floor,targets:m.targets,weights:[0,1,2,3].map(j=>[mesh.skeleton.bones[mesh.geometry.attributes.skinIndex.getComponent(i,j)].name,mesh.geometry.attributes.skinWeight.getComponent(i,j)]),leftKnee:scene.getObjectByName("LeftLeg").getWorldPosition(new T.Vector3()).toArray(),rightKnee:scene.getObjectByName("RightLeg").getWorldPosition(new T.Vector3()).toArray()};}
   }
  }
 }
 console.log({maxContactError:worst,maxMeshPenetration:penetration});
 assert(penetration<.004,`Mesh penetrates staircase by ${penetration} metres`);
 assert(worst<.002,`Foot misses its target by ${worst} metres`);
});
