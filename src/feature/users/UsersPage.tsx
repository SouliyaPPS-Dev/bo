import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import AdminUsersTable from './components/AdminUsersTable';
import AdminUserDialog, {
  type AdminUserFormValues,
} from './components/AdminUserDialog';
import ChangePasswordCard from './components/ChangePasswordCard';
import MyRoleCard from './components/MyRoleCard';
import { useAdminUsers } from './hooks/useAdminUsers';
import { useAdminUserMutations } from './hooks/useAdminUserMutations';
import { useMyRole } from './hooks/useMyRole';
import { useChangePassword } from './hooks/useChangePassword';
import type { User, UserRole } from '@/services/api/users';

type RoleFilter = 'all' | UserRole;

function formatErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message || fallback;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message || fallback;
  }
  return fallback;
}

export default function UsersPage() {
  const { t } = useTranslation();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const adminListParams = useMemo(() => {
    if (roleFilter === 'all') return undefined;
    return { role: roleFilter };
  }, [roleFilter]);

  const {
    data: adminUsers = [],
    isLoading: loadingUsers,
    isError: usersError,
    error,
  } = useAdminUsers(adminListParams);

  const {
    createMutation,
    updateMutation,
    deleteMutation,
  } = useAdminUserMutations();

  const {
    data: roleData,
    isLoading: roleLoading,
    updateRole,
    updateStatus,
  } = useMyRole();

  const changePasswordMutation = useChangePassword();

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return adminUsers;
    return adminUsers.filter((user) => {
      const haystack = [user.name, user.email, user.role]
        .filter(Boolean)
        .map((value) => value.toLowerCase());
      return haystack.some((value) => value.includes(term));
    });
  }, [adminUsers, searchTerm]);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setDialogError(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setDialogError(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    setDialogError(null);
  };

  const handleDialogSubmit = async (values: AdminUserFormValues) => {
    setDialogError(null);
    try {
      if (editingUser) {
        const payload: Record<string, unknown> = {
          name: values.name,
          role: values.role,
        };
        if (values.password.trim()) {
          payload.password = values.password;
        }
        await updateMutation.mutateAsync({
          id: editingUser.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync({
          email: values.email,
          name: values.name,
          password: values.password,
          role: values.role,
        });
      }
      handleCloseDialog();
    } catch (submissionError) {
      setDialogError(
        formatErrorMessage(submissionError, t('unknownError'))
      );
      throw submissionError;
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!window.confirm(t('deleteUserConfirmation', { name: user.name }))) {
      return;
    }

    setDeletingUserId(user.id);
    try {
      await deleteMutation.mutateAsync(user.id);
    } catch (deleteError) {
      // Already surfaced via mutation error toast? For now show alert.
      setDialogError(
        formatErrorMessage(deleteError, t('unknownError'))
      );
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title={t('usersManagement')}
        subtitle={t('usersManagementDescription')}
        action={
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            {t('inviteUser')}
          </Button>
        }
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MyRoleCard
            user={roleData?.user}
            loading={roleLoading || updateStatus.isPending}
            onSubmit={updateRole}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChangePasswordCard
            onSubmit={changePasswordMutation.mutateAsync}
            loading={changePasswordMutation.isPending}
          />
        </Grid>
      </Grid>

      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id='role-filter-label'>{t('filterByRole')}</InputLabel>
            <Select
              labelId='role-filter-label'
              label={t('filterByRole')}
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value as RoleFilter)
              }
            >
              <MenuItem value='all'>{t('allRoles')}</MenuItem>
              <MenuItem value='admin'>
                {t('role.admin', { defaultValue: 'admin' })}
              </MenuItem>
              <MenuItem value='user'>
                {t('role.user', { defaultValue: 'user' })}
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={t('searchUsers')}
            placeholder={t('searchUsersPlaceholder')}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth
          />
        </Stack>

        {usersError ? (
          <Alert severity='error'>
            {formatErrorMessage(error, t('unknownError'))}
          </Alert>
        ) : loadingUsers ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <AdminUsersTable
            users={filteredUsers}
            loading={loadingUsers}
            deletingId={deletingUserId}
            onEdit={handleOpenEdit}
            onDelete={(user) => {
              void handleDeleteUser(user);
            }}
          />
        )}
      </Stack>

      <AdminUserDialog
        open={dialogOpen}
        mode={editingUser ? 'edit' : 'create'}
        user={editingUser}
        loading={
          editingUser ? updateMutation.isPending : createMutation.isPending
        }
        error={dialogError}
        onClose={handleCloseDialog}
        onSubmit={handleDialogSubmit}
      />
    </PageContainer>
  );
}
