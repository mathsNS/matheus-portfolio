import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Set VITE_BASE_PATH=/repo-name/ for GitHub project pages.
// The workflow computes this automatically from the repository name.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || '/',
  build: { target: 'es2022', cssCodeSplit: true },
});
