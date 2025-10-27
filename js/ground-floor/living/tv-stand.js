/**
 * Living Room TV Stand Component
 * Creates TV stand/media console with doors
 */

import * as THREE from 'three';

/**
 * Create TV stand/media console
 * @returns {THREE.Group} TV stand group
 */
export function createTVStand() {
    const standGroup = new THREE.Group();
    standGroup.name = 'Furniture_TVStand';

    const material = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    // Main body (1.8m x 0.45m x 0.5m)
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.5, 0.45),
        material
    );
    body.position.y = 0.25;
    body.castShadow = true;
    body.receiveShadow = true;
    standGroup.add(body);

    // Doors/drawers (visual detail)
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC19A6B, 
        roughness: 0.4 
    });

    // 2 doors
    for (let i = 0; i < 2; i++) {
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.4, 0.02),
            doorMaterial
        );
        door.position.set(-0.45 + i * 0.9, 0.25, 0.24);
        door.castShadow = true;
        standGroup.add(door);
    }

    return standGroup;
}
