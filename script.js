
  let currentIndex = 0;

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  // Show current slide
  function showSlide(index) {

    // Remove active class from all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Add active class to current slide
    slides[index].classList.add("active");

    // Add active class to current dot
    dots[index].classList.add("active");
  }

  // Next slide automatically
  function nextSlide() {
    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    showSlide(currentIndex);
  }

  // Manual dot click
  function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }

  // Auto slide every 4 seconds
  setInterval(nextSlide, 3000);

  // Initialize first slide
  showSlide(currentIndex);
