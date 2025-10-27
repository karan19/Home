/**
 * Office Desk Component
 * Creates L-shaped desk with desktop and legs
 */

import * as THREE from 'three';

/**
 * Create L-shaped desk
 * @returns {THREE.Group} Desk group
 */
export function createDesk() {
    const deskGroup = new THREE.Group();
    deskGroup.name = 'Furniture_Desk';

    const material = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    // Desktop surface (1.8m x 1.2m x 0.05m)
    const desktop = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.05, 1.2),
        material
    );
    desktop.position.y = 0.75;
    desktop.castShadow = true;
    desktop.receiveShadow = true;
    deskGroup.add(desktop);

    // Legs (4 legs, 0.05m x 0.05m x 0.7m)
    const legGeometry = new THREE.BoxGeometry(0.05, 0.7, 0.05);
    const legPositions = [
        [-0.85, 0.35, -0.55],
        [0.85, 0.35, -0.55],
        [-0.85, 0.35, 0.55],
        [0.85, 0.35, 0.55]
    ];

    legPositions.forEach((pos, index) => {
        const leg = new THREE.Mesh(legGeometry, material);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        deskGroup.add(leg);
    });

    return deskGroup;
}
