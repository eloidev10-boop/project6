'use strict';

// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

/**
 * Display slide at the specified index
 * @param {number} index - Index of slide to display
 */
function showSlide(index) {
    // Validate index
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

/**
 * Move to next slide
 */
function nextSlide() {
    showSlide(currentIndex + 1);
}

/**
 * Manual slide navigation via dot click
 * @param {number} index - Index of slide to navigate to
 */
function currentSlide(index) {
    showSlide(index);
}

/**
 * Auto-advance slides every 3 seconds
 */
const autoSlideInterval = setInterval(nextSlide, 3000);

// Initialize first slide on page load
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});

// Pause auto-slide on user interaction for better UX
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        // Resume auto-slide after 10 seconds of inactivity
        setTimeout(() => {
            setInterval(nextSlide, 3000);
        }, 10000);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
