# Contact card

Add a contact card for displaying people, and departments contact info.

## Usage

Add this to a display template.

```twig
  {% include 'psulib_base:contact_card' with {
    title: label|render|striptags|trim,
    title_url: url,
    subtitle: '',
    address: content.field_psofficeaddress,
    phones: [
      content.field_general_phone|render|striptags|trim
    ],
    fax: content.field_fax_number|render|striptags|trim,
    email:  content.field_email|render|striptags|trim,
    website: '',
    stacked: false
  } %}
```
