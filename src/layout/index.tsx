import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Badge,
  Tooltip,
  Divider,
} from '@mui/material';
// color scheme handled via useThemeMode helper
import { useThemeMode } from '@/theme/mode';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import ProfilePopover from './ProfilePopover';
import { PropsWithChildren, useState } from 'react';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

export function AppLayout({ children }: PropsWithChildren) {
  const theme = useTheme();
  const { toggle, isDark } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleThemeToggle = () => {
    console.log('[AppLayout] Theme toggle button clicked');
    console.log('[AppLayout] Current isDark:', isDark);
    try {
      toggle();
      console.log('[AppLayout] Toggle function called successfully');
    } catch (error) {
      console.error('[AppLayout] Failed to toggle theme:', error);
    }
  };

  const currentDrawerWidth = sidebarCollapsed
    ? DRAWER_WIDTH_COLLAPSED
    : DRAWER_WIDTH;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Modern AppBar with gradient and glass effect */}
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${isMobile ? 0 : currentDrawerWidth}px)` },
          ml: { md: `${isMobile ? 0 : currentDrawerWidth}px` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          {/* Menu Toggle Button */}
          <IconButton
            color='inherit'
            aria-label='toggle drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo and Title for Mobile */}
          {isMobile && (
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ flexGrow: 1 }}
            >
              <Avatar
                src='/logo.svg'
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                }}
              >
                B
              </Avatar>
              <Typography variant='h6' fontWeight={600} color='text.primary'>
                Backoffice
              </Typography>
            </Stack>
          )}

          {/* Search Bar (Desktop) */}
          {!isMobile && (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                maxWidth: 600,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  bgcolor: 'action.hover',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s',
                  '&:focus-within': {
                    borderColor: 'primary.main',
                    bgcolor: 'background.paper',
                  },
                }}
              >
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Box
                  component='input'
                  placeholder='Search...'
                  sx={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    width: '100%',
                    fontSize: '14px',
                    color: 'text.primary',
                    '&::placeholder': {
                      color: 'text.disabled',
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Right Side Actions */}
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{ ml: 'auto' }}
          >
            {/* Theme Mode Toggle */}
            <Tooltip
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <IconButton
                onClick={handleThemeToggle}
                sx={{
                  color: 'text.primary',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <LightModeIcon
                    sx={{
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': { transform: 'rotate(180deg)' },
                    }}
                  />
                ) : (
                  <DarkModeIcon
                    sx={{
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': { transform: 'rotate(180deg)' },
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title='Notifications'>
              <IconButton sx={{ color: 'text.primary' }}>
                <Badge badgeContent={4} color='error'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Language Switcher */}
            <LanguageSwitcher />

            <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />

            {/* Profile */}
            <ProfilePopover />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box
        component='nav'
        sx={{
          width: { md: currentDrawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          collapsed={sidebarCollapsed}
          drawerWidth={DRAWER_WIDTH}
          collapsedWidth={DRAWER_WIDTH_COLLAPSED}
        />
      </Box>

      {/* Main Content Area */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            animation: 'fadeIn 0.3s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export { default as Sidebar } from './Sidebar';
export { default as LanguageSwitcher } from './LanguageSwitcher';
export { default as ProfilePopover } from './ProfilePopover';
