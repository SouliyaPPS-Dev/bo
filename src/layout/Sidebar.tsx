import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
  Avatar,
  Collapse,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  Support as SupportIcon,
  ExpandLess,
  ExpandMore,
  FiberManualRecord as DotIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useState } from 'react';

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

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
    badge: 'New',
    badgeColor: 'primary',
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: <AnalyticsIcon />,
    children: [
      {
        label: 'Overview',
        path: '/analytics/overview',
        icon: <DotIcon sx={{ fontSize: 8 }} />,
      },
      {
        label: 'Reports',
        path: '/analytics/reports',
        icon: <DotIcon sx={{ fontSize: 8 }} />,
      },
      {
        label: 'Real-time',
        path: '/analytics/realtime',
        icon: <DotIcon sx={{ fontSize: 8 }} />,
      },
    ],
  },
  {
    label: 'Users',
    path: '/users',
    icon: <PeopleIcon />,
    badge: 12,
    badgeColor: 'error',
  },
  {
    label: 'Products',
    path: '/products',
    icon: <InventoryIcon />,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: <ReceiptIcon />,
    badge: 5,
    badgeColor: 'warning',
  },
];

const bottomNavigationItems: NavigationItem[] = [
  { label: 'Support', path: '/support', icon: <SupportIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
  collapsed = false,
  drawerWidth = 280,
  collapsedWidth = 72,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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

  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = isActive(item.path);

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
            borderRadius: 2,
            mx: 1,
            mb: 0.5,
            pl: collapsed ? 2 : depth > 0 ? 4 : 2,
            transition: 'all 0.2s',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '& .MuiListItemIcon-root': {
                color: 'primary.contrastText',
              },
            },
            '&:hover': {
              backgroundColor: active ? 'primary.dark' : 'action.hover',
            },
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
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
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
                Backoffice
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Admin Dashboard
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <Divider sx={{ mx: 2 }} />

      {/* Main Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2 }}>
        <List>{navigationItems.map((item) => renderNavigationItem(item))}</List>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Bottom Navigation */}
      <Box sx={{ py: 2 }}>
        <List>
          {bottomNavigationItems.map((item) => renderNavigationItem(item))}
        </List>
      </Box>

      {/* Footer Stats */}
      {!collapsed && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Stack spacing={1}>
              <Stack direction='row' alignItems='center' spacing={1}>
                <TrendingUpIcon fontSize='small' />
                <Typography variant='caption' fontWeight={600}>
                  Performance
                </Typography>
              </Stack>
              <Typography variant='h6' fontWeight={700}>
                +24.5%
              </Typography>
              <Typography variant='caption' sx={{ opacity: 0.9 }}>
                vs last month
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
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
