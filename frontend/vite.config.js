import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output folder for production build
  },
  server: {
    host: '0.0.0.0',
    
  },
  resolve: {
    alias: {
      '@': '/src', // Shortcut for src folder
    },
  },
});
