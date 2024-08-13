(function (Drupal, once) {
  Drupal.behaviors.mainMenu = {
    attach: function (context) {
      const desktopBreakpoint = 768;

      function setupDropdownBehavior(navElement) {
        navElement.querySelectorAll('.navbar-nav .dropdown').forEach(item => {
          const link = item.querySelector('.nav-link.dropdown-toggle');
          const arrow = item.querySelector('.dropdown-arrow svg');
          const dropdownMenu = item.querySelector('.dropdown-menu');

          if (link && arrow && dropdownMenu) {
            item.addEventListener('mouseenter', () => {
              if (window.innerWidth >= desktopBreakpoint) openDropdown(item);
            });

            item.addEventListener('mouseleave', () => {
              if (window.innerWidth >= desktopBreakpoint) closeDropdown(item);
            });

            link.addEventListener('click', e => {
              window.location.href = link.getAttribute('href');
            });

            arrow.addEventListener('click', e => {
              e.preventDefault();
              toggleDropdown(item);
            });
          }
        });
      }

      function openDropdown(item) {
        item.classList.add('show');
        item.querySelector('.dropdown-menu').style.cssText = 'max-height: 1200px; opacity: 1;';
        const arrow = item.querySelector('.dropdown-arrow svg');
        arrow.style.transform = 'rotate(180deg)';
        arrow.setAttribute('aria-expanded', 'true');
      }

      function closeDropdown(item) {
        item.classList.remove('show');
        item.querySelector('.dropdown-menu').style.cssText = 'max-height: 0; opacity: 0;';
        const arrow = item.querySelector('.dropdown-arrow svg');
        arrow.style.transform = 'rotate(0deg)';
        arrow.setAttribute('aria-expanded', 'false');
      }

      function toggleDropdown(item) {
        if(item.classList.contains('show')) {
          closeDropdown(item);
        } else {
          openDropdown(item);
        }
      }

      function closeAllDropdowns(navElement) {
        navElement.querySelectorAll('.nav-item.show').forEach(closeDropdown);
      }

      // Keeping the #mainMenuNav id to support psul_theme template.
      once('psul-theme-mainMenuNav', '#mainMenuNav, .main-menu-nav', context).forEach(() => {
        document.querySelectorAll('#mainMenuNav, .main-menu-nav').forEach(setupDropdownBehavior);
      });

      once('psul-theme-offcanvasMain', '#offcanvasMain', context).forEach(() => {
        document.querySelectorAll('#offcanvasMain').forEach(setupDropdownBehavior);
      });

    }
  };
})(Drupal, once);
