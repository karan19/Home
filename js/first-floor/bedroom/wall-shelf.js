/**
 * Bedroom Wall Shelf Component
 * Creates wall shelf unit with frame, shelves, and decorative items
 */

import * as THREE from 'three';

/**
 * Create wall shelf unit
 * @returns {THREE.Group} Shelf group
 */
export function createWallShelf() {
    const shelfGroup = new THREE.Group();
    shelfGroup.name = 'Furniture_Shelf_Wall';

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x2C2C2C,
        roughness: 0.4,
        metalness: 0.3
    });

    // Frame (1m wide x 1.5m tall, 0.03m thick)
    const frameThickness = 0.03;
    
    // Vertical frames
    const leftFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, 1.5, frameThickness),
        frameMaterial
    );
    leftFrame.position.set(-0.5, 0, 0);
    shelfGroup.add(leftFrame);

    const rightFrame = leftFrame.clone();
    rightFrame.position.set(0.5, 0, 0);
    shelfGroup.add(rightFrame);

    // Horizontal frames (top and bottom)
    const topFrame = new THREE.Mesh(
        new THREE.BoxGeometry(1, frameThickness, frameThickness),
        frameMaterial
    );
    topFrame.position.set(0, 0.75, 0);
    shelfGroup.add(topFrame);

    const bottomFrame = topFrame.clone();
    bottomFrame.position.set(0, -0.75, 0);
    shelfGroup.add(bottomFrame);

    // Shelves (3 shelves, 0.94m x 0.27m x 0.02m)
    const shelfGeometry = new THREE.BoxGeometry(0.94, 0.02, 0.27);
    const shelfYPositions = [-0.3, 0.15, 0.6];

    shelfYPositions.forEach((y, index) => {
        const shelf = new THREE.Mesh(shelfGeometry, woodMaterial);
        shelf.position.set(0, y, 0.12);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        shelfGroup.add(shelf);
    });

    // Decorative items on shelves (simple boxes representing books and objects)
    // Books on middle shelf
    for (let i = 0; i < 5; i++) {
        const book = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.15, 0.12),
            new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xffffff,
                roughness: 0.7 
            })
        );
        book.position.set(-0.3 + i * 0.12, 0.23, 0.12);
        book.castShadow = true;
        shelfGroup.add(book);
    }

    // Small objects on top shelf
    const object1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.5 })
    );
    object1.position.set(-0.2, 0.68, 0.12);
    object1.castShadow = true;
    shelfGroup.add(object1);

    const object2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.1, 8),
        new THREE.MeshStandardMaterial({ color: 0x4682B4, roughness: 0.4 })
    );
    object2.position.set(0.2, 0.68, 0.12);
    object2.castShadow = true;
    shelfGroup.add(object2);

    return shelfGroup;
}
