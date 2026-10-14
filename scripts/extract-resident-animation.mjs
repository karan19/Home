// Keep matching rig nodes and animation tracks, without downloading duplicate
// character geometry/textures at runtime. Run gltf-transform prune afterwards.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const [input, output] = process.argv.slice(2);
assert(input && output, 'Pass input.glb and output.glb');
assert(input !== output, 'Preserve the complete source asset');
const source = fs.readFileSync(input);
assert.equal(source.readUInt32LE(0), 0x46546c67);
const length = source.readUInt32LE(12);
const document = JSON.parse(source.subarray(20, 20 + length));
assert(document.animations?.length, 'Source must contain an animation');
for (const node of document.nodes ?? []) {
  delete node.mesh;
  delete node.skin;
}
for (const property of ['meshes', 'skins', 'materials', 'textures', 'images', 'samplers']) {
  delete document[property];
}
const json = Buffer.from(JSON.stringify(document));
const padded = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 32)]);
const result = Buffer.concat([source.subarray(0, 20), padded, source.subarray(20 + length)]);
result.writeUInt32LE(result.length, 8);
result.writeUInt32LE(padded.length, 12);
fs.writeFileSync(output, result, { flag: 'wx' });
