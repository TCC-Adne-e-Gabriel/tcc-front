import React from "react";
import { Typography, Box, Button, Grid2, Card, CardMedia, CardContent } from "@mui/material";

const categories = ["Hardware", "Jogos", "Celulares", "Tablets e Ipads"];
const sales = [
  { name: "Gamepad HAVIT HV-G92", price: "$120", discount: "40%", image: "assets/gamepad.jpg" },
  { name: "Teclado Cabeado AK-900", price: "$960", discount: "35%", image: "assets/teclado1.jpg" },
  { name: "Monitor Gaming IPS LCD", price: "$370", discount: "30%", image: "assets/monitor.webp" },
  { name: "Cadeira de Conforto S-Series", price: "$375", discount: "25%", image: "assets/chair.avif" }
];

const SalesProducts = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", mt: 3 , mx: 1 }}>
        <Box sx={{ width: "20%", pr: 1, pl: 3 }}>
          {categories.map((category, index) => (
            <Button key={index} sx={{ display: "block", width: "100%", textAlign: "left", mb: 1 }} color="inherit">{category}</Button>
          ))}
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Promoções</Typography>
          <Grid2 container spacing={2}>
            {sales.map((product, index) => (
                <Card key={index}>
                  <CardMedia component="img" image={product.image} height="140" alt={product.name} />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1" color="red">{product.discount} OFF</Typography>
                    <Typography variant="body1">{product.price}</Typography>
                  </CardContent>
                </Card>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Box>
    
  );
};

export default SalesProducts;
