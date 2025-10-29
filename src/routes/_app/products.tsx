import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Add, Delete, Edit, Search } from '@mui/icons-material';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/services/auth';
import * as productsApi from '@/services/api/products';
import type { Product, ProductPayload } from '@/services/api/products';

export const Route = createFileRoute('/_app/products')({
  component: ProductsPage,
});

type ProductFormDialogProps = {
  open: boolean;
  mode: 'create' | 'edit';
  initialProduct?: Product | null;
  loading: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (values: ProductPayload) => Promise<void>;
};

type ProductFormState = {
  name: string;
  description: string;
  sku: string;
  price: string;
  quantity: string;
};

function ProductsPage() {
  const { t } = useTranslation();
  const auth = useAuth();
  const token = auth.token;
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const productsQuery = useQuery({
    queryKey: ['products', token],
    queryFn: () => productsApi.list(token),
  });

  const createMutation = useMutation({
    mutationFn: (payload: ProductPayload) => productsApi.create(token, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProductPayload }) =>
      productsApi.update(token, id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productsApi.remove(token, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products', token] });
    },
    onError: (error) => {
      setPageError(error instanceof Error ? error.message : t('unknownError'));
    },
    onSettled: () => {
      setDeleteTargetId(null);
    },
  });

  const filteredProducts = useMemo(() => {
    const products = productsQuery.data ?? [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => {
      const haystack = [product.name, product.sku, product.description]
        .filter(Boolean)
        .map((value) => value.toLowerCase());
      return haystack.some((value) => value.includes(term));
    });
  }, [productsQuery.data, searchTerm]);

  const openCreateDialog = () => {
    setEditingProduct(null);
    setDialogError(null);
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setDialogError(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogError(null);
    setEditingProduct(null);
  };

  const handleDialogSubmit = async (values: ProductPayload) => {
    setDialogError(null);
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({
          id: editingProduct.id,
          payload: values,
        });
      } else {
        await createMutation.mutateAsync(values);
      }
      closeDialog();
    } catch (error) {
      setDialogError(
        error instanceof Error ? error.message : t('unknownError')
      );
    }
  };

  const handleDelete = (product: Product) => {
    if (!window.confirm(t('deleteConfirmation'))) return;
    setPageError(null);
    setDeleteTargetId(product.id);
    deleteMutation.mutate(product.id);
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { label: t('outOfStock'), color: 'error' as const };
    if (quantity < 10)
      return { label: t('lowStock'), color: 'warning' as const };
    return { label: t('inStock'), color: 'success' as const };
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <PageContainer>
      <PageHeader
        title={t('products')}
        subtitle={t('manageProducts')}
        action={
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={openCreateDialog}
          >
            {t('addProduct')}
          </Button>
        }
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder={t('searchProducts')}
          size='small'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, maxWidth: { sm: 400 } }}
        />
      </Stack>

      {productsQuery.isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : productsQuery.isError ? (
        <Alert severity='error' sx={{ mb: 2 }}>
          {productsQuery.error instanceof Error
            ? productsQuery.error.message
            : t('unknownError')}
        </Alert>
      ) : (
        <>
          {pageError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {pageError}
            </Alert>
          )}
          {filteredProducts.length === 0 ? (
            <Alert severity='info'>{t('noProductsFound')}</Alert>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => {
                const status = getStockStatus(product.quantity);
                return (
                  <Grid
                    key={product.id}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ display: 'flex' }}
                  >
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Stack
                          direction='row'
                          justifyContent='space-between'
                          alignItems='flex-start'
                          spacing={1}
                        >
                          <Typography variant='h6' component='div'>
                            {product.name}
                          </Typography>
                          <Chip
                            label={status.label}
                            size='small'
                            color={status.color}
                          />
                        </Stack>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ mt: 1 }}
                        >
                          {t('sku')}: {product.sku}
                        </Typography>
                        {product.description && (
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ mt: 1 }}
                          >
                            {product.description}
                          </Typography>
                        )}
                        <Stack
                          direction='row'
                          justifyContent='space-between'
                          alignItems='center'
                          sx={{ mt: 2 }}
                        >
                          <Typography variant='h6' color='primary.main'>
                            {new Intl.NumberFormat(undefined, {
                              style: 'currency',
                              currency: 'USD',
                            }).format(product.price)}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {t('quantity')}: {product.quantity}
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button
                          size='small'
                          startIcon={<Edit />}
                          onClick={() => openEditDialog(product)}
                        >
                          {t('edit')}
                        </Button>
                        <IconButton
                          size='small'
                          color='error'
                          sx={{ ml: 'auto' }}
                          onClick={() => handleDelete(product)}
                          disabled={
                            deleteTargetId === product.id &&
                            deleteMutation.isPending
                          }
                        >
                          <Delete fontSize='small' />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}

      <ProductFormDialog
        open={dialogOpen}
        mode={editingProduct ? 'edit' : 'create'}
        initialProduct={editingProduct}
        loading={isSubmitting}
        error={dialogError}
        onClose={closeDialog}
        onSubmit={handleDialogSubmit}
      />
    </PageContainer>
  );
}

function ProductFormDialog({
  open,
  mode,
  initialProduct,
  loading,
  error,
  onClose,
  onSubmit,
}: ProductFormDialogProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState<ProductFormState>(() => ({
    name: '',
    description: '',
    sku: '',
    price: '',
    quantity: '',
  }));
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ProductFormState, string>>
  >({});

  useEffect(() => {
    if (!open) return;
    setValues({
      name: initialProduct?.name ?? '',
      description: initialProduct?.description ?? '',
      sku: initialProduct?.sku ?? '',
      price: initialProduct?.price != null ? String(initialProduct.price) : '',
      quantity:
        initialProduct?.quantity != null ? String(initialProduct.quantity) : '',
    });
    setFieldErrors({});
  }, [initialProduct, open]);

  const handleChange = (key: keyof ProductFormState, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ProductFormState, string>> = {};
    if (!values.name.trim()) nextErrors.name = t('nameRequired');
    if (!values.sku.trim()) nextErrors.sku = t('skuRequired');

    if (!values.price.trim()) nextErrors.price = t('priceRequired');
    const priceValue = Number(values.price);
    if (values.price.trim() && (Number.isNaN(priceValue) || priceValue < 0)) {
      nextErrors.price = t('priceInvalid');
    }

    if (!values.quantity.trim()) nextErrors.quantity = t('quantityRequired');
    const quantityValue = Number(values.quantity);
    if (
      values.quantity.trim() &&
      (Number.isNaN(quantityValue) || quantityValue < 0)
    ) {
      nextErrors.quantity = t('quantityInvalid');
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name: values.name.trim(),
      description: values.description.trim(),
      sku: values.sku.trim(),
      price: Number(values.price),
      quantity: Number(values.quantity),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <Box component='form' onSubmit={(e) => void handleSubmit(e)}>
        <DialogTitle>
          {mode === 'create' ? t('createProduct') : t('updateProduct')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: error ? 0 : 1 }}>
            {error && <Alert severity='error'>{error}</Alert>}
            <TextField
              label={t('name')}
              value={values.name}
              onChange={(event) => handleChange('name', event.target.value)}
              fullWidth
              required
              disabled={loading}
              error={!!fieldErrors.name}
              helperText={fieldErrors.name}
            />
            <TextField
              label={t('description')}
              value={values.description}
              onChange={(event) =>
                handleChange('description', event.target.value)
              }
              fullWidth
              disabled={loading}
              multiline
              minRows={3}
            />
            <TextField
              label={t('sku')}
              value={values.sku}
              onChange={(event) => handleChange('sku', event.target.value)}
              fullWidth
              required
              disabled={loading}
              error={!!fieldErrors.sku}
              helperText={fieldErrors.sku}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label={t('price')}
                value={values.price}
                onChange={(event) => handleChange('price', event.target.value)}
                fullWidth
                required
                disabled={loading}
                type='number'
                inputProps={{ step: '0.01', min: '0' }}
                error={!!fieldErrors.price}
                helperText={fieldErrors.price}
              />
              <TextField
                label={t('quantity')}
                value={values.quantity}
                onChange={(event) =>
                  handleChange('quantity', event.target.value)
                }
                fullWidth
                required
                disabled={loading}
                type='number'
                inputProps={{ step: '1', min: '0' }}
                error={!!fieldErrors.quantity}
                helperText={fieldErrors.quantity}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            {t('cancel')}
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={16} color='inherit' /> : null
            }
          >
            {mode === 'create' ? t('save') : t('save')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
