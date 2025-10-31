import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { User } from '@/services/api/users';

type AdminUsersTableProps = {
  users: User[];
  loading?: boolean;
  deletingId?: string | null;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const formatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export default function AdminUsersTable({
  users,
  loading,
  deletingId,
  onEdit,
  onDelete,
}: AdminUsersTableProps) {
  const { t } = useTranslation();

  if (users.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant='body1' color='text.secondary'>
          {loading ? t('loading') : t('noUsersFound')}
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>{t('name')}</TableCell>
            <TableCell>{t('email')}</TableCell>
            <TableCell>{t('role')}</TableCell>
            <TableCell>{t('createdAt')}</TableCell>
            <TableCell>{t('updatedAt')}</TableCell>
            <TableCell align='right'>{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Avatar alt={user.name} sx={{ width: 32, height: 32 }}>
                    {(user.name?.charAt(0) ||
                      user.email?.charAt(0) ||
                      '?'
                    ).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>{user.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {user.id}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={t(`role.${user.role}`, {
                    defaultValue: user.role,
                  })}
                  color={user.role === 'admin' ? 'primary' : 'default'}
                  size='small'
                />
              </TableCell>
              <TableCell>
                {user.created_at ? formatter.format(new Date(user.created_at)) : '—'}
              </TableCell>
              <TableCell>
                {user.updated_at ? formatter.format(new Date(user.updated_at)) : '—'}
              </TableCell>
              <TableCell align='right'>
                <Tooltip title={t('edit')}>
                  <IconButton color='primary' onClick={() => onEdit(user)}>
                    <EditIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('delete')}>
                  <span>
                    <IconButton
                      color='error'
                      onClick={() => {
                        void onDelete(user);
                      }}
                      disabled={deletingId === user.id}
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
