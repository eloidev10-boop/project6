'use strict';

/**
 * Slider Controller
 * Manages automatic and manual slider functionality with professional best practices
 */

// DOM Elements
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// State
let currentIndex = 0;
let autoSlideInterval = null;

/**
 * Display slide at specified index with boundary validation
 * @param {number} index - The slide index to display
 * @returns {boolean} True if successful, false if invalid index
 */
function showSlide(index) {
  // Validate index bounds
  if (index < 0 || index >= slides.length) {
    console.warn(`Invalid slide index: ${index}. Total slides: ${slides.length}`);
    return false;
  }

  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Add active class to current slide and corresponding dot
  if (slides[index] && dots[index]) {
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
    return true;
  }

  return false;
}

/**
 * Navigate to next slide with automatic looping
 */
function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

/**
 * Navigate to previous slide with automatic looping
 */
function prevSlide() {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

/**
 * Navigate to specific slide (called from dot buttons)
 * Resets auto-slide timer to improve user experience
 * @param {number} index - The slide index to navigate to
 */
function currentSlide(index) {
  if (showSlide(index)) {
    resetAutoSlide();
  }
}

/**
 * Start automatic slide progression
 */
function startAutoSlide() {
  if (!autoSlideInterval) {
    autoSlideInterval = setInterval(nextSlide, 3000);
  }
}

/**
 * Stop automatic slide progression
 */
function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

/**
 * Reset auto-slide timer (useful after user interaction)
 */
function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

/**
 * Initialize slider on page load
 * Sets up first slide display, auto-slide, and hover controls
 */
function initSlider() {
  if (slides.length === 0 || dots.length === 0) {
    console.error('Slider elements not found in DOM');
    return false;
  }

  // Display first slide
  showSlide(0);

  // Start automatic sliding
  startAutoSlide();

  // Pause auto-slide on mouse enter, resume on mouse leave
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
  }

  return true;
}

/**
 * Initialize smooth scrolling for all internal navigation links
 * Improves user experience with smooth page scrolling
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      // Skip if it's just a hash
      if (href === '#') {
        return;
      }

      // Find target element
      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        console.warn(`Target element not found: ${href}`);
      }
    });
  });
}

/**
 * Initialize all components when DOM is fully loaded
 * Ensures all elements are available before initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  const sliderInitialized = initSlider();
  initSmoothScroll();

  if (sliderInitialized) {
    console.log('Slider initialized successfully');
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  stopAutoSlide();
});
