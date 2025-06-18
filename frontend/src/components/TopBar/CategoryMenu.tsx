import React from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Category } from '../../types';

const categories: Category[] = ['HARDWARE', 'GAMES', 'SMARTPHONES', 'FURNITURE', 'SALE'];

const CategoryMenu: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {categories.map((category) => (
        <Button
          key={category}
          href={`/products/${category.toLowerCase()}`}
          sx={{ 
            color: '#ffffff',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#6a3570'
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