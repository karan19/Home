/**
 * Living Room Coffee Table Component
 * Creates a coffee table with top and legs
 */

import * as THREE from 'three';

/**
 * Create coffee table
 * @returns {THREE.Group} Table group
 */
export function createCoffeeTable() {
    const tableGroup = new THREE.Group();
    tableGroup.name = 'Furniture_CoffeeTable';

    const material = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    // Tabletop (1.2m x 0.6m x 0.05m)
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.05, 0.6),
        material
    );
    top.position.y = 0.4;
    top.castShadow = true;
    top.receiveShadow = true;
    tableGroup.add(top);

    // Legs (4 legs)
    const legGeometry = new THREE.BoxGeometry(0.05, 0.35, 0.05);
    const legPositions = [
        [-0.55, 0.175, -0.25],
        [0.55, 0.175, -0.25],
        [-0.55, 0.175, 0.25],
        [0.55, 0.175, 0.25]
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, material);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        tableGroup.add(leg);
    });

    return tableGroup;
}
