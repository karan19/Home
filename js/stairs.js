/**
 * Stairs Module
 * Creates the staircase connecting ground floor to second floor
 */

import * as THREE from 'three';

/**
 * Create the complete staircase with treads and supports
 * @param {THREE.Group} treadsGroup - Group for stair treads
 * @param {THREE.Group} supportsGroup - Group for stair supports
 */
export function createStaircase(treadsGroup, supportsGroup) {
    console.log('Creating staircase...');

    // Stair specifications from spec
    const treadWidth = 1.2;
    const treadDepth = 0.28;
    const treadThickness = 0.05;
    const riserHeight = 0.25;
    const totalTreads = 12;

    // Materials
    const treadMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321, // Dark wood
        roughness: 0.3,
        metalness: 0.0
    });

    const supportMaterial = new THREE.MeshStandardMaterial({
        color: 0xC19A6B, // Medium wood tone (matching floor)
        roughness: 0.4,
        metalness: 0.0
    });

    // Create straight flight of stairs (12 treads, ground to second floor)
    // Starting position: Edge of ground floor corner
    // Ending position: Corner of carved-out square on second floor
    // X = -2.75m (left edge), Z = 3.85m (front edge)
    // Direction: Ascending along -Z axis (toward back)
    // Total stair length: 12 treads * 0.28m = 3.36m
    // End position: Z = 3.85 - 3.36 = 0.49m (corner of cutout)
    const stairStartX = -2.75;
    const stairStartZ = 3.85;

    for (let i = 0; i < totalTreads; i++) {
        const tread = createTread(
            treadWidth,
            treadDepth,
            treadThickness,
            treadMaterial
        );
        
        const yPos = riserHeight * (i + 1) - treadThickness / 2;
        const zPos = stairStartZ - (treadDepth * i); // REVERSED: subtract instead of add
        
        tread.position.set(stairStartX, yPos, zPos);
        tread.name = `Stairs_Tread_${i + 1}`;
        treadsGroup.add(tread);
    }

    // No supports - floating staircase design

    console.log('Staircase created successfully!');
}

/**
 * Create a single stair tread
 */
function createTread(width, depth, thickness, material) {
    const geometry = new THREE.BoxGeometry(width, thickness, depth);
    
    // Add slight rounding to front edge (optional detail)
    const tread = new THREE.Mesh(geometry, material);
    tread.castShadow = true;
    tread.receiveShadow = true;
    
    return tread;
}
