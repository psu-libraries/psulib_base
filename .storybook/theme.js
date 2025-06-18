import { create } from 'storybook/theming/create';
import logo from '../logo.png';

export default create({
  base: 'dark',

  // Branding
  brandTitle: 'PSU Libraries',
  brandUrl: 'https://libraries.psu.edu/',
  brandImage: logo,
  brandTarget: '_blank',
  fontBase: '"Helvetica", sans-serif',
  fontCode: 'monospace',

  // Primary, Secondary colors
  colorPrimary: 'hsl(206 63% 42%)',
  colorSecondary: 'hsl(206 63% 42%)',
});
