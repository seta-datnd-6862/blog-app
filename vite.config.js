import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Thay 'blog-app' bằng tên repository GitHub của bạn
  base: '/blog-app/',
})
