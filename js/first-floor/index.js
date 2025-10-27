/**
 * First Floor (Upper Level) Furniture Index
 * Orchestrates all first floor furniture creation
 */

import * as THREE from 'three';

// Bedroom components
import { createFourPosterBed } from './bedroom/four-poster-bed.js';
import { createReadingChair } from './bedroom/reading-chair.js';
import { createWallShelf } from './bedroom/wall-shelf.js';
import { createWallArt } from './bedroom/wall-art.js';
import { createNightstand } from './bedroom/nightstand.js';
import { createTableFan } from './bedroom/table-fan.js';

// Office components
import { createDesk } from './office/desk.js';
import { createOfficeChair } from './office/office-chair.js';
import { createMonitor } from './office/monitor.js';
import { createDeskPlant } from './office/desk-plant.js';
import { createFloatingShelf } from './office/floating-shelf.js';

/**
 * Create all upper level furniture
 * @param {THREE.Group} furnitureUpperGroup - Furniture_UpperLevel group
 * @returns {Object} Object containing animated objects references
 */
export function createUpperLevelFurniture(furnitureUpperGroup) {
    console.log('Creating upper level furniture...');

    // Create Bedroom subgroup
    const bedroomGroup = new THREE.Group();
    bedroomGroup.name = 'Bedroom';
    furnitureUpperGroup.add(bedroomGroup);

    // Create Office subgroup
    const officeGroup = new THREE.Group();
    officeGroup.name = 'Office';
    furnitureUpperGroup.add(officeGroup);

    // Create bedroom furniture and get animated objects
    const animatedObjects = createBedroom(bedroomGroup);

    // Create office furniture
    createOffice(officeGroup);

    console.log('Upper level furniture created successfully!');
    
    // Return animated objects for animation loop
    return animatedObjects;
}

/**
 * Create bedroom furniture
 * @returns {Object} Object containing animated objects references
 */
function createBedroom(bedroomGroup) {
    // Four-poster bed (positioned at X=-2, Y=3, Z=-2)
    const bed = createFourPosterBed();
    bed.position.set(-2, 3, -2);
    bedroomGroup.add(bed);

    // Nightstand (beside bed at X=-3, Y=3, Z=-1)
    const nightstand = createNightstand();
    nightstand.position.set(-3, 3, -1);
    bedroomGroup.add(nightstand);

    // Table fan (on nightstand)
    const fanData = createTableFan();
    fanData.fanGroup.position.set(-3, 3.65, -1); // On top of nightstand
    bedroomGroup.add(fanData.fanGroup);

    // Reading chair (positioned at X=-1, Y=3, Z=0.5)
    const chair = createReadingChair();
    chair.position.set(-1, 3, 0.5);
    bedroomGroup.add(chair);

    // Wall shelf unit (on back wall at X=-3.5, Y=3.5, Z=-3.5)
    const shelf = createWallShelf();
    shelf.position.set(-3.5, 3.5, -3.7);
    bedroomGroup.add(shelf);

    // Purple wall art pieces (2 pieces)
    const art1 = createWallArt();
    art1.position.set(-2, 4.5, -3.85);
    bedroomGroup.add(art1);

    const art2 = createWallArt();
    art2.position.set(3.85, 4.5, -2);
    art2.rotation.y = Math.PI / 2;
    bedroomGroup.add(art2);

    // Return animated objects for animation loop
    return {
        fanBlades: fanData.bladesGroup
    };
}

/**
 * Create office furniture
 */
function createOffice(officeGroup) {
    // L-shaped desk (positioned at X=2, Y=3, Z=-2)
    const desk = createDesk();
    desk.position.set(2, 3, -2);
    officeGroup.add(desk);

    // Office chair (in front of desk)
    const chair = createOfficeChair();
    chair.position.set(1.5, 3, -1.5);
    officeGroup.add(chair);

    // Monitor on desk
    const monitor = createMonitor();
    monitor.position.set(2, 3.75, -2.3);
    officeGroup.add(monitor);

    // Desk accessories
    const plant = createDeskPlant();
    plant.position.set(2.5, 3.75, -1.7);
    officeGroup.add(plant);

    // Floating shelf above desk
    const floatingShelf = createFloatingShelf();
    floatingShelf.position.set(2, 4.5, -3.7);
    officeGroup.add(floatingShelf);
}
