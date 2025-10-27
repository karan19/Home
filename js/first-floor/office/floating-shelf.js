/**
 * Office Floating Shelf Component
 * Creates floating shelf with decorative objects
 */

import * as THREE from 'three';

/**
 * Create floating shelf with decorative objects
 * @returns {THREE.Group} Shelf group
 */
export function createFloatingShelf() {
    const shelfGroup = new THREE.Group();
    shelfGroup.name = 'Furniture_Shelf_Floating';

    const material = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    // Shelf (1.5m x 0.25m x 0.05m)
    const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.05, 0.25),
        material
    );
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    shelfGroup.add(shelf);

    // Small objects on floating shelf (3 objects)
    for (let i = 0; i < 3; i++) {
        const obj = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.1, 0.08),
            new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xffffff,
                roughness: 0.6 
            })
        );
        obj.position.set(-0.5 + i * 0.4, 0.08, 0);
        obj.castShadow = true;
        shelfGroup.add(obj);
    }

    return shelfGroup;
}
