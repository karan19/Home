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

test('replacement keeps a full skinned head in both standing and seated poses', async () => {
  const { scene } = await loadGeometry('public/models/lofi-resident-v3/resident.glb');
  scene.updateMatrixWorld(true);
  const head = scene.getObjectByName('Head');
  assert(head?.isBone, 'Character needs an intact head bone');
  const headVertices = [];
  scene.traverse(mesh => {
    if (!mesh.isSkinnedMesh) return;
    const { position, skinIndex, skinWeight } = mesh.geometry.attributes;
    const headIndex = mesh.skeleton.bones.indexOf(head);
    for (let i = 0; i < position.count; i++) {
      let weight = 0;
      for (let j = 0; j < 4; j++) if (skinIndex.getComponent(i, j) === headIndex) weight += skinWeight.getComponent(i, j);
      if (weight > .8) headVertices.push([mesh, i]);
    }
  });
  assert(headVertices.length > 200, 'Head must contain real geometry, not just a bone');
  for (const name of ['idle', 'seated']) {
    const { animations } = await loadGeometry(`public/models/lofi-resident-v3/${name}.glb`);
    const clip = inPlaceClip(animations[0], scene, name);
    for (const track of clip.tracks) assert(scene.getObjectByName(track.name.split('.')[0]), `Unmatched track ${track.name}`);
    const mixer = new THREE.AnimationMixer(scene);
    mixer.clipAction(clip).play(); mixer.setTime(.25); scene.updateMatrixWorld(true);
    const headBounds = new THREE.Box3();
    for (const [mesh, index] of headVertices) {
      const point = mesh.getVertexPosition(index, new THREE.Vector3()).applyMatrix4(mesh.matrixWorld);
      assert(point.toArray().every(Number.isFinite)); headBounds.expandByPoint(point);
    }
    const size = headBounds.getSize(new THREE.Vector3());
    assert(size.y > .15 && size.y < .4, `Invalid ${name} head height: ${size.y}`);
    assert(size.x > .1 && size.x < .3, `Invalid ${name} head width: ${size.x}`);
    console.log(name, { headVertices: headVertices.length, headSize: size.toArray() });
    mixer.stopAllAction(); mixer.uncacheRoot(scene);
  }
});
