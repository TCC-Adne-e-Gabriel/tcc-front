import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import TopBar from '../TopBar/TopBar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      <TopBar/>
      {children}
    </Box>
  );
};

export default MainLayout;