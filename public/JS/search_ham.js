// HAMBURGER MENU FUNCTIONALITY
// --------------------------
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const searchBar = document.getElementById('search-bar');
const searchIcon = document.getElementById('search-icon');

// Function to toggle the full-screen menu
function toggleHamburgerMenu(action) {
    if (action === 'open') {
        fullscreenMenu.classList.add('active');
    } else if (action === 'close') {
        fullscreenMenu.classList.remove('active');
    }
}

// Function to toggle the search bar visibility
function toggleSearch() {
    if (searchBar) {
        const isVisible = searchBar.style.display === 'block';
        searchBar.style.display = isVisible ? 'none' : 'block';
    }
}

// Attach event listeners for hamburger menu functionality
if (hamburgerIcon && closeIcon && fullscreenMenu) {
    hamburgerIcon.addEventListener('click', () => toggleHamburgerMenu('open')); // Open menu
    closeIcon.addEventListener('click', () => toggleHamburgerMenu('close')); // Close menu

    // Optional: Close menu when clicking outside
    fullscreenMenu.addEventListener('click', (event) => {
        if (event.target === fullscreenMenu) {
            toggleHamburgerMenu('close');
        }
    });
}

// Attach event listener for search icon functionality
if (searchIcon && searchBar) {
    searchIcon.addEventListener('click', toggleSearch);
}


// --------------------------
// FOOTER TOGGLE MENU FUNCTIONALITY
function toggleFooterMenu(menuId) {
    let menu = document.getElementById(menuId);
    let header = menu.previousElementSibling; // Get the h3 header
    let icon = header.querySelector(".toggle-icon"); // Get the + icon

    if (window.innerWidth <= 768) { // Only allow toggle on mobile
        if (menu.style.display === "block") {
            menu.style.display = "none";
            icon.textContent = "+"; // Change back to +
        } else {
            // Close all menus before opening a new one
            document.querySelectorAll(".footer-menu").forEach(item => item.style.display = "none");
            document.querySelectorAll(".toggle-icon").forEach(i => i.textContent = "+");

            menu.style.display = "block"; // Show the list items
            icon.textContent = "−"; // Change to -
        }
    }
}

// Ensure that the + symbol is always visible on mobile
window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        document.querySelectorAll(".footer-menu").forEach(item => item.style.display = "block");
        document.querySelectorAll(".toggle-icon").forEach(i => i.textContent = "");
    } else {
        document.querySelectorAll(".footer-menu").forEach(item => item.style.display = "none");
        document.querySelectorAll(".toggle-icon").forEach(i => i.textContent = "+");
    }
});

// Run on page load to apply correct styles based on screen width
document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll(".footer-menu").forEach(item => item.style.display = "none");
        document.querySelectorAll(".toggle-icon").forEach(i => i.textContent = "+");
    }
});

