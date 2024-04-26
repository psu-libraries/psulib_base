/**
 * Jump Menu tool.
 *
 * Relies on Bootstrap 5 for display elements.
 *
 * Assign the 'jump-menu' to any unordered list (ul) that contains links within
 * the list elements, and all those links will be rendered as a jump list.
 * All parameters of the link except for the link classes will be maintained.
 *
 * Nested lists will be flattened into one long list.
 *
 * eg. <ul class="jump-menu" data-jump-breakpoint="md" data-jump-id="this-is-unique" data-jump-classes="special-styling">
 *     <li>
 *         <a href="https://www.google.com/search?q=test" target="_blank">Search Test</a>
 *     </li>
 *     <li>
 *         <a href="https://www.google.com/search?q=ha" target="_blank">Search Ha</a>
 *     </li>
 *     <li>
 *         <a href="/node/1">Test 3</a>
 *     </li>
 *     <li>
 *         <a href="https://libraries.psu.edu" target="_blank">Libraries Home</a>
 *     </li>
 *     <li>
 *         <span>Submenu items</span>
 *         <ul>
 *             <li>
 *                 <a href="">Test 5</a>
 *             </li>
 *             <li>
 *                 <a href="">Test 6</a>
 *             </li>
 *         </ul>
 *     </li>
 *     <li>
 *         <a href="#something">Test 7</a>
 *     </li>
 * </ul>
 *
 *
 * Configuration:
 *
 * data-jump-id: DOM ID for the dropdown button will be assigned automatically
 *   unless defined in this attribute.
 * data-jump-breakpoint: The breakpoint at which the jump menu hides and the
 *   full menu appears, defaults to 'lg'
 * data-jump-classes: Classes to be assigned to the Jump Menu outer div.
 * data-jump-title: Title for the dropdown button.
 *
 **/

(function ($, Drupal, once) {
  function init(i, list) {
    let $list = $(list);
    let $links = $list.find('li a');
    let linkList = $links.map( function() {
      let $link = $(this).clone();
      $link.removeProp('class');
      $link.addClass('dropdown-item text-wrap');
      return $link;
    }).get();

    if (linkList.length) {
      let breakpoint = $list.data('jump-breakpoint') ? $list.data('jump-breakpoint') : 'lg';
      $list.addClass(`d-none d-${breakpoint}-block`);
      let id = $list.data('jump-id') ? $list.data('jump-id') : 'jump-menu-' + i;
      let $parent = $list.parent();
      let class_values = $list.data('jump-classes');
      let button_text = $list.data('jump-title') ? $list.data('jump-title') : 'Select a Link';
      let button_dropdown =
        `<div class="dropdown d-${breakpoint}-none ${class_values}">` +
        `<button id="${id}" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">${button_text}</button>` +
        `<div class="dropdown-menu" aria-labelledby="${id}"></div></div>`;
      $parent.prepend(button_dropdown);
      let $link_list = $('.dropdown-menu', $parent);
      linkList.forEach(function (value) {
        $link_list.append(value);
      });
    }
  }

  Drupal.behaviors.jumpMenu = {
    attach: function attach(context) {
      once('jump-menu', 'ul.jump-menu', context).forEach(function (value, i) {
        $(value).each(init);
      });
    }
  };
})(jQuery, Drupal, once);
