import { createQuoteCycle, nextQuote } from './roofQuoteCycle.js';

const KEY = 'house-roof-quote-rotation-v1';
function browserStorage() {
  try { return window.localStorage; } catch { return null; }
}

// Store text identities so adding/removing/reordering the collection cannot
// revive invalid indexes or reset everyone's history on each deployment.
export function restoreQuoteCycle(quotes, storage = browserStorage(), random = Math.random) {
  const state = createQuoteCycle(quotes.length, random);
  if (quotes.length < 2) return state;
  try {
    const saved = JSON.parse(storage?.getItem(KEY) || 'null');
    if (!saved || !Array.isArray(saved.remaining) || !Array.isArray(saved.collection)) return state;
    const known = new Set(saved.collection);
    const remaining = new Set(saved.remaining);
    const restored = { ...state, index: quotes.findIndex(quote => quote.text === saved.last), count: quotes.length };
    restored.remaining = quotes.flatMap((quote, index) =>
      index !== restored.index && (remaining.has(quote.text) || !known.has(quote.text)) ? [index] : []);
    nextQuote(restored, quotes.length, random);
    return restored;
  } catch { /* Private browsing or malformed storage: use a fresh random cycle. */ }
  return state;
}

export function saveQuoteCycle(state, quotes, storage = browserStorage()) {
  try {
    const remaining = state.remaining ?? quotes.map((_, i) => i).filter(i => i !== state.index);
    storage?.setItem(KEY, JSON.stringify({
      last: quotes[state.index].text,
      collection: quotes.map(quote => quote.text),
      remaining: remaining.map(index => quotes[index]?.text).filter(Boolean),
    }));
  } catch { /* Storage failure must not interrupt the scene. */ }
}
