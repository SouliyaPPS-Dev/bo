import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Analytics as AnalyticsIcon,
  BarChart,
} from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';

export const Route = createFileRoute('/_app/analytics')({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$48,234',
      change: '+12.5%',
      trend: 'up',
      icon: <TrendingUp />,
      color: 'success.main',
    },
    {
      title: 'Active Users',
      value: '8,234',
      change: '+8.2%',
      trend: 'up',
      icon: <AnalyticsIcon />,
      color: 'primary.main',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: <TrendingDown />,
      color: 'error.main',
    },
    {
      title: 'Avg. Session Duration',
      value: '5m 23s',
      change: '+18.3%',
      trend: 'up',
      icon: <BarChart />,
      color: 'info.main',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title='Analytics Overview'
        subtitle='Monitor your application performance and user engagement'
      />
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 3
            }}>
            <Card
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: `${stat.color.split('.')[0]}.50`,
                        color: stat.color,
                        display: 'flex',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Chip
                      label={stat.change}
                      size='small'
                      color={stat.trend === 'up' ? 'success' : 'error'}
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>
                  <Box>
                    <Typography variant='h4' fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {stat.title}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Main Chart Area */}
        <Grid
          size={{
            xs: 12,
            md: 8
          }}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant='h6' gutterBottom>
              Traffic Overview
            </Typography>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 2,
              }}
            >
              <Typography color='text.secondary'>
                Chart Component Here
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Side Stats */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant='h6' gutterBottom>
              Top Pages
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {[
                { page: '/dashboard', views: '12,543', percentage: 45 },
                { page: '/products', views: '8,234', percentage: 30 },
                { page: '/users', views: '5,123', percentage: 18 },
                { page: '/settings', views: '1,923', percentage: 7 },
              ].map((item, index) => (
                <Box key={index}>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    mb={0.5}
                  >
                    <Typography variant='body2'>{item.page}</Typography>
                    <Typography variant='body2' fontWeight={600}>
                      {item.views}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      height: 4,
                      bgcolor: 'grey.200',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${item.percentage}%`,
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
