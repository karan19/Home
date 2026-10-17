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
test('desk typer is seated, grounded, and reaches the keyboard without sinking through it', async () => {
 const {scene}=await loadGeometry('public/models/desk-typer/typer.glb');scene.updateMatrixWorld(true);
 let triangles=0;const feet=[Infinity,Infinity], hands=[Infinity,Infinity];let seat=Infinity;
 scene.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.attributes.position;triangles+=(o.geometry.index?.count??a.count)/3;
 for(let i=0;i<a.count;i++) {
  const p=new THREE.Vector3().fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);
  assert(p.toArray().every(Number.isFinite));const side=p.x<0?0:1;
  if(p.y<.15)feet[side]=Math.min(feet[side],p.y);
  if(p.z>.48&&p.y>.65&&p.y<1)hands[side]=Math.min(hands[side],p.y);
  if(p.z>-.08&&p.z<.07&&p.y>.3)seat=Math.min(seat,p.y);
 }
 });
 assert(triangles<=60000);feet.forEach(y=>assert(Math.abs(y)<.002));
 assert(Math.abs(seat-.515)<.008);
 hands.forEach(y=>assert(y>=.786&&y<=.80));
 console.log({triangles,feet,seat,hands});
});
