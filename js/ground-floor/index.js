/**
 * Ground Floor Furniture Index
 * Orchestrates all ground floor furniture creation
 */

import * as THREE from 'three';

// Kitchen components
import { createBaseCabinets } from './kitchen/base-cabinets.js';
import { createRefrigerator } from './kitchen/refrigerator.js';
import { createOven } from './kitchen/oven.js';
import { createKitchenIsland } from './kitchen/kitchen-island.js';

// Living room components
import { createSofa } from './living/sofa.js';
import { createCoffeeTable } from './living/coffee-table.js';
import { createTVStand } from './living/tv-stand.js';
import { createTV } from './living/tv.js';
import { createLadderShelf } from './living/ladder-shelf.js';
import { createFloorPlant } from './living/floor-plant.js';

/**
 * Create all ground level furniture
 * @param {THREE.Group} furnitureGroundGroup - Furniture_GroundLevel group
 */
export function createGroundLevelFurniture(furnitureGroundGroup) {
    console.log('Creating ground level furniture...');

    // Create Kitchen subgroup
    const kitchenGroup = new THREE.Group();
    kitchenGroup.name = 'Kitchen';
    furnitureGroundGroup.add(kitchenGroup);

    // Create Living subgroup
    const livingGroup = new THREE.Group();
    livingGroup.name = 'Living';
    furnitureGroundGroup.add(livingGroup);

    // Create kitchen furniture
    createKitchen(kitchenGroup);

    // Create living room furniture
    createLivingRoom(livingGroup);

    console.log('Ground level furniture created successfully!');
}

/**
 * Create kitchen furniture
 */
function createKitchen(kitchenGroup) {
    // Base cabinets (positioned at X=-3, Y=0, Z=-3 along back wall)
    const cabinets = createBaseCabinets();
    cabinets.position.set(-3, 0, -3);
    kitchenGroup.add(cabinets);

    // Refrigerator (X=-3.5, Y=0, Z=-2)
    const fridge = createRefrigerator();
    fridge.position.set(-3.5, 0, -2);
    kitchenGroup.add(fridge);

    // Oven/Range (integrated into cabinets at X=-2, Y=0, Z=-3)
    const oven = createOven();
    oven.position.set(-2, 0, -3.3);
    kitchenGroup.add(oven);

    // Kitchen island (X=-1.5, Y=0, Z=-1.5)
    const island = createKitchenIsland();
    island.position.set(-1.5, 0, -1.5);
    kitchenGroup.add(island);
}

/**
 * Create living room furniture
 */
function createLivingRoom(livingGroup) {
    // L-shaped sofa (X=1.5, Y=0, Z=1)
    const sofa = createSofa();
    sofa.position.set(1.5, 0, 1);
    livingGroup.add(sofa);

    // Coffee table (in front of sofa)
    const coffeeTable = createCoffeeTable();
    coffeeTable.position.set(1.5, 0, 0.2);
    livingGroup.add(coffeeTable);

    // TV stand (X=2.5, Y=0, Z=-3.5 against back wall)
    const tvStand = createTVStand();
    tvStand.position.set(2.5, 0, -3.5);
    livingGroup.add(tvStand);

    // Wall-mounted TV (above TV stand)
    const tv = createTV();
    tv.position.set(2.5, 1.2, -3.75);
    livingGroup.add(tv);

    // Ladder shelf (X=3, Y=0, Z=0)
    const ladderShelf = createLadderShelf();
    ladderShelf.position.set(3, 0, 0);
    livingGroup.add(ladderShelf);

    // Floor plant (X=2, Y=0, Z=2)
    const plant = createFloorPlant();
    plant.position.set(2, 0, 2);
    livingGroup.add(plant);
}
