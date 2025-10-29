import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/services/api/products';

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  disableDelete?: boolean;
};

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  disableDelete = false,
}: ProductCardProps) {
  const { t } = useTranslation();

  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { label: t('outOfStock'), color: 'error' as const };
    if (quantity < 10)
      return { label: t('lowStock'), color: 'warning' as const };
    return { label: t('inStock'), color: 'success' as const };
  };

  const status = getStockStatus(product.quantity);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction='row' justifyContent='space-between' spacing={1}>
          <Typography variant='h6'>{product.name}</Typography>
          <Chip label={status.label} size='small' color={status.color} />
        </Stack>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt: 1, wordBreak: 'break-word' }}
        >
          {t('sku')}: {product.sku}
        </Typography>
        {product.description && (
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
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
          onClick={() => onEdit(product)}
        >
          {t('edit')}
        </Button>
        <IconButton
          size='small'
          color='error'
          sx={{ ml: 'auto' }}
          onClick={() => onDelete(product)}
          disabled={disableDelete}
        >
          <Delete fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  );
}
