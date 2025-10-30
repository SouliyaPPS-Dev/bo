import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import { visualizer } from 'rollup-plugin-visualizer'

declare const process: {
  cwd: () => string
  env?: Record<string, string | undefined>
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const apiBaseUrl =
    env.BASE_URL?.trim() ||
    env.VITE_API_BASE_URL?.trim() ||
    'https://api-test-production-2d7d.up.railway.app'

  const allowedHosts = new Set<string>(['localhost', '127.0.0.1', '0.0.0.0'])

  const railwayHostCandidates = [
    env.RAILWAY_STATIC_URL,
    env.RAILWAY_PUBLIC_DOMAIN,
    env.RAILWAY_URL,
    env.RAILWAY_PROJECT_DOMAINS,
  ]
    .filter(Boolean)
    .flatMap((value) => String(value).split(/[,\s]+/).filter(Boolean))

  for (const candidate of railwayHostCandidates) {
    try {
      const normalized = candidate.startsWith('http')
        ? candidate
        : `https://${candidate}`
      const hostname = new URL(normalized).hostname
      if (hostname) allowedHosts.add(hostname)
    } catch {
      // ignore invalid values
    }
  }

  return {
    define: {
      __APP_API_BASE_URL__: JSON.stringify(apiBaseUrl),
    },
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
    server: {
      port: 5173,
      open: false,
    },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env?.PORT ?? '4173'),
      open: false,
      allowedHosts: Array.from(allowedHosts),
    },
    build: {
      target: 'esnext',
      sourcemap: false,
      minify: 'esbuild',
    },
  }
})
