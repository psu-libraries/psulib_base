import { addons } from 'storybook/manager-api';
import psulibbaseTheme from './theme';

addons.setConfig({
  theme: psulibbaseTheme,
  // Collapses Stories roots by default for easier navigation.
  sidebar: {
    collapsedRoots: ['base', 'elements', 'components', 'collections', 'layouts', 'pages'],
  },
});
