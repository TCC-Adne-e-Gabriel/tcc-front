import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Grid,
  useTheme
} from '@mui/material';

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?gaming)',
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

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {[
            { 
              title: 'Premium Selection', 
              description: 'Curated collection of top-tier gaming products from trusted brands' 
            },
            { 
              title: 'Competitive Prices', 
              description: 'Best deals and regular discounts for our loyal customers' 
            },
            { 
              title: 'Fast Delivery', 
              description: 'Quick shipping with real-time tracking for all orders' 
            },
            { 
              title: 'Expert Support', 
              description: '24/7 customer service from gaming enthusiasts' 
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 3,
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[4]
                }
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;