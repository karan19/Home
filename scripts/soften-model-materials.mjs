// Calm imported surface detail while preserving color maps, transparency, and geometry.
// Usage: node scripts/soften-model-materials.mjs input.glb output.glb
import fs from 'node:fs';
import assert from 'node:assert/strict';
const [input, output] = process.argv.slice(2);
assert(input && output && !fs.existsSync(output));
const bytes = fs.readFileSync(input);
assert.equal(bytes.readUInt32LE(0), 0x46546c67);
const length = bytes.readUInt32LE(12);
const doc = JSON.parse(bytes.subarray(20,20+length));
for (const material of doc.materials || []) {
  if (material.normalTexture) material.normalTexture.scale = 0.15;
  if (material.occlusionTexture) material.occlusionTexture.strength = 0.3;
  // Retain glass, badges, lights, and authored paint/metal colors.
  if (material.alphaMode === 'BLEND' || material.alphaMode === 'MASK') continue;
  const pbr = material.pbrMetallicRoughness;
  if (pbr) pbr.roughnessFactor = Math.max(pbr.roughnessFactor ?? 1, 0.55);
}
for (const sampler of doc.samplers || []) {
  sampler.magFilter = 9729;
  sampler.minFilter = 9987;
}
const json = Buffer.from(JSON.stringify(doc));
const padded = Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
const header = Buffer.from(bytes.subarray(0,20));
const tail = bytes.subarray(20+length);
header.writeUInt32LE(20+padded.length+tail.length,8);
header.writeUInt32LE(padded.length,12);
fs.writeFileSync(output,Buffer.concat([header,padded,tail]),{flag:'wx'});
console.log(`${output}: material cleanup; binary geometry/textures unchanged`);
