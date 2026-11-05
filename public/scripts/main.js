/**
 * JinsuHacks.Design - Main Script
 * Initializes all animation and interaction modules
 */

// Import all CSS files
import '../styles/tokens.css';
import '../styles/globals.css';
import '../styles/animations.css';
import '../styles/frutiger-metro.css';
import '../styles/components.css';

import './animations.js';
import './scroll-reveal.js';
import './geo-shapes.js';
import './counters.js';
import './image-loader.js';

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initScrollReveal();
  initGeoShapes();
  initCounters();
  initImageLoader();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });

  // Active nav highlighting
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('nav-link--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Reduce motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduce-motion');
  }

  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  });
});

// View Transitions API support
if (document.startViewTransition) {
  document.addEventListener('astro:before-swap', () => {
    document.documentElement.style.setProperty('--astro-transition', 'true');
  });
}

// Export for module usage
export {};