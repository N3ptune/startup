import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/third': 'https://api.scryfall.com/cards/search?q=e%3Altr',
    },
  },
});