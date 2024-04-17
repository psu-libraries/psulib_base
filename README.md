# PSU Libraries Base Theme (psulib_base)

This theme is intended to be used for PSU Branded Libraries Drupal sites.  This is based on the [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/) framework.

## Development

This base theme is easiest to develop using a theme generated using the [drupal-site-template](https://github.com/psu-libraries/drupal-site-template) or using the site template itself.  This will use the psul-web site as an example.

### New DDEV Environment

```bash
gh repo clone psu-libraries/psul-web;
cd psul-web;
ddev start;
ddev drush si --existing-config;
ddev develop-theme;
ddev theme-build;
ddev launch;
```

### Existing DDEV Environment

```bash
ddev develop-theme;
ddev theme-build;
ddev launch;
```

## Using this Theme

The psulib_base theme can be used as a standalone theme but can also act as a base theme if custom styles are required.    There are 3 ways to use this base theme, which are listed below.

### Installing

To use this base theme, you must first add the base theme repository in your site's composer.json (either manually or with this command):

```bash
ddev composer config repositories.psul/theme-base github "https://github.com/psu-libraries/psulib_base.git"
```

Then, require the actual base theme:

```bash
ddev composer require psu-libraries/psulib_base
```

and install it with Drush
```bash
ddev drush theme:enable psulib_base
```

### Standalone

If you are using this as a standalone theme then you will need to run the following command after the theme has been installed.

```bash
ddev drush config-set system.theme default psulib_base;
```

### Base Theme Extended Styles

If you want to use all styles in the base theme BUT add additional styles for your site.  You will be able to use scss `variables` and `mixins` but NOT `extends` as the

```bash
ddev generate-subtheme SUBTHEMENAME;
```

Update the styles.scss with the following.

```scss
// Include bootstrap.
@import '../../../../themes/contrib/psulib_base/scss/init';

// Sub theme styling.
```

Update `webpack.mix.js` file to exclude base theme specific components. This should look like the following.

```js
// webpack.mix.js

let mix = require('laravel-mix');

// Use relative URL so fonts will work.
mix.sass('scss/style.scss', 'dist/css')
    .options({
        processCssUrls: false
    });

// Combine custom javascript into the application.js file.
mix.combine('js/base', 'dist/js/application.js');
```

### Base Theme Override Styles

If you want to override ALL styles coming from the base theme.

```bash
ddev generate-subtheme SUBTHEMENAME;
```

Update the styles.scss with the following to re-build the styles in the base theme. (**THIS NEEDS WORK. The scss does not allow you to override variables.**)

```scss
// Include bootstrap.
@import '../../../../themes/contrib/psulib_base/scss/style';

// Sub theme styling.
```

Add the following to the subtheme `*.info.yml` file to exclude the base theme library so styles are lot loaded twice:

```yaml
libraries-override:
  psulib_base/global-styling:
    css:
      theme:
        dist/css/style.css: {}
```

Update `webpack.mix.js` file to exclude base theme specific components. This should look like the following.

```js
// webpack.mix.js

let mix = require('laravel-mix');

// Use relative URL so fonts will work.
mix.sass('scss/style.scss', 'dist/css')
    .options({
        processCssUrls: false
    });

// Combine custom javascript into the application.js file.
mix.combine('js/base', 'dist/js/application.js');
```

## Creating a subtheme

1.) Install the ddev web commands

From your project directory
```
git clone git@github.com:psu-libraries/drupal-site-template.git ~/drupal-site-template
cp -rf ~/drupal-site-template/.ddev/commands/web/ .ddev/commands
```

This will create 3 new ddev commands for you to create a subtheme, build the theme, and watch the theme for changes

```
ddev generate-subtheme
ddev theme-build
ddev theme-watch
```

## Boostrap Icons

Since there is no current CI/CD process to build out the assets on demand, the bootrap icons are copied into the target theme on npm install.

There is a postinstall script to copy fonts/icons into ./assets/bootstrap/fonts

Once this has run you can use it as documented on https://icons.getbootstrap.com:

```html
<i class="bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>
```


## Resources
For more information about creating a subtheme:
- [Drupal.org - Subtheming](https://www.drupal.org/node/2165673)
- [Drupalize.me - Use a Base Theme](https://drupalize.me/tutorial/use-base-theme)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)