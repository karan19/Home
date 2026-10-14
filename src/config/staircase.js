// Geometry and character contacts must use the same measured surfaces.
export const STAIRCASE = {
  x: -2.75, width: 1.2, depth: .28, startZ: 3.36,
  ground: .1, upper: 3, count: 12, rise: .25, thickness: .05,
};
export const STAIR_TREADS = Array.from({length:STAIRCASE.count},(_,i)=>({
  z:STAIRCASE.startZ-i*STAIRCASE.depth,
  y:Math.max(STAIRCASE.ground,i*STAIRCASE.rise+.05),
}));
export const STAIR_CONTACTS = [
  {z:3.72,y:STAIRCASE.ground}, ...STAIR_TREADS.map((t,i)=>({...t,z:i===STAIR_TREADS.length-1?.345:t.z})),
  {z:-.20,y:STAIRCASE.upper},
];
