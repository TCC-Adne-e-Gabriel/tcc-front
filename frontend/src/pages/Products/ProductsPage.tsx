import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import Pagination from '../../components/Pagination/Pagination';
import { Product, CategoryResponse } from '../../types';
import { getAllProducts } from '../../services/productService';
import { getAllCategories } from '../../services/categoryService';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';

const PAGE_SIZE = 12;

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCats = searchParams.get('categories')
    ? searchParams.get('categories')!.split(',')
    : [];

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [allProds, allCats] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(allProds);
        setCategories(allCats);
      } catch (err: any) {
        console.error('Loading products failed:', err);
        setApiError(`Loading products failed, please try again: ${err.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filtered]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const display = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Products
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box
          sx={{
            width: { xs: '100%', md: '25%' },
            pr: { md: 3 },
            mb: { xs: 3, md: 0 },
          }}
        >
          <ProductFilter
            products={products}
            categories={categories}
            initialCategories={initialCats}
            onFilterChange={setFiltered}
          />
        </Box>

        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          {display.length > 0 ? (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {display.map(p => (
                  <Box key={p.id}>
                    <ProductCard product={p} />
                  </Box>
                ))}
              </Box>

              {pageCount > 1 && (
                <Pagination page={page} count={pageCount} onChange={setPage} />
              )}
            </>
          ) : (
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
              No products available with the selected filters.
            </Typography>
          )}
        </Box>
      </Box>

      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default ProductsPage;
