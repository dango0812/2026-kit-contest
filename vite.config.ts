import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), svgr()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@pages': resolve(process.cwd(), 'src/pages'),
      '@features': resolve(process.cwd(), 'src/features'),
      '@shared': resolve(process.cwd(), 'src/shared'),
      '@providers': resolve(process.cwd(), 'src/providers'),
      '@constants': resolve(process.cwd(), 'src/constants'),
      '@assets': resolve(process.cwd(), 'src/assets'),
      '@database': resolve(process.cwd(), 'src/database'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
