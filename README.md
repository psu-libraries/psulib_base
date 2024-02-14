# psulib_base

## Using this Base Theme

This base theme is intended to be a base that operates with a child theme in your site. To use this base theme, you must first add the base theme repository in your site's composer.json (either manually or with this command):

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

This does not make the theme 'default' ... it just makes the theme available to the system. You then can create your child/sub-theme.

For more information about creating a subtheme:
- [Drupal.org - Subtheming](https://www.drupal.org/node/2165673)
- [Drupalize.me - Use a Base Theme](https://drupalize.me/tutorial/use-base-theme)