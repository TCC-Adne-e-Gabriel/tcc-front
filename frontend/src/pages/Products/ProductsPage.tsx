import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Container, Typography, CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import { Product, Category } from '../../types';
import { getProductsByCategory } from '../../services/productService';

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory((category || '').toUpperCase() as Category);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress sx={{ color: '#804188' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '30%' }, pr: { md: 3 }, mb: { xs: 3, md: 0 } }}>
          <ProductFilter 
            products={products} 
            onFilterChange={setFilteredProducts}
            currentCategory={category?.toUpperCase() as Category}
          />
        </Box>

        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3,
          }}>
            {filteredProducts.map(product => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsPage;