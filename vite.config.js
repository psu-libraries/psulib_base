/* eslint-disable */
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [],
  publicDir: 'dist',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
