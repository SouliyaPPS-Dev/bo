import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import type { Product, ProductPayload } from '@/services/api/products';

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

export default function ProductFormDialog({
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
        initialProduct?.quantity != null
          ? String(initialProduct.quantity)
          : '',
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
      <Box component='form' onSubmit={(event) => void handleSubmit(event)}>
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
            {t('save')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
