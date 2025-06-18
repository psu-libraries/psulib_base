

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-styling-webpack'
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  staticDirs: ['../dist'],

};
export default config;
