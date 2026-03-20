/**
 * @file
 * JavaScript for the federated brand bar component.
 *
 * This script toggles the dialog menu for the federated brand bar when the
 * search button is clicked.  It uses the `once` utility to ensure the
 * behavior is applied only once per page load.
 */
(function (Drupal, once) {
  Drupal.behaviors.federatedBrandBar = {
    attach: function (context, settings) {
      // Select the target list and ensure the behavior is applied only once.
      once('brand-bar', '.psuflex-fed-brand-bar', context).forEach(function (brandBar) {
        const searchBtn = brandBar.querySelector('.psuflex-fed-brand-bar__search-btn');
        const menuDialog = brandBar.querySelector('#brand-bar-menu');

        if (searchBtn && menuDialog) {
          searchBtn.addEventListener('click', function () {
            // menuDialog.showModal();
          });
        }
      });
    }
  };
})(Drupal, once);
