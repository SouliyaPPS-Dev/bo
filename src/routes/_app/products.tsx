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
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_app/products')({
  component: ProductsPage,
});

function ProductsPage() {
  const { t } = useTranslation();
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
    if (stock === 0) return { label: t('outOfStock'), color: 'error' };
    if (stock < 10) return { label: t('lowStock'), color: 'warning' };
    return { label: t('inStock'), color: 'success' };
  };

  return (
    <PageContainer>
      <PageHeader
        title={t('products')}
        subtitle={t('manageProducts')}
        action={
          <Button variant='contained' startIcon={<Add />}>
            {t('addProduct')}
          </Button>
        }
      />
      {/* Filters and Search */}
      <Box sx={{ mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            placeholder={t('searchProducts')}
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
          <FormControl size='small' sx={{ minWidth: 150 }}>
            <InputLabel>{t('category')}</InputLabel>
            <Select
              value={category}
              label={t('category')}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value='all'>{t('allCategories')}</MenuItem>
              <MenuItem value='electronics'>{t('electronics')}</MenuItem>
              <MenuItem value='furniture'>{t('furniture')}</MenuItem>
              <MenuItem value='accessories'>{t('accessories')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl size='small' sx={{ minWidth: 150 }}>
            <InputLabel>{t('sortBy')}</InputLabel>
            <Select
              value={sortBy}
              label={t('sortBy')}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value='name'>{t('name')}</MenuItem>
              <MenuItem value='price'>{t('price')}</MenuItem>
              <MenuItem value='stock'>{t('stock')}</MenuItem>
              <MenuItem value='rating'>{t('rating')}</MenuItem>
            </Select>
          </FormControl>
          <Button variant='outlined' startIcon={<FilterList />}>
            {t('moreFilters')}
          </Button>
        </Stack>
      </Box>
      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          return (
            <Grid
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component='img'
                  height='200'
                  image={product.image}
                  alt={product.name}
                  sx={{ bgcolor: 'grey.100' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='flex-start'
                    >
                      <Typography
                        variant='h6'
                        component='div'
                        sx={{ fontSize: '1.1rem' }}
                      >
                        {product.name}
                      </Typography>
                      <Chip
                        label={stockStatus.label}
                        size='small'
                        color={
                          stockStatus.color as 'success' | 'warning' | 'error'
                        }
                      />
                    </Stack>
                    <Typography variant='body2' color='text.secondary'>
                      {product.category}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {product.description}
                    </Typography>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Star sx={{ color: 'warning.main', fontSize: 18 }} />
                      <Typography variant='body2'>{product.rating}</Typography>
                    </Stack>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Typography variant='h6' color='primary.main'>
                        ${product.price}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {t('stock')}: {product.stock}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button size='small' startIcon={<Visibility />}>
                    {t('view')}
                  </Button>
                  <Button size='small' startIcon={<Edit />}>
                    {t('edit')}
                  </Button>
                  <IconButton size='small' color='error' sx={{ ml: 'auto' }}>
                    <Delete fontSize='small' />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography variant='body2' color='text.secondary'>
          {t('showing')} 1-6 {t('of')} 24 {t('productsCount')}
        </Typography>
      </Box>
    </PageContainer>
  );
}
