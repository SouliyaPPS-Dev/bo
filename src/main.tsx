import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/tanstack-query/client';
import './locales/i18n';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

if (import.meta.env.DEV) {
  // Lazy-start MSW in development for API mocking
  void (async () => {
    try {
      const { worker } = await import('./mocks/browser');
      // Start MSW with custom options to handle unhandled requests
      await worker.start({
        onUnhandledRequest: (req) => {
          // Only warn about unhandled API requests, not client-side routes
          if (req.url.includes('/api/')) {
            console.warn(`[MSW] Unhandled ${req.method} request to ${req.url}`);
          }
          // Silently pass through all other requests (client-side routes, assets, etc.)
        },
      });
    } catch (error) {
      console.error('Failed to start MSW:', error);
    }
  })();
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: undefined,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* Initialize MUI color scheme (prevents flash, persists preference) */}
    <InitColorSchemeScript />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
