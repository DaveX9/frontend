// Add event listeners for all dropdowns
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.menu-item'); // Clickable menu item
    const menu = dropdown.querySelector('.dropdown-menu'); // Dropdown menu
  
    toggle.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default behavior of the link
      // Close other open dropdowns
      document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = 'none');
      // Toggle this dropdown
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  // Close dropdown if clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = 'none');
    }
  });
  