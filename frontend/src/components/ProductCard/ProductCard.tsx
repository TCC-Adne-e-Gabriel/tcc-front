import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const primaryCategory = product.categories[0]?.name;

  return (
    <Card 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 }
      }}
    >
      <CardActionArea onClick={handleCardClick} sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
        {primaryCategory && (
          <Typography variant="body2" color="text.secondary">
            Category: {primaryCategory}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>R${product.price.toFixed(2)}</Typography>
          {product.categories.some(c => c.name.toLowerCase() === 'sale') && <Chip label="SALE" color="error" size="small" sx={{ fontWeight: 'bold' }} />}        
        </Box>
      </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;