import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { User, UserRole } from '@/services/api/users';

export type AdminUserFormValues = {
  email: string;
  name: string;
  password: string;
  role: UserRole;
};

type AdminUserDialogProps = {
  open: boolean;
  mode: 'create' | 'edit';
  user?: User | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (values: AdminUserFormValues) => Promise<void>;
  availableRoles?: UserRole[];
};

const DEFAULT_ROLE_OPTIONS: UserRole[] = ['admin', 'user'];

export default function AdminUserDialog({
  open,
  mode,
  user,
  loading,
  error,
  onClose,
  onSubmit,
  availableRoles = DEFAULT_ROLE_OPTIONS,
}: AdminUserDialogProps) {
  const { t } = useTranslation();
  const isEdit = mode === 'edit';

  const initialValues = useMemo<AdminUserFormValues>(
    () => ({
      email: user?.email ?? '',
      name: user?.name ?? '',
      password: '',
      role: user?.role ?? availableRoles[0],
    }),
    [user?.email, user?.name, user?.role, availableRoles]
  );

  const [formValues, setFormValues] = useState<AdminUserFormValues>(initialValues);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormValues(initialValues);
      setLocalError(null);
    }
  }, [open, initialValues]);

  const handleChange =
    (field: keyof AdminUserFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: event.target.value as string,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (!formValues.email.trim() && !isEdit) {
      setLocalError(t('emailRequired'));
      return;
    }

    if (!formValues.name.trim()) {
      setLocalError(t('nameRequired'));
      return;
    }

    if (!isEdit && !formValues.password.trim()) {
      setLocalError(t('passwordRequired'));
      return;
    }

    try {
      await onSubmit(formValues);
      onClose();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : t('unknownError');
      setLocalError(message || t('unknownError'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <form
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <DialogTitle>
          {isEdit ? t('editAdminUser') : t('createAdminUser')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {(localError || error) && (
              <Alert severity='error'>{localError ?? error}</Alert>
            )}
            <TextField
              label={t('email')}
              type='email'
              value={formValues.email}
              onChange={handleChange('email')}
              required={!isEdit}
              fullWidth
              disabled={isEdit}
            />
            <TextField
              label={t('name')}
              value={formValues.name}
              onChange={handleChange('name')}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id='admin-user-role-label'>{t('role')}</InputLabel>
              <Select
                labelId='admin-user-role-label'
                label={t('role')}
                value={formValues.role}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    role: event.target.value as UserRole,
                  }))
                }
              >
                {availableRoles.map((roleOption) => (
                  <MenuItem key={roleOption} value={roleOption}>
                    {t(`role.${roleOption}`, {
                      defaultValue: roleOption,
                    })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={
                isEdit ? t('newPasswordOptional') : t('password')
              }
              type='password'
              value={formValues.password}
              onChange={handleChange('password')}
              required={!isEdit}
              fullWidth
              autoComplete='new-password'
              placeholder={isEdit ? t('leaveBlankToKeepPassword') : undefined}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='inherit'>
            {t('cancel')}
          </Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? t('saving') : t('save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
