import { createFileRoute, redirect } from '@tanstack/react-router';
import type { AuthRouterContext } from '@/services/auth/context';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    const accessToken =
      (context as AuthRouterContext | undefined)?.auth?.token ?? null;

    redirect({
      to: accessToken ? '/dashboard' : '/signin',
      throw: true,
    });
  },
});
