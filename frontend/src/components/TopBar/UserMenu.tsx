import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
        <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl} open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {user ? (
          <>
            <MenuItem onClick={() => { navigate('/profile'); setAnchorEl(null); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate('/orders'); setAnchorEl(null); }}>
              Orders
            </MenuItem>
            <MenuItem onClick={() => { logout(); setAnchorEl(null); }}>
              Logout
            </MenuItem>
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
