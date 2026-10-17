import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
test('dips resident stays above the base and both hands meet the grip cylinders', async () => {
 const {scene}=await loadGeometry('public/models/dips-resident/dips.glb');scene.updateMatrixWorld(true);
 let triangles=0,low=Infinity,high=-Infinity;const gaps=[Infinity,Infinity],counts=[0,0];
 scene.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.attributes.position;triangles+=(o.geometry.index?.count??a.count)/3;
 for(let i=0;i<a.count;i++) {
  const p=new THREE.Vector3().fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);
  assert(p.toArray().every(Number.isFinite));low=Math.min(low,p.y);high=Math.max(high,p.y);
  const side=p.x<0?0:1,cx=side===0?-.318:.318;
  if(Math.abs(p.x)>.24&&p.y>.94&&p.y<1.10&&p.z>.04&&p.z<.24){
   counts[side]++;gaps[side]=Math.min(gaps[side],Math.abs(Math.hypot(p.x-cx,p.y-1.021)-.024));
  }
 }
 });
 assert(triangles<=60000);assert(low>.30);assert(high<1.8);
 counts.forEach(n=>assert(n>100));gaps.forEach(g=>assert(g<.006));
 console.log({triangles,low,high,gripSurfaceGaps:gaps});
});

test('exported dip animation keeps grips fixed through a seamless full extension cycle', async () => {
 const {scene,animations}=await loadGeometry('public/models/dips-resident/dips.glb');
 assert(animations.length>0);const clip=animations.find(c=>c.name==='Controlled_Dips')??animations[0];
 assert(Math.abs(clip.duration-3.2)<.01);
 const mixer=new THREE.AnimationMixer(scene);mixer.clipAction(clip).play();
 scene.updateMatrixWorld(true);
 const anchors=[];scene.traverse(o=>{if(!o.isSkinnedMesh)return;
 const p=o.geometry.attributes.position;
 for(let i=0;i<p.count;i++){const v=new THREE.Vector3().fromBufferAttribute(p,i);
  if(Math.abs(v.x)>.25&&v.y>.97&&v.y<1.07&&v.z>.04&&v.z<.24)anchors.push({o,i,rest:v});
 }
 });assert(anchors.length>100);
 let maxDrift=0,lowest=Infinity;const head=scene.getObjectByName('head');assert(head);
 const start=new THREE.Vector3(),bottom=new THREE.Vector3();
 for(let step=0;step<=32;step++){
  mixer.setTime(step*clip.duration/32);scene.updateMatrixWorld(true);
  scene.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
  if(step===0){
   head.getWorldPosition(start);
   for(const side of ['L','R']){
    const shoulder=scene.getObjectByName('upper_arm'+side)?.getWorldPosition(new THREE.Vector3()) ?? scene.getObjectByName('upper_arm.'+side).getWorldPosition(new THREE.Vector3());
    const elbow=scene.getObjectByName('forearm'+side)?.getWorldPosition(new THREE.Vector3()) ?? scene.getObjectByName('forearm.'+side).getWorldPosition(new THREE.Vector3());
    const wrist=scene.getObjectByName('hand'+side)?.getWorldPosition(new THREE.Vector3()) ?? scene.getObjectByName('hand.'+side).getWorldPosition(new THREE.Vector3());
    const angle=shoulder.sub(elbow).angleTo(wrist.sub(elbow))*180/Math.PI;
    assert(angle>169&&angle<176,`Top elbow angle ${angle}`);
   }
  }if(step===16)head.getWorldPosition(bottom);
  for(const {o,i,rest} of anchors){const p=o.getVertexPosition(i,new THREE.Vector3());maxDrift=Math.max(maxDrift,p.distanceTo(rest));}
  scene.traverse(o=>{if(!o.isSkinnedMesh)return;for(let i=0;i<o.geometry.attributes.position.count;i+=5)lowest=Math.min(lowest,o.getVertexPosition(i,new THREE.Vector3()).y);});
 }
 assert(maxDrift<.001,`Grip drift ${maxDrift}`);assert(lowest>.22);
 assert(Math.abs(start.y-bottom.y-.15871946)<.002);
 assert(head.getWorldPosition(new THREE.Vector3()).distanceTo(start)<.001);
 console.log({duration:clip.duration,maxGripDrift:maxDrift,lowestPoint:lowest});
});
