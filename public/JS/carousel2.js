// Function to adjust carousel size dynamically
function adjustCarouselSize() {
  const carousel = document.querySelector(".custom-carousel");
  if (!carousel) return; // Prevent errors if element is not found

  if (window.innerWidth < 768) {
    carousel.style.height = "400px"; // Smaller height for mobile screens
  } else {
    carousel.style.height = "500px"; // Default height for larger screens
  }
}

// Call the function on page load
window.addEventListener("load", adjustCarouselSize);

// Call the function when the window is resized
window.addEventListener("resize", adjustCarouselSize);
