/** @type { import('@storybook/html-vite').Preview } */
import { useEffect } from 'storybook/preview-api';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Imports custom device viewports.
import customViewports from './viewports';

// Imports custom JS to allow Storybook to understand Drupal behaviors.
import './drupal/drupal';
import './drupal/once';

// Imports FontAwesome icons from a specific kit.
import '../dist/bootstrap-icons/font/bootstrap-icons.min.css';

// Imports the CSS for all components combined into a single stylesheet.
import '../assets/fonts/fonts.css';
import '../dist/css/style.css';
import '../dist/css/nav.css';

// Imports the CSS for common components.
import '../components/button/button.css';
import '../components/divider/divider.css';

// Imports all Storybook CSS for display.
import './storybook.css';

// Import all js.
import '../js/psul-bootstrap.js';
import '../js/base/jumpmenu.js';

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
          'Getting started',
          ['Intro'],
          'Base',
          'Elements',
          'Components',
          '*',
        ],
        includeName: true,
      },
    },
    viewport: { viewports: customViewports },
    docs: {
      story: {
        inline: false,
      },
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// export default preview;
