# PSU Libraries Base Theme (psulib_base)

This theme is intended to be used for PSU Branded Libraries Drupal sites.  This is based on the [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/) framework.

## Development

This base theme is easiest to develop using a theme generated using the [drupal-site-template](https://github.com/psu-libraries/drupal-site-template) or using the site template itself.  This will use the psul-web site as an example.

### New DDEV Environment

```bash
gh repo clone psu-libraries/psul-web;
cd psul-web;
ddev start;
ddev composer install;
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

### Global SCSS

SCSS used to generate styles that will be used everywhere are defined in the `./scss` directory.  Styles cannot or should be associated with a single components will live here.  These can be organized in to separate files in the `./scss/base` directory.

### Single Directory Components (SDC)

The theme has a number of [Single Directory Components (SDC)](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components) defined in the `./components` directory.  We should use SDC where appropriate.  This allows for easier development and code reusability.

#### Creating a template
To add a new components you will need to do the following.  This will create a SDC component for you to start with.

```bash
ddev drush generate sdc
```

#### Applying the template

If your component is only using props then you can use an include:

```twig
{% include 'psulib_base:COMPONENT' with {
  prop_name: variable,
} %}
```

If your component is using slots then you will need to use an embed:

```twig
{% embed 'psulib_base:header' with {
    prop_name: variable,
  }
%}
  {% block slot %}
    {{ page.region }}
  {% endblock %}

{% endembed %}
```

#### Replace a SDC in a Sub Theme

If you want to completely override a SDC in a subtheme you can do with the following steps:

1. Copy the component from the base theme to the subtheme
1. Add `replaces: psulib_base:COMPONENTNAME` to the `COMPONENTNAME.component.yml` file
1. Update templates, css, twig, e&c.

Note you should NOT change the props or slots because that will cause issues.

#### Replace SCSS for a SDC

If you only need to change the styles for a SDC you can remove the SDC css file and build the desired styles in your subtheme SCSS.  There is an open ticket to implement a better way of handling this so we should probably avoid doing this for the time being.

1. Update your `subtheme.info.yml` file to override the component stylesheet.
```
libraries-override:
  core/components.psulib_base--COMPONENTNAME:
    css:
      component:
        ../../../themes/custom/psulib_base/components/COMPONENTNAME/COMPONENTNAME.css: {}
```
1. Add styles to your subtheme style sheet.

#### Links

- [SDC Documentation](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
- [Using/Attaching only css/js](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components/faq-frequently-asked-questions#s-can-i-use-attach-only-the-assets-library-cssjs-of-a-component-inside-a-twig-template)
- [Radix Theme](https://git.drupalcode.org/project/radix/-/tree/6.0.x/components?ref_type=heads) - This theme has large number of components that can be used as inspiration.

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
