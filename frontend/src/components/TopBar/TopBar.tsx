import React, { useState } from 'react';
import { AppBar, Toolbar, Box, TextField, IconButton } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import CategoryMenu from './CategoryMenu';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';


const TopBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#804188' }}>
      <Toolbar>
        <CategoryMenu />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              sx: { 
                bgcolor: '#ffffff', 
                borderRadius: '4px',
                '& input': { color: '#000000' }
              }
            }}
          />
          <IconButton sx={{ color: '#ffffff', ml: 2 }} onClick={() => navigate('/cart')}>
            <ShoppingCart />
          </IconButton>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;