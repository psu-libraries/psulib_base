// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
import { defineConfig } from "eslint/config";
import standard from "@eslint/js";

export default defineConfig([
  {
    // Ignores needs to be on its own object and probably as the first object.
    ignores: [
      'dist',
      'node_modules',
      'storybook',
      'components/**/*.css',
      'components/**/*.js',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
    },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      curly: 'error',
    }
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    }
  }, standard.configs.recommended, ...storybook.configs["flat/recommended"]
]);
