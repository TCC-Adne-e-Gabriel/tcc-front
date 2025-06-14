import React from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Category } from '../../types';

const categories: Category[] = ['HARDWARE', 'GAMES', 'SMARTPHONES', 'FURNITURE', 'SALE'];

const CategoryMenu: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {categories.map((category) => (
        <Button
          key={category}
          href={`/products/${category.toLowerCase()}`}
          sx={{ 
            color: theme.palette.text.secondary,
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark
            }
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryMenu;