import Grid from '@mui/material/Grid';
import type { Product } from '@/services/api/products';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  deletingProductId?: string | null;
};

export default function ProductGrid({
  products,
  onEdit,
  onDelete,
  deletingProductId,
}: ProductGridProps) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid
          key={product.id}
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ display: 'flex' }}
        >
          <ProductCard
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            disableDelete={deletingProductId === product.id}
          />
        </Grid>
      ))}
    </Grid>
  );
}
