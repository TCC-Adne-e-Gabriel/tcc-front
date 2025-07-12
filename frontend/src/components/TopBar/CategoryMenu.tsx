import React, { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import { CategoryResponse } from '../../types';
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';

const CategoryMenu: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (err: any) {
        console.error(err);
        setError(`Failed to load categories ${err.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress size={24} sx={{ color: '#fff', ml: 2 }} />
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {categories.map(cat => (
            <Button
              key={cat.id}
              onClick={() => navigate(`/products?categories=${cat.name}`)}
              sx={{
                color: theme.palette.text.secondary,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: theme.palette.primary.dark },
              }}
            >
              {cat.name.charAt(0) + cat.name.slice(1).toLowerCase()}
            </Button>
          ))}
        </Box>
      )}
      <ErrorSnackbar error={error} onClose={() => setError(null)} />
    </>
  );
};

export default CategoryMenu;
