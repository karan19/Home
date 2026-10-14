// Discard loading, hidden-tab and long-pause samples; only sustained visible
// frame intervals below 40 fps lower quality. A cooldown prevents rapid steps.
export function createQualityMonitor() {
  let elapsed = 0;
  let frames = 0;
  let warmup = 3;
  return (delta, visible = true) => {
    if (!visible || delta > 0.25) {
      elapsed = 0; frames = 0; warmup = 3;
      return false;
    }
    if (delta <= 0) return false;
    if (warmup > 0) { warmup -= delta; return false; }
    elapsed += delta;
    frames++;
    if (elapsed < 3) return false;
    const slow = elapsed / frames > 1 / 40;
    elapsed = 0; frames = 0;
    if (slow) warmup = 5;
    return slow;
  };
}
