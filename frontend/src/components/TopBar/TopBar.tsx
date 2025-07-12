import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Link,
  Badge,
  Typography,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="MORE OF THIS"
              sx={{
                height: { xs: 30, sm: 40 },
                objectFit: 'contain',
                minWidth: '10rem',
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                mt: 0.5,
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.primary.contrastText,
                lineHeight: 1,
              }}
            >
              MORE OF THIS
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            width: '25%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {user && (
            <IconButton
              onClick={onCartClick}
              sx={{ color: theme.palette.text.secondary }}
            >
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