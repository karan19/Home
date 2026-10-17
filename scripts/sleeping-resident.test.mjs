import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { MeshStandardMaterial } from 'three';
import { addResidentFormation, residentFormationDepth } from '../src/components/character/residentFormation.js';
import { SPAWN_LOCATIONS } from '../src/components/character/residentSpawning.js';
test('sleeping GLB fits inside the bed footprint and uses a web-sized mesh',()=>{
 const b=fs.readFileSync('public/models/sleeping-resident/sleeping.glb'),jl=b.readUInt32LE(12),doc=JSON.parse(b.subarray(20,20+jl)),bin=b.subarray(28+jl);
 let triangles=0;const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
 for(const mesh of doc.meshes)for(const p of mesh.primitives){triangles+=doc.accessors[p.indices].count/3;const a=doc.accessors[p.attributes.POSITION],v=doc.bufferViews[a.bufferView];for(let i=0;i<a.count;i++)for(let j=0;j<3;j++){
 const value=bin.readFloatLE((v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12)+j*4);assert(Number.isFinite(value));lo[j]=Math.min(lo[j],value);hi[j]=Math.max(hi[j],value);
 }}
 assert(lo[0]>-.9&&hi[0]<.9);assert(lo[2]>-1.05&&hi[2]<1.05);assert(lo[1]>.69&&hi[1]<1.35);assert(triangles<60000);assert.equal(doc.animations?.length??0,0);assert(SPAWN_LOCATIONS.includes('coffee'));
 console.log({lo,hi,triangles});
});
test('sleeping formation and its shadows use the same longitudinal field',()=>{
 const amount={value:.5},field='(0.97 - vResidentPosition.z) / 1.78';
 const materials=[addResidentFormation(new MeshStandardMaterial(),amount,{field}),residentFormationDepth(amount,{field})];
 for(const m of materials){const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <clipping_planes_fragment>\n#include <emissivemap_fragment>'};m.onBeforeCompile(shader);assert(shader.fragmentShader.includes(`clamp(${field},0.0,1.0)`));assert.equal(shader.uniforms.uResidentAmount,amount);m.dispose();}
 assert.notEqual(materials[0].customProgramCacheKey(),addResidentFormation(new MeshStandardMaterial(),amount).customProgramCacheKey());
});
