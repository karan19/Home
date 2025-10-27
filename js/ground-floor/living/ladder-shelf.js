/**
 * Living Room Ladder Shelf Component
 * Creates ladder shelf with supports, shelves, and decorative items
 */

import * as THREE from 'three';

/**
 * Create ladder shelf
 * @returns {THREE.Group} Shelf group
 */
export function createLadderShelf() {
    const shelfGroup = new THREE.Group();
    shelfGroup.name = 'Furniture_LadderShelf';

    const material = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    // Side supports (leaning)
    const leftSupport = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 1.8, 0.05),
        material
    );
    leftSupport.position.set(-0.25, 0.9, 0);
    leftSupport.rotation.z = 0.1;
    leftSupport.castShadow = true;
    shelfGroup.add(leftSupport);

    const rightSupport = leftSupport.clone();
    rightSupport.position.set(0.25, 0.9, 0);
    rightSupport.rotation.z = -0.1;
    shelfGroup.add(rightSupport);

    // Shelves (4 shelves, varying widths)
    const shelfWidths = [0.6, 0.55, 0.5, 0.45];
    const shelfYPositions = [0.3, 0.7, 1.1, 1.5];

    shelfWidths.forEach((width, i) => {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(width, 0.02, 0.4),
            material
        );
        shelf.position.set(0, shelfYPositions[i], 0);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        shelfGroup.add(shelf);
    });

    // Decorative items on shelves
    // Plant on top shelf
    const smallPlant = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7 })
    );
    smallPlant.position.set(0, 1.58, 0);
    smallPlant.castShadow = true;
    shelfGroup.add(smallPlant);

    // Books on middle shelves
    for (let i = 0; i < 3; i++) {
        const book = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.12, 0.08),
            new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xffffff,
                roughness: 0.7 
            })
        );
        book.position.set(-0.1 + i * 0.1, 0.76, 0);
        book.castShadow = true;
        shelfGroup.add(book);
    }

    return shelfGroup;
}
