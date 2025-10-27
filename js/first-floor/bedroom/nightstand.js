/**
 * Bedroom Nightstand Component
 * Creates a small bedside table for the bedroom
 */

import * as THREE from 'three';

/**
 * Create nightstand
 * @returns {THREE.Group} Nightstand group
 */
export function createNightstand() {
    const nightstandGroup = new THREE.Group();
    nightstandGroup.name = 'Furniture_Nightstand';

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.3,
        metalness: 0.0
    });

    // Main body (0.5m wide x 0.4m deep x 0.6m tall)
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.6, 0.4),
        woodMaterial
    );
    body.position.y = 0.3;
    body.castShadow = true;
    body.receiveShadow = true;
    nightstandGroup.add(body);

    // Tabletop (slightly larger for overhang)
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.05, 0.45),
        woodMaterial
    );
    top.position.y = 0.625;
    top.castShadow = true;
    top.receiveShadow = true;
    nightstandGroup.add(top);

    // Drawer front
    const drawer = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.15, 0.02),
        woodMaterial
    );
    drawer.position.set(0, 0.4, 0.21);
    drawer.castShadow = true;
    nightstandGroup.add(drawer);

    // Drawer handle
    const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.02, 0.02),
        handleMaterial
    );
    handle.position.set(0, 0.4, 0.23);
    handle.castShadow = true;
    nightstandGroup.add(handle);

    // Legs (4 legs)
    const legGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.05);
    const legPositions = [
        [-0.2, 0.05, -0.15],
        [0.2, 0.05, -0.15],
        [-0.2, 0.05, 0.15],
        [0.2, 0.05, 0.15]
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, woodMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        nightstandGroup.add(leg);
    });

    return nightstandGroup;
}
