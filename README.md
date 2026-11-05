# JinsuHacks.Design

> A vibrant, Frutiger Metro-inspired B2B design studio website built with Astro.

![JinsuHacks.Design Preview](https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop)

## ✨ Features

- **Frutiger Metro Design System** - Vibrant colors, geometric shapes, glassmorphism, and kinetic typography
- **5 Pages** - Home, Services, Capabilities, About, Contact
- **Smooth Animations** - Scroll-reveal, floating geo-shapes, counter animations, text reveals
- **Responsive** - Mobile-first, works beautifully on all devices
- **Performance Optimized** - Astro static generation, optimized images, minimal JS
- **Accessible** - WCAG AA compliant, reduced motion support, semantic HTML
- **SEO Ready** - Meta tags, Open Graph, sitemap, robots.txt

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd jinsuhacks-design

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Build for Production

```bash
npm run build
```

The built site will be in the `dist/` directory, ready for deployment.

## 🎨 Design System

### Colors

```css
--metro-teal: #00D4AA;
--metro-orange: #FF6B35;
--metro-purple: #A855F7;
--metro-yellow: #FDE047;
--metro-magenta: #EC4899;
--metro-cyan: #06B6D4;
--metro-lime: #A3E635;
```

### Typography

- **Display**: Syne (geometric, bold)
- **Body**: DM Sans (clean, readable)
- **Mono**: JetBrains Mono (code)

### Components

- `Button` - Primary, secondary, accent, ghost variants
- `Card` - Default, glass, gradient-border
- `GlassPanel` - Frutiger Aero glassmorphism
- `GeoShape` - Animated geometric shapes
- `GridBlock` - Metro-style tiles
- `ImageWithOverlay` - Images with hover overlays

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, BaseLayout
│   ├── ui/              # Button, Card, GlassPanel, GeoShape, GridBlock, ImageWithOverlay
│   ├── home/            # Hero, ServicesPreview, CapabilitiesShowcase, CTA
│   ├── services/        # ServiceCard, ProcessStep
│   ├── about/           # ValueCard, Timeline
│   └── contact/         # ContactForm
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── services.astro
│   ├── portfolio.astro
│   ├── about.astro
│   └── contact.astro
├── scripts/
│   ├── main.js
│   ├── animations.js
│   ├── scroll-reveal.js
│   ├── geo-shapes.js
│   ├── counters.js
│   └── image-loader.js
├── styles/
│   ├── tokens.css       # Design tokens (colors, spacing, typography)
│   ├── globals.css      # Reset, base styles, utilities
│   ├── animations.css   # Keyframe animations
│   ├── frutiger-metro.css # Signature components
│   └── components.css   # Component-specific styles
└── data/
    ├── navigation.json
    ├── services.json
  └── contact.json
```

## 🛠️ Customization

### Changing Colors

Edit `src/styles/tokens.css` to customize the color palette:

```css
:root {
  --metro-teal: #YOUR_COLOR;
  --metro-orange: #YOUR_COLOR;
  /* ... */
}
```

### Adding Services

Edit `src/data/services.json` to add/modify services.

### Updating Contact Details

Edit `src/data/contact.json` to update the studio email, phone number, and location.

### Modifying Navigation

Edit `src/data/navigation.json` to change nav items.

## 📦 Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The `netlify.toml` file handles headers and redirects

### Vercel

1. Connect your repository to Vercel
2. Framework preset: Astro
3. The `vercel.json` file handles headers and rewrites

### Static Hosting (Any)

```bash
npm run build
# Upload the dist/ folder to your host
```

## 🧪 Development

### Running Locally

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
```

### Adding New Pages

1. Create `src/pages/new-page.astro`
2. Add to navigation in `src/data/navigation.json`
3. Build and test

### Adding Components

1. Create component in appropriate `src/components/` subdirectory
2. Import and use in pages
3. Styles go in `src/styles/components.css` or component-specific CSS

## ♿ Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels and roles
- Focus visible states
- Reduced motion support
- Color contrast ratios (WCAG AA)
- Keyboard navigation

## 📄 License

MIT License - feel free to use for your own projects!

## 🙏 Credits

- **Design Inspiration**: Frutiger Metro / Frutiger Aero aesthetic
- **Fonts**: Syne, DM Sans, JetBrains Mono (Google Fonts)
- **Images**: Unsplash (placeholder images)
- **Framework**: Astro
- **Icons**: Custom SVG

---

Built with ❤️ by the JinsuHacks.Design team