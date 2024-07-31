Drupal.behaviors.sidebarMenu = {
  attach: function (context) {

    function setupDropdownBehavior(navElement) {
      navElement.querySelectorAll('.navbar-nav .dropdown').forEach(item => {
        const arrow = item.querySelector('.dropdown-arrow svg');
        const dropdownMenu = item.querySelector('.dropdown-menu');
        arrow.addEventListener('click', e => {
          e.preventDefault();
          toggleDropdown(item, dropdownMenu);
        });
      });
    }
    function openDropdown(item, dropdownMenu) {
      const arrow = item.querySelector('.dropdown-arrow svg');
      arrow.setAttribute('aria-expanded', 'true');
      item.classList.add('show');
    }
    function closeDropdown(item, dropdownMenu) {
      const arrow = item.querySelector('.dropdown-arrow svg');
      arrow.setAttribute('aria-expanded', 'false');
      item.classList.remove('show');
    }
    function toggleDropdown(item, dropdownMenu) {
      if (item.classList.contains('show')) {
        closeDropdown(item, dropdownMenu);
      } else {
        openDropdown(item, dropdownMenu);
      }
    }
    once('psul-theme-first-sidebar-accordion-menu', '.sidebar-menu-parent', context).forEach((element) => {
      setupDropdownBehavior(element);
    });
  }
};
