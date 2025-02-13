import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, TextField, Container, InputAdornment, Link } from "@mui/material";
import SalesProducts from '../components/SalesProducts';

const HomePage = () => {
  return (
    <Box>
      <Container>
        <Box
          sx={{
            mt: 5, 
            backgroundImage: 'url(/assets/home.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography variant="h6" align="center" sx={{ mt: 30, mr: -100, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Se junte a nós no Mundo dos Jogos
          </Typography>
        </Box>
      </Container>
      <SalesProducts />
    </Box>
    
  );
};

export default HomePage;
