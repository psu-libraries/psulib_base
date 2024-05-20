# Heading

All HTML headings, `<h1>` through `<h6>` are available.

## Usage

### Bootstrap Documentation

<https://getbootstrap.com/docs/5.3/content/typography/#headings>
<https://getbootstrap.com/docs/5.3/content/typography/#display-headings>

### Properties

- `heading_html_tag` : The HTML tag to use for the header.
  Defaults to h1 (h1 | h2 | h3 | h4 | h5 | h6)
- `display`: When you need a heading to stand out, consider using a display
  `heading—a` larger, slightly more opinionated heading style.
- `attributes`: Attributes array.
- `heading_utility_classes`: This property contains an array of utility classes.
- `heading_link_utility_classes`: This property contains an array of utility classes if the heading is linked. eg. `title_link` is not null.
- `title_link`: The URL to link the title to.

### Slots

- `content`: Content text for the heading.

### Examples

```twig
{%
  include 'psulib_base:heading' with {
    heading_html_tag: 'h1',
    content: title|render|striptags|trim,
    heading_attributes: title_attributes,
    heading_utility_classes: [
      'fs-4',
    ],
  }
%}

```twig
{%
  include 'psulib_base:heading' with {
    heading_html_tag: 'h3',
    title_link: url,
    content: label,
    heading_utility_classes: [
      'card-date__title',
      'fs-2',
      'mb-0',
    ],
    heading_link_utility_classes: [
      'text-black',
      'stretched-link',
    ]
  }
%}
```
