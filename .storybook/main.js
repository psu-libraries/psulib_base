

/** @type { import('@storybook/html-vite').StorybookConfig } */
import { join } from 'node:path'
import { cwd, env } from 'node:process'


const config = {
  stories: [
    '../components/**/*.component.yml',
    '../stories/*.stories.js'
  ],
  "addons": [
    {
      name: 'storybook-addon-sdc',
      options: {
        sdcStorybookOptions: {
          namespace: 'psulib_base',

        },
        vitePluginTwigDrupalOptions: {
          namespaces: {
            psulib_base: join(cwd(), './components'),
            psulib_base_icons: join(cwd(), './components/icon/icons'),
          },
          functions: {
            clean_unique_id: (twigInstance) =>
              twigInstance.extendFilter("clean_unique_id",  (text) =>  {
                if (!text || typeof text !== 'string') {
                  return 'random-id-' + Math.floor(Math.random() * 1000);
                }
                let returnString = new String(text);
                return returnString.replace(/\s+/g, '-').toLowerCase() + Math.floor(Math.random() * 1000);
              }),
            link: (twigInstance) =>
              twigInstance.extendFunction("link", (text, url, attributes) => {
                let attrs = '';
                if (attributes && typeof attributes === 'object') {
                  for (const [key, value] of Object.entries(attributes)) {
                    attrs += ` ${key}="${value}"`;
                  }
                }
                // Add theme attribute.
                attrs += ' theme="psulib_base"';
                return `<a href="${url}"${attrs}>${text}</a>`;
              }),
          }
        },
        jsonSchemaFakerOptions: {}
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
  staticDirs: ['../assets'],
};
export default config;
