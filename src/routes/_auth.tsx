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
        // Use theme tokens for both modes
        background: 'linear-gradient(135deg, var(--mui-palette-background-default) 0%, var(--mui-palette-background-paper) 100%)',
      }}
    >
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
              Welcome Back
            </Typography>
          </Stack>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}
