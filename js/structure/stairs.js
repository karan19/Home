/**
 * Stairs Module
 * Creates floating staircase with treads (no supports)
 */

import * as THREE from 'three';

/**
 * Create staircase with treads
 * @param {THREE.Group} stairTreadsGroup - Treads group
 * @param {THREE.Group} stairSupportsGroup - Supports group (unused but kept for compatibility)
 */
export function createStaircase(stairTreadsGroup, stairSupportsGroup) {
    console.log('Creating staircase...');

    // Staircase configuration - FLOATING DESIGN (NO SUPPORTS)
    const treadWidth = 1.2;
    const treadDepth = 0.28;
    const treadThickness = 0.05;
    const riserHeight = 0.25;
    const numTreads = 12;

    // Material - dark wood
    const treadMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.4,
        metalness: 0.0
    });

    // Starting position - corner of cutout (left edge, front edge)
    const stairStartX = -2.75;  // Left edge of cutout (-4 + 1.25 for cutout width)
    const stairStartZ = 3.85;   // Front edge of cutout (4 - 0.15 for trim)

    // Create treads - REVERSED DIRECTION (subtract from Z to go toward back)
    for (let i = 0; i < numTreads; i++) {
        const tread = new THREE.Mesh(
            new THREE.BoxGeometry(treadWidth, treadThickness, treadDepth),
            treadMaterial
        );

        const yPos = riserHeight * i + treadThickness / 2;
        const zPos = stairStartZ - (treadDepth * i); // SUBTRACT to go toward back

        tread.position.set(stairStartX, yPos, zPos);
        tread.castShadow = true;
        tread.receiveShadow = true;
        tread.name = `Stair_Tread_${i + 1}`;
        stairTreadsGroup.add(tread);
    }

    // NO SUPPORTS - Floating staircase design
    // stairSupportsGroup remains empty

    console.log('Staircase created successfully! (Floating design - no supports)');
}
