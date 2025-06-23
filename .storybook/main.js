

/** @type { import('@storybook/html-vite').StorybookConfig } */

import { join } from 'node:path' // 1. Add dependencies.
import { cwd } from 'node:process'

const config = {
  stories: [
    '../components/**/*.component.yml',
    '../stories/*.stories.js'
  ],
  "addons": [
    {
      name: 'storybook-addon-sdc', // 3. Configure addon.
      options: {
        sdcStorybookOptions: {
          namespace: 'psulib_base', // Your namespace.
        },
        vitePluginTwigDrupalOptions: {
          // vite-plugin-twig-drupal options.
          namespaces: {
            psulib_base: join(cwd(), './components'), // Your namespace and path to components.
          },
          functions: {
            clean_unique_id: (twigInstance) =>
              // twigInstance.extendFilter("clean_unique_id", (text) => text.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase()),
              twigInstance.extendFilter("clean_unique_id",  () =>  (text, text2) => "IT WORKS!" + text + text2),
          }
        }
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  staticDirs: ['./public'],

};
export default config;
