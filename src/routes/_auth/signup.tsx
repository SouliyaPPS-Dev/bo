import { SignUpForm } from '@/feature/auth';
import type { AuthRouterContext } from '@/services/auth/context';
import { Box, Stack, Typography } from '@mui/material';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_auth/signup')({
  beforeLoad: ({ context }) => {
    const accessToken =
      (context as AuthRouterContext | undefined)?.auth?.token ?? null;

    if (accessToken) {
      redirect({ to: '/dashboard', throw: true });
    }
  },
  component: SignUp,
});

function SignUp() {
  const { t } = useTranslation();
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
            {t('signUp')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('signUpSubtitle')}
          </Typography>
        </Box>
        <SignUpForm />
      </Stack>
    </Box>
  );
}
