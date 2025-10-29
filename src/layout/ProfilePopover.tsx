import { Avatar, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAuth } from '@/services/auth';

export default function ProfilePopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();

  const avatarLabel = useMemo(() => {
    if (auth.user?.name) {
      return auth.user.name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
    }
    if (auth.user?.email) {
      return auth.user.email.charAt(0).toUpperCase();
    }
    return 'B';
  }, [auth.user]);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size='small' sx={{ ml: 1 }}>
        <Avatar sx={{ width: 32, height: 32 }}>{avatarLabel}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} keepMounted>
        <MenuItem disabled>
          <Stack>
            <Typography variant='body2'>{auth.user?.name ?? 'Backoffice User'}</Typography>
            <Typography variant='caption' color='text.secondary'>
              {auth.user?.email ?? 'user@example.com'}
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => auth.signOut()}>Sign out</MenuItem>
      </Menu>
    </>
  );
}
