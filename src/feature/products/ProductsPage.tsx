import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import type { Product, ProductPayload } from '@/services/api/products';
import ProductToolbar from './components/ProductToolbar';
import ProductGrid from './components/ProductGrid';
import ProductFormDialog from './components/ProductFormDialog';
import { useProductList } from './hooks/useProductList';
import { useProductMutations } from './hooks/useProductMutations';

const formatErrorMessage = (
  error: unknown,
  fallback: string
): string | null => {
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
};

export default function ProductsPage() {
  const { t } = useTranslation();
  const { products, isLoading, isError, error } = useProductList();
  const {
    createProduct,
    updateProduct,
    deleteProduct,
    createStatus,
    updateStatus,
    deleteStatus,
  } = useProductMutations();

  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => {
      const haystack = [product.name, product.sku, product.description]
        .filter(Boolean)
        .map((value) => value.toLowerCase());
      return haystack.some((value) => value.includes(term));
    });
  }, [products, searchTerm]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setDialogError(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogError(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogError(null);
    setEditingProduct(null);
  };

  const handleDialogSubmit = async (values: ProductPayload) => {
    setDialogError(null);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values);
      } else {
        await createProduct(values);
      }
      handleCloseDialog();
    } catch (submissionError) {
      setDialogError(
        formatErrorMessage(submissionError, t('unknownError')) ??
          t('unknownError')
      );
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(t('deleteConfirmation'))) return;
    setPageError(null);
    setDeleteTargetId(product.id);
    try {
      await deleteProduct(product.id);
    } catch (deleteError) {
      setPageError(
        formatErrorMessage(deleteError, t('unknownError')) ?? t('unknownError')
      );
    } finally {
      setDeleteTargetId(null);
    }
  };

  const listErrorMessage = formatErrorMessage(error, t('unknownError'));
  const isSubmitting = createStatus.isPending || updateStatus.isPending;

  return (
    <PageContainer>
      <PageHeader
        title={t('products')}
        subtitle={t('manageProducts')}
        action={
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={handleOpenCreate}
          >
            {t('addProduct')}
          </Button>
        }
      />

      <ProductToolbar
        searchTerm={searchTerm}
        onSearchChange={(value) => setSearchTerm(value)}
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity='error' sx={{ mb: 2 }}>
          {listErrorMessage}
        </Alert>
      ) : (
        <>
          {pageError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {pageError}
            </Alert>
          )}
          {deleteStatus.error && !pageError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {formatErrorMessage(deleteStatus.error, t('unknownError'))}
            </Alert>
          )}
          {filteredProducts.length === 0 ? (
            <Alert severity='info'>{t('noProductsFound')}</Alert>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onEdit={handleOpenEdit}
              onDelete={(product) => void handleDelete(product)}
              deletingProductId={
                deleteTargetId && deleteStatus.isPending ? deleteTargetId : null
              }
            />
          )}
        </>
      )}

      <ProductFormDialog
        open={dialogOpen}
        mode={editingProduct ? 'edit' : 'create'}
        initialProduct={editingProduct}
        loading={isSubmitting}
        error={dialogError}
        onClose={handleCloseDialog}
        onSubmit={handleDialogSubmit}
      />
    </PageContainer>
  );
}
