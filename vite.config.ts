import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://isow-22.github.io/opera-finanal/
// The base is only applied to production builds so `npm run dev` stays at `/`.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/opera-finanal/' : '/',
  plugins: [react(), tailwindcss()],
}))
