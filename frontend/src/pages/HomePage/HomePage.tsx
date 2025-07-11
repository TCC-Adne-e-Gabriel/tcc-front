import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  useTheme
} from '@mui/material';
import bgImage from '../../assets/images/home.jpg';
import logo from '../../assets/images/logo_default.png';

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
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
        <Box
          component="img"
          src={logo}
          alt="MORE OF THIS"
          sx={{
            zIndex: 1,
            mb: 4,
            height: { xs: 150, sm: 200 },
            objectFit: 'contain',
            minWidth: '10rem',
          }}
        />
        <Typography 
          variant="h5" 
          sx={{ 
            zIndex: 1, 
            maxWidth: 800,
            mb: 6,
            px: 2
          }}
        >
          Your ultimate destination for gaming gear and accessories
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
        <Box
          component="footer"
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 10,
            py: 2,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
            }}
          >  
            © 2025 Adne Moretti & Gabriel Moretti
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;