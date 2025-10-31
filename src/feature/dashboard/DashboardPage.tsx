import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowOutward, TrendingUp, TrendingDown, MoreHoriz } from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useTranslation } from 'react-i18next';

type Metric = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
};

type ProgressItem = {
  id: string;
  label: string;
  value: number;
  trend: number;
};

type TimelineItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  iconColor: string;
};

const kpiCards: Metric[] = [
  {
    id: 'revenue',
    label: 'dashboardRevenue',
    value: '$124,500',
    change: '+18.2%',
    trend: 'up',
    color: 'success.main',
  },
  {
    id: 'orders',
    label: 'dashboardOrders',
    value: '1,684',
    change: '+6.4%',
    trend: 'up',
    color: 'primary.main',
  },
  {
    id: 'conversion',
    label: 'dashboardConversion',
    value: '3.2%',
    change: '-0.8%',
    trend: 'down',
    color: 'warning.main',
  },
  {
    id: 'activeUsers',
    label: 'dashboardActiveUsers',
    value: '8,942',
    change: '+12.1%',
    trend: 'up',
    color: 'info.main',
  },
];

const progressItems: ProgressItem[] = [
  { id: 'productLaunch', label: 'dashboardProductLaunch', value: 82, trend: 12 },
  { id: 'newCustomers', label: 'dashboardNewCustomers', value: 64, trend: 8 },
  { id: 'supportTickets', label: 'dashboardSupportTickets', value: 48, trend: -5 },
];

const timelineItems: TimelineItem[] = [
  {
    id: 'designReview',
    title: 'dashboardDesignReview',
    description: 'dashboardDesignReviewDescription',
    time: '09:20',
    iconColor: 'primary.main',
  },
  {
    id: 'marketingSync',
    title: 'dashboardMarketingSync',
    description: 'dashboardMarketingSyncDescription',
    time: '11:00',
    iconColor: 'success.main',
  },
  {
    id: 'productDemo',
    title: 'dashboardProductDemo',
    description: 'dashboardProductDemoDescription',
    time: '14:30',
    iconColor: 'info.main',
  },
];

const topProducts = [
  {
    id: 'prd-01',
    name: 'dashboardProductAnalytics',
    category: 'dashboardCategorySaas',
    revenue: '$32,400',
    growth: '+22%',
  },
  {
    id: 'prd-02',
    name: 'dashboardProductAutomation',
    category: 'dashboardCategoryAi',
    revenue: '$27,100',
    growth: '+18%',
  },
  {
    id: 'prd-03',
    name: 'dashboardProductInsights',
    category: 'dashboardCategoryMarketing',
    revenue: '$18,950',
    growth: '+9%',
  },
];

const teamMembers = [
  { id: 'tm-01', initials: 'MA', name: 'dashboardMemberMaya', role: 'dashboardRoleProductLead' },
  { id: 'tm-02', initials: 'JL', name: 'dashboardMemberJordan', role: 'dashboardRoleEngineering' },
  { id: 'tm-03', initials: 'SC', name: 'dashboardMemberSofia', role: 'dashboardRoleDesign' },
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <PageContainer>
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 3,
        }}
      >
        <Box flex={1}>
          <Typography variant='h4' fontWeight={700} sx={{ mb: 1 }}>
            {t('dashboardHeroTitle')}
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.85 }}>
            {t('dashboardHeroSubtitle')}
          </Typography>
        </Box>
        <Stack direction='row' spacing={2}>
          <Chip
            label={t('dashboardHeroChip')}
            color='default'
            variant='outlined'
            sx={{
              borderColor: 'rgba(255,255,255,0.4)',
              color: 'inherit',
              borderRadius: 2,
              px: 1.5,
            }}
          />
          <Chip
            label={t('dashboardHeroTrend')}
            icon={<TrendingUp fontSize='small' />}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.12)',
              color: 'inherit',
              borderRadius: 2,
              px: 1.5,
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />
        </Stack>
      </Box>
      <PageHeader
        title={t('dashboard')}
        subtitle={t('dashboardWelcomeBack')}
        action={
          <Stack direction='row' spacing={1}>
            <Chip
              label={t('dashboardPulse')}
              color='success'
              icon={<ArrowOutward fontSize='small' />}
              sx={{ borderRadius: 2 }}
            />
          </Stack>
        }
      />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {kpiCards.map((metric) => (
          <Grid
            key={metric.id}
            size={{
              xs: 12,
              sm: 6,
              md: 3
            }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${metric.color}20`,
                      color: metric.color,
                    }}
                  >
                    <TrendingUp fontSize='small' />
                  </Box>
                  <Chip
                    label={metric.change}
                    size='small'
                    color={metric.trend === 'up' ? 'success' : 'error'}
                    icon={
                      metric.trend === 'up' ? (
                        <TrendingUp fontSize='small' />
                      ) : (
                        <TrendingDown fontSize='small' />
                      )
                    }
                    sx={{ borderRadius: 2, '& .MuiChip-icon': { fontSize: 18 } }}
                  />
                </Stack>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    {t(metric.label)}
                  </Typography>
                  <Typography variant='h4' fontWeight={700}>
                    {metric.value}
                  </Typography>
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={metric.trend === 'up' ? 72 : 52}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: `${metric.color}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: metric.color,
                      borderRadius: 999,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid
          size={{
            xs: 12,
            lg: 8
          }}>
          <Card
            elevation={0}
            sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Box>
                  <Typography variant='h6'>{t('dashboardPerformanceTitle')}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {t('dashboardPerformanceSubtitle')}
                  </Typography>
                </Box>
                <Chip label={t('dashboardLast30Days')} />
              </Stack>

              <Box
                sx={{
                  height: 260,
                  borderRadius: 2,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(180deg, rgba(63,81,181,0.15) 0%, rgba(21,101,192,0.05) 100%)'
                      : 'linear-gradient(180deg, rgba(63,81,181,0.08) 0%, rgba(63,81,181,0.02) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Stack spacing={1} alignItems='center'>
                  <Typography variant='subtitle1' color='text.secondary'>
                    {t('dashboardChartPlaceholder')}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {t('dashboardChartHint')}
                  </Typography>
                </Stack>
              </Box>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {progressItems.map((item) => (
                  <Grid
                    key={item.id}
                    size={{
                      xs: 12,
                      sm: 4
                    }}>
                    <Stack spacing={1.5}>
                      <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='subtitle2'>{t(item.label)}</Typography>
                        <Chip
                          label={`${item.trend > 0 ? '+' : ''}${item.trend}%`}
                          size='small'
                          color={item.trend >= 0 ? 'success' : 'error'}
                        />
                      </Stack>
                      <LinearProgress
                        variant='determinate'
                        value={item.value}
                        sx={{
                          height: 6,
                          borderRadius: 999,
                        }}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 4
          }}>
          <Card
            elevation={0}
            sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}
          >
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Box>
                  <Typography variant='h6'>{t('dashboardTimelineTitle')}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {t('dashboardTimelineSubtitle')}
                  </Typography>
                </Box>
                <IconButton size='small'>
                  <MoreHoriz />
                </IconButton>
              </Stack>

              <List sx={{ mt: 2 }}>
                {timelineItems.map((item, idx) => (
                  <ListItem
                    key={item.id}
                    alignItems='flex-start'
                    sx={{ pb: idx === timelineItems.length - 1 ? 0 : 2 }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: item.iconColor,
                          color: 'common.white',
                        }}
                      >
                        <TrendingUp fontSize='small' />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant='subtitle2'>{t(item.title)}</Typography>
                      }
                      secondary={
                        <>
                          <Typography variant='body2' color='text.secondary'>
                            {t(item.description)}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {item.time}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Card
            elevation={0}
            sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Typography variant='h6'>{t('dashboardTopProducts')}</Typography>
                <Chip label={t('dashboardViewAll')} variant='outlined' size='small' />
              </Stack>

              <List disablePadding>
                {topProducts.map((product, index) => (
                  <Box key={product.id}>
                    <ListItem
                      secondaryAction={<Chip label={product.growth} color='success' size='small' />}
                      sx={{ px: 0 }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant='subtitle2'>{t(product.name)}</Typography>}
                        secondary={
                          <Typography variant='body2' color='text.secondary'>
                            {t(product.category)} · {product.revenue}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < topProducts.length - 1 && <Divider sx={{ my: 1.5 }} />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <Card
            elevation={0}
            sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Typography variant='h6'>{t('dashboardTeamOverview')}</Typography>
                <Chip label={t('dashboardManageTeam')} size='small' />
              </Stack>

              <List disablePadding>
                {teamMembers.map((member, index) => (
                  <Box key={member.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar>{member.initials}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant='subtitle2'>{t(member.name)}</Typography>}
                        secondary={
                          <Typography variant='body2' color='text.secondary'>
                            {t(member.role)}
                          </Typography>
                        }
                      />
                      <Chip label={index === 0 ? t('dashboardOnline') : t('dashboardOffline')} />
                    </ListItem>
                    {index < teamMembers.length - 1 && <Divider sx={{ my: 1.5 }} />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
