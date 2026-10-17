import { STAIRCASE, STAIR_TREADS } from './staircase';

export const STAIR_READER = {
  model: '/models/stair-reader/reader.glb?shirt=clean-2',
  // Seat on tread 4; soles on tread 2. GLB contact points are calibrated to these surfaces.
  position: [STAIRCASE.x, STAIR_TREADS[2].y, STAIR_TREADS[4].z + .28],
  seatTread: 4,
  footTread: 2,
};
