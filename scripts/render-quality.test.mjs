import test from 'node:test';
import assert from 'node:assert/strict';
import { createQualityMonitor } from '../src/utils/qualityMonitor.js';
import { QUALITY, lowerQuality } from '../src/config/renderQuality.js';

const run = (monitor, count, delta, visible = true) => Array.from({length:count}, () => monitor(delta, visible)).filter(Boolean).length;
test('sustained slow rendering lowers quality after warmup, with a cooldown', () => {
  const monitor = createQualityMonitor();
  assert.equal(run(monitor, 80, 1 / 30), 0);
  assert.equal(run(monitor, 110, 1 / 30), 1);
  assert.equal(run(monitor, 120, 1 / 30), 0);
});
test('fast frames and hidden-tab delays do not trigger a downgrade', () => {
  const monitor = createQualityMonitor();
  assert.equal(run(monitor, 1200, 1 / 60), 0);
  assert.equal(run(monitor, 20, 1, false), 0);
  assert.equal(run(monitor, 90, 1 / 30), 0);
});
test('quality reaches a stable floor and disables expensive passes', () => {
  let quality = 'High';
  for (let i = 0; i < 10; i++) quality = lowerQuality(quality);
  assert.equal(quality, 'Low');
  assert.equal(QUALITY.Low.ssao || QUALITY.Low.bloom || QUALITY.Low.interiorShadows, false);
  assert.ok(QUALITY.High.dpr <= 1.5);
});
