# Content with table of contents

Adding a component to build out a content section with automatic jump menus.

## Usage
This can be used with the Researcher Metadata Database Drupal integration module to
pull publications from that service and displaying them in this component.

```php
// Load the RMD service.
$rmd_service = \Drupal::service('psul_rmd_drupal_integration.fetcher');

// Fetch data for the current user.
$rmd_data = $rmd_service->getProfilePublications($node->label());
// Render the content_with_toc component.
$variables['content_with_toc'] = [
  '#type' => 'component',
  '#component' => 'psulib_base:content_with_toc',
  '#props' => [
    'items' => $rmd_data,
  ],
];
```

Alternatively, this can be added with any dataset that looks like:

```php
$data = [
  [
    'title' => 'Testing',
    'content' => '<p>some html content.</p>',
    'id' => 'unique-id',
  ],
  [
    'title' => 'Testing2',
    'content' => '<p>some more content.</p>',
    'id' => 'unique-id2',
  ],
];
```


## Additional information

This uses bootstrap [scrollspy](https://getbootstrap.com/docs/5.3/components/scrollspy/) and [sticky positions](https://getbootstrap.com/docs/5.3/helpers/position/#sticky-top).
