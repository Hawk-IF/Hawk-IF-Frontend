import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: "./infraestructure/adapters/input/web", 
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(process.cwd(), 'tests/setup.ts')],
  },
  build: {
    outDir: './dist',
    emptyOutDir: true
  },
})
