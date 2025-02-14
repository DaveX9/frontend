// Get modal elements
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("fullImage");
const closeModal = document.querySelector(".close");

// Add click event to all card images
const images = document.querySelectorAll(".card img");
images.forEach((img) => {
  img.addEventListener("click", () => {
    modal.classList.add("show"); // Add 'show' class to enable background and close button
    modal.style.display = "flex"; // Show the modal
    modalImage.src = img.src; // Set the modal image to the clicked image
  });
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", () => {
  modal.classList.remove("show"); // Remove 'show' class to hide background and close button
  modal.style.display = "none";
});

// Close the modal when clicking outside the image
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show"); // Remove 'show' class to hide background and close button
    modal.style.display = "none";
  }
});