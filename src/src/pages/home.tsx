import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, TextField, Container, Grid2, Card, CardMedia, CardContent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const categories = ["Hardware", "Games", "Smartphones", "Tablets and Ipads"];
const products = [
  { name: "HAVIT HV-G92 Gamepad", price: "$120", discount: "40%", image: "https://via.placeholder.com/150" },
  { name: "AK-900 Wired Keyboard", price: "$960", discount: "35%", image: "https://via.placeholder.com/150" },
  { name: "IPS LCD Gaming Monitor", price: "$370", discount: "30%", image: "https://via.placeholder.com/150" },
  { name: "S-Series Comfort Chair", price: "$375", discount: "25%", image: "https://via.placeholder.com/150" }
];

const HomePage = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Ettis</Typography>
          <TextField placeholder="Search..." variant="outlined" size="small" sx={{ backgroundColor: "white", borderRadius: 1, mr: 2 }} />
          <IconButton color="inherit"><SearchIcon /></IconButton>
          <IconButton color="inherit"><FavoriteBorderIcon /></IconButton>
          <IconButton color="inherit"><ShoppingCartIcon /></IconButton>
          <IconButton color="inherit"><AccountCircleIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ display: "flex", mt: 3 , mx: 1}}>
        <Box sx={{ width: "20%", pr: 2 }}>
          {categories.map((category, index) => (
            <Button key={index} sx={{ display: "block", width: "100%", textAlign: "left", mb: 1 }}>{category}</Button>
          ))}
        </Box>

        <Box sx={{ width: "90%" }}>
          <Box sx={{ backgroundColor: "#eee", padding: 4, textAlign: "center", mb: 3 }}>
            <Typography variant="h4">iPhone 14 Series - Up to 10% Off</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Shop Now</Button>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>Flash Sales</Typography>
          <Grid2 container spacing={2}>
            {products.map((product, index) => (
              <Grid2 item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia component="img" image={product.image} height="140" alt={product.name} />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1" color="red">{product.discount} OFF</Typography>
                    <Typography variant="body1">{product.price}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </Box>
    
  );
};

export default HomePage;
