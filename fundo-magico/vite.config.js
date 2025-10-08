import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5173
  },
  base: '/Projetos-Vite-Portfolio/fundo-magico/',
});