// Shared by the punch mixer and the bag so impact and recoil stay synchronized.
export const boxingMotion = { time: 0, active: false };
export function bagRecoil(seconds) {
  const phase = (seconds % 2) / 2;
  if (phase < .36 || phase > .78) return 0;
  const t = (phase - .36) / .42;
  return .065 * Math.sin(Math.PI * t) * (1 - t);
}
