// Navigation is independent of rendering so pauses and corner behavior are testable.
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const headingFor = segment => Math.atan2(segment.to[0] - segment.from[0], segment.to[2] - segment.from[2]);
export const angleDifference = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
export function createMotion() {
  return { segment: 0, distance: 0, speed: 0, heading: null, rest: 1.2, laps: 0 };
}
export function advanceMotion(state, route, dt, pauseRequested) {
  dt = clamp(dt, 0, 0.05);
  const segment = route[state.segment];
  const next = route[(state.segment + 1) % route.length];
  const desiredHeading = headingFor(segment);
  state.heading ??= desiredHeading;
  const angle = angleDifference(desiredHeading, state.heading);
  const canStop = !segment.stairs;
  const stopping = (pauseRequested && canStop) || state.rest > 0;
  if (!pauseRequested) state.rest = Math.max(0, state.rest - dt);
  const cornerAngle = Math.abs(angleDifference(headingFor(next), desiredHeading));
  const remaining = segment.distance - state.distance;
  const cruise = segment.stairs ? 0.36 : 0.72;
  // Slow down before substantial changes in heading; don't travel sideways while turning.
  const cornerLimit = cornerAngle > 0.6 ? Math.sqrt(2 * 1.1 * remaining) : cruise;
  const alignment = clamp(1 - Math.abs(angle) / 0.8, 0, 1);
  const desiredSpeed = stopping ? 0 : Math.min(cruise, cornerLimit) * alignment;
  state.speed += clamp(desiredSpeed - state.speed, -1.4 * dt, 1.1 * dt);
  if (state.speed < 0.003 && stopping) state.speed = 0;
  if (!stopping) state.heading += clamp(angle, -1.6 * dt, 1.6 * dt);
  state.distance = Math.min(segment.distance, state.distance + state.speed * dt);
  const t = state.distance / segment.distance;
  const position = segment.from.map((v, i) => v + (segment.to[i] - v) * t);
  if (state.distance >= segment.distance - 0.006 && !stopping) {
    state.segment = (state.segment + 1) % route.length;
    state.distance = 0;
    if (state.segment === 0) state.laps++;
    // Pause at open destinations, never on a staircase.
    if (!segment.stairs && !next.stairs && [8, 10, 12, 25].includes(state.segment)) state.rest = 2.5;
  }
  return { position, heading: state.heading, speed: state.speed, stairs: segment.stairs,
    settling: pauseRequested && !canStop, resting: stopping && state.speed === 0 };
}
