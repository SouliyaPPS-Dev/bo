import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { ChangePasswordPayload } from '@/services/api/users';

type ChangePasswordCardProps = {
  onSubmit: (payload: ChangePasswordPayload) => Promise<void>;
  loading?: boolean;
};

export default function ChangePasswordCard({
  onSubmit,
  loading,
}: ChangePasswordCardProps) {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!currentPassword.trim() || !newPassword.trim()) {
      setError(t('passwordFieldsRequired'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }

    try {
      await onSubmit({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(true);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : t('unknownError');
      setError(message || t('unknownError'));
    }
  };

  return (
    <Card component='section'>
      <CardHeader
        title={t('changePassword')}
        subheader={t('changePasswordDescription')}
      />
      <Box
        component='form'
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            {error && <Alert severity='error'>{error}</Alert>}
            {success && (
              <Alert severity='success'>{t('passwordUpdated')}</Alert>
            )}
            <TextField
              type='password'
              label={t('currentPassword')}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              fullWidth
              autoComplete='current-password'
            />
            <TextField
              type='password'
              label={t('newPassword')}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              fullWidth
              autoComplete='new-password'
            />
            <TextField
              type='password'
              label={t('confirmNewPassword')}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              fullWidth
              autoComplete='new-password'
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 3, pb: 3 }}>
          <Button
            type='submit'
            variant='contained'
            disabled={loading}
            fullWidth
          >
            {loading ? t('saving') : t('updatePassword')}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
