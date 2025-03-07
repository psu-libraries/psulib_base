/**
 * FROM BOOTSTRAP5 Base theme.
 **/

(function (Drupal, once, drupalSettings) {
  Drupal.behaviors.formValidate = {
    attach: function attach(context) {
      once('webforms', 'form.webform-submission-form', context).forEach(function (form) {
        form.classList.add('needs-validation');
        form.setAttribute('novalidate', true);

        form.addEventListener('submit', event => {

          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      });
    }
  };
})(Drupal, once, drupalSettings);
