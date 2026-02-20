# GitHub Copilot Instructions for psulib_base theme

This repository is a theme intended to be used by PSU Libraries Drupal 11 sites.  Examples of sites using this theme include:
- [psul-web](https://github.com/psu-libraries/psul-web): https://libraries.psu.edu/
- [hershey](https://github.com/psu-libraries/hershey): https://hershey.libraries.psu.edu/
- [alumni](https://github.com/psu-libraries/alumni): https://alumni.libraries.psu.edu/


## 🏗️ Architecture & Structure
The `psulib_base` theme is structured to provide a modular and maintainable codebase for Drupal theming. Below is an overview of the key directories and their purposes:

- **Assets**: Located in `assets/`, this directory contains images, fonts, and other static assets used by the theme.
- **Components**: Located in `components/`, these are reusable UI elements built with as Drupal Single Directory Components (SDC).  There are also used to generate Storybook stories for isolated component development.
- **Demos**: Located in `demos/`, this directory contains static HTML pages showcasing how the theme can be used with third-party apps (e.g. Springshare LibGuides).
- **Dist**: `dist/` contains built assets for the theme.
- **Layouts**: Located in `layouts/`, these define various layouts for Layout Builder.
- **Scripts**: Located in `js/`, this directory contains build and utility scripts for managing front-end assets.
- **Styles**: Located in `scss/`, this directory contains Sass stylesheets for the theme.
- **Templates**: Located in `templates/`, these are Twig templates that define the structure of various parts of the theme.

## 🛠️ Key Technologies

- **Bootstrap 5**: CSS framework for responsive design and layout.
- **Twig**: Templating engine for component rendering.
- **PHP**: Main language for Drupal theming and module development.
- **Node.js**: Used for building and managing front-end assets (via `npm` scripts).
- **Storybook**: For developing and testing UI components in isolation.
- **Storybook Addon SDC**: Storybook Addon that allows storybook to generate stories from Drupal Single Directory Components (SDC).

## 📜 Development Guidelines

- **Use CSS Variables**: Use CSS variables for colors, fonts, and spacing to ensure consistency and easy theming.
- **Component-Based Development**: Build reusable components in the `components/` directory. Each component should have its own folder containing its Twig template, SCSS styles, and Storybook configuration.
- **Follow Drupal Coding Standards**: Adhere to Drupal's coding standards for PHP, Twig, and JavaScript to maintain code quality and consistency.
- **Documentation**: Document components and styles thoroughly, including usage instructions in Storybook.

## 🤖 Behavior as a Coding Assistant

- When asked to generate a new component or feature, ensure it aligns with the existing architecture and coding standards.  Components should be loaded in `./components/` directory.
- Any javascript needed for the component should be added to `./components/{component-name}/src/{component-name}.js` and styles should be added to `./components/{component-name}/{component-name}.scss`.
- We want to avoid using jQuery if possible and use vanilla javascript instead.
- Reuse existing components and styles wherever possible to maintain consistency.
- When modifying existing files, ensure that changes adhere to the project's coding standards and do not introduce breaking changes.  The PHPCS standards used are Drupal and DrupalPractice.
- Provide clear and concise commit messages that describe the changes made.
