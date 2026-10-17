import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { STAIRCASE, STAIR_TREADS } from '../src/config/staircase.js';
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
test('exported stair reader fits treads and both feet contact the lower step', async () => {
 const {scene}=await loadGeometry('public/models/stair-reader/reader.glb');
 scene.position.set(STAIRCASE.x,STAIR_TREADS[2].y,STAIR_TREADS[4].z+.28);scene.updateMatrixWorld(true);
 let triangles=0,penetration=0;const feet=[Infinity,Infinity];let seat=Infinity;
 scene.traverse(o=>{if(!o.isMesh)return;
 const a=o.geometry.attributes.position;triangles+=(o.geometry.index?.count ?? a.count)/3;
 for(let i=0;i<a.count;i++) {
  const p=new THREE.Vector3().fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);
  assert(p.toArray().every(Number.isFinite));
  assert(Math.abs(p.x-STAIRCASE.x)<STAIRCASE.width/2);
  for(const tread of STAIR_TREADS) if(Math.abs(p.z-tread.z)<STAIRCASE.depth/2) penetration=Math.max(penetration,tread.y-p.y);
  if(p.y<.75) feet[p.x<STAIRCASE.x?0:1]=Math.min(feet[p.x<STAIRCASE.x?0:1],p.y);
  if(Math.abs(p.z-STAIR_TREADS[4].z)<.13 && p.y<1.25)seat=Math.min(seat,p.y);
 }
 });
 console.log({triangles,penetration,feet,seat});
 assert(triangles<=60000);assert(penetration<.008);
 feet.forEach(y=>assert(Math.abs(y-STAIR_TREADS[2].y)<.012));
 assert(Math.abs(seat-STAIR_TREADS[4].y)<.012);
});
