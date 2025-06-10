import React, { ReactNode } from 'react';
import TopBar from '../TopBar/TopBar.tsx';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
};

export default MainLayout;