import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Download,
  Visibility,
  Delete,
  Search,
  Add,
  FilterList,
} from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';

export const Route = createFileRoute('/_app/analytics/reports')({
  component: AnalyticsReportsPage,
});

function AnalyticsReportsPage() {
  const reports = [
    {
      id: 1,
      name: 'Monthly Performance Report',
      type: 'Performance',
      created: '2024-01-15',
      size: '2.4 MB',
      status: 'completed',
      author: 'John Doe',
    },
    {
      id: 2,
      name: 'User Engagement Analysis',
      type: 'Engagement',
      created: '2024-01-14',
      size: '1.8 MB',
      status: 'completed',
      author: 'Jane Smith',
    },
    {
      id: 3,
      name: 'Q4 Revenue Report',
      type: 'Financial',
      created: '2024-01-13',
      size: '3.2 MB',
      status: 'processing',
      author: 'Mike Johnson',
    },
    {
      id: 4,
      name: 'Traffic Sources Analysis',
      type: 'Traffic',
      created: '2024-01-12',
      size: '1.5 MB',
      status: 'completed',
      author: 'Sarah Wilson',
    },
    {
      id: 5,
      name: 'Customer Behavior Report',
      type: 'Behavioral',
      created: '2024-01-11',
      size: '2.1 MB',
      status: 'failed',
      author: 'Tom Brown',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Performance':
        return 'primary';
      case 'Engagement':
        return 'info';
      case 'Financial':
        return 'success';
      case 'Traffic':
        return 'warning';
      case 'Behavioral':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title='Analytics Reports'
        subtitle='View and manage your analytics reports'
        action={
          <Button variant='contained' startIcon={<Add />}>
            Generate Report
          </Button>
        }
      />

      <Paper sx={{ p: 3 }}>
        {/* Search and Filter Bar */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <TextField
            placeholder='Search reports...'
            size='small'
            sx={{ flexGrow: 1, maxWidth: { sm: 400 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button variant='outlined' startIcon={<FilterList />}>
            Filter
          </Button>
        </Stack>

        {/* Reports Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant='body2' fontWeight={500}>
                      {report.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.type}
                      size='small'
                      color={
                        getTypeColor(report.type) as
                          | 'default'
                          | 'primary'
                          | 'secondary'
                          | 'error'
                          | 'info'
                          | 'success'
                          | 'warning'
                      }
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell>{report.author}</TableCell>
                  <TableCell>{report.created}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      size='small'
                      color={
                        getStatusColor(report.status) as
                          | 'default'
                          | 'primary'
                          | 'secondary'
                          | 'error'
                          | 'info'
                          | 'success'
                          | 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <Stack
                      direction='row'
                      spacing={0}
                      justifyContent='flex-end'
                    >
                      <IconButton size='small' color='primary'>
                        <Visibility fontSize='small' />
                      </IconButton>
                      <IconButton size='small' color='primary'>
                        <Download fontSize='small' />
                      </IconButton>
                      <IconButton size='small' color='error'>
                        <Delete fontSize='small' />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Typography variant='body2' color='text.secondary'>
            Showing 1-5 of 24 reports
          </Typography>
        </Box>
      </Paper>
    </PageContainer>
  );
}
