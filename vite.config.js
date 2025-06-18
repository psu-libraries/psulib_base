/* eslint-disable */
import { defineConfig } from "vite"
import yml from '@modyfi/vite-plugin-yaml';
import twig from 'vite-plugin-twig-drupal';
import { join } from "node:path";
import path from 'path';
import { glob } from 'glob';
import eslint from 'vite-plugin-eslint';
import { drupalAttribute } from 'drupal-attribute';

export default defineConfig({
  plugins: [
    // Twig namespaces for nesting components.
    twig({
      namespaces: {
        psulib_base: join(__dirname, './components')
      },
      functions: {
        create_attribute: (twigInstance) => twigInstance.extendFunction("create_attribute", (attrs) => {return new drupalAttribute(attrs)}),
      }
    }),
    // Allows Storybook to read data from YAML files.
    yml(),
    // Run eslint during build.
    // eslint(),
  ],

  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname,'./components/**/*.{css,js}')),
      output: {
        assetFileNames: 'css/[name].css',
        entryFileNames: 'js/[name].js',
      },
    },
  },
  publicDir: 'assets',
  assetsInclude: ['**/*.twig'],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'legacy',
      },
    },
  },
})
