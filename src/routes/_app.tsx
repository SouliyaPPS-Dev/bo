import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppLayout } from '@/layout';
import { useAuth } from '@/services/auth';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { AuthRouterContext } from '@/services/auth/context';
import { getStoredAccessToken } from '@/services/auth/tokenStorage';

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    const authContext = (context as AuthRouterContext | undefined)?.auth;
    const accessToken = authContext?.token ?? getStoredAccessToken();

    if (!accessToken) {
      // TanStack Router's redirect is designed to be thrown
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Double-check authentication status with context
    if (!auth?.isAuthenticated) {
      void navigate({ to: '/signin' });
    }
  }, [auth?.isAuthenticated, navigate]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
