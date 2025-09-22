import { Avatar, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@/services/auth'

export default function ProfilePopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const auth = useAuth()
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ ml: 1 }}>
        <Avatar sx={{ width: 32, height: 32 }}>B</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} keepMounted>
        <MenuItem disabled>
          <Stack>
            <Typography variant="body2">Backoffice User</Typography>
            <Typography variant="caption" color="text.secondary">user@example.com</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => auth.signOut()}>Sign out</MenuItem>
      </Menu>
    </>
  )
}

