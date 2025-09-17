import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Shoes-E-commerce-Website/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist'
  },
  server: {
    port: 3001
  }
})

