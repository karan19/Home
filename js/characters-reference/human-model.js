/**
 * Human Character Model
 * Creates a detailed segmented human with 14 body parts
 */

import * as THREE from 'three';

/**
 * Create a detailed human character model
 * @returns {Object} Object containing character group and body part references
 */
export function createHumanModel() {
    const characterGroup = new THREE.Group();
    characterGroup.name = 'Character_Human';

    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFDBAC, // Peach/tan skin tone
        roughness: 0.6,
        metalness: 0.0
    });

    const shirtMaterial = new THREE.MeshStandardMaterial({
        color: 0x4169E1, // Royal blue
        roughness: 0.7,
        metalness: 0.0
    });

    const pantsMaterial = new THREE.MeshStandardMaterial({
        color: 0x2F4F4F, // Dark gray
        roughness: 0.8,
        metalness: 0.0
    });

    const shoesMaterial = new THREE.MeshStandardMaterial({
        color: 0x1C1C1C, // Black
        roughness: 0.5,
        metalness: 0.1
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A2511, // Brown
        roughness: 0.8,
        metalness: 0.0
    });

    // Body proportions (1.7m tall adult male)
    const proportions = {
        headRadius: 0.1,
        neckHeight: 0.08,
        torsoUpperHeight: 0.3,
        torsoLowerHeight: 0.2,
        torsoWidth: 0.35,
        armUpperLength: 0.25,
        armLowerLength: 0.25,
        armRadius: 0.04,
        handSize: 0.06,
        legUpperLength: 0.4,
        legLowerLength: 0.4,
        legRadius: 0.06,
        footLength: 0.15,
        footHeight: 0.05,
        shoulderWidth: 0.45
    };

    // Create body parts with proper hierarchy
    const bodyParts = {};

    // === TORSO (root) ===
    bodyParts.torsoLower = new THREE.Group();
    bodyParts.torsoLower.name = 'Torso_Lower';
    characterGroup.add(bodyParts.torsoLower);

    const torsoLowerMesh = new THREE.Mesh(
        new THREE.BoxGeometry(proportions.torsoWidth, proportions.torsoLowerHeight, 0.2),
        pantsMaterial
    );
    torsoLowerMesh.castShadow = true;
    bodyParts.torsoLower.add(torsoLowerMesh);

    // === UPPER TORSO ===
    bodyParts.torsoUpper = new THREE.Group();
    bodyParts.torsoUpper.name = 'Torso_Upper';
    bodyParts.torsoUpper.position.y = proportions.torsoLowerHeight / 2 + proportions.torsoUpperHeight / 2;
    bodyParts.torsoLower.add(bodyParts.torsoUpper);

    const torsoUpperMesh = new THREE.Mesh(
        new THREE.BoxGeometry(proportions.torsoWidth, proportions.torsoUpperHeight, 0.18),
        shirtMaterial
    );
    torsoUpperMesh.castShadow = true;
    bodyParts.torsoUpper.add(torsoUpperMesh);

    // === NECK ===
    bodyParts.neck = new THREE.Group();
    bodyParts.neck.name = 'Neck';
    bodyParts.neck.position.y = proportions.torsoUpperHeight / 2 + proportions.neckHeight / 2;
    bodyParts.torsoUpper.add(bodyParts.neck);

    const neckMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, proportions.neckHeight, 8),
        skinMaterial
    );
    neckMesh.castShadow = true;
    bodyParts.neck.add(neckMesh);

    // === HEAD ===
    bodyParts.head = new THREE.Group();
    bodyParts.head.name = 'Head';
    bodyParts.head.position.y = proportions.neckHeight / 2 + proportions.headRadius;
    bodyParts.neck.add(bodyParts.head);

    const headMesh = new THREE.Mesh(
        new THREE.SphereGeometry(proportions.headRadius, 16, 16),
        skinMaterial
    );
    headMesh.castShadow = true;
    bodyParts.head.add(headMesh);

    // Hair
    const hair = new THREE.Mesh(
        new THREE.SphereGeometry(proportions.headRadius * 1.05, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6),
        hairMaterial
    );
    hair.position.y = proportions.headRadius * 0.3;
    hair.castShadow = true;
    bodyParts.head.add(hair);

    // Simple face features
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 8, 8),
        eyeMaterial
    );
    leftEye.position.set(-0.035, 0.02, proportions.headRadius * 0.9);
    bodyParts.head.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.set(0.035, 0.02, proportions.headRadius * 0.9);
    bodyParts.head.add(rightEye);

    // === ARMS ===
    // Left Arm
    bodyParts.leftUpperArm = new THREE.Group();
    bodyParts.leftUpperArm.name = 'Arm_Left_Upper';
    bodyParts.leftUpperArm.position.set(
        -proportions.shoulderWidth / 2,
        proportions.torsoUpperHeight / 2 - 0.05,
        0
    );
    bodyParts.torsoUpper.add(bodyParts.leftUpperArm);

    const leftUpperArmMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(proportions.armRadius, proportions.armRadius, proportions.armUpperLength, 8),
        shirtMaterial
    );
    leftUpperArmMesh.position.y = -proportions.armUpperLength / 2;
    leftUpperArmMesh.castShadow = true;
    bodyParts.leftUpperArm.add(leftUpperArmMesh);

    bodyParts.leftLowerArm = new THREE.Group();
    bodyParts.leftLowerArm.name = 'Arm_Left_Lower';
    bodyParts.leftLowerArm.position.y = -proportions.armUpperLength;
    bodyParts.leftUpperArm.add(bodyParts.leftLowerArm);

    const leftLowerArmMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(proportions.armRadius * 0.9, proportions.armRadius * 0.8, proportions.armLowerLength, 8),
        skinMaterial
    );
    leftLowerArmMesh.position.y = -proportions.armLowerLength / 2;
    leftLowerArmMesh.castShadow = true;
    bodyParts.leftLowerArm.add(leftLowerArmMesh);

    bodyParts.leftHand = new THREE.Mesh(
        new THREE.BoxGeometry(proportions.handSize, proportions.handSize, proportions.handSize * 0.6),
        skinMaterial
    );
    bodyParts.leftHand.position.y = -proportions.armLowerLength;
    bodyParts.leftHand.castShadow = true;
    bodyParts.leftLowerArm.add(bodyParts.leftHand);

    // Right Arm (mirror of left)
    bodyParts.rightUpperArm = new THREE.Group();
    bodyParts.rightUpperArm.name = 'Arm_Right_Upper';
    bodyParts.rightUpperArm.position.set(
        proportions.shoulderWidth / 2,
        proportions.torsoUpperHeight / 2 - 0.05,
        0
    );
    bodyParts.torsoUpper.add(bodyParts.rightUpperArm);

    const rightUpperArmMesh = leftUpperArmMesh.clone();
    bodyParts.rightUpperArm.add(rightUpperArmMesh);

    bodyParts.rightLowerArm = new THREE.Group();
    bodyParts.rightLowerArm.name = 'Arm_Right_Lower';
    bodyParts.rightLowerArm.position.y = -proportions.armUpperLength;
    bodyParts.rightUpperArm.add(bodyParts.rightLowerArm);

    const rightLowerArmMesh = leftLowerArmMesh.clone();
    bodyParts.rightLowerArm.add(rightLowerArmMesh);

    bodyParts.rightHand = bodyParts.leftHand.clone();
    bodyParts.rightHand.position.y = -proportions.armLowerLength;
    bodyParts.rightLowerArm.add(bodyParts.rightHand);

    // === LEGS ===
    // Left Leg
    bodyParts.leftUpperLeg = new THREE.Group();
    bodyParts.leftUpperLeg.name = 'Leg_Left_Upper';
    bodyParts.leftUpperLeg.position.set(-0.1, -proportions.torsoLowerHeight / 2, 0);
    bodyParts.torsoLower.add(bodyParts.leftUpperLeg);

    const leftUpperLegMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(proportions.legRadius, proportions.legRadius * 0.9, proportions.legUpperLength, 8),
        pantsMaterial
    );
    leftUpperLegMesh.position.y = -proportions.legUpperLength / 2;
    leftUpperLegMesh.castShadow = true;
    bodyParts.leftUpperLeg.add(leftUpperLegMesh);

    bodyParts.leftLowerLeg = new THREE.Group();
    bodyParts.leftLowerLeg.name = 'Leg_Left_Lower';
    bodyParts.leftLowerLeg.position.y = -proportions.legUpperLength;
    bodyParts.leftUpperLeg.add(bodyParts.leftLowerLeg);

    const leftLowerLegMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(proportions.legRadius * 0.8, proportions.legRadius * 0.7, proportions.legLowerLength, 8),
        pantsMaterial
    );
    leftLowerLegMesh.position.y = -proportions.legLowerLength / 2;
    leftLowerLegMesh.castShadow = true;
    bodyParts.leftLowerLeg.add(leftLowerLegMesh);

    bodyParts.leftFoot = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, proportions.footHeight, proportions.footLength),
        shoesMaterial
    );
    bodyParts.leftFoot.position.set(0, -proportions.legLowerLength - proportions.footHeight / 2, proportions.footLength / 2 - 0.03);
    bodyParts.leftFoot.castShadow = true;
    bodyParts.leftLowerLeg.add(bodyParts.leftFoot);

    // Right Leg (mirror of left)
    bodyParts.rightUpperLeg = new THREE.Group();
    bodyParts.rightUpperLeg.name = 'Leg_Right_Upper';
    bodyParts.rightUpperLeg.position.set(0.1, -proportions.torsoLowerHeight / 2, 0);
    bodyParts.torsoLower.add(bodyParts.rightUpperLeg);

    const rightUpperLegMesh = leftUpperLegMesh.clone();
    bodyParts.rightUpperLeg.add(rightUpperLegMesh);

    bodyParts.rightLowerLeg = new THREE.Group();
    bodyParts.rightLowerLeg.name = 'Leg_Right_Lower';
    bodyParts.rightLowerLeg.position.y = -proportions.legUpperLength;
    bodyParts.rightUpperLeg.add(bodyParts.rightLowerLeg);

    const rightLowerLegMesh = leftLowerLegMesh.clone();
    bodyParts.rightLowerLeg.add(rightLowerLegMesh);

    bodyParts.rightFoot = bodyParts.leftFoot.clone();
    bodyParts.rightFoot.position.set(0, -proportions.legLowerLength - proportions.footHeight / 2, proportions.footLength / 2 - 0.03);
    bodyParts.rightLowerLeg.add(bodyParts.rightFoot);

    return {
        group: characterGroup,
        parts: bodyParts,
        proportions: proportions
    };
}
