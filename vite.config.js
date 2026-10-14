import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (id.includes('/three/examples/jsm/exporters/GLTFExporter.js')) {
            return 'gltf-exporter';
          }

          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'react-vendor';
          }

          if (id.includes('/three/')) {
            return 'three-core';
          }

          if (
            id.includes('/@react-three/fiber/') ||
            id.includes('/@react-three/drei/') ||
            id.includes('/three-stdlib/') ||
            id.includes('/@use-gesture/') ||
            id.includes('/maath/') ||
            id.includes('/suspend-react/') ||
            id.includes('/zustand/')
          ) {
            return 'r3f-vendor';
          }

          if (id.includes('/@react-three/postprocessing/') || id.includes('/postprocessing/')) {
            return 'postprocessing-vendor';
          }

          if (
            id.includes('/leva/') ||
            id.includes('/@radix-ui/') ||
            id.includes('/react-colorful/') ||
            id.includes('/use-sync-external-store/')
          ) {
            return 'controls-vendor';
          }

          return 'vendor';
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
