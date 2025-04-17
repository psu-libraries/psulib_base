# Image + Text Overlap

## Examples

### With Image URL String

```twig
<div class="full-bleed full-bleed--limestone-light">
{%
  include 'psulib_base:image_text_overlap' with {
    image_src: 'https://images.ctfassets.net/ni9rh5nu0d99/7aVwroYXl3CQkyfQwEK1bG/999f75fe46e3cbbd2bea829866abe21a/traditions-lion-shrine.jpg?fm=webp&w=640&q=75',
    title: 'Celebrating Pride and Connection',
    body: {'#markup': '<p>We are proud to be a part of the Penn State community and to support our <a href="#">students, faculty, and staff</a> in their academic pursuits. We are committed to creating an inclusive environment that celebrates diversity and fosters connection.</p><p>Learn about the beginnings and legendary symbols of some of Penn State’s traditions.</p>'},
    cta: {
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
  include 'psulib_base:image_text_overlap' with {
    image_media: image,
    title: 'Celebrating Pride and Connection',
    body: {'#markup': '<p>We are proud to be a part of the Penn State community and to support our <a href="#">students, faculty, and staff</a> in their academic pursuits. We are committed to creating an inclusive environment that celebrates diversity and fosters connection.</p><p>Learn about the beginnings and legendary symbols of some of Penn State’s traditions.</p>'},
    cta: {
      title: 'Learn More',
      url: '/about/traditions',
    },
  }
%}
</div>
```
