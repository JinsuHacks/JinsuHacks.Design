/**
 * JinsuHacks.Design - Geo Shapes
 * Animated geometric shapes for hero sections and backgrounds
 */

import { prefersReducedMotion } from './animations.js';

const SHAPE_TYPES = ['circle', 'square', 'diamond', 'blob', 'pill'];
const SHAPE_COLORS = ['teal', 'orange', 'purple', 'cyan', 'lime', 'magenta'];
const SHAPE_SIZES = ['sm', 'md', 'lg', 'xl'];
const ANIMATIONS = ['float', 'float-slow', 'float-organic', 'drift', 'spin', 'pulse', 'breathe'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function createShapeElement(options = {}) {
  const {
    type = getRandomItem(SHAPE_TYPES),
    color = getRandomItem(SHAPE_COLORS),
    size = getRandomItem(SHAPE_SIZES),
    animation = getRandomItem(ANIMATIONS),
    top = `${getRandomNumber(0, 100)}%`,
    left = `${getRandomNumber(0, 100)}%`,
    opacity = getRandomNumber(0.05, 0.15),
    zIndex = -1,
  } = options;

  const el = document.createElement('div');
  el.className = `geo-shape geo-shape--${type} geo-shape--${color} geo-shape--${size} geo-shape--${animation}`;
  el.style.cssText = `
    position: absolute;
    top: ${top};
    left: ${left};
    opacity: ${opacity};
    z-index: ${zIndex};
    pointer-events: none;
    will-change: transform, opacity;
  `;
  el.setAttribute('aria-hidden', 'true');
  el.dataset.geoShape = 'true';

  return el;
}

export function initGeoShapes() {
  if (prefersReducedMotion()) return;

  const containers = document.querySelectorAll('.geo-shapes');

  containers.forEach(container => {
    // Clear existing shapes
    container.innerHTML = '';

    // Create shapes based on container size
    const containerRect = container.getBoundingClientRect();
    const shapeCount = Math.min(Math.max(Math.floor((containerRect.width * containerRect.height) / 50000), 4), 12);

    for (let i = 0; i < shapeCount; i++) {
      const shape = createShapeElement();
      container.appendChild(shape);
    }
  });
}

export function createGeoShapes(container, count = 6) {
  if (prefersReducedMotion()) return;

  for (let i = 0; i < count; i++) {
    const shape = createShapeElement();
    container.appendChild(shape);
  }
}

export function removeGeoShapes(container) {
  const shapes = container.querySelectorAll('[data-geo-shape]');
  shapes.forEach(shape => shape.remove());
}

// Mouse-following shape
export function createMouseFollowShape(container) {
  if (prefersReducedMotion()) return;

  const shape = document.createElement('div');
  shape.className = 'geo-shape geo-shape--circle geo-shape--teal geo-shape--sm geo-shape--float';
  shape.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.3;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease-out;
  `;
  shape.setAttribute('aria-hidden', 'true');

  document.body.appendChild(shape);

  let mouseX = 0;
  let mouseY = 0;
  let shapeX = 0;
  let shapeY = 0;

  const animate = () => {
    shapeX += (mouseX - shapeX) * 0.1;
    shapeY += (mouseY - shapeY) * 0.1;

    shape.style.left = `${shapeX}px`;
    shape.style.top = `${shapeY}px`;

    requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.addEventListener('mousemove', handleMouseMove);
  animate();

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    shape.remove();
  };
}

// Initialize on demand for specific sections
export function initSectionGeoShapes(selector) {
  const section = document.querySelector(selector);
  if (!section) return;

  const container = section.querySelector('.geo-shapes') || (() => {
    const div = document.createElement('div');
    div.className = 'geo-shapes';
    div.style.cssText = 'position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: -1;';
    div.setAttribute('aria-hidden', 'true');
    section.style.position = 'relative';
    section.insertBefore(div, section.firstChild);
    return div;
  })();

  createGeoShapes(container, 8);
}