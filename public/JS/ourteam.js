const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let scrollAmount = 0;
const scrollStep = 220; // Width of one team member including margin

nextBtn.addEventListener("click", () => {
  scrollAmount += scrollStep;
  carousel.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener("click", () => {
  scrollAmount -= scrollStep;
  if (scrollAmount < 0) scrollAmount = 0; // Prevent scrolling beyond the first item
  carousel.style.transform = `translateX(-${scrollAmount}px)`;
});
