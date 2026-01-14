

/** @type { import('@storybook/html-vite').StorybookConfig } */
import { join } from 'node:path';
import { cwd } from 'node:process';

const config = {
  stories: [
    '../components/**/*.component.yml',
    '../stories/*.stories.js'
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
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
            icon: (twigInstance) =>
              // Adding icon function from Drupal Icon API.  This is currently
              // only going to work with the Material Symbols Rounded icons.
              twigInstance.extendFunction("icon", (iconId, fill, weight) => {
                const [packId, iconName] = iconId.split(':');
                // Load SVG from ../assets/icons/{iconName}.svg
                const svgPath = `/icons/${iconName}.svg`;
                return `<span class="psulib-base-icon"><svg viewBox="0 0 24 24"><use xlink:href="${svgPath}" class="psulib-base-icon" alt="${iconName}" /></svg></span>`;
              }),
          }
        },
        jsonSchemaFakerOptions: {}
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes'
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  staticDirs: ['../assets'],
};
export default config;
