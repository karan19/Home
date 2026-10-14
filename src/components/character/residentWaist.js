import { MathUtils, Vector3 } from 'three';

// Meshy assigned thigh influence as high as the abdomen. Keep the hem flexible,
// but transfer that influence to the pelvis before it reaches the waist.
// Call once in bind pose, before mounting/normalizing the character.
export function stabilizeResidentWaist(scene) {
  const geometries = [];
  const point = new Vector3();
  scene.updateMatrixWorld(true);
  scene.traverse(mesh => {
    if (!mesh.isSkinnedMesh) return;
    const bones = mesh.skeleton.bones;
    const hips = bones.findIndex(b => b.name === 'Hips');
    const thighs = new Set(bones.flatMap((b, i) => /^(Left|Right)UpLeg$/.test(b.name) ? [i] : []));
    if (hips < 0 || thighs.size !== 2) return;
    const hipY = bones[hips].getWorldPosition(new Vector3()).y;
    const spineY = bones.find(b => b.name === 'Spine02').getWorldPosition(new Vector3()).y;
    const span = spineY - hipY;
    mesh.geometry = mesh.geometry.clone();
    geometries.push(mesh.geometry);
    const { position, skinIndex, skinWeight } = mesh.geometry.attributes;
    for (let i = 0; i < position.count; i++) {
      mesh.getVertexPosition(i, point);
      mesh.localToWorld(point);
      const amount = MathUtils.smoothstep(point.y, hipY - span * .95, hipY);
      if (!amount) continue;
      const weights = new Map();
      for (let c = 0; c < 4; c++) {
        const index = skinIndex.getComponent(i, c), weight = skinWeight.getComponent(i, c);
        const transfer = thighs.has(index) ? weight * amount : 0;
        weights.set(index, (weights.get(index) ?? 0) + weight - transfer);
        weights.set(hips, (weights.get(hips) ?? 0) + transfer);
      }
      const entries = [...weights].sort((a, b) => b[1] - a[1]).slice(0, 4);
      const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
      for (let c = 0; c < 4; c++) {
        skinIndex.setComponent(i, c, entries[c]?.[0] ?? hips);
        skinWeight.setComponent(i, c, (entries[c]?.[1] ?? 0) / total);
      }
    }
    skinIndex.needsUpdate = skinWeight.needsUpdate = true;
  });
  return geometries;
}
