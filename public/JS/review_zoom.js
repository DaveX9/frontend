// Select modal elements
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("fullImage");
const closeBtn = document.querySelector(".modal .close");

// Add event listeners to all images in the gallery
document.querySelectorAll(".image-gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    modal.classList.add("show"); // Show the modal
    modalImage.src = img.src; // Set the clicked image source
    modalImage.alt = img.alt; // Set the alt text
  });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show"); // Hide modal
});

// Close the modal when clicking outside the modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});