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
        'images/testimonials/persone-1.jpg',
        'images/testimonials/persone-2.jpg',
        'images/shoes/shoes-1.png',
        'images/shoes/shoes-2.png',
        'images/shoes/shoes-3.png',
        'images/shoes/shoes-4.png',
        'images/shoes/shoes-5.png',
        'images/shoes/shoes-6.png'
      ]
    }
  },
  server: {
    port: 3001
  }
})

