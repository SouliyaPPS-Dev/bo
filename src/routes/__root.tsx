import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { AuthProvider } from '@/services/auth';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  ),
});

function RootComponent() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position='bottom-right' />
      )}
    </AuthProvider>
  );
}
