/**
 * FROM BOOTSTRAP5 Base theme.
 **/

(function ($, Drupal, once) {
  function init(i, tab) {
    var $tab = $(tab);
    var $target = $tab.find('[data-drupal-nav-tabs-target]');

    var openMenu = function openMenu() {
      $target.toggleClass('is-open');
      var $toggle = $target.find('.tab-toggle');
      $toggle.attr('aria-expanded', function (_, isExpanded) {
        return !(isExpanded === 'true');
      });
    };

    $tab.on('click.tabs', '[data-drupal-nav-tabs-toggle]', openMenu);
  }

  Drupal.behaviors.navTabs = {
    attach: function attach(context) {
      once('nav-tabs', '[data-drupal-nav-tabs].is-collapsible', context).forEach(function (value, i) {
        $(value).each(init);
      });
    }
  };
})(jQuery, Drupal, once);
