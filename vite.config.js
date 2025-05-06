import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // Optional: Set a custom development server port
  },
  build: {
    outDir: 'dist', // Optional: Change the build output directory
  },
});
