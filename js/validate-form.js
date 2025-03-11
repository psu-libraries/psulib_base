/**
 * Custom form validation for webforms.
 *
 * This uses the bootstrap 5 form validation styles to handle displaying
 * form validation errors.
 *
 * @see https://getbootstrap.com/docs/5.3/forms/validation/#custom-styles
 **/
(function (Drupal, once) {
  Drupal.behaviors.formValidate = {
    attach: function attach(context) {
      // Process each webform. Using hte once library to prevent event handler
      // from being added multiple times.
      once('webforms', 'form.webform-submission-form', context).forEach(function (form) {
        // Ensuring that the form has the needs-validation class and the
        // novalidate attribute. This will prevent the default browser
        // validation and allow bootstrap form validation to take over.
        form.classList.add('needs-validation');
        form.setAttribute('novalidate', true);

        form.addEventListener('submit', event => {
          // We only need to alter the format submit handler if there are
          // validation issues.
          if (!form.checkValidity()) {
            // Prevent the default form behavior.
            event.preventDefault();
            event.stopPropagation();

            // Loop through all inputs on the form to add or update the
            // invalid-feedback element text.
            Array.from(form.querySelectorAll(':invalid')).forEach(function (invalidElement) {
              if (invalidElement.type === 'fieldset') {
                // Skip fieldsets as they are not form controls.
                return;
              }

              let parent = invalidElement.parentNode;
              if (invalidElement.type === 'radio' || invalidElement.type === 'checkbox') {
                // Find the last radio or checkbox with the same name.
                const groupName = invalidElement.name;
                const groupElements = form.querySelectorAll(`input[name="${groupName}"]`);
                const lastElement = groupElements[groupElements.length - 1];
                parent = lastElement.parentNode;
              }
              feedback = parent.querySelector('.invalid-feedback');

              if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                parent.append(feedback, invalidElement.nextSibling);
              }

              // Set the feedback message to the data-webform-required-error
              // attribute if it exists otherwise use the default validation
              // message.
              const errorMessage = invalidElement.getAttribute('data-webform-required-error');
              feedback.textContent = errorMessage ?? invalidElement.validationMessage;
            });

            // Set focus on the first invalid element.
            const firstInvalidElement = form.querySelector(':invalid');
            if (firstInvalidElement) {
              firstInvalidElement.focus();
            }
          }

          // Add was-validated class so styles are applied to inputs.
          form.classList.add('was-validated')
        }, false)
      });
    }
  };
})(Drupal, once);
