import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import { Product } from '../../types';
import { getAllProducts } from '../../services/productService';

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const products = await getAllProducts();
        setAllProducts(products);
        setFiltered(products);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress sx={{ color: '#804188' }} />
      </Box>
    );
  }

  const title = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products';

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>{title}</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '30%' }, pr: { md: 3 }, mb: { xs: 3, md: 0 } }}>
          <ProductFilter
            products={allProducts}
            onFilterChange={setFiltered}
            currentCategory={category?.toUpperCase()}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)'
            },
            gap: 3
          }}>
            {filtered.map(p => (
              <Box key={p.id}>
                <ProductCard product={p} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsPage;