/**
 * JinsuHacks.Design - Scroll Reveal
 * IntersectionObserver-based scroll animations
 */

import { prefersReducedMotion } from './animations.js';

let scrollRevealObserver = null;

export function initScrollReveal() {
  if (prefersReducedMotion()) {
    // Show all elements immediately
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Clean up existing observer
  if (scrollRevealObserver) {
    scrollRevealObserver.disconnect();
  }

  // Animation classes mapping
  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'fade-in-left': 'animate-fade-in-left',
    'fade-in-right': 'animate-fade-in-right',
    'scale-in': 'animate-scale-in',
    'scale-in-spring': 'animate-scale-in-spring',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'reveal-up': 'animate-reveal-up',
    'reveal-down': 'animate-reveal-down',
    'reveal-left': 'animate-reveal-left',
    'reveal-right': 'animate-reveal-right',
  };

  // Get all elements with data-animate
  const elements = document.querySelectorAll('[data-animate]');

  // Prepare elements (set initial state)
  elements.forEach(el => {
    const animation = el.dataset.animate;
    const delay = el.dataset.delay || '0';
    const duration = el.dataset.duration || 'auto';

    if (animationClasses[animation]) {
      el.style.opacity = '0';
      el.style.animationDelay = `${delay}ms`;
    }
  });

  // Create observer
  scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animation = el.dataset.animate;

        if (animationClasses[animation]) {
          el.classList.add(animationClasses[animation]);
        }

        // Handle staggered children
        const staggerChildren = el.querySelectorAll('[data-stagger]');
        if (staggerChildren.length > 0) {
          staggerChildren.forEach((child, index) => {
            const staggerDelay = child.dataset.stagger || index * 100;
            child.style.animationDelay = `${staggerDelay}ms`;
            child.classList.add('animate-fade-in-up');
          });
        }

        scrollRevealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  // Observe all elements
  elements.forEach(el => {
    scrollRevealObserver.observe(el);
  });
}

// Re-initialize (useful for dynamic content)
export function refreshScrollReveal() {
  initScrollReveal();
}

// Manual trigger for specific element
export function revealElement(element, animation = 'fade-in-up') {
  if (prefersReducedMotion()) {
    element.style.opacity = '1';
    element.style.transform = 'none';
    return;
  }

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'fade-in-left': 'animate-fade-in-left',
    'fade-in-right': 'animate-fade-in-right',
    'scale-in': 'animate-scale-in',
    'scale-in-spring': 'animate-scale-in-spring',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'reveal-up': 'animate-reveal-up',
    'reveal-down': 'animate-reveal-down',
    'reveal-left': 'animate-reveal-left',
    'reveal-right': 'animate-reveal-right',
  };

  if (animationClasses[animation]) {
    element.classList.add(animationClasses[animation]);
  }
}