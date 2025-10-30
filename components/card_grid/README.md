# Card Grid

This groups cards together.

## Bootstrap Documentation

<https://getbootstrap.com/docs/5.3/components/card/>


## Usage

### Component Properties

See the Card component for available properties.

### Examples

```twig
    <div class="full-bleed full-bleed--limestone-light">
    {%
      include 'psulib_base:card_grid' with {
        title: 'Library News',
        body: {'#markup': '<p>We are proud to be a part of the Penn State community and to support our <a href="#">students, faculty, and staff</a> in their academic pursuits. We are committed to creating an inclusive environment that celebrates diversity and fosters connection.</p><p>Learn about the beginnings and legendary symbols of some of Penn State’s traditions.</p>'},
        card_link_stretched: false,
        card_columns: 3,
        items: [
          {
            card_title: 'Complete genome sequences of six ape species unveiled',
            card_image_src: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
            card_link: '/about/traditions',
            card_body: 'January 1, 2023',
            card_image_cap: 'top',
          },
          {
            card_title: 'Even sublethal insecticide dose may disrupt pollinator mating process',
            card_image_src: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
            card_link: '/about/traditions',
            card_body: 'September 15, 2023',
            card_image_cap: 'bottom',
          },
          {
            card_title: 'Underused radar data may improve severe weather forecasts, scientists say',
            card_image_src: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
            card_link: '/about/traditions',
            card_body: 'April 19, 1991',
          },
          {
            card_title: 'Forty-two graduate students recognized with University awards',
            card_image_src: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
            card_link: '/about/traditions',
            card_body: 'April 19, 1991',
            card_image_overlays: true,
          }
        ],
        cta_button: {
          title: 'Learn More',
          url: '/about/traditions',
        },
      }
    %}
    </div>
```

### CTA
```twig
    <div class="full-bleed full-bleed--limestone-light">
    {%
      include 'psulib_base:card_grid' with {
        card_link_stretched: true,
        card_columns: 4,
        card_type: 'cta'
        card_title_tag: 'h2',
        items: items,
      }
    %}
    </div>
```


### Search Results



## Additional information

Some extra info about the component.

