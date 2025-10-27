/**
 * Kitchen Oven/Range Component
 * Creates an oven with door, controls, and burners
 */

import * as THREE from 'three';

/**
 * Create oven/range
 * @returns {THREE.Group} Oven group
 */
export function createOven() {
    const ovenGroup = new THREE.Group();
    ovenGroup.name = 'Kitchen_Appliance_Oven';

    const material = new THREE.MeshStandardMaterial({
        color: 0xC0C0C0,
        roughness: 0.3,
        metalness: 0.7
    });

    // Main body (0.6m x 0.6m x 0.9m)
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.9, 0.6),
        material
    );
    body.position.y = 0.45;
    body.castShadow = true;
    body.receiveShadow = true;
    ovenGroup.add(body);

    // Oven door (darker)
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x1C1C1C, roughness: 0.3 })
    );
    door.position.set(0, 0.4, 0.31);
    door.castShadow = true;
    ovenGroup.add(door);

    // Control panel
    const controls = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.1, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x2C2C2C })
    );
    controls.position.set(0, 0.8, 0.31);
    ovenGroup.add(controls);

    // Burners on top (4 circles)
    const burnerMaterial = new THREE.MeshStandardMaterial({ color: 0x1C1C1C });
    const burnerPositions = [
        [-0.15, 0.91, -0.15],
        [0.15, 0.91, -0.15],
        [-0.15, 0.91, 0.15],
        [0.15, 0.91, 0.15]
    ];

    burnerPositions.forEach(pos => {
        const burner = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16),
            burnerMaterial
        );
        burner.position.set(pos[0], pos[1], pos[2]);
        ovenGroup.add(burner);
    });

    return ovenGroup;
}
