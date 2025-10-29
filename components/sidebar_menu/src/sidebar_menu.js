(function(Drupal, once) {
  Drupal.behaviors.sidebarMenu = {
    attach: function (context) {

      function setupDropdownBehavior(navElement) {
        navElement.querySelectorAll('.navbar-nav .dropdown').forEach(item => {
          const arrow = item.querySelector('.dropdown-arrow');
            const onActivate = e => {
              e.preventDefault();
              toggleDropdown(item);
            };
            arrow.addEventListener('click', onActivate);
            arrow.addEventListener('keydown', e => {
            const key = e.key || e.keyCode;
            if (key === 'Enter' || key === ' ' || key === 'Spacebar' || key === 13 || key === 32) {
              onActivate(e);
            }
          });
        });
      }
      function openDropdown(item) {
        const arrow = item.querySelector('.dropdown-arrow svg');
        arrow.setAttribute('aria-expanded', 'true');
        item.classList.add('show');
      }
      function closeDropdown(item) {
        const arrow = item.querySelector('.dropdown-arrow svg');
        arrow.setAttribute('aria-expanded', 'false');
        item.classList.remove('show');
      }
      function toggleDropdown(item) {
        if (item.classList.contains('show')) {
          closeDropdown(item);
        } else {
          openDropdown(item);
        }
      }
      once('psul-theme-first-sidebar-accordion-menu', '.sidebar-menu-parent', context).forEach((element) => {
        setupDropdownBehavior(element);
      });
    }
  };

})(Drupal, once);
