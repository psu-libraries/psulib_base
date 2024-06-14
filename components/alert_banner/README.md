# Alert banner

Examples on how this component can be used in a template.

## Usage

```twig
{%
  include 'psulib_base:alert_banner' with {
    title: 'Important Notice!',
    content: 'This is an important alert message. Please pay attention!'
  }
%}
```

```twig
{%
  embed 'psulib_base:alert_banner' with {
    severity: 'urgent',
    closed_text: 'Important Notice!',
    title: 'Much longer important notice title!',
    alert_banner_utility_classes: ['mb-4', 'shadow-sm'],
    content: 'This is an important alert message. Please pay attention!'
  } %}

    {% block content %}
      <p>This is an important alert message. Please pay attention!</p>
      <p>This is an important alert message. Please pay attention!</p>
      <p>This is an important alert message. Please pay attention!</p>
    {% endblock %}

  {% endembed %}
%}
```
