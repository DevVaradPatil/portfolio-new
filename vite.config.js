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
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          spline: ['@splinetool/react-spline', '@splinetool/r3f-spline'],
          animation: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    },
    // Optimize asset handling
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: false, // Disable in production for smaller builds
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    }
  },
  server: {
    headers: {
      // Cache headers for development
      'Cache-Control': 'public, max-age=3600'
    }
  },
  preview: {
    headers: {
      // Cache headers for preview
      'Cache-Control': 'public, max-age=86400'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@splinetool/react-spline',
      'framer-motion',
      'three'
    ],
    exclude: ['@splinetool/r3f-spline'] // Exclude problematic deps
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
