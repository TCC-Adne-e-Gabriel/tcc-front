import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';

interface MainLayoutProps {
  onCartClick: () => void;
  cartCount: number;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onCartClick, cartCount }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <TopBar onCartClick={onCartClick} cartCount={cartCount} />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
