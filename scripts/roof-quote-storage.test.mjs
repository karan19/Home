import test from 'node:test';
import assert from 'node:assert/strict';
import { restoreQuoteCycle, saveQuoteCycle } from '../src/components/roofQuoteStorage.js';
import { ROOF_QUOTES } from '../src/config/roofQuotes.js';
function memoryStorage() {
  let value = null;
  return { getItem: () => value, setItem: (_, next) => { value = next; } };
}
test('100 reloads visit all 100 entries, then start another cycle without an immediate repeat', () => {
  const storage = memoryStorage();
  const seen = new Set();
  let last;
  for (let i = 0; i < 100; i++) {
    const state = restoreQuoteCycle(ROOF_QUOTES, storage, () => .42);
    assert(!seen.has(state.index));
    seen.add(state.index);
    saveQuoteCycle(state, ROOF_QUOTES, storage);
    last = state.index;
  }
  assert.equal(seen.size, 100);
  assert.notEqual(restoreQuoteCycle(ROOF_QUOTES, storage, () => .42).index, last);
});
test('collection edits preserve unseen entries by identity and include new additions', () => {
  const storage = memoryStorage();
  const old = ['a','b','c'].map(text => ({ text }));
  const state = restoreQuoteCycle(old, storage, () => 0);
  saveQuoteCycle(state, old, storage);
  const edited = ['d','c','a'].map(text => ({ text }));
  const next = restoreQuoteCycle(edited, storage, () => 0);
  assert.equal(edited[next.index].text, 'd');
  assert.deepEqual(next.remaining.map(i => edited[i].text), ['c']);
});
test('unavailable and malformed storage fall back to random selection', () => {
  for (const storage of [null, {getItem(){throw Error('blocked');}}, {getItem:()=>'{bad'}]) {
    const state = restoreQuoteCycle(ROOF_QUOTES, storage, () => .5);
    assert.equal(state.index, 50);
    assert.doesNotThrow(() => saveQuoteCycle(state, ROOF_QUOTES, storage));
  }
});
