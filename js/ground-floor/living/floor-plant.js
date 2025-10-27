/**
 * Living Room Floor Plant Component
 * Creates large floor plant with pot, stem, and leaves
 */

import * as THREE from 'three';

/**
 * Create large floor plant
 * @returns {THREE.Group} Plant group
 */
export function createFloorPlant() {
    const plantGroup = new THREE.Group();
    plantGroup.name = 'Decor_Plant_Floor';

    // Pot (0.3m diameter x 0.4m tall)
    const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.18, 0.4, 16),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 })
    );
    pot.position.y = 0.2;
    pot.castShadow = true;
    plantGroup.add(pot);

    // Plant (multiple leaves using planes)
    const leafMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x228B22, 
        roughness: 0.7,
        side: THREE.DoubleSide 
    });

    // Main stem
    const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.03, 0.6, 8),
        new THREE.MeshStandardMaterial({ color: 0x2F4F2F, roughness: 0.6 })
    );
    stem.position.y = 0.7;
    stem.castShadow = true;
    plantGroup.add(stem);

    // Leaves (simplified as spheres)
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const leaf = new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 8, 8),
            leafMaterial
        );
        leaf.position.set(
            Math.cos(angle) * 0.15,
            0.8 + Math.random() * 0.2,
            Math.sin(angle) * 0.15
        );
        leaf.castShadow = true;
        plantGroup.add(leaf);
    }

    return plantGroup;
}
