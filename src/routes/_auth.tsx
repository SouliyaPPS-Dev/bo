import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          <Stack spacing={2} alignItems='center' sx={{ mb: 3 }}>
            <img src='/logo.svg' alt='logo' width={48} height={48} />
            <Typography variant='h4' fontWeight={700} color='primary'>
              Welcome Back
            </Typography>
          </Stack>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}
