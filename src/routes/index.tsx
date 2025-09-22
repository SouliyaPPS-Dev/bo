import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // Check if user is authenticated
    const accessToken = localStorage.getItem('accessToken');

    // Redirect based on authentication status
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: accessToken ? '/dashboard' : '/signin',
    });
  },
});
