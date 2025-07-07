import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#4D2D51' }}>
          {user?.name.charAt(0) ?? 'U'}
        </Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
        {user ? (
          <>          
            <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
            <MenuItem onClick={() => { logout(); handleClose(); }}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
            <MenuItem onClick={() => navigate('/signup')}>Sign Up</MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;