import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  TextField, 
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import CategoryMenu from './CategoryMenu';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/images/logo_abbr.png';

const TopBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <CategoryMenu />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Link 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="MORE OF THIS"
              sx={{ 
                height: { xs: 30, sm: 40 }, 
                maxWidth: '100%',
                minWidth: '10rem',
                objectFit: 'contain'
              }}
            />
          </Link>
        </Box>
        
        <Box 
          component="form" 
          onSubmit={handleSearch}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    type="submit" 
                    aria-label="search"
                    sx={{ 
                      color: theme.palette.primary.main, 
                      p: '8px' 
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ width: 250 }}
          />
          <IconButton 
            sx={{ 
              color: theme.palette.text.secondary, 
              ml: 1 
            }} 
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart />
          </IconButton>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;