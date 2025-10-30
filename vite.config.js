/* eslint-disable */
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
