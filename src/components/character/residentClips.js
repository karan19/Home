import * as THREE from 'three';

// Both animation files come from the same Meshy rig. Remove travel from the
// pelvis consistently so crossfades cannot shift the resident off its route.
export function inPlaceClip(source, scene, name) {
  if (!source) throw new Error(`Missing resident ${name} animation`);
  const clip = source.clone();
  clip.name = name;
  for (const track of clip.tracks) {
    if (!track.name.endsWith('.position') || !/hips|root|pelvis/i.test(track.name)) continue;
    const nodeName = track.name.slice(0, -'.position'.length);
    const bone = scene.getObjectByName(nodeName);
    const x = bone?.position.x ?? track.values[0];
    const z = bone?.position.z ?? track.values[2];
    for (let i = 0; i < track.values.length; i += 3) {
      track.values[i] = x;
      track.values[i + 2] = z;
    }
  }
  return clip;
}

export function measureStride(scene, clip, scale) {
  const feet = ['LeftFoot', 'RightFoot'].map(name => scene.getObjectByName(name)).filter(Boolean);
  if (feet.length !== 2) return 1.15;
  const mixer = new THREE.AnimationMixer(scene);
  mixer.clipAction(clip).play();
  const ranges = feet.map(() => ({ min: Infinity, max: -Infinity }));
  const point = new THREE.Vector3();
  for (let i = 0; i <= 32; i++) {
    mixer.setTime(clip.duration * i / 32);
    scene.updateMatrixWorld(true);
    feet.forEach((foot, index) => {
      foot.getWorldPosition(point);
      ranges[index].min = Math.min(ranges[index].min, point.z);
      ranges[index].max = Math.max(ranges[index].max, point.z);
    });
  }
  mixer.stopAllAction();
  mixer.uncacheRoot(scene);
  // One gait cycle has two steps, each spanning roughly the foot's travel.
  return THREE.MathUtils.clamp(2 * Math.max(...ranges.map(r => r.max - r.min)) * scale, 0.6, 1.6);
}
