/**
 * @file
 * JavaScript for the Accordion component.
 *
 * Adding block-size so that browsers that do not support the interpolate-size
 * CSS property can still get the animation effect.
 */
(function (Drupal, once) {
  Drupal.behaviors.accordionComponent = {
    attach: function (context) {

      // We do not need to do anything to get the animations to work if the
      // browser supports the interpolate-size CSS property.
      if (CSS.supports('interpolate-size', 'allow-keywords')) {
        return;
      }

      once('accordion', '.accordion-component', context).forEach(function (element) {
        const items = element.querySelectorAll('details');
        items.forEach((item) => {
          item.addEventListener('toggle', function () {
            const body = item.querySelector('.accordion-component-body');
            const bodyHeight = body ? body.scrollHeight : 0;
             // 2.5rem in px (assuming 1rem = 16px).
            const extra = 2.5 * 16;

            console.log('Body height: ' + bodyHeight);
            // Set a CSS variable on the item that is the height of the content
            // plus 2.5 rem of margin.
            item.style.setProperty('--details-size', (bodyHeight + extra) + 'px');
          });
        });
      });
    }
  };
})(Drupal, once);

