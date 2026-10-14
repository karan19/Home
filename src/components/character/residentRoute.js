// Foot-level waypoints, metres. Keep the stairwell at x=-2.75 clear and
// enter the upper landing before turning toward the reading area.
const ground = 0.1;
const upper = 3;
const ascent = Array.from({ length: 12 }, (_, i) => [-2.75, Math.max(ground, i * 0.25 + 0.05), 3.36 - i * 0.28]);
export const RESIDENT_ROUTE = [
  [-0.9, ground, 2.7], [-1.65, ground, 3.6], [-2.75, ground, 3.6],
  ...ascent, [-2.75, upper, 0.05], [-2.75, upper, -0.65],
  [-1.2, upper, -0.65], [0.7, upper, -0.65], [2.95, upper, -0.65],
  [3.15, upper, 1.9], [2.65, upper, 2.35], [0.8, upper, 2.35],
  [-1.1, upper, 2.2], [-1.25, upper, -0.65],
  [-2.75, upper, -0.65], [-2.75, upper, 0.05], ...ascent.toReversed(),
  [-2.75, ground, 3.6], [-1.65, ground, 3.6], [-0.9, ground, 2.7],
  [-0.9, ground, 1.6], [-0.15, ground, -0.45], [1.9, ground, -0.6],
  [2.7, ground, -2.45], [1.9, ground, -0.6], [-0.15, ground, -0.45],
  [-0.9, ground, 1.6],
];

export function routeSegments(points = RESIDENT_ROUTE) {
  return points.map((from, index) => {
    const to = points[(index + 1) % points.length];
    const distance = Math.hypot(...to.map((value, axis) => value - from[axis]));
    return { from, to, distance, stairs: Math.abs(to[1] - from[1]) > 0.01 };
  });
}
