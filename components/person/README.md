# Person

Component to display a person directory profile.

## Usage

Example usage is able.  The left and right columns can be added as arrays OR objects.

If `has_profile_image` is false the a default image will be displayed instead.

```twig
{% include 'psulib_base:person' with {
  profile_image: content.field_profile,
  has_profile_image: content.field_profile|render ? true : false,
  display_name: display_name,
  professional_title: content.field_professional_title,
  about: content.body,
  left_column: [
    content.field_department,
    content.field_library,
    content.field_personal_phone_number,
    content.field_general_phone,
    content.field_fax_number,
    content.field_email,
    content.field_edupersonorgunitdn,
  ],
  right_column: {
    office_address: content.field_psofficeaddress,
    department_address: content.field_department_address,
    subject: content.field_subject,
    other: content.field_psotherinfo,
    research_interests: content.field_psuldap_research_interests,
    job_responsibilities: content.field_job_responsibilities,
    teaching: content.field_psteaching,
    website_url: content.field_labeleduri,
    chat_name: content.field_chat_name,
  }
} %}
```

