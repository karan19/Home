export const FORM_SECONDS = 2.4;
export const HOLD_SECONDS = 25;
export const DISSOLVE_SECONDS = 1.2;
export const GAP_SECONDS = .6;
export const PORTRAIT_CLEAR_SECONDS = 1.1;
const TOTAL = FORM_SECONDS + HOLD_SECONDS + DISSOLVE_SECONDS + GAP_SECONDS;

export function createQuoteCycle(count = 1, random = Math.random) {
  const index = count > 1 ? Math.min(count - 1, Math.floor(random() * count)) : 0;
  return { index, elapsed: 0, delay: 0, blocked: false, progress: 0, remaining: null, count: null };
}

// Vite preserves refs during edits: a smaller quote list must invalidate old indexes.
function syncQuoteCount(state, count) {
  if (state.count === count) return;
  state.count = count;
  if (!Number.isInteger(state.index) || state.index < 0 || state.index >= count) {
    state.index = 0;
    state.elapsed = 0;
    state.progress = 0;
  }
  state.remaining = Array.isArray(state.remaining)
    ? [...new Set(state.remaining)].filter(i => Number.isInteger(i) && i >= 0 && i < count && i !== state.index)
    : null;
}

export function nextQuote(state, count, random = Math.random) {
  syncQuoteCount(state, count);
  if (state.blocked || count < 1) return false;
  if (count > 1) {
    // Visit the entire collection before repeating; avoid a repeat at bag boundaries too.
    if (state.remaining === null) {
      state.remaining = Array.from({ length: count }, (_, i) => i).filter(i => i !== state.index);
    } else if (state.remaining.length === 0) {
      state.remaining = Array.from({ length: count }, (_, i) => i);
    }
    const choices = state.remaining.filter(i => i !== state.index);
    state.index = choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))];
    state.remaining = state.remaining.filter(i => i !== state.index);
  }
  state.delay = 0;
  state.elapsed = 0;
  state.progress = 0;
  return true;
}

export function advanceQuoteCycle(state, delta, portraitActive, count, random = Math.random) {
  syncQuoteCount(state, count);
  const dt = Math.max(0, Math.min(delta, .1));
  if (portraitActive) {
    state.blocked = true;
    state.elapsed = 0;
    state.progress = 0;
    state.delay = PORTRAIT_CLEAR_SECONDS;
    return;
  }
  state.blocked = false;
  if (state.delay > 0) {
    state.delay = Math.max(0, state.delay - dt);
    state.progress = 0;
    return;
  }
  state.elapsed += dt;
  if (state.elapsed >= TOTAL) {
    nextQuote(state, count, random);
  }
  const t = state.elapsed;
  state.progress = t < FORM_SECONDS ? t / FORM_SECONDS
    : t < FORM_SECONDS + HOLD_SECONDS ? 1
    : Math.max(0, 1 - (t - FORM_SECONDS - HOLD_SECONDS) / DISSOLVE_SECONDS);
}
