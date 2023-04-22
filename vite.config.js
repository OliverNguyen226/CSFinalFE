import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5126"},
      "/r": {
        target: "http://localhost:5126",
        ws: true,
      },
    },
  },
  plugins: [react()],
})
