import { SignInForm } from '@/feature/auth';
import { Box, Stack, Typography } from '@mui/material';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import type { AuthRouterContext } from '@/services/auth/context';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/signin')({
  beforeLoad: ({ context }) => {
    const accessToken =
      (context as AuthRouterContext | undefined)?.auth?.token ?? null;

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: '/dashboard' });
    }
  },
  validateSearch: z.object({
    registered: z.string().optional(),
    redirect: z.string().optional(),
  }),
  component: SignIn,
});

function SignIn() {
  const { t } = useTranslation();
  const { registered } = Route.useSearch();
  return (
    <Box>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant='h5'
            fontWeight={700}
            gutterBottom
            color='text.primary'
          >
            {t('signin')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('signInSubtitle')}
          </Typography>
        </Box>
        <SignInForm showRegistrationSuccess={registered === '1'} />
      </Stack>
    </Box>
  );
}
