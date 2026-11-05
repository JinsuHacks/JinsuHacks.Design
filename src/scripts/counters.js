/**
 * JinsuHacks.Design - Counter Animations
 * Animated number counters for stats and metrics
 */

import { prefersReducedMotion, animateCounter, easings } from './animations.js';

let counterObserver = null;

export function initCounters() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      el.textContent = target.toLocaleString();
    });
    return;
  }

  // Clean up existing observer
  if (counterObserver) {
    counterObserver.disconnect();
  }

  const counters = document.querySelectorAll('[data-count]');

  counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = parseInt(el.dataset.duration, 10) || 2000;
        const easing = el.dataset.easing || 'easeOut';
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';

        animateCounter(el, 0, target, duration, {
          easing: easings[easing] || easings.easeOut,
          formatter: (val) => `${prefix}${Math.round(val).toLocaleString()}${suffix}`,
        });

        counterObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px',
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

export function refreshCounters() {
  initCounters();
}

// Manual counter animation
export function animateCounterElement(element, target, options = {}) {
  if (prefersReducedMotion()) {
    element.textContent = target.toLocaleString();
    return Promise.resolve();
  }

  return animateCounter(element, 0, target, options.duration || 2000, {
    easing: options.easing || easings.easeOut,
    formatter: options.formatter || ((val) => Math.round(val).toLocaleString()),
  });
}