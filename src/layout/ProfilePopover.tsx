import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useAuth } from '@/services/auth';
import { useMyRole } from '@/feature/users/hooks/useMyRole';
import { useNavigate } from '@tanstack/react-router';

export default function ProfilePopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const navigate = useNavigate();
  const { data: roleData, isLoading } = useMyRole();
  const profileUser = roleData?.user ?? auth.user ?? null;

  const avatarLabel = useMemo(() => {
    if (profileUser?.name) {
      return profileUser.name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
    }
    if (profileUser?.email) {
      return profileUser.email.charAt(0).toUpperCase();
    }
    return 'B';
  }, [profileUser?.name, profileUser?.email]);

  const displayName = profileUser?.name || (profileUser?.email ?? 'Backoffice User');
  const displayEmail = profileUser?.email ?? 'user@example.com';

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size='small' sx={{ ml: 1 }}>
        <Avatar sx={{ width: 32, height: 32 }}>{avatarLabel}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} keepMounted>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            void navigate({ to: '/settings' });
          }}
        >
          <Stack>
            <Typography variant='body2'>
              {isLoading ? 'Loading...' : displayName}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {isLoading ? '...' : displayEmail}
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => auth.signOut()}>Sign out</MenuItem>
      </Menu>
    </>
  );
}
