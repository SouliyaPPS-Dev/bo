import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useTranslation } from 'react-i18next';
import ProfileInfoCard from './components/ProfileInfoCard';
import MyRoleCard from '@/feature/users/components/MyRoleCard';
import { useMyRole } from '@/feature/users/hooks/useMyRole';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error, updateRole, updateStatus } =
    useMyRole();

  const user = data?.user;
  
  const formatErrorMessage = (input: unknown): string => {
    if (!input) return t('unknownError');
    if (typeof input === 'string') return input;
    if (input instanceof Error) return input.message || t('unknownError');
    if (
      typeof input === 'object' &&
      'message' in (input as Record<string, unknown>) &&
      typeof (input as { message: unknown }).message === 'string'
    ) {
      return (input as { message: string }).message || t('unknownError');
    }
    return t('unknownError');
  };

  return (
    <PageContainer>
      <PageHeader
        title={t('profile')}
        subtitle={user?.email ?? t('profileDescription')}
      />
      {user?.email && (
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          {t('profileDescription')}
        </Typography>
      )}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity='error'>{formatErrorMessage(error)}</Alert>
      ) : (
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <ProfileInfoCard user={user} loading={!user} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Stack spacing={3}>
              <MyRoleCard
                user={user}
                loading={updateStatus.isPending}
                onSubmit={updateRole}
              />
            </Stack>
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
}
