import { createFileRoute } from '@tanstack/react-router';
import { Box, Grid, Paper, Typography, Card, CardContent, Stack, Chip, Avatar, LinearProgress } from '@mui/material';
import { Circle, TrendingUp, People, Language, Devices } from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';

export const Route = createFileRoute('/_app/analytics/realtime')({
  component: RealtimeAnalyticsPage,
});

function RealtimeAnalyticsPage() {
  const activeUsers = 342;
  
  const recentActivities = [
    { user: 'John Doe', action: 'Viewed Dashboard', time: '2 seconds ago', avatar: 'JD' },
    { user: 'Jane Smith', action: 'Downloaded Report', time: '15 seconds ago', avatar: 'JS' },
    { user: 'Mike Johnson', action: 'Updated Profile', time: '45 seconds ago', avatar: 'MJ' },
    { user: 'Sarah Wilson', action: 'Created New Project', time: '1 minute ago', avatar: 'SW' },
    { user: 'Tom Brown', action: 'Logged In', time: '2 minutes ago', avatar: 'TB' },
  ];

  const topPages = [
    { page: '/dashboard', users: 89, percentage: 26 },
    { page: '/products', users: 67, percentage: 20 },
    { page: '/analytics', users: 54, percentage: 16 },
    { page: '/users', users: 45, percentage: 13 },
    { page: '/settings', users: 32, percentage: 9 },
  ];

  const locations = [
    { country: 'United States', users: 145, flag: '🇺🇸' },
    { country: 'United Kingdom', users: 67, flag: '🇬🇧' },
    { country: 'Germany', users: 45, flag: '🇩🇪' },
    { country: 'France', users: 38, flag: '🇫🇷' },
    { country: 'Canada', users: 28, flag: '🇨🇦' },
  ];

  return (
    <PageContainer>
      <PageHeader
        title='Real-time Analytics'
        subtitle='Monitor live user activity and engagement'
        action={
          <Stack direction='row' alignItems='center' spacing={1}>
            <Circle sx={{ color: 'success.main', fontSize: 12 }} />
            <Typography variant='body2' color='text.secondary'>
              Live
            </Typography>
          </Stack>
        }
      />
      <Grid container spacing={3}>
        {/* Active Users Card */}
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <Card
            sx={{
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'primary.contrastText',
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <People sx={{ color: 'white', fontSize: 32 }} />
                  <Chip
                    label='LIVE'
                    size='small'
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontWeight: 600,
                    }}
                  />
                </Stack>
                <Box>
                  <Typography variant='h2' fontWeight={700} color='white'>
                    {activeUsers}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: 'primary.contrastText', opacity: 0.8 }}
                  >
                    Active Users Now
                  </Typography>
                </Box>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <TrendingUp sx={{ color: 'white', fontSize: 16 }} />
                  <Typography variant='body2' color='white'>
                    +12% from last hour
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Real-time Stats */}
        <Grid
          size={{
            xs: 12,
            md: 9,
          }}
        >
          <Grid container spacing={2}>
            {[
              { label: 'Page Views/Min', value: '1,234', change: '+5.2%' },
              { label: 'Avg. Session', value: '3m 45s', change: '+8.1%' },
              { label: 'Bounce Rate', value: '24.5%', change: '-2.3%' },
              { label: 'New Users', value: '89', change: '+15.7%' },
            ].map((stat, index) => (
              <Grid
                key={index}
                size={{
                  xs: 6,
                  md: 3,
                }}
              >
                <Paper sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <Typography variant='body2' color='text.secondary'>
                      {stat.label}
                    </Typography>
                    <Typography variant='h5' fontWeight={600}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant='caption'
                      color={
                        stat.change.startsWith('+')
                          ? 'success.main'
                          : 'error.main'
                      }
                      fontWeight={600}
                    >
                      {stat.change}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant='h6' gutterBottom>
              Recent Activity
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {recentActivities.map((activity, index) => (
                <Stack
                  key={index}
                  direction='row'
                  spacing={2}
                  alignItems='center'
                >
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                    {activity.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='body2' fontWeight={500}>
                      {activity.user}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {activity.action}
                    </Typography>
                  </Box>
                  <Typography variant='caption' color='text.secondary'>
                    {activity.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Top Pages */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant='h6' gutterBottom>
              Top Pages (Live)
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {topPages.map((item, index) => (
                <Box key={index}>
                  <Stack direction='row' justifyContent='space-between' mb={1}>
                    <Typography variant='body2'>{item.page}</Typography>
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <People sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant='body2' fontWeight={600}>
                        {item.users}
                      </Typography>
                    </Stack>
                  </Stack>
                  <LinearProgress
                    variant='determinate'
                    value={item.percentage}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Geographic Distribution */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              mb={3}
            >
              <Typography variant='h6'>Geographic Distribution</Typography>
              <Language color='action' />
            </Stack>
            <Grid container spacing={2}>
              {locations.map((location, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 2.4,
                  }}
                >
                  <Card variant='outlined'>
                    <CardContent>
                      <Stack spacing={1} alignItems='center'>
                        <Typography variant='h4'>{location.flag}</Typography>
                        <Typography variant='body2' fontWeight={500}>
                          {location.country}
                        </Typography>
                        <Typography
                          variant='h6'
                          fontWeight={700}
                          color='primary.main'
                        >
                          {location.users}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          users online
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Device Types */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              mb={3}
            >
              <Typography variant='h6'>Device Types (Live)</Typography>
              <Devices color='action' />
            </Stack>
            <Grid container spacing={3}>
              {[
                { device: 'Desktop', users: 189, percentage: 55, icon: '💻' },
                { device: 'Mobile', users: 123, percentage: 36, icon: '📱' },
                { device: 'Tablet', users: 30, percentage: 9, icon: '📱' },
              ].map((item, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Stack direction='row' spacing={2} alignItems='center'>
                    <Typography variant='h4'>{item.icon}</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        mb={1}
                      >
                        <Typography variant='body2'>{item.device}</Typography>
                        <Typography variant='body2' fontWeight={600}>
                          {item.users} users
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant='determinate'
                        value={item.percentage}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
