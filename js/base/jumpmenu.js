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

const JumpMenu = (function (Drupal, once) {
  /**
   * Initialize the jump menu.
   *
   * @param {number} index
   * @param {Array} list
   */
  function init(index, list) {
    let listElement = list;
    const links = Array.from(listElement.querySelectorAll('li a'));

    // Skip if there are no links.
    if (links.length < 1) {
      return;
    }

    // Cone the links so we can use them in the dropdown.
    const linkList = links.map(link => {
      const clonedLink = link.cloneNode(true);
      clonedLink.classList.remove(...clonedLink.classList);
      clonedLink.classList.add('dropdown-item', 'text-wrap');
      return clonedLink;
    });

    // Skip if there are no links.
    if (linkList.length < 1) {
      return;
    }

    // Build the Dropdown.
    const breakpoint = listElement.dataset.jumpBreakpoint || 'lg';
    listElement.classList.add(`d-none`, `d-${breakpoint}-block`);
    const id = listElement.dataset.jumpId || `jump-menu-${index}`;
    let parentElement = listElement.parentElement;
    const classValues = listElement.dataset.jumpClasses || '';
    const buttonText = listElement.dataset.jumpTitle || 'Select a Link';
    let buttonDropdown = document.createElement('div');
    buttonDropdown.className = `dropdown d-${breakpoint}-none ${classValues}`;
    buttonDropdown.innerHTML = `
      <button id="${id}" class="btn btn-outline-primary btn-lg dropdown-toggle" type="submit" data-bs-toggle="dropdown" aria-expanded="false">${buttonText}</button>
      <div class="dropdown-menu" aria-labelledby="${id}"></div>
    `;
    parentElement.prepend(buttonDropdown);
    let dropdownMenu = buttonDropdown.querySelector('.dropdown-menu');
    linkList.forEach(link => dropdownMenu.appendChild(link));
  }

  Drupal.behaviors.jumpMenu = {
    attach: function attach(context) {
      once('jump-menu', 'ul.jump-menu', context).forEach((value, index) =>  {
        init(index, value); // Pass the correct index to the init function
      });
    }
  };
})(Drupal, once);

export default JumpMenu;
