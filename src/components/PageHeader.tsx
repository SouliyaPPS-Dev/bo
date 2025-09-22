import { Stack, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='flex-start'
      sx={{ mb: 2 }}
    >
      <Stack spacing={0.5}>
        <Typography variant='h5' fontWeight={600}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant='body2' color='text.secondary'>
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
      {action && <Box>{action}</Box>}
    </Stack>
  );
}
