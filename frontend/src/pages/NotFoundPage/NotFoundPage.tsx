import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo_abbr_white.png';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="MORE OF THIS"
        sx={{
          width: { xs: '150px', sm: '300px' },
          mb: 4,
          objectFit: 'contain',
        }}
      />
      <Typography variant="h5" gutterBottom>
        Page not found.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{ py: 1.5, px: 4 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFoundPage;
