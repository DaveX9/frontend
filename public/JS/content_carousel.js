document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".content-carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentIndex = 0;

    // Function to update carousel position
    const updateCarousel = () => {
        const itemWidth = carousel.querySelector(".content-carousel-item").offsetWidth;
        const gap = 20; // Adjust for margin
        const totalWidth = itemWidth + gap;
        carousel.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
    };

    // Next Button functionality
    nextBtn.addEventListener("click", () => {
        const items = document.querySelectorAll(".content-carousel-item");
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Previous Button functionality
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Initialize position
    updateCarousel();
});