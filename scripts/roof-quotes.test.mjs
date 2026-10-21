import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuoteCycle, advanceQuoteCycle, FORM_SECONDS, HOLD_SECONDS } from '../src/components/roofQuoteCycle.js';

function advance(state, seconds, active = false, count = 5, random = () => 0) {
  for (let i = 0; i < Math.round(seconds * 100); i++) advanceQuoteCycle(state, .01, active, count, random);
}
test('roof quote forms, stays fully readable for 25 seconds, then changes without repeating', () => {
  const state = createQuoteCycle();
  advance(state, FORM_SECONDS + .01);
  assert.equal(state.progress, 1);
  advance(state, HOLD_SECONDS - .02);
  assert.equal(state.progress, 1);
  advance(state, 2);
  assert.equal(state.index, 1);
  assert(state.progress > 0 && state.progress < 1);
});
test('portrait interrupts a quote immediately and quotes wait for the portrait fade before reforming', () => {
  const state = createQuoteCycle();
  advance(state, 10);
  advanceQuoteCycle(state, .01, true, 5);
  assert.equal(state.progress, 0);
  advance(state, 120, true);
  assert.equal(state.index, 0);
  advance(state, 1);
  assert.equal(state.progress, 0);
  advance(state, .5);
  assert(state.progress > 0 && state.progress < 1);
  advanceQuoteCycle(state, .01, true, 5);
  assert.equal(state.progress, 0);
});
test('shuffle reaches every other quote and a single quote cycles safely', () => {
  const destinations = new Set();
  for (const random of [0,.25,.5,.75,.999]) {
    const state = createQuoteCycle();
    advance(state, 29.3, false, 5, () => random);
    assert.notEqual(state.index, 0);
    destinations.add(state.index);
  }
  assert.equal(destinations.size, 4);
  const single = createQuoteCycle();
  advance(single, 120, false, 1);
  assert.equal(single.index, 0);
  assert(Number.isFinite(single.progress));
});

test('manual refresh selects another quote and restarts formation without interrupting portraits', async () => {
  const { nextQuote } = await import('../src/components/roofQuoteCycle.js');
  const state = createQuoteCycle();
  advance(state, 10);
  assert.equal(nextQuote(state, 5, () => .5), true);
  assert.equal(state.index, 3);
  assert.equal(state.progress, 0);
  assert.equal(state.elapsed, 0);
  advance(state, .4);
  assert(state.progress > 0 && state.progress < 1);
  advanceQuoteCycle(state, .01, true, 5);
  assert.equal(nextQuote(state, 5), false);
  assert.equal(state.index, 3);
  advance(state, .2);
  assert.equal(nextQuote(state, 5, () => 0), true);
  assert.equal(state.index, 1); // First remaining unread quote in the shuffle bag.
  assert.equal(state.delay, 0);
  advance(state, .1);
  assert(state.progress > 0);
});


test('quote collection contains 50 unique original reflections', async () => {
  const { ROOF_QUOTES } = await import('../src/config/roofQuotes.js');
  assert.equal(ROOF_QUOTES.length, 50);
  assert.equal(new Set(ROOF_QUOTES.map(q => q.text)).size, ROOF_QUOTES.length);
  for (const quote of ROOF_QUOTES) {
    assert(quote.text.length <= 200, quote.text);
    assert.equal(quote.original, true);
    assert.equal(quote.author, undefined);
  }
});

test('shuffle visits every quote before repeating and avoids boundary repeats', async () => {
  const { nextQuote } = await import('../src/components/roofQuoteCycle.js');
  for (const random of [() => 0, () => .5, () => .999999]) {
    const state = createQuoteCycle();
    const first = new Set([state.index]);
    for (let i = 1; i < 100; i++) {
      nextQuote(state, 100, random);
      assert(!first.has(state.index));
      first.add(state.index);
    }
    assert.equal(first.size, 100);
    for (let round = 0; round < 3; round++) {
      const seen = new Set();
      for (let i = 0; i < 100; i++) {
        const previous = state.index;
        nextQuote(state, 100, random);
        assert.notEqual(state.index, previous);
        assert(!seen.has(state.index));
        seen.add(state.index);
      }
      assert.equal(seen.size, 100);
    }
  }
});


test('shrinking the collection during a live edit drops stale shuffle indexes', async () => {
  const { nextQuote } = await import('../src/components/roofQuoteCycle.js');
  const state = createQuoteCycle();
  nextQuote(state, 100, () => .999);
  assert.equal(state.index, 99);
  advanceQuoteCycle(state, .01, false, 82);
  assert.equal(state.index, 0);
  for (let i = 0; i < 200; i++) {
    nextQuote(state, 82, () => .999);
    assert(Number.isInteger(state.index) && state.index >= 0 && state.index < 82);
  }
  // Also supports state retained from before count tracking was introduced.
  const legacy = { index: 1, remaining: [91, 95, 99], blocked: false };
  nextQuote(legacy, 82, () => .999);
  assert.equal(legacy.index, 81);
});
