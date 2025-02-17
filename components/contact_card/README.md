# Contact card

Add a contact card for displaying people, libraries, and departments contact info.

## Usage

Add this to a display template.

### Fields Render Arrays (with icon already added)

In some cases the icon and link might be added to fields using a template. In this case we should pass the rendered fields array to the template using a slot.

```twig
{% embed 'psulib_base:contact_card' with {
  title: label,
  title_url: url,
  subtitle: '',
  address: content.field_psofficeaddress,
  website: '',
  stacked: true,
  linked_card: true,
} %}
  {% block email_block %}{{ content.field_email }}{% endblock %}
  {% block phones_block %}{{ content.field_general_phone }}{% endblock %}
  {% block fax_block %}{{ content.field_fax_number }}{% endblock %}
{% endembed %}
```

### Text values for phones and email

You can also pass raw strings to the component and links will be dynamically built.

```twig
{% include 'psulib_base:contact_card' with {
  title: 'Mike Henninger',
  title_url: 'https://github.com/zipymonkey',
  subtitle: 'Drupal Developer',
  address: '123 Sesame St',
  phones: [
    '603 555-5555'
  ],
  fax: '',
  email: 'msh6004@psu.edu',
  website: 'https://github.com/zipymonkey',
  stacked: false
} %}
```
