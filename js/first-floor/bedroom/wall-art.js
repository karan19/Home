/**
 * Bedroom Wall Art Component
 * Creates circular purple wall art piece
 */

import * as THREE from 'three';

/**
 * Create purple wall art (circular)
 * @returns {THREE.Group} Art group
 */
export function createWallArt() {
    const artGroup = new THREE.Group();
    artGroup.name = 'Decor_WallArt_Purple';

    const material = new THREE.MeshStandardMaterial({
        color: 0x9370DB,
        roughness: 0.5,
        metalness: 0.0
    });

    // Circular art piece (0.4m diameter x 0.02m thick)
    const art = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32),
        material
    );
    art.rotation.x = Math.PI / 2;
    art.castShadow = true;
    artGroup.add(art);

    return artGroup;
}
