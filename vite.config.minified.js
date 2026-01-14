import { defineConfig } from 'vite';
import baseConfig from './vite.config.js';

export default defineConfig({
  ...baseConfig,
  build: {
    ...baseConfig.build,
    minify: 'terser',
    rollupOptions: {
      ...baseConfig.build?.rollupOptions,
      output: {
        ...baseConfig.build?.rollupOptions?.output,
        entryFileNames: 'js/[name].min.js',
        chunkFileNames: 'js/[name].min.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name].min[extname]';
          }
          return 'assets/[name].min[extname]';
        }
      }
    }
  }
});
