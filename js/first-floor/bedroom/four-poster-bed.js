/**
 * Bedroom Four-Poster Bed Component
 * Creates four-poster bed with base, posts, beams, mattress, blanket, pillows, and drawers
 */

import * as THREE from 'three';

/**
 * Create four-poster bed
 * @returns {THREE.Group} Bed group
 */
export function createFourPosterBed() {
    const bedGroup = new THREE.Group();
    bedGroup.name = 'Furniture_Bed';

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.7,
        metalness: 0.0
    });

    const grayMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0.6,
        metalness: 0.0
    });

    // Bed base (2m x 2.2m x 0.5m)
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 2.2),
        woodMaterial
    );
    base.position.y = 0.25;
    base.castShadow = true;
    base.receiveShadow = true;
    bedGroup.add(base);

    // Storage drawers underneath bed (3 drawers)
    const drawerMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.3,
        metalness: 0.0
    });

    for (let i = 0; i < 3; i++) {
        // Drawer box (0.6m wide x 0.35m tall x 0.5m deep)
        const drawer = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.35, 0.5),
            drawerMaterial
        );
        drawer.position.set(-0.6 + i * 0.6, 0.175, 1);
        drawer.castShadow = true;
        drawer.receiveShadow = true;
        drawer.name = `Furniture_Bed_Drawer_${i + 1}`;
        bedGroup.add(drawer);

        // Drawer handle (small horizontal bar)
        const handle = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.02, 0.02),
            handleMaterial
        );
        handle.position.set(-0.6 + i * 0.6, 0.175, 1.26);
        handle.castShadow = true;
        bedGroup.add(handle);
    }

    // Four posts (0.08m x 0.08m x 2.2m)
    const postGeometry = new THREE.BoxGeometry(0.08, 2.2, 0.08);
    const postPositions = [
        [-0.96, 1.1, -1.06],  // Back left
        [0.96, 1.1, -1.06],   // Back right
        [-0.96, 1.1, 1.06],   // Front left
        [0.96, 1.1, 1.06]     // Front right
    ];

    postPositions.forEach((pos, index) => {
        const post = new THREE.Mesh(postGeometry, woodMaterial);
        post.position.set(pos[0], pos[1], pos[2]);
        post.castShadow = true;
        post.name = `Furniture_Bed_Post_${index + 1}`;
        bedGroup.add(post);
    });

    // Top frame beams connecting posts
    // Long beams (along length)
    const longBeam = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 2.2),
        woodMaterial
    );
    longBeam.position.set(-0.96, 2.2, 0);
    longBeam.castShadow = true;
    bedGroup.add(longBeam);

    const longBeam2 = longBeam.clone();
    longBeam2.position.set(0.96, 2.2, 0);
    bedGroup.add(longBeam2);

    // Short beams (along width)
    const shortBeam = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.08, 0.08),
        woodMaterial
    );
    shortBeam.position.set(0, 2.2, -1.06);
    shortBeam.castShadow = true;
    bedGroup.add(shortBeam);

    const shortBeam2 = shortBeam.clone();
    shortBeam2.position.set(0, 2.2, 1.06);
    bedGroup.add(shortBeam2);

    // Mattress (1.9m x 2.1m x 0.3m)
    const mattress = new THREE.Mesh(
        new THREE.BoxGeometry(1.9, 0.3, 2.1),
        whiteMaterial
    );
    mattress.position.y = 0.65;
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // Blanket (simplified as a plane with slight elevation)
    const blanket = new THREE.Mesh(
        new THREE.BoxGeometry(1.9, 0.05, 2.1),
        grayMaterial
    );
    blanket.position.y = 0.85;
    blanket.castShadow = true;
    blanket.receiveShadow = true;
    bedGroup.add(blanket);

    // Pillows (2 simple boxes)
    const pillowGeometry = new THREE.BoxGeometry(0.6, 0.15, 0.4);
    const pillow1 = new THREE.Mesh(pillowGeometry, whiteMaterial);
    pillow1.position.set(-0.4, 0.95, -0.8);
    pillow1.castShadow = true;
    bedGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(pillowGeometry, whiteMaterial);
    pillow2.position.set(0.4, 0.95, -0.8);
    pillow2.castShadow = true;
    bedGroup.add(pillow2);

    return bedGroup;
}
