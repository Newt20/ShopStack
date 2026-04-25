import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite config does not need tailwindcss here
export default defineConfig({
  plugins: [react(), 
  	tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": { target: "http://localhost:5000",
       changeOrigin: true,
       }// forward API calls to backend
    },
  },
})

