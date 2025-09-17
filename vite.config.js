import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Shoes-E-commerce-Website/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    rollupOptions: {
      external: [
        '/images/testimonials/persone-1.jpg',
        '/images/testimonials/persone-2.jpg'
      ]
    }
  },
  server: {
    port: 3001
  }
})

