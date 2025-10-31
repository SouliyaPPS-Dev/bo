import { createFileRoute, redirect } from '@tanstack/react-router';
import type { AuthRouterContext } from '@/services/auth/context';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    const accessToken =
      (context as AuthRouterContext | undefined)?.auth?.token ?? null;

    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: accessToken ? '/dashboard' : '/signin',
    });
  },
});
