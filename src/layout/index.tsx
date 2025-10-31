import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
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
import { PropsWithChildren, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

export function AppLayout({ children }: PropsWithChildren) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { toggle, isDark } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const searchIndex = useMemo(
    () => [
      {
        id: 'dashboard',
        title: t('search.dashboard.title'),
        description: t('search.dashboard.description'),
        path: '/dashboard',
        category: t('search.category.overview'),
      },
      {
        id: 'analytics',
        title: t('search.analytics.title'),
        description: t('search.analytics.description'),
        path: '/analytics/overview',
        category: t('search.category.analytics'),
      },
      {
        id: 'users',
        title: t('search.users.title'),
        description: t('search.users.description'),
        path: '/users',
        category: t('search.category.management'),
      },
      {
        id: 'products',
        title: t('search.products.title'),
        description: t('search.products.description'),
        path: '/products',
        category: t('search.category.management'),
      },
      {
        id: 'settings',
        title: t('search.settings.title'),
        description: t('search.settings.description'),
        path: '/settings',
        category: t('search.category.account'),
      },
      {
        id: 'support',
        title: t('search.support.title'),
        description: t('search.support.description'),
        path: '/support',
        category: t('search.category.help'),
      },
    ],
    [t]
  );

  const filteredSearchResults = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return [];
    return searchIndex.filter((item) => {
      const haystack = `${item.title} ${item.description}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [searchIndex, searchQuery]);

  const handleSearchSelect = (path: string) => {
    if (path) {
      void navigate({ to: path });
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

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
          borderRadius: 0,
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
                {t('backoffice')}
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
                position: 'relative',
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
                  placeholder={t('search')}
                  value={searchQuery}
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
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => {
                    // Delay blur to allow click selection
                    setTimeout(() => setSearchFocused(false), 120);
                  }}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setSearchQuery('');
                      setSearchFocused(false);
                    }
                    if (event.key === 'Enter') {
                      const firstResult = filteredSearchResults[0];
                      if (firstResult) {
                        event.preventDefault();
                        handleSearchSelect(firstResult.path);
                      }
                    }
                  }}
                />
              </Box>
              {searchFocused && (
                <Paper
                  elevation={8}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    mt: 1,
                    width: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    zIndex: theme.zIndex.modal,
                    maxHeight: 360,
                    overflowY: 'auto',
                  }}
                >
                  {searchQuery.trim() ? (
                    filteredSearchResults.length > 0 ? (
                      <List disablePadding>
                        {filteredSearchResults.map((item) => (
                          <ListItemButton
                            key={item.id}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => handleSearchSelect(item.path)}
                            sx={{
                              alignItems: 'flex-start',
                              gap: 1,
                              py: 1.5,
                            }}
                          >
                            <Box
                              component='span'
                              sx={{
                                fontSize: 11,
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                color: 'text.secondary',
                                bgcolor: 'action.hover',
                                borderRadius: 1,
                                px: 1,
                                py: 0.25,
                              }}
                            >
                              {item.category}
                            </Box>
                            <ListItemText
                              primary={
                                <Typography variant='subtitle2'>{item.title}</Typography>
                              }
                              secondary={
                                <Typography variant='body2' color='text.secondary'>
                                  {item.description}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ p: 2 }}>
                        <Typography variant='subtitle2' gutterBottom>
                          {t('search.noResults')}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {t('search.tryAnother')}
                        </Typography>
                      </Box>
                    )
                  ) : (
                    <Box sx={{ p: 2 }}>
                      <Typography variant='subtitle2' gutterBottom>
                        {t('search.quickHelpTitle')}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {t('search.quickHelpBody')}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              )}
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
              title={isDark ? t('switchToLightMode') : t('switchToDarkMode')}
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
            <Tooltip title={t('notifications')}>
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
