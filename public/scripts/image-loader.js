/**
 * JinsuHacks.Design - Image Loader
 * Lazy loading, LQIP, and image optimization utilities
 */

let imageObserver = null;

export function initImageLoader() {
  // Clean up existing observer
  if (imageObserver) {
    imageObserver.disconnect();
  }

  // Native lazy loading fallback for older browsers
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    setupNativeLazyLoading();
  } else {
    // Fallback to IntersectionObserver
    setupIntersectionObserverLazyLoading();
  }

  // Add fade-in animation for images
  setupImageFadeIn();

  // Handle image errors
  setupImageErrorHandling();
}

function setupNativeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    // Add loading placeholder
    if (!img.src && img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}

function setupIntersectionObserverLazyLoading() {
  imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

function setupImageFadeIn() {
  const images = document.querySelectorAll('img:not([data-no-fade])');

  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      }, { once: true });
    }
  });
}

function setupImageErrorHandling() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      // Replace with placeholder
      if (!img.dataset.errorHandled) {
        img.dataset.errorHandled = 'true';
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTFlMWUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
        img.alt = 'Image not available';
      }
    }, { once: true });
  });
}

// LQIP (Low Quality Image Placeholder) generator
export function generateLQIP(width = 20, height = 20) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#e1e1e1');
  gradient.addColorStop(1, '#f5f5f5');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
}

// Preload critical images
export function preloadImages(urls) {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Responsive image helper
export function getResponsiveImageSrc(baseUrl, widths = [400, 800, 1200, 1600]) {
  return widths.map(w => `${baseUrl}?w=${w}&fit=crop ${w}w`).join(', ');
}

// Image aspect ratio calculator
export function calculateAspectRatio(width, height) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

// Refresh image loader for dynamic content
export function refreshImageLoader() {
  initImageLoader();
}