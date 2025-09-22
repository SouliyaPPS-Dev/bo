import { createFileRoute } from '@tanstack/react-router';
import { Box, Grid, Paper, Typography, Card, CardContent, Stack, IconButton, Tooltip } from '@mui/material';
import { Info, Download, Refresh } from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';

export const Route = createFileRoute('/_app/analytics/overview')({
  component: AnalyticsOverviewPage,
});

function AnalyticsOverviewPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Analytics Overview"
        subtitle="Comprehensive view of your analytics data"
        action={
          <Stack direction="row" spacing={1}>
            <Tooltip title="Refresh data">
              <IconButton size="small">
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download report">
              <IconButton size="small">
                <Download />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      />
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            Key Performance Indicators
          </Typography>
        </Grid>

        {[
          { label: 'Page Views', value: '125,432', growth: '+15%', period: 'This Month' },
          { label: 'Unique Visitors', value: '45,234', growth: '+8%', period: 'This Month' },
          { label: 'Bounce Rate', value: '32.5%', growth: '-5%', period: 'This Month' },
          { label: 'Session Duration', value: '4m 32s', growth: '+12%', period: 'This Month' },
        ].map((metric, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 3
            }}>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {metric.label}
                    </Typography>
                    <Tooltip title="More info">
                      <IconButton size="small">
                        <Info fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Typography variant="h4" fontWeight={700}>
                    {metric.value}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      color={metric.growth.startsWith('+') ? 'success.main' : 'error.main'}
                      fontWeight={600}
                    >
                      {metric.growth}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.period}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Charts Section */}
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Traffic Sources
            </Typography>
            <Box
              sx={{
                height: 280,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography color="text.secondary">Pie Chart Placeholder</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Paper sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" gutterBottom>
              User Activity Heatmap
            </Typography>
            <Box
              sx={{
                height: 280,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography color="text.secondary">Heatmap Placeholder</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Device Breakdown */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Device Breakdown
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                { device: 'Desktop', percentage: 65, color: 'primary.main' },
                { device: 'Mobile', percentage: 28, color: 'success.main' },
                { device: 'Tablet', percentage: 7, color: 'warning.main' },
              ].map((item, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 4
                  }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">{item.device}</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {item.percentage}%
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        height: 8,
                        bgcolor: 'grey.200',
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          width: `${item.percentage}%`,
                          bgcolor: item.color,
                          transition: 'width 0.3s',
                        }}
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
