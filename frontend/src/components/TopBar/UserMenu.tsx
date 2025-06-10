import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Typography, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <div>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#4D2D51' }}>
          {user ? user.name.charAt(0) : 'U'}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user ? (
          [
            <MenuItem key="profile">
              <Avatar /> Profile
            </MenuItem>,
            <MenuItem key="orders">
              <Avatar /> Orders
            </MenuItem>,
            <MenuItem key="favorites">
              <Avatar /> Favorites
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>
              <Avatar /> Logout
            </MenuItem>,
          ]
        ) : (
          [
            <MenuItem key="login" onClick={() => (window.location.href = '/login')}>
              <Avatar /> Login
            </MenuItem>,
            <MenuItem key="signup" onClick={() => (window.location.href = '/signup')}>
              <Avatar /> Sign Up
            </MenuItem>,
          ]
        )}
      </Menu>
    </div>
  );
};

export default UserMenu;