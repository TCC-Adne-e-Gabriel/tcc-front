import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </MainLayout>
      </AuthProvider>
    </Router>
  );
};

export default App;