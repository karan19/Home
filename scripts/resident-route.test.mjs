import test from 'node:test';
import assert from 'node:assert/strict';
import { RESIDENT_ROUTE, routeSegments } from '../src/components/character/residentRoute.js';

test('resident circuit is finite and keeps the body inside the house', () => {
  for (const point of RESIDENT_ROUTE) {
    assert(point.every(Number.isFinite));
    assert(Math.abs(point[0]) <= 3.4 && Math.abs(point[2]) <= 3.65);
  }
  assert(routeSegments().every(segment => segment.distance > 0));
});

test('floor changes use the stairwell, including a return downstairs', () => {
  const stairs = routeSegments().filter(segment => segment.stairs);
  assert(stairs.some(segment => segment.to[1] > segment.from[1]));
  assert(stairs.some(segment => segment.to[1] < segment.from[1]));
  for (const { from, to } of stairs) {
    assert.equal(from[0], -2.75);
    assert.equal(to[0], -2.75);
    assert(Math.abs(to[1] - from[1]) <= 0.26);
  }
});

test('upper-floor horizontal paths do not cross the open stairwell', () => {
  for (const { from, to, stairs } of routeSegments()) {
    if (stairs || from[1] !== 3 || to[1] !== 3) continue;
    for (let i = 0; i <= 20; i++) {
      const x = from[0] + (to[0] - from[0]) * i / 20;
      const z = from[2] + (to[2] - from[2]) * i / 20;
      assert(z <= 0.2 || x >= -2.2);
    }
  }
});
