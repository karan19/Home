import { KITCHEN } from './groundFloorCoordinates.js';
import { OUTSIDE } from './outsideCoordinates.js';

const chair = KITCHEN.kitchenIsland.barStools.positions[0];
const position = chair.map((value, i) => value + KITCHEN.kitchenIsland.position[i]);
export const ISLAND_RESIDENT = {
  model: '/models/coffee-resident/coffee.glb',
  position,
  heading: Math.atan2(OUTSIDE.gym.position[0] - position[0], OUTSIDE.gym.position[2] - position[2]),
  // Align the authored pelvis with the stool's centre and seat surface.
  modelOffset: [0, KITCHEN.barStool.seat.positionY + KITCHEN.barStool.seat.height / 2 - .708, .22],
};
