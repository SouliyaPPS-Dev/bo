import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { LanguageSwitcher } from '@/layout';
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
        // Dynamic gradient that adapts to light/dark mode
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
        transition: 'background 0.3s ease-in-out',
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
