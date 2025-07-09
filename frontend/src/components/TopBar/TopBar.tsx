import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  Badge
} from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import CategoryMenu from './CategoryMenu';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/images/logo_abbr.png';

interface TopBarProps {
  onCartClick: () => void;
  cartCount: number;
}

const TopBar: React.FC<TopBarProps> = ({ onCartClick, cartCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', px: 2 }}>
        <Box sx={{ width: '25%', display: 'flex', alignItems: 'center' }}>
          <CategoryMenu />
        </Box>

        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
          <Link
            component="button"
            onClick={() => navigate('/')}
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <Box
              component="img"
              src={logo}
              alt="MORE OF THIS"
              sx={{ height: { xs: 30, sm: 40 }, objectFit: 'contain', minWidth: '10rem' }}
            />
          </Link>
        </Box>

        <Box sx={{ width: '25%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
          <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" sx={{ color: theme.palette.primary.main, p: 1 }}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ width: 200 }}
            />
          </Box>
          {user && (
            <IconButton onClick={onCartClick} sx={{ color: theme.palette.text.secondary }}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;