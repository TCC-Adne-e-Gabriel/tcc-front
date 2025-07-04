import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const theme = useTheme();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        product,
        quantity: 1,
        price: product.price,
      });
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const primaryCategory = product.categories[0]?.name;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 } }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || `https://source.unsplash.com/random/400x300/?gaming,${product.id}`}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>

        {primaryCategory && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            Category: {primaryCategory}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>R${product.price.toFixed(2)}</Typography>
          {product.categories.some(c => c.name === 'SALE') && (
            <Chip label="SALE" color="error" size="small" sx={{ fontWeight: 'bold' }} />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleAddToCart}
          sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, width: '80%' }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;