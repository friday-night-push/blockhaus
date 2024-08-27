import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'ssr',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['@gravity-ui/uikit'],
      output: {
        dir: 'dist-ssr',
      },
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['@gravity-ui/uikit'],
  },
  ssr: {
    format: 'cjs',
    external: ['@gravity-ui/uikit'],
  },
});
