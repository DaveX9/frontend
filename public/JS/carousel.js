const carouselItems = document.querySelectorAll(".carousel_item");
let i = 0; // Start with the first item

setInterval(() => {
  // Move all items
  carouselItems.forEach((item, index) => {
    item.style.transform = `translateX(-${i * 100}%)`; // Slide effect
  });

  // Increment index
  i = (i + 1) % carouselItems.length; // Loop back to start
}, 2000);
