import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(process.cwd(), 'tests/setup.ts')],
  },
  build: {
    outDir: './src/infraestructure/adapters/input/web/dist',
    emptyOutDir: true
  },
})
