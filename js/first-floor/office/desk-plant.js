/**
 * Office Desk Plant Component
 * Creates small desk plant with pot
 */

import * as THREE from 'three';

/**
 * Create desk plant
 * @returns {THREE.Group} Plant group
 */
export function createDeskPlant() {
    const plantGroup = new THREE.Group();
    plantGroup.name = 'Decor_Plant_Desk';

    // Pot (0.1m diameter x 0.15m tall)
    const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, 0.15, 8),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 })
    );
    pot.position.y = 0.075;
    pot.castShadow = true;
    plantGroup.add(pot);

    // Simple plant (green sphere on top)
    const plant = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7 })
    );
    plant.position.y = 0.2;
    plant.castShadow = true;
    plantGroup.add(plant);

    return plantGroup;
}
