import { LanguageSwitcher } from '@/layout';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Language Switcher in top-right corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          zIndex: 1,
        }}
      >
        <LanguageSwitcher />
      </Box>
      <Container maxWidth='sm'>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <img src='/logo.svg' alt='logo' width={48} height={48} />
            <Typography variant='h4' fontWeight={700} color='primary'>
              {t('welcomeBack')}
            </Typography>
          </Stack>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}
