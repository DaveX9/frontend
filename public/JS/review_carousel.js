document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Bootstrap Carousel
    var myCarousel = document.querySelector('#reviewCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 3000, // Auto slide every 3 seconds
      wrap: true,     // Restart carousel from the beginning
      pause: "hover"  // Pause carousel on hover
    });

    // Optional: Add Manual Controls
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');

    prevButton.addEventListener('click', () => {
      carousel.prev();
    });

    nextButton.addEventListener('click', () => {
      carousel.next();
    });
  });


