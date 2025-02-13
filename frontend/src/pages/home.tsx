import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, TextField, Container, Grid2, Card, CardMedia, CardContent,InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SalesProducts from '../components/salesProducts';


const categories = ["Hardware", "Games", "Smartphones", "Tablets and Ipads"];
const products = [
  { name: "HAVIT HV-G92 Gamepad", price: "$120", discount: "40%", image: "assets/fone1.jpg" },
  { name: "AK-900 Wired Keyboard", price: "$960", discount: "35%", image: "assets/fone2.jpg" },
  { name: "IPS LCD Gaming Monitor", price: "$370", discount: "30%", image: "assets/fone2.jpg" },
  { name: "S-Series Comfort Chair", price: "$375", discount: "25%", image: "assets/teclado1.jpg" }
];

const HomePage = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "primary" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Ettis</Typography>
        <TextField
          placeholder="What are you looking for?"
          variant="outlined"
          size="small"
          sx={{ 
            width: 300, 
            backgroundColor: "white", 
            borderRadius: 1, 
            mr: 2 
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

          {/* <IconButton color="inherit" sx={: -10}><SearchIcon /></IconButton> */}
          <IconButton color="inherit"><FavoriteBorderIcon /></IconButton>
          <IconButton color="inherit"><ShoppingCartIcon /></IconButton>
          <IconButton color="inherit"><AccountCircleIcon /></IconButton>
        </Toolbar>
      </AppBar>
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
          Join us in the Game World
        </Typography>
      </Box>
      </Container>
      <SalesProducts />
    </Box>
    
  );
};

export default HomePage;
