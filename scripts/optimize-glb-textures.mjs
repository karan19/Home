// macOS: node scripts/optimize-glb-textures.mjs source.glb output.glb [map-size] [color-size] [linear|mipmapped]
// Resize embedded images only; mesh buffers, UVs, materials and node transforms are preserved.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [input, output, limit = '1024', colorLimit = limit, colorFilter = 'mipmapped'] = process.argv.slice(2);
const maxSize = Number(limit);
const maxColorSize = Number(colorLimit);
if (!input || !output || !Number.isInteger(maxSize) || maxSize < 16 || maxSize > 4096 || !Number.isInteger(maxColorSize) || maxColorSize < 16 || maxColorSize > 4096) {
  throw new Error('Usage: node scripts/optimize-glb-textures.mjs source.glb output.glb [16–4096] [base-color-size]');
}
if (fs.existsSync(output)) throw new Error(`Output already exists: ${output}`);

const source = fs.readFileSync(input);
assert.equal(source.readUInt32LE(0), 0x46546c67, 'Expected a GLB file');
assert.equal(source.readUInt32LE(4), 2, 'Expected GLB version 2');
const jsonLength = source.readUInt32LE(12);
const document = JSON.parse(source.toString('utf8', 20, 20 + jsonLength));
assert.equal(document.buffers.length, 1, 'Expected one embedded buffer');
assert.equal(document.buffers[0].uri, undefined, 'External buffers are unsupported');
const binaryStart = 20 + jsonLength + 8;
assert.equal(source.readUInt32LE(binaryStart - 4), 0x004e4942, 'Expected a BIN chunk');

const opaqueBaseColors = new Set();
const dataImages = new Set();
for (const material of document.materials ?? []) {
  const base = material.pbrMetallicRoughness?.baseColorTexture;
  if (base && (!material.alphaMode || material.alphaMode === 'OPAQUE')) {
    opaqueBaseColors.add(document.textures[base.index].source);
  }
  for (const texture of [material.normalTexture, material.occlusionTexture,
    material.pbrMetallicRoughness?.metallicRoughnessTexture]) {
    if (texture) dataImages.add(document.textures[texture.index].source);
  }
}

if (!['linear', 'mipmapped'].includes(colorFilter)) throw new Error('Unknown base color filter');
if (colorFilter === 'linear') {
  // Dense generated UV islands can bleed into adjacent colors in distant mip levels.
  for (const material of document.materials ?? []) {
    const base = material.pbrMetallicRoughness?.baseColorTexture;
    if (base) document.samplers[document.textures[base.index].sampler].minFilter = 9729;
  }
}

const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'home-glb-textures-'));
try {
  const replacements = new Map();
  for (const [index, image] of (document.images ?? []).entries()) {
    assert.equal(typeof image.bufferView, 'number', 'Expected embedded images');
    assert.ok(['image/png', 'image/jpeg'].includes(image.mimeType), 'Expected PNG or JPEG');
    const view = document.bufferViews[image.bufferView];
    const begin = binaryStart + (view.byteOffset ?? 0);
    const sourcePath = path.join(workDir, `source-${index}.${image.mimeType === 'image/png' ? 'png' : 'jpg'}`);
    fs.writeFileSync(sourcePath, source.subarray(begin, begin + view.byteLength));
    const jpeg = opaqueBaseColors.has(index) && !dataImages.has(index);
    const outputPath = path.join(workDir, `resized-${index}.${jpeg ? 'jpg' : 'png'}`);
    const dimensions = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', sourcePath], { encoding: 'utf8' });
    const width = Number(dimensions.match(/pixelWidth: (\d+)/)?.[1]);
    const height = Number(dimensions.match(/pixelHeight: (\d+)/)?.[1]);
    assert.ok(width > 0 && height > 0, 'Unable to read texture dimensions');
    const imageLimit = jpeg ? maxColorSize : maxSize;
    const args = Math.max(width, height) > imageLimit ? ['-Z', String(imageLimit)] : [];
    args.push('-s', 'format', jpeg ? 'jpeg' : 'png');
    if (jpeg) args.push('-s', 'formatOptions', '85');
    execFileSync('sips', [...args, sourcePath, '--out', outputPath], { stdio: 'pipe' });
    replacements.set(image.bufferView, fs.readFileSync(outputPath));
    image.mimeType = jpeg ? 'image/jpeg' : 'image/png';
  }

  const chunks = [];
  let offset = 0;
  for (const [index, view] of document.bufferViews.entries()) {
    const begin = binaryStart + (view.byteOffset ?? 0);
    const original = source.subarray(begin, begin + view.byteLength);
    const bytes = replacements.get(index) ?? original;
    view.byteOffset = offset;
    view.byteLength = bytes.length;
    chunks.push(bytes);
    const padding = (4 - bytes.length % 4) % 4;
    if (padding) chunks.push(Buffer.alloc(padding));
    offset += bytes.length + padding;
  }
  const binary = Buffer.concat(chunks);
  document.buffers[0].byteLength = binary.length;
  const json = Buffer.from(JSON.stringify(document));
  const paddedJson = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 0x20)]);
  const header = Buffer.alloc(20);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(28 + paddedJson.length + binary.length, 8);
  header.writeUInt32LE(paddedJson.length, 12);
  header.writeUInt32LE(0x4e4f534a, 16);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(binary.length, 0);
  binHeader.writeUInt32LE(0x004e4942, 4);
  const result = Buffer.concat([header, paddedJson, binHeader, binary]);

  // Check every non-image buffer view against the source before writing the asset.
  const originalDocument = JSON.parse(source.toString('utf8', 20, 20 + jsonLength));
  for (const [index, view] of document.bufferViews.entries()) {
    if (replacements.has(index)) continue;
    const original = originalDocument.bufferViews[index];
    assert.deepEqual(binary.subarray(view.byteOffset, view.byteOffset + view.byteLength),
      source.subarray(binaryStart + (original.byteOffset ?? 0), binaryStart + (original.byteOffset ?? 0) + original.byteLength));
  }
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, result, { flag: 'wx' });
  console.log(JSON.stringify({ input, output, inputBytes: source.length, outputBytes: result.length,
    maxTextureSize: maxSize, maxBaseColorSize: maxColorSize, baseColorFilter: colorFilter, imageCount: document.images?.length ?? 0, geometryBuffersUnchanged: true }, null, 2));
} finally {
  fs.rmSync(workDir, { recursive: true, force: true });
}
