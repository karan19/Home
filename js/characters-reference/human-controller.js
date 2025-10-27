/**
 * Human Animation Controller - Ultra-Realistic Version
 * Implements all realistic stair climbing behaviors
 */

import * as THREE from 'three';
import { createHumanModel } from './human-model.js';

/**
 * Create and control an animated human character with ultra-realistic climbing
 * @returns {Object} Character controller with update method
 */
export function createHumanCharacter() {
    // Create the human model
    const humanData = createHumanModel();
    const character = humanData.group;
    const parts = humanData.parts;
    const proportions = humanData.proportions;

    // Enhanced animation state
    const state = {
        // Movement
        currentWaypointIndex: 0,
        walkCycle: 0,
        speed: 1.4,
        isClimbing: false,
        finished: false,
        time: 0,
        
        // Step-aware climbing
        currentStep: 0,
        stepPhase: 0, // 0-6: approach, lift, reach, place, pause, push-off, rise
        isOnStairs: false,
        stepTimer: 0,
        
        // Realism features
        pauseTimer: 0,
        isPaused: false,
        breathCycle: 0,
        lookDownAngle: 0,
        targetLookAngle: 0,
        fatigueLevel: 0,
        weightOnLeftFoot: 0.5,
        hipShiftX: 0,
        pushOffProgress: 0,
        
        // Foot mechanics
        leftFootAngle: 0,
        rightFootAngle: 0,
        leftHeelContact: false,
        rightHeelContact: false
    };

    // Define complete journey path
    const waypoints = generateJourneyPath();

    // Position character at start
    const startPos = waypoints[0];
    character.position.set(startPos.x, startPos.y, startPos.z);

    /**
     * Generate complete journey path
     */
    function generateJourneyPath() {
        const path = [];

        // Start at kitchen island
        path.push({ x: -1.5, y: 0.85, z: -1.5, type: 'walk' });

        // Walk to stairs
        path.push({ x: -2.0, y: 0.85, z: 0, type: 'walk' });
        path.push({ x: -2.5, y: 0.85, z: 2.0, type: 'walk' });
        path.push({ x: -2.75, y: 0.85, z: 3.85, type: 'walk' });

        // Climb stairs (12 steps)
        const stairStartX = -2.75;
        const stairStartZ = 3.85;
        const treadDepth = 0.28;
        const riserHeight = 0.25;

        for (let i = 0; i < 12; i++) {
            const y = 0.85 + (riserHeight * (i + 1));
            const z = stairStartZ - (treadDepth * (i + 0.5));
            path.push({ x: stairStartX, y: y, z: z, type: 'climb', stepNum: i + 1 });
        }

        // First floor navigation
        path.push({ x: -2.75, y: 3.85, z: 0.5, type: 'walk' });
        path.push({ x: -2.0, y: 3.85, z: 0, type: 'walk' });
        path.push({ x: -1.0, y: 3.85, z: -0.5, type: 'walk' });
        path.push({ x: 0, y: 3.85, z: -1.0, type: 'walk' });
        path.push({ x: 1.0, y: 3.85, z: -1.5, type: 'walk' });
        path.push({ x: 1.8, y: 3.85, z: -1.8, type: 'walk' });
        path.push({ x: 2.0, y: 3.85, z: -2.0, type: 'walk' });

        return path;
    }

    /**
     * Main update function
     */
    function update(deltaTime) {
        if (state.finished) return;

        state.time += deltaTime;
        state.breathCycle += deltaTime * 1.5; // Breathing rhythm

        // Get current and next waypoint
        const current = waypoints[state.currentWaypointIndex];
        const next = waypoints[state.currentWaypointIndex + 1];

        if (!next) {
            state.finished = true;
            console.log('Character arrived at destination!');
            return;
        }

        // Check if we're on stairs
        const wasClimbing = state.isClimbing;
        state.isClimbing = next.type === 'climb';

        // Initialize climbing state
        if (state.isClimbing && !wasClimbing) {
            state.isOnStairs = true;
            state.currentStep = 0;
            state.stepPhase = 0;
            state.stepTimer = 0;
            state.targetLookAngle = -0.5; // Look down at stairs
            console.log('Starting ultra-realistic stair climb');
        }

        // Exit climbing state
        if (!state.isClimbing && wasClimbing) {
            state.isOnStairs = false;
            state.targetLookAngle = 0; // Look forward
            console.log('Finished climbing stairs');
        }

        // Handle pause on step
        if (state.isPaused) {
            state.pauseTimer += deltaTime;
            const pauseDuration = 0.4 + (state.fatigueLevel * 0.2); // Longer pauses when tired
            
            if (state.pauseTimer >= pauseDuration) {
                state.isPaused = false;
                state.pauseTimer = 0;
            } else {
                // During pause, only animate breathing and subtle sway
                animateBreathing(parts, state.breathCycle);
                animateSubtleSway(parts, state.time);
                smoothHeadMovement(parts, state, deltaTime);
                return; // Don't move during pause
            }
        }

        // Calculate movement
        const direction = new THREE.Vector3(
            next.x - character.position.x,
            next.y - character.position.y,
            next.z - character.position.z
        );
        const distance = direction.length();

        // Check if reached waypoint
        if (distance < 0.05) {
            if (state.isClimbing) {
                state.currentStep++;
                state.fatigueLevel = state.currentStep / 12; // Increases with each step
                console.log(`Step ${state.currentStep}/12 - Pausing to stabilize`);
                
                // Trigger pause on step
                state.isPaused = true;
                state.pauseTimer = 0;
            }
            state.currentWaypointIndex++;
            return;
        }

        // Move toward next waypoint
        direction.normalize();
        
        // Adjust speed based on fatigue and terrain
        let moveSpeed = state.speed;
        if (state.isClimbing) {
            // Slower on stairs, even slower as fatigue increases
            moveSpeed = state.speed * (0.35 - state.fatigueLevel * 0.1);
        }
        
        const moveDistance = moveSpeed * deltaTime;

        character.position.x += direction.x * moveDistance;
        character.position.y += direction.y * moveDistance;
        character.position.z += direction.z * moveDistance;

        // Rotate character to face movement direction
        const angle = Math.atan2(direction.x, direction.z);
        character.rotation.y = angle;

        // Update animations
        if (state.isClimbing) {
            state.walkCycle += deltaTime * 1.5; // Slower cycle for stairs
            animateUltraRealisticClimbing(parts, state, deltaTime);
        } else {
            state.walkCycle += deltaTime * 3.0;
            animateWalking(parts, state.walkCycle);
        }

        // Always update breathing
        animateBreathing(parts, state.breathCycle);
        
        // Smooth head movement
        smoothHeadMovement(parts, state, deltaTime);
    }

    /**
     * Animate realistic walking
     */
    function animateWalking(parts, cycle) {
        const legSwing = Math.sin(cycle) * 0.5;
        const armSwing = Math.sin(cycle) * 0.35;
        const bodyBob = Math.abs(Math.sin(cycle * 2)) * 0.03;

        parts.leftUpperLeg.rotation.x = legSwing;
        parts.rightUpperLeg.rotation.x = -legSwing;
        parts.leftLowerLeg.rotation.x = Math.max(0, -legSwing * 0.8);
        parts.rightLowerLeg.rotation.x = Math.max(0, legSwing * 0.8);

        parts.leftUpperArm.rotation.x = -armSwing;
        parts.rightUpperArm.rotation.x = armSwing;
        parts.leftLowerArm.rotation.x = Math.abs(armSwing) * 0.3;
        parts.rightLowerArm.rotation.x = Math.abs(armSwing) * 0.3;

        parts.torsoLower.position.y = bodyBob;
        parts.torsoUpper.rotation.y = Math.sin(cycle) * 0.05;

        // Reset climbing-specific rotations
        parts.torsoUpper.rotation.x = 0;
        parts.torsoLower.rotation.x = 0;
        parts.torsoLower.rotation.z = 0;
        parts.torsoLower.position.x = 0;
    }

    /**
     * Ultra-realistic stair climbing animation
     */
    function animateUltraRealisticClimbing(parts, state, deltaTime) {
        const isLeftFootLeading = state.currentStep % 2 === 0;
        const stepCycle = (state.walkCycle % (Math.PI * 2)) / (Math.PI * 2);
        
        // 7-phase realistic step cycle
        let leftLegLift = 0, rightLegLift = 0;
        let leftKneeBend = 0, rightKneeBend = 0;
        let leftAnkle = 0, rightAnkle = 0;
        
        // Determine current phase
        let currentPhase;
        if (stepCycle < 0.1) currentPhase = 'approach';
        else if (stepCycle < 0.3) currentPhase = 'lift';
        else if (stepCycle < 0.45) currentPhase = 'reach';
        else if (stepCycle < 0.6) currentPhase = 'place';
        else if (stepCycle < 0.75) currentPhase = 'push';
        else currentPhase = 'rise';

        if (isLeftFootLeading) {
            // LEFT FOOT LEADS - FORWARD MOTION
            switch(currentPhase) {
                case 'approach': // Prepare to lift
                    const prepProgress = stepCycle / 0.1;
                    leftLegLift = -prepProgress * 0.2; // Slight forward
                    leftKneeBend = prepProgress * 0.3;
                    leftAnkle = 0;
                    rightLegLift = 0;
                    rightKneeBend = 0.2;
                    rightAnkle = -0.2;
                    state.weightOnLeftFoot = 0.2;
                    break;
                    
                case 'lift': // Lift left foot FORWARD and UP
                    const liftProgress = (stepCycle - 0.1) / 0.2;
                    leftLegLift = -0.2 - liftProgress * 0.6; // NEGATIVE = FORWARD
                    leftKneeBend = 0.3 + liftProgress * 1.2;
                    leftAnkle = liftProgress * 0.4;
                    rightLegLift = 0;
                    rightKneeBend = 0.2 + liftProgress * 0.3;
                    rightAnkle = -0.2 - liftProgress * 0.2;
                    state.weightOnLeftFoot = 0.1;
                    state.pushOffProgress = liftProgress;
                    break;
                    
                case 'reach': // Extend foot FORWARD toward tread
                    const reachProgress = (stepCycle - 0.3) / 0.15;
                    leftLegLift = -0.8; // Maximum forward extension
                    leftKneeBend = 1.5 - reachProgress * 0.5;
                    leftAnkle = 0.4 - reachProgress * 0.2;
                    rightLegLift = 0;
                    rightKneeBend = 0.5;
                    rightAnkle = -0.4;
                    state.weightOnLeftFoot = 0.1;
                    break;
                    
                case 'place': // Heel strikes, foot rolls down
                    const placeProgress = (stepCycle - 0.45) / 0.15;
                    leftLegLift = -0.8 + placeProgress * 0.4; // Leg comes back as weight transfers
                    leftKneeBend = 1.0 - placeProgress * 0.7;
                    leftAnkle = 0.2 - placeProgress * 0.4;
                    rightLegLift = 0;
                    rightKneeBend = 0.5;
                    rightAnkle = -0.4;
                    state.weightOnLeftFoot = 0.1 + placeProgress * 0.4;
                    state.leftHeelContact = placeProgress > 0.3;
                    break;
                    
                case 'push': // Push off with right foot
                    const pushProgress = (stepCycle - 0.6) / 0.15;
                    leftLegLift = -0.4 + pushProgress * 0.2; // Planted leg
                    leftKneeBend = 0.3 - pushProgress * 0.1;
                    leftAnkle = -0.2;
                    rightLegLift = -pushProgress * 0.2; // Start moving forward
                    rightKneeBend = 0.5 + pushProgress * 0.5;
                    rightAnkle = -0.4 + pushProgress * 0.6;
                    state.weightOnLeftFoot = 0.5 + pushProgress * 0.3;
                    state.pushOffProgress = pushProgress;
                    break;
                    
                case 'rise': // Bring right foot FORWARD to same step
                    const riseProgress = (stepCycle - 0.75) / 0.25;
                    leftLegLift = -0.2; // Slightly forward
                    leftKneeBend = 0.2;
                    leftAnkle = -0.2;
                    rightLegLift = -0.2 - riseProgress * 0.5; // FORWARD motion
                    rightKneeBend = 1.0 + riseProgress * 0.3;
                    rightAnkle = riseProgress * 0.3;
                    state.weightOnLeftFoot = 0.8 - riseProgress * 0.3;
                    break;
            }
        } else {
            // RIGHT FOOT LEADS - FORWARD MOTION
            switch(currentPhase) {
                case 'approach':
                    const prepProgress = stepCycle / 0.1;
                    rightLegLift = -prepProgress * 0.2;
                    rightKneeBend = prepProgress * 0.3;
                    rightAnkle = 0;
                    leftLegLift = 0;
                    leftKneeBend = 0.2;
                    leftAnkle = -0.2;
                    state.weightOnLeftFoot = 0.8;
                    break;
                    
                case 'lift':
                    const liftProgress = (stepCycle - 0.1) / 0.2;
                    rightLegLift = -0.2 - liftProgress * 0.6; // NEGATIVE = FORWARD
                    rightKneeBend = 0.3 + liftProgress * 1.2;
                    rightAnkle = liftProgress * 0.4;
                    leftLegLift = 0;
                    leftKneeBend = 0.2 + liftProgress * 0.3;
                    leftAnkle = -0.2 - liftProgress * 0.2;
                    state.weightOnLeftFoot = 0.9;
                    state.pushOffProgress = liftProgress;
                    break;
                    
                case 'reach':
                    const reachProgress = (stepCycle - 0.3) / 0.15;
                    rightLegLift = -0.8; // Maximum forward extension
                    rightKneeBend = 1.5 - reachProgress * 0.5;
                    rightAnkle = 0.4 - reachProgress * 0.2;
                    leftLegLift = 0;
                    leftKneeBend = 0.5;
                    leftAnkle = -0.4;
                    state.weightOnLeftFoot = 0.9;
                    break;
                    
                case 'place':
                    const placeProgress = (stepCycle - 0.45) / 0.15;
                    rightLegLift = -0.8 + placeProgress * 0.4;
                    rightKneeBend = 1.0 - placeProgress * 0.7;
                    rightAnkle = 0.2 - placeProgress * 0.4;
                    leftLegLift = 0;
                    leftKneeBend = 0.5;
                    leftAnkle = -0.4;
                    state.weightOnLeftFoot = 0.9 - placeProgress * 0.4;
                    state.rightHeelContact = placeProgress > 0.3;
                    break;
                    
                case 'push':
                    const pushProgress = (stepCycle - 0.6) / 0.15;
                    rightLegLift = -0.4 + pushProgress * 0.2;
                    rightKneeBend = 0.3 - pushProgress * 0.1;
                    rightAnkle = -0.2;
                    leftLegLift = -pushProgress * 0.2; // Start moving forward
                    leftKneeBend = 0.5 + pushProgress * 0.5;
                    leftAnkle = -0.4 + pushProgress * 0.6;
                    state.weightOnLeftFoot = 0.5 - pushProgress * 0.3;
                    state.pushOffProgress = pushProgress;
                    break;
                    
                case 'rise':
                    const riseProgress = (stepCycle - 0.75) / 0.25;
                    rightLegLift = -0.2;
                    rightKneeBend = 0.2;
                    rightAnkle = -0.2;
                    leftLegLift = -0.2 - riseProgress * 0.5; // FORWARD motion
                    leftKneeBend = 1.0 + riseProgress * 0.3;
                    leftAnkle = riseProgress * 0.3;
                    state.weightOnLeftFoot = 0.2 + riseProgress * 0.3;
                    break;
            }
        }

        // Apply leg animations - legs rotate FORWARD (negative X)
        parts.leftUpperLeg.rotation.x = leftLegLift;
        parts.rightUpperLeg.rotation.x = rightLegLift;
        parts.leftLowerLeg.rotation.x = leftKneeBend;
        parts.rightLowerLeg.rotation.x = rightKneeBend;

        // Apply foot angles (ankle flexion)
        if (parts.leftFoot) parts.leftFoot.rotation.x = leftAnkle;
        if (parts.rightFoot) parts.rightFoot.rotation.x = rightAnkle;

        // Weight transfer - hip shift
        state.hipShiftX = (state.weightOnLeftFoot - 0.5) * 0.12;
        parts.torsoLower.position.x = state.hipShiftX;
        
        // Body lean toward support leg
        parts.torsoLower.rotation.z = -state.hipShiftX * 0.5;

        // Arms for balance
        animateBalanceArms(parts, state, isLeftFootLeading);

        // Body lean forward from ankles
        parts.torsoUpper.rotation.x = 0.18; // Forward lean
        parts.torsoLower.rotation.x = 0.08;

        // Hip and shoulder rotation
        const hipRotation = Math.sin(state.walkCycle) * 0.08;
        parts.torsoLower.rotation.y = hipRotation;
        parts.torsoUpper.rotation.y = -hipRotation * 0.6; // Counter-rotation

        // Breathing
        animateBreathing(parts, state.breathCycle);
        
        // Head movement
        smoothHeadMovement(parts, state, deltaTime);
        
        // Subtle body sway
        animateSubtleSway(parts, state.time);
    }

    /**
     * Animate breathing (chest expansion)
     */
    function animateBreathing(parts, breathCycle) {
        const breathAmount = Math.sin(breathCycle * 0.5) * 0.04; // Slow breathing
        parts.torsoUpper.scale.z = 1.0 + breathAmount;
        
        // Shoulders rise slightly with inhale
        const shoulderRise = breathAmount * 0.5;
        parts.leftUpperArm.position.y = shoulderRise;
        parts.rightUpperArm.position.y = shoulderRise;
    }

    /**
     * Smooth head movement (looking down at stairs)
     */
    function smoothHeadMovement(parts, state, deltaTime) {
        // Gradually adjust head angle toward target
        const lerpSpeed = 2.0;
        state.lookDownAngle += (state.targetLookAngle - state.lookDownAngle) * lerpSpeed * deltaTime;
        
        // Apply head rotation
        parts.head.rotation.x = state.lookDownAngle;
        
        // Periodic glances down (every 3 steps)
        if (state.isClimbing && state.currentStep % 3 === 0 && stepCycle < 0.2) {
            state.targetLookAngle = -0.6; // Look down
        } else if (state.isClimbing && state.currentStep > 8) {
            state.targetLookAngle = -0.2; // Look more forward near top
        }
    }

    /**
     * Animate arms for balance
     */
    function animateBalanceArms(parts, state, isLeftLeading) {
        const balanceExtension = 0.3; // Arms out for balance
        const reachAmount = state.pushOffProgress * 0.4;
        
        // Leading arm reaches forward/up
        if (isLeftLeading) {
            parts.leftUpperArm.rotation.x = -balanceExtension - reachAmount;
            parts.leftUpperArm.rotation.z = -0.2; // Slightly out
            parts.rightUpperArm.rotation.x = -balanceExtension + reachAmount * 0.5;
            parts.rightUpperArm.rotation.z = 0.2;
        } else {
            parts.rightUpperArm.rotation.x = -balanceExtension - reachAmount;
            parts.rightUpperArm.rotation.z = 0.2;
            parts.leftUpperArm.rotation.x = -balanceExtension + reachAmount * 0.5;
            parts.leftUpperArm.rotation.z = -0.2;
        }
        
        // Elbow bend for reaching
        parts.leftLowerArm.rotation.x = 0.4 + reachAmount * 0.3;
        parts.rightLowerArm.rotation.x = 0.4 + reachAmount * 0.3;
    }

    /**
     * Subtle body sway for realism
     */
    function animateSubtleSway(parts, time) {
        const swayX = Math.sin(time * 1.5) * 0.015;
        const swayZ = Math.cos(time * 1.8) * 0.01;
        
        parts.torsoUpper.position.x = (parts.torsoUpper.position.x || 0) + swayX * 0.1;
        parts.torsoUpper.position.z = swayZ;
    }

    return {
        group: character,
        update: update,
        finished: () => state.finished
    };
}
