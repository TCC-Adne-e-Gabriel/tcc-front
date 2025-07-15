import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const iconSx = { color: theme.palette.primary.main };

  return (
    <>
      <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
        <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {user ? (
          <>
            <MenuItem
              onClick={() => {
                navigate('/profile');
                setAnchorEl(null);
              }}
            >
              <ListItemIcon sx={iconSx}>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate('/orders');
                setAnchorEl(null);
              }}
            >
              <ListItemIcon sx={iconSx}>
                <ShoppingBagIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </MenuItem>

            <MenuItem
              onClick={() => {
                logout();
                setAnchorEl(null);
              }}
            >
              <ListItemIcon sx={iconSx}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => navigate('/login')}>
              <ListItemIcon sx={iconSx}>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem onClick={() => navigate('/signup')}>
              <ListItemIcon sx={iconSx}>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
