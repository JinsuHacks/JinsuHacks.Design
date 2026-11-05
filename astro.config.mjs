import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jinsuhacks.design',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/tokens.css";`,
        },
      },
    },
  },
});