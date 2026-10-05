import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow ngrok tunnels (the free subdomain changes on every restart)
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
  preview: {
    allowedHosts: ['.ngrok-free.app'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
