import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow ngrok and Cloudflare quick tunnels (the free subdomain changes on
  // every restart). Cloudflare's has no warning page, so Safari loads images.
  server: {
    allowedHosts: ['.ngrok-free.app', '.trycloudflare.com'],
  },
  preview: {
    allowedHosts: ['.ngrok-free.app', '.trycloudflare.com'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
