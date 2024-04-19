# Footer

The footer component is intended to be used to add styles to the bottom of all pages.

## Usage

Add the this to the `page.html.twig` or other page templates:

```twig
{# Add the footer component from psulib_base theme. #}
{% embed 'psulib_base:footer' with {
    show_footer_left: page.footer_left is not empty,
    show_footer_right: page.footer is not empty,
    show_footer_bottom: page.footer_bottom is not empty,
    site_logo: site_logo,
    site_logo_alt: 'Home'|t,
    site_logo_url: path('<front>')
  }
%}
  {% block footer_left %}
    {{ page.footer_left }}
  {% endblock %}
  {% block footer_right %}
    {{ page.footer }}
  {% endblock %}
  {% block footer_bottom %}
    {{ page.footer_bottom }}
  {% endblock %}
{% endembed %}
```

If you do not want the bottom footer to be displayed then set `show_footer_bottom` to `false`.  If you do not what the top footer row to be displayed then you will need to set `show_footer_left`, `show_footer_right`, and `site_logo` to false;

## Additional information

The `site_logo` path is added in the `psulib_base_preprocess_page()` function.
