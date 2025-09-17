import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/e-commerce/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist'
  },
  server: {
    port: 3001
  }
})

