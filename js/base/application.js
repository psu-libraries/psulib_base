(function (Drupal, once) {
    Drupal.behaviors.psulib_base = {
      attach: function (context, settings) {
        document.documentElement.style.setProperty(
          '--scrollbar-width', (window.innerWidth - document.documentElement.offsetWidth + 1) + 'px'
        );
      }
    };
  })(Drupal, once);