import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;
    (async () => {
      try {
        const p = await getProductById(productId);
        setProduct(p);
      } catch (err: any) {
        console.error('Load product failed:', err);
        setApiError(`Loading product failed, please try again: ${err.message}`);
      }
    })();
  }, [productId]);

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box
          component="img"
          src={product.imageUrl}
          alt={product.name}
          sx={{ width: { xs: '100%', md: 400 }, objectFit: 'contain' }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            R$ {product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <TextField
              type="number"
              label="Quantity"
              value={qty}
              onChange={e => setQty(Math.max(1, Number(e.target.value)))}
              size="small"
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default ProductDetailPage;
