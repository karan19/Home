/**
 * Kitchen Island Component
 * Creates kitchen island with countertop, decorative bowl, and fruit
 */

import * as THREE from 'three';
import { createBarStool } from './bar-stool.js';

/**
 * Create kitchen island with bar stools
 * @returns {THREE.Group} Island group
 */
export function createKitchenIsland() {
    const islandGroup = new THREE.Group();
    islandGroup.name = 'Kitchen_Island';

    const cabinetMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.3,
        metalness: 0.0
    });

    const countertopMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0E0E0,
        roughness: 0.2,
        metalness: 0.0
    });

    // Island base (1.5m x 0.8m x 0.9m)
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.9, 0.8),
        cabinetMaterial
    );
    base.position.y = 0.45;
    base.castShadow = true;
    base.receiveShadow = true;
    islandGroup.add(base);

    // Countertop (1.6m x 0.85m x 0.05m)
    const countertop = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.05, 0.85),
        countertopMaterial
    );
    countertop.position.y = 0.925;
    countertop.castShadow = true;
    countertop.receiveShadow = true;
    islandGroup.add(countertop);

    // Bar stools (2 stools)
    const stool1 = createBarStool();
    stool1.position.set(-0.5, 0, 0.6);
    islandGroup.add(stool1);

    const stool2 = createBarStool();
    stool2.position.set(0.5, 0, 0.6);
    islandGroup.add(stool2);

    // Decorative bowl on island
    const bowl = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 })
    );
    bowl.position.set(0, 0.95, 0);
    bowl.castShadow = true;
    islandGroup.add(bowl);

    // Fruit in bowl (3 spheres)
    const fruitColors = [0xFF6347, 0xFFD700, 0x32CD32]; // Red, yellow, green
    fruitColors.forEach((color, i) => {
        const fruit = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
        );
        fruit.position.set(-0.08 + i * 0.08, 0.98, 0);
        fruit.castShadow = true;
        islandGroup.add(fruit);
    });

    return islandGroup;
}
