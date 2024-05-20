# Card

This Twig template is designed to create a versatile and customizable Card component.

## Bootstrap Documentation

<https://getbootstrap.com/docs/5.3/components/card/>


## Usage

### Component Properties

The Card component takes a variety of properties to customize its appearance and content:

- `card_header` (optional): Text for the Card's header.
- `card_footer` (optional): Text for the Card's footer.
- `card_title` (optional): Text for the Card's title.
- `card_subtitle` (optional): Text for the Card's subtitle.
- `card_body` (optional): Main text for the Card's body.
- `card_media` (optional): Ideally to pass a media object to the card instead of an image, if used it will override the `card_image_src` and `card_image_alt` properties.
- `card_text` (optional): Additional text for the Card.
- `card_link_url` (optional): URL for the Card's link.
- `card_link_text` (optional): Text for the Card's link.
- `card_image_src` (optional): Source URL for an image on the Card.
- `card_image_alt` (optional): Alt text for the Card's image.
- `card_image_cap` (optional): Position for the Card's image cap (either 'top' or 'bottom').
- `card_image_overlays` (optional): Boolean value to determine if the card has image overlays.
- `card_body_tag` (optional): The HTML tag for the Card's body.
- `card_title_tag` (optional): The HTML tag for the Card's title.
- `card_subtitle_tag` (optional): The HTML tag for the Card's subtitle.
- `card_title_tag` (optional): The HTML tag for the Card's title.
- `card_text_tag` (optional): The HTML tag for the card text.
- `card_border` (optional): Set to true if the card should be borderless.
- `card_utility_classes` (optional): An array of additional CSS classes is added to the card.
- `card_link_utility_classes` (optional): An array of additional CSS classes is added to the card link.


### Standard Card

```twig
{%
  include '{% include 'psulib_base:card' with {
    card_title_tag: 'h4',
    card_title: label,
    card_header: 'CARD HEADER',
    card_footer: 'The card footer',
    card_body_tag: 'div',
    card_body: 'This is the card body',
    card_text_tag: 'p',
    card_link_url: url,
    card_link_text: 'Read more...',
    card_border: false,
    card_utility_classes: ['col-4'],
    card_link_utility_classes: ['btn-primary'],
    card_media: content.field_media,
    card_image_cap: 'bottom',
  }
%}
```

### Search Results

Adding the `card--search-results` class to the card will alter the card to use on the search results page.

```twig
{% include 'psulib_base:card' with  {
    card_header: '<h2>Journal Articles</h2>',
    card_body: 'This is a test',
    card_utility_classes: ['card--search-results', 'shadow-sm'],
    card_footer: '<i class="bi bi-arrow-right-short"></i> Link goes here',
  }
%}
```

## Additional information

Some extra info about the component.

