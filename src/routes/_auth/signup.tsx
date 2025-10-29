import { createFileRoute, redirect } from '@tanstack/react-router';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SignUpForm } from '@/feature/auth';

export const Route = createFileRoute('/_auth/signup')({
  beforeLoad: () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: '/dashboard' });
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

