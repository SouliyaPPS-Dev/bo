import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppLayout } from '@/layout';
import { useAuth } from '@/services/auth';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    // Check for accessToken to determine authentication
    const accessToken = localStorage.getItem('accessToken');

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
