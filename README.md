# psulib_base

## Developing with this theme 
1.) bare clone drupal-site-config into a theme development folder
```
git clone --bare git@github.com:psu-libraries/drupal-site-config.git ~/theme_wrapper
```

2.) clone psulib_base theme into development site
```
cd ~/theme_wrapper/web/themes/contrib
rm -rf psulib_base
cd ~/theme_wrapper/web/themes/custom
rm -rf psulib_base
git clone git@github.com:psu-libraries/psulib_base.git
```

3.) start up theme-wrapper project
```
cd ~/theme_wrapper
ddev config --project-name=theme-wrapper
ddev config --additional-hostnames theme-wrapper
ddev start
ddev drush si --existing-config -y 
```


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


## Boostrap Icons

Since there is no current CI/CD process to build out the assets on demand, the bootrap icons are copied into the target theme on npm install.

There is a postinstall script to copy fonts/icons into ./assets/bootstrap/fonts
 
Once this has run you can use it as documented on https://icons.getbootstrap.com:

```html
<i class="bi-alarm" style="font-size: 2rem; color: cornflowerblue;"></i>
```