import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import {
  Cancel,
  CheckCircle,
  Download,
  FilterList,
  LocalShipping,
  Pending,
  Search,
  Visibility,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_app/orders')({
  component: OrdersPage,
});

function OrdersPage() {
  const [tabValue, setTabValue] = useState(0);

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      date: '2024-01-15',
      total: 1549.99,
      status: 'delivered',
      items: 3,
      payment: 'Credit Card',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      date: '2024-01-14',
      total: 299.99,
      status: 'processing',
      items: 1,
      payment: 'PayPal',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      date: '2024-01-14',
      total: 899.99,
      status: 'shipped',
      items: 2,
      payment: 'Credit Card',
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      date: '2024-01-13',
      total: 199.99,
      status: 'pending',
      items: 1,
      payment: 'Debit Card',
    },
    {
      id: 'ORD-005',
      customer: 'Tom Brown',
      email: 'tom@example.com',
      date: '2024-01-13',
      total: 2499.99,
      status: 'cancelled',
      items: 5,
      payment: 'Bank Transfer',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle sx={{ fontSize: 14 }} />;
      case 'shipped':
        return <LocalShipping sx={{ fontSize: 14 }} />;
      case 'processing':
        return <Pending sx={{ fontSize: 14 }} />;
      case 'pending':
        return <Pending sx={{ fontSize: 14 }} />;
      case 'cancelled':
        return <Cancel sx={{ fontSize: 14 }} />;
      default:
        return <></>;
    }
  };

  const filteredOrders =
    tabValue === 0
      ? orders
      : orders.filter((order) => {
          switch (tabValue) {
            case 1:
              return order.status === 'pending';
            case 2:
              return order.status === 'processing';
            case 3:
              return order.status === 'shipped';
            case 4:
              return order.status === 'delivered';
            case 5:
              return order.status === 'cancelled';
            default:
              return true;
          }
        });

  return (
    <PageContainer>
      <PageHeader
        title='Orders'
        subtitle='Manage and track customer orders'
        action={
          <Button variant='contained' startIcon={<Download />}>
            Export Orders
          </Button>
        }
      />
      <Paper sx={{ p: 3 }}>
        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={(_, newValue: number) => setTabValue(newValue)}
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={`All (${orders.length})`} />
          <Tab label='Pending' />
          <Tab label='Processing' />
          <Tab label='Shipped' />
          <Tab label='Delivered' />
          <Tab label='Cancelled' />
        </Tabs>

        {/* Search and Filter Bar */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <TextField
            placeholder='Search orders...'
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

        {/* Orders Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant='body2' fontWeight={500}>
                        {order.customer}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {order.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      ${order.total.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status}
                      size='small'
                      color={
                        getStatusColor(order.status) as
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
                    <IconButton size='small' color='primary'>
                      <Visibility fontSize='small' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary Stats */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid
              size={{
                xs: 6,
                sm: 3
              }}>
              <Stack spacing={0.5}>
                <Typography variant='caption' color='text.secondary'>
                  Total Orders
                </Typography>
                <Typography variant='h6' fontWeight={600}>
                  {filteredOrders.length}
                </Typography>
              </Stack>
            </Grid>
            <Grid
              size={{
                xs: 6,
                sm: 3
              }}>
              <Stack spacing={0.5}>
                <Typography variant='caption' color='text.secondary'>
                  Total Revenue
                </Typography>
                <Typography variant='h6' fontWeight={600}>
                  $
                  {filteredOrders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </Typography>
              </Stack>
            </Grid>
            <Grid
              size={{
                xs: 6,
                sm: 3
              }}>
              <Stack spacing={0.5}>
                <Typography variant='caption' color='text.secondary'>
                  Average Order Value
                </Typography>
                <Typography variant='h6' fontWeight={600}>
                  $
                  {(
                    filteredOrders.reduce(
                      (sum, order) => sum + order.total,
                      0
                    ) / filteredOrders.length || 0
                  ).toFixed(2)}
                </Typography>
              </Stack>
            </Grid>
            <Grid
              size={{
                xs: 6,
                sm: 3
              }}>
              <Stack spacing={0.5}>
                <Typography variant='caption' color='text.secondary'>
                  Pending Orders
                </Typography>
                <Typography variant='h6' fontWeight={600} color='warning.main'>
                  {orders.filter((o) => o.status === 'pending').length}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </PageContainer>
  );
}
