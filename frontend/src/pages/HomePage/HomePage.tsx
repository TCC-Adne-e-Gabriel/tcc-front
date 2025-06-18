import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  useTheme
} from '@mui/material';
import bgImage from '../../assets/images/home.jpg';

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(128, 65, 136, 0.4) 50%,
              rgba(128, 65, 136, 0) 100%
            ),
            url(${bgImage})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: theme.palette.text.secondary,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            zIndex: 1, 
            fontWeight: 'bold',
            mb: 3,
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }
          }}
        >
          Welcome to MOT Gaming
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            zIndex: 1, 
            maxWidth: 800,
            mb: 4,
            px: 2
          }}
        >
          Your ultimate destination for premium gaming gear and accessories
        </Typography>
        <Button 
          variant="contained" 
          href="/products"
          sx={{ 
            zIndex: 1, 
            py: 1.5,
            px: 4,
            fontSize: '1.1rem',
            backgroundColor: theme.palette.primary.main,
            '&:hover': { 
              backgroundColor: theme.palette.primary.dark 
            }
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;