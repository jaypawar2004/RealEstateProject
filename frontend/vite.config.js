import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default 'dist', isko change karke 'build' kar diya
  },
  server: {
    proxy: {
      "/api": {
        target: "http://159.65.159.15:5000", // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },

});
