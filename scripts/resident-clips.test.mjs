import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { inPlaceClip } from '../src/components/character/residentClips.js';

test('idle and walking align pelvis travel without altering cached clips', () => {
 const scene=new THREE.Group(); const hips=new THREE.Bone(); hips.name='Hips';hips.position.set(1,2,3);scene.add(hips);
 const source=new THREE.AnimationClip('walk',1,[new THREE.VectorKeyframeTrack('Hips.position',[0,1],[2,10,5,4,12,8])]);
 const result=inPlaceClip(source,scene,'resident-walk');
 assert.deepEqual([...result.tracks[0].values],[1,10,3,1,12,3]);
 assert.deepEqual([...source.tracks[0].values],[2,10,5,4,12,8]);
 const mixer=new THREE.AnimationMixer(scene);
 for(let i=0;i<2;i++) {
  mixer.clipAction(result).reset().play();mixer.update(.1);
  assert(Number.isFinite(hips.position.y));
  mixer.stopAllAction();mixer.uncacheRoot(scene);
 }
});
