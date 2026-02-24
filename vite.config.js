import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/vip-originality-checker/',
  build: {
    outDir: 'dist',
  },
});
