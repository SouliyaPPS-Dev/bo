import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
    // Use ESLint flat config mode to be compatible with ESLint v9
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        // Lint TS/JS files in src using ESLint CLI-style patterns
        lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"'
      }
    }),
    visualizer({ filename: 'dist/stats.html', open: false }),
  ],
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 5173,
    open: true,
  },
})
