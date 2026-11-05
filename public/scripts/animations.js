/**
 * JinsuHacks.Design - Animation Utilities
 * Core animation functions and helpers
 */

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Easing functions
export const easings = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => 1 - (1 - t) * (1 - t),
  easeInOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  spring: (t) => 1 - Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3),
  bounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
  expo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
};

// Animation helper
export function animate(element, keyframes, options = {}) {
  if (prefersReducedMotion()) {
    // Apply final state immediately
    if (keyframes.length > 0) {
      Object.assign(element.style, keyframes[keyframes.length - 1]);
    }
    return Promise.resolve();
  }

  const defaultOptions = {
    duration: 350,
    easing: 'ease-out',
    fill: 'forwards',
  };

  const animation = element.animate(keyframes, { ...defaultOptions, ...options });
  return animation.finished;
}

// Stagger children animation
export function staggerChildren(children, keyframes, options = {}, staggerDelay = 100) {
  if (prefersReducedMotion()) {
    children.forEach((child, index) => {
      if (keyframes.length > 0) {
        Object.assign(child.style, keyframes[keyframes.length - 1]);
      }
    });
    return Promise.resolve();
  }

  const promises = Array.from(children).map((child, index) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const animation = child.animate(keyframes, options);
        animation.finished.then(resolve);
      }, index * staggerDelay);
    });
  });

  return Promise.all(promises);
}

// Scroll-linked animation (progressive enhancement)
export function createScrollAnimation(element, animationName, options = {}) {
  if (!('animationTimeline' in document.documentElement.style)) {
    // Fallback: use IntersectionObserver
    return createIntersectionAnimation(element, animationName, options);
  }

  // This would be used with CSS @keyframes and animation-timeline: view()
  // Implementation depends on specific use case
  return null;
}

// IntersectionObserver-based animation fallback
export function createIntersectionAnimation(element, animationName, options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(`animate-${animationName}`);
        observer.unobserve(entry.target);
      }
    });
  }, { ...defaultOptions, ...options });

  observer.observe(element);
  return observer;
}

// Parallax effect
export function createParallax(element, strength = 0.1) {
  if (prefersReducedMotion()) return;

  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.bottom < 0 || rect.top > viewportHeight) return;

    const scrolled = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const yPos = scrolled * strength * 100;

    element.style.transform = `translateY(${yPos}px)`;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}

// Mouse follow parallax
export function createMouseParallax(element, strength = 20) {
  if (prefersReducedMotion()) return;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / strength;
    const deltaY = (e.clientY - centerY) / strength;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    element.style.transform = 'translate(0, 0)';
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

// Text reveal animation (character by character)
export function animateTextReveal(element, options = {}) {
  if (prefersReducedMotion()) return Promise.resolve();

  const text = element.textContent;
  element.textContent = '';
  element.style.display = 'inline-block';

  const chars = text.split('').map((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? ' ' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%)';
    span.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 30}ms`;
    element.appendChild(span);
    return span;
  });

  // Force reflow
  element.offsetHeight;

  return new Promise(resolve => {
    chars.forEach((span, index) => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';

      if (index === chars.length - 1) {
        span.addEventListener('transitionend', () => resolve(), { once: true });
      }
    });
  });
}

// Number counter animation
export function animateCounter(element, start, end, duration = 2000, options = {}) {
  if (prefersReducedMotion()) {
    element.textContent = end.toLocaleString();
    return Promise.resolve();
  }

  const {
    easing = easings.easeOut,
    formatter = (val) => Math.round(val).toLocaleString(),
    onComplete,
  } = options;

  return new Promise(resolve => {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const current = start + (end - start) * easedProgress;

      element.textContent = formatter(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = formatter(end);
        onComplete?.();
        resolve();
      }
    }

    requestAnimationFrame(update);
  });
}

// Morphing blob animation
export function createMorphingBlob(element, options = {}) {
  if (prefersReducedMotion()) return;

  const {
    borderRadius = '60% 40% 30% 70% / 60% 30% 70% 40%',
    duration = 8000,
  } = options;

  const keyframes = [
    { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
    { borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' },
    { borderRadius: '30% 70% 40% 60% / 70% 40% 60% 30%' },
    { borderRadius: '70% 30% 60% 40% / 30% 60% 40% 70%' },
    { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
  ];

  element.animate(keyframes, {
    duration,
    iterations: Infinity,
    easing: 'ease-in-out',
  });
}

// Initialize all animations on page
export function initAnimations() {
  // Text reveal elements
  document.querySelectorAll('[data-animate-text]').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateTextReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
  });

  // Counter elements
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, 0, target, 2000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}