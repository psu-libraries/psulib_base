# Not Found

Display a 404 or 403 error message.

## Usage

Example can be see below.  Also refer to `page--403.html.twig` for a working example.

```
  {%
    include 'psulib_base:not_found' with {
      title: 'Oops! Access Denied',
      home_url: path('<front>')
    }
  %}
```
