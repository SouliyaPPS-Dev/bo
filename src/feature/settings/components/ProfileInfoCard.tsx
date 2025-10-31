import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import { Email, Person, Schedule, Shield } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { User } from '@/services/api/users';

type ProfileInfoCardProps = {
  user?: User | null;
  loading?: boolean;
};

function formatDate(value?: string) {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function ProfileInfoCard({ user, loading }: ProfileInfoCardProps) {
  const { t } = useTranslation();

  const displayName = user?.name ?? t('unknownUser');
  const primaryInitial = displayName.charAt(0).toUpperCase();

  return (
    <Card component='section'>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton variant='circular' width={48} height={48} />
          ) : (
            <Avatar sx={{ width: 48, height: 48 }}>
              {primaryInitial || '?'}
            </Avatar>
          )
        }
        title={
          loading ? (
            <Skeleton width={160} />
          ) : (
            <Typography variant='h6'>{displayName}</Typography>
          )
        }
        subheader={
          loading ? (
            <Skeleton width={120} />
          ) : (
            t('profileRoleSubtitle', {
              role: user?.role ?? t('rolePlaceholder'),
            })
          )
        }
      />
      <Divider />
      <CardContent>
        <List disablePadding>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Email />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t('email')}
              secondary={
                loading ? <Skeleton width='60%' /> : user?.email ?? '—'
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t('name')}
              secondary={
                loading ? <Skeleton width='40%' /> : user?.name ?? '—'
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Shield />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t('role')}
              secondary={
                loading ? (
                  <Skeleton width='30%' />
                ) : (
                  t(`role.${user?.role ?? ''}`, {
                    defaultValue: user?.role ?? t('rolePlaceholder'),
                  })
                )
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Schedule />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t('memberSince')}
              secondary={
                loading ? (
                  <Skeleton width='50%' />
                ) : (
                  formatDate(user?.created_at)
                )
              }
            />
          </ListItem>
        </List>
        {!loading && user?.updated_at && (
          <Grid container justifyContent='flex-end' sx={{ mt: 2 }}>
            <Typography variant='caption' color='text.secondary'>
              {t('lastUpdatedAt', { date: formatDate(user.updated_at) })}
            </Typography>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
