import {
  Analytics as AnalyticsIcon,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Settings as SettingsIcon,
  Support as SupportIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminUsers } from '@/feature/users/hooks/useAdminUsers';

interface NavigationItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  children?: NavigationItem[];
}

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed?: boolean;
  drawerWidth?: number;
  collapsedWidth?: number;
}

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
  collapsed = false,
  drawerWidth = 280,
  collapsedWidth = 72,
}: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const {
    data: adminUsers,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useAdminUsers();

  const usersCount = adminUsers?.length;
  const usersBadge = isUsersLoading
    ? '...'
    : isUsersError
      ? undefined
      : usersCount;
  const usersBadgeColor =
    typeof usersBadge === 'number' && usersBadge > 0 ? 'error' : 'default';

  const handleNavigation = (path?: string) => {
    if (path) {
      void navigate({ to: path });
      if (isMobile && onMobileClose) {
        onMobileClose();
      }
    }
  };

  const handleExpandClick = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    );
  };

  // Navigation items with translations
  const navigationItems: NavigationItem[] = [
    {
      label: t('dashboard'),
      path: '/dashboard',
      icon: <DashboardIcon />,
      badge: t('new'),
      badgeColor: 'primary',
    },
    {
      label: t('analytics'),
      icon: <AnalyticsIcon />,
      children: [
        {
          label: t('overview'),
          path: '/analytics/overview',
          icon: <DashboardIcon fontSize='small' />,
        },
        {
          label: t('reports'),
          path: '/analytics/reports',
          icon: <ReceiptIcon fontSize='small' />,
        },
        {
          label: t('realtime'),
          path: '/analytics/realtime',
          icon: <AnalyticsIcon fontSize='small' />,
        },
      ],
    },
    {
      label: t('users'),
      path: '/users',
      icon: <PeopleIcon />,
      badge: usersBadge,
      badgeColor: usersBadge !== undefined ? usersBadgeColor : undefined,
    },
    {
      label: t('products'),
      path: '/products',
      icon: <InventoryIcon />,
    },
    {
      label: t('orders'),
      path: '/orders',
      icon: <ReceiptIcon />,
      badge: 5,
      badgeColor: 'warning',
    },
  ];

  const bottomNavigationItems: NavigationItem[] = [
    {
      label: t('support'),
      path: '/support',
      icon: <SupportIcon />,
    },
    {
      label: t('settings'),
      path: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = isActive(item.path);

    const listItemStyles = {
      '&.Mui-selected': {
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'primary.dark',
          borderRadius: 0,
        },
        '& .MuiListItemIcon-root': {
          color: 'primary.contrastText',
        },
      },
      '&:hover': {
        backgroundColor: active ? 'primary.dark' : 'action.hover',
        borderRadius: 0,
      },
    } as const;

    return (
      <Box key={item.label}>
        <ListItemButton
          onClick={() => {
            if (hasChildren) {
              handleExpandClick(item.label);
            } else {
              handleNavigation(item.path);
            }
          }}
          selected={active}
          sx={{
            borderRadius: 0,
            mx: 1,
            mb: 0.5,
            pl: collapsed ? 2 : depth > 0 ? 4 : 2,
            transition: 'all 0.2s',
            ...listItemStyles,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 'auto' : 48,
              color: active ? 'primary.contrastText' : 'text.secondary',
              mr: collapsed ? 0 : 2,
            }}
          >
            {item.icon}
          </ListItemIcon>

          {!collapsed && (
            <>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 600 : 400,
                  fontSize: '0.875rem',
                }}
              />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size='small'
                  color={item.badgeColor || 'default'}
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                />
              )}
              {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
            </>
          )}
        </ListItemButton>

        {hasChildren && !collapsed && (
          <Collapse in={isExpanded} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {item.children?.map((child) =>
                renderNavigationItem(child, depth + 1)
              )}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar />

      {/* Logo and Brand */}
      {!collapsed && (
        <Box sx={{ px: 2, py: 2 }}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Avatar
              src='/logo.svg'
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                boxShadow: 2,
              }}
            >
              B
            </Avatar>
            <Box>
              <Typography variant='h6' fontWeight={700} color='text.primary'>
                {t('backoffice')}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {t('adminDashboard')}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <Divider sx={{ mx: 2 }} />

      {/* Main Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2 }}>
        <List
          sx={{
            '& .MuiListItemButton-root': {
              borderRadius: 2,
            },
            '& .MuiListItemButton-root.Mui-selected': {
              borderRadius: 2,
            },
            '& .MuiListItemButton-root:hover': {
              borderRadius: 2,
            },
          }}
        >
          {navigationItems.map((item) => renderNavigationItem(item))}
        </List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Bottom Navigation */}
      <Box sx={{ py: 2 }}>
        <List
          sx={{
            '& .MuiListItemButton-root': {
              borderRadius: 2,
            },
            '& .MuiListItemButton-root.Mui-selected': {
              borderRadius: 2,
            },
            '& .MuiListItemButton-root:hover': {
              borderRadius: 2,
            },
          }}
        >
          {bottomNavigationItems.map((item) => renderNavigationItem(item))}
        </List>
      </Box>
    </Box>
  );

  const currentWidth = collapsed ? collapsedWidth : drawerWidth;

  if (isMobile) {
    return (
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: 4,
            borderRadius: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: currentWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: currentWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          overflowX: 'hidden',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
