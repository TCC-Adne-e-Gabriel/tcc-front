import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, TextField, Container, Grid2, Card, CardMedia, CardContent } from "@mui/material";

const categories = ["Hardware", "Games", "Smartphones", "Tablets and Ipads"];
const sales = [
  { name: "HAVIT HV-G92 Gamepad", price: "$120", discount: "40%", image: "assets/fone1.jpg" },
  { name: "AK-900 Wired Keyboard", price: "$960", discount: "35%", image: "assets/fone2.jpg" },
  { name: "IPS LCD Gaming Monitor", price: "$370", discount: "30%", image: "assets/fone2.jpg" },
  { name: "S-Series Comfort Chair", price: "$375", discount: "25%", image: "assets/teclado1.jpg" }
];

const SalesProducts = () => {
  return (
    <Box>
      <Container sx={{ display: "flex", mt: 3 , mx: 1}}>
        <Box sx={{ width: "20%", pr: 2 }}>
          {categories.map((category, index) => (
            <Button key={index} sx={{ display: "block", width: "100%", textAlign: "left", mb: 1 }}>{category}</Button>
          ))}
        </Box>

        <Box sx={{ width: "100%" }}>
          {/* <Box sx={{ backgroundColor: "#eee", padding: 4, textAlign: "center", mb: 3 }}>
            <Typography variant="h4">iPhone 14 Series - Up to 10% Off</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>Shop Now</Button>
          </Box> */}

          <Typography variant="h5" sx={{ mb: 2 }}>Flash Sales</Typography>
          <Grid2 container spacing={2}>
            {sales.map((product, index) => (
                <Card>
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
      </Container>
    </Box>
    
  );
};

export default SalesProducts;
