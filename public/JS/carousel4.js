// Variables for slides and thumbnails
let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-slide3");
const thumbnails = document.querySelectorAll(".thumbnail");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

// Function to show a specific slide
function showSlide(index) {
  // Ensure the index wraps around (circular navigation)
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  // Reset all slides and thumbnails
  slides.forEach((slide, slideIndex) => {
    slide.classList.remove("active");
    thumbnails[slideIndex].classList.remove("active");
  });

  // Activate the selected slide and thumbnail
  slides[index].classList.add("active");
  thumbnails[index].classList.add("active");

  // Update the current index
  currentIndex = index;
}

// Event listeners for navigation buttons
prevButton.addEventListener("click", () => {
  showSlide(currentIndex - 1); // Show the previous slide
});

nextButton.addEventListener("click", () => {
  showSlide(currentIndex + 1); // Show the next slide
});

// Add click event to each thumbnail for direct navigation
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => showSlide(index));
});