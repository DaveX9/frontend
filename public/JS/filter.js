// JavaScript for filtering
const categoryBtns = document.querySelectorAll(".category-btn");
const cards = document.querySelectorAll(".card");

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    // Show/Hide Cards
    cards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});