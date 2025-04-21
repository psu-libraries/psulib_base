# New Cards

## Examples

### With Image URL String

```twig
  <div class="full-bleed full-bleed--limestone-light">
  {%
    include 'psulib_base:news_cards' with {
      title: 'Library News',

      body: {'#markup': '<p>We are proud to be a part of the Penn State community and to support our <a href="#">students, faculty, and staff</a> in their academic pursuits. We are committed to creating an inclusive environment that celebrates diversity and fosters connection.</p><p>Learn about the beginnings and legendary symbols of some of Penn State’s traditions.</p>'},
      items: [
        {
          title: 'Complete genome sequences of six ape species unveiled',
          image: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
          url: '/about/traditions',
          date: 'January 1, 2023',
        },
        {
          title: 'Even sublethal insecticide dose may disrupt pollinator mating process',
          image: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
          url: '/about/traditions',
          date: 'September 15, 2023',
        },
        {
          title: 'Underused radar data may improve severe weather forecasts, scientists say',
          image: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
          url: '/about/traditions',
          date: 'April 19, 1991',
        },
        {
          title: 'Forty-two graduate students recognized with University awards',
          image: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
          url: '/about/traditions',
          date: 'April 19, 1991',
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

### With media
```twig
  <div class="full-bleed full-bleed--limestone-light">
  {%
    include 'psulib_base:news_cards' with {
      title: 'Library News',

      body: {'#markup': '<p>We are proud to be a part of the Penn State community and to support our <a href="#">students, faculty, and staff</a> in their academic pursuits. We are committed to creating an inclusive environment that celebrates diversity and fosters connection.</p><p>Learn about the beginnings and legendary symbols of some of Penn State’s traditions.</p>'},
      items: [
        {
          title: 'Complete genome sequences of six ape species unveiled',
          image: media,
          url: '/about/traditions',
          date: 'January 1, 2023',
        },
        {
          title: 'Even sublethal insecticide dose may disrupt pollinator mating process',
          image: media,
          url: '/about/traditions',
          date: 'September 15, 2023',
        },
        {
          title: 'Underused radar data may improve severe weather forecasts, scientists say',
          image: media,
          url: '/about/traditions',
          date: 'April 19, 1991',
        },
        {
          title: 'Forty-two graduate students recognized with University awards',
          image: media,
          url: '/about/traditions',
          date: 'April 19, 1991',
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
