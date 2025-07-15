import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField,
  Paper,
  Chip,
  Divider
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
      <Paper sx={{ p: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          flexDirection: { xs: 'column', md: 'row' },
          height: '100%'
        }}>
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{ 
              width: { xs: '100%', md: 400 }, 
              objectFit: 'contain',
              alignSelf: 'flex-start'
            }}
          />
          
          <Box sx={{ 
            flex: 1, 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            {product.categories.some(c => c.name.toLowerCase() === 'sale') && (
              <Chip 
                label="SALE" 
                color="error" 
                size="small" 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0,
                  fontWeight: 'bold',
                  zIndex: 1
                }} 
              />
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 2, pr: 4 }}>
                {product.name}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                R$ {product.price.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                {product.description}
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 'auto' }}/>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              flexGrow: 1,
              gap: 2,
              pt: 3,
              borderTop: '1px solid rgba(0, 0, 0, 0.12)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6">Quantity:</Typography>
                <TextField
                  type="number"
                  value={qty}
                  onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                  size="small"
                  sx={{ width: 100 }}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button
                  variant="contained"
                  onClick={() => addToCart(product, qty)}
                  sx={{ width: '100%', ml: 4 }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;
