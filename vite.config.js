import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/imageaii/',  // Correct base path for your repository
  plugins: [react()],
})

