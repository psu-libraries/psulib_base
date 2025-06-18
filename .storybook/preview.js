/** @type { import('@storybook/html-vite').Preview } */
import Twig from 'twig';
import { useEffect } from 'storybook/preview-api';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import twigDrupal from 'twig-drupal-filters';

// Imports custom device viewports.
import customViewports from './viewports';

// Imports custom JS to allow Storybook to understand Drupal behaviors.
import './drupal/drupal';
import './drupal/once';

// Imports FontAwesome icons from a specific kit.
// import 'https://kit.fontawesome.com/a0eb0bad75.js';

// Imports the CSS for all components combined into a single stylesheet.
import '../assets/fonts/fonts.css';
import '../dist/css/style.css';

// Imports all Storybook CSS for display.
import './storybook.css';

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  return twig;
}

setupTwig(Twig);

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      PSULIB_BASE: 'psulib_base',
      Other: 'other',
    },
    defaultTheme: 'PSULIB_BASE',
    attributeName: 'data-theme',
  }),
  (storyFn) => {
    useEffect(() => Drupal.attachBehaviors(), []); // eslint-disable-line
    return storyFn();
  },
];

export const preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          '*',
        ],
        includeName: true,
      },
    },
    viewport: { viewports: customViewports },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// export default preview;
