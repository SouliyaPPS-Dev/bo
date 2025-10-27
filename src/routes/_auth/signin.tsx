import { createFileRoute, redirect } from '@tanstack/react-router';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SignInForm } from '@/feature/auth';

export const Route = createFileRoute('/_auth/signin')({
  beforeLoad: () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: '/dashboard' });
    }
  },
  component: SignIn,
});

function SignIn() {
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
            {t('signin')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Welcome back! Please sign in to your account.
          </Typography>
        </Box>
        <SignInForm />
      </Stack>
    </Box>
  );
}

