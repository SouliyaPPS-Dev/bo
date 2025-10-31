import { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { UpdateRolePayload, User, UserRole } from '@/services/api/users';

type MyRoleCardProps = {
  user?: User;
  loading?: boolean;
  onSubmit: (payload: UpdateRolePayload) => Promise<unknown>;
  availableRoles?: UserRole[];
};

const DEFAULT_ROLES: UserRole[] = ['admin', 'user'];

export default function MyRoleCard({
  user,
  loading,
  onSubmit,
  availableRoles = DEFAULT_ROLES,
}: MyRoleCardProps) {
  const { t } = useTranslation();
  const [role, setRole] = useState<UserRole>(user?.role ?? availableRoles[0]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await onSubmit({ role });
      setSuccess(true);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : t('unknownError');
      setError(message || t('unknownError'));
    }
  };

  const handleRoleChange = (nextRole: UserRole) => {
    setRole(nextRole);
    setSuccess(false);
  };

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
  }, [user?.role]);

  return (
    <Card component='section'>
      <CardHeader
        title={t('myRole')}
        subheader={
          user ? t('currentRoleDescription') : t('roleInformationUnavailable')
        }
      />
      <CardContent>
        <Stack spacing={2}>
          {error && <Alert severity='error'>{error}</Alert>}
          {success && (
            <Alert severity='success'>{t('roleUpdatedSuccessfully')}</Alert>
          )}
          {user ? (
            <>
              <Typography variant='body2' color='text.secondary'>
                {t('currentRoleLabel', { role: user.role })}
              </Typography>
              <form
                onSubmit={(event) => {
                  void handleSubmit(event);
                }}
                id='role-update-form'
              >
                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id='role-select-label'>
                      {t('selectRole')}
                    </InputLabel>
                    <Select
                      labelId='role-select-label'
                      label={t('selectRole')}
                      value={role}
                      onChange={(event) =>
                        handleRoleChange(event.target.value as UserRole)
                      }
                    >
                      {availableRoles.map((availableRole) => (
                        <MenuItem key={availableRole} value={availableRole}>
                          {t(`role.${availableRole}`, { defaultValue: availableRole })}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </form>
            </>
          ) : (
            <Typography variant='body2' color='text.secondary'>
              {t('roleInformationUnavailable')}
            </Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 3, pb: 3 }}>
        <Button
          type='submit'
          form='role-update-form'
          variant='outlined'
          disabled={loading || !user}
          fullWidth
        >
          {loading ? t('saving') : t('updateRole')}
        </Button>
      </CardActions>
    </Card>
  );
}
