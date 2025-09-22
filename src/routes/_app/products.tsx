import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { 
  Search, 
  Add, 
  Edit, 
  Delete, 
  Visibility,
  FilterList,
  Star
} from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useState } from 'react';

export const Route = createFileRoute('/_app/products')({
  component: ProductsPage,
});

function ProductsPage() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 1,
      name: 'Premium Laptop',
      category: 'Electronics',
      price: 1299.99,
      stock: 45,
      status: 'in-stock',
      rating: 4.5,
      image: 'https://via.placeholder.com/300x200',
      description: 'High-performance laptop for professionals',
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 199.99,
      stock: 120,
      status: 'in-stock',
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200',
      description: 'Premium noise-cancelling headphones',
    },
    {
      id: 3,
      name: 'Smart Watch',
      category: 'Accessories',
      price: 349.99,
      stock: 0,
      status: 'out-of-stock',
      rating: 4.2,
      image: 'https://via.placeholder.com/300x200',
      description: 'Advanced fitness and health tracking',
    },
    {
      id: 4,
      name: 'Office Chair',
      category: 'Furniture',
      price: 599.99,
      stock: 15,
      status: 'low-stock',
      rating: 4.6,
      image: 'https://via.placeholder.com/300x200',
      description: 'Ergonomic office chair with lumbar support',
    },
    {
      id: 5,
      name: 'Desk Lamp',
      category: 'Furniture',
      price: 79.99,
      stock: 200,
      status: 'in-stock',
      rating: 4.3,
      image: 'https://via.placeholder.com/300x200',
      description: 'LED desk lamp with adjustable brightness',
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 129.99,
      stock: 8,
      status: 'low-stock',
      rating: 4.7,
      image: 'https://via.placeholder.com/300x200',
      description: 'Portable speaker with premium sound quality',
    },
  ];

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'error' };
    if (stock < 10) return { label: 'Low Stock', color: 'warning' };
    return { label: 'In Stock', color: 'success' };
  };

  return (
    <PageContainer>
      <PageHeader
        title="Products"
        subtitle="Manage your product inventory"
        action={
          <Button variant="contained" startIcon={<Add />}>
            Add Product
          </Button>
        }
      />

      {/* Filters and Search */}
      <Box sx={{ mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            placeholder="Search products..."
            size="small"
            sx={{ flexGrow: 1, maxWidth: { sm: 400 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="stock">Stock</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<FilterList />}>
            More Filters
          </Button>
        </Stack>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ bgcolor: 'grey.100' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="h6" component="div" sx={{ fontSize: '1.1rem' }}>
                        {product.name}
                      </Typography>
                      <Chip
                        label={stockStatus.label}
                        size="small"
                        color={stockStatus.color as 'success' | 'warning' | 'error'}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Star sx={{ color: 'warning.main', fontSize: 18 }} />
                      <Typography variant="body2">{product.rating}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" color="primary.main">
                        ${product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stock: {product.stock}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button size="small" startIcon={<Visibility />}>
                    View
                  </Button>
                  <Button size="small" startIcon={<Edit />}>
                    Edit
                  </Button>
                  <IconButton size="small" color="error" sx={{ ml: 'auto' }}>
                    <Delete fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Showing 1-6 of 24 products
        </Typography>
      </Box>
    </PageContainer>
  );
}
