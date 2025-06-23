/* eslint-disable */
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [],

  // build: {
  //   emptyOutDir: true,
  //   outDir: 'dist',
  //   rollupOptions: {
  //     input: glob.sync(path.resolve(__dirname,'./components/**/*.{css,js}')),
  //     output: {
  //       assetFileNames: 'css/[name].css',
  //       entryFileNames: 'js/[name].js',
  //     },
  //   },
  // },
  publicDir: 'dist',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
