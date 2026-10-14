import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    // Let Rollup order React and its CommonJS dependents together. Splitting
    // these by package created circular chunks that read React before init.

  },
  server: {
    port: 3000,
    open: true
  }
});
