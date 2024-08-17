import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://varadportfolio.web.app', // Replace with your domain
      routes: [
        '/',
      ]
    })
  ],
  build: {
    outDir: 'dist'
  }
});
