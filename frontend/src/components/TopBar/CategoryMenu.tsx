import React from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CategoryMenu: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        onClick={() => navigate('/products')}
        sx={{
          color: theme.palette.text.secondary,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: theme.palette.primary.dark },
        }}
      >
        CATEGORIES
      </Button>

      <Button
        onClick={() => navigate('/products?categories=sale')}
        sx={{
          color: theme.palette.text.secondary,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: theme.palette.primary.dark },
        }}
      >
        SALES
      </Button>
    </Box>
  );
};

export default CategoryMenu;
