import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output folder for production build
  },
  server: {
    port: 3000, // Local development server port
  },
  resolve: {
    alias: {
      '@': '/src', // Shortcut for src folder
    },
  },
});
