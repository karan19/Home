import React, { useCallback, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { exportObjectAsGlb } from '../utils/exportGlb';

const INITIAL_CAMERA_POSITION = [-10, 10, 22];
const INITIAL_CAMERA_TARGET = [0, 3, 0];

function SceneController({ controlsRef, modelRef, onActionsReady }) {
  const { camera, gl } = useThree();
  const tvView = useRef(false);

  const resetCamera = useCallback(() => {
    tvView.current = false;
    camera.position.set(...INITIAL_CAMERA_POSITION);
    camera.lookAt(...INITIAL_CAMERA_TARGET);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.minDistance = 5;
      controlsRef.current.target.set(...INITIAL_CAMERA_TARGET);
      controlsRef.current.update();
    }
  }, [camera, controlsRef]);

  useEffect(() => {
    const setTVView = event => { tvView.current = Boolean(event.detail); };
    const escape = event => {
      if (event.key === 'Escape') resetCamera();
    };
    const scrollOut = event => {
      if (!tvView.current || event.deltaY <= 0) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      resetCamera();
    };
    window.addEventListener('house-tv-view', setTVView);
    window.addEventListener('keydown', escape);
    gl.domElement.addEventListener('wheel', scrollOut, { capture: true, passive: false });
    return () => {
      window.removeEventListener('house-tv-view', setTVView);
      window.removeEventListener('keydown', escape);
      gl.domElement.removeEventListener('wheel', scrollOut, true);
    };
  }, [gl, resetCamera]);

  const exportGlb = useCallback(() => {
    return exportObjectAsGlb(modelRef.current, 'modern-house-cutaway.glb');
  }, [modelRef]);

  useEffect(() => {
    onActionsReady({ resetCamera, exportGlb });
    return () => onActionsReady(null);
  }, [exportGlb, onActionsReady, resetCamera]);

  return null;
}

export default SceneController;
