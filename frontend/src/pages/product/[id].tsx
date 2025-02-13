import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { Favorite, Add, Remove } from '@mui/icons-material';

const ProductCard: React.FC<Product> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  colors,
  sizes,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value) || 1);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt={name}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${price.toFixed(2)}
        </Typography>

        {/* Cores */}
        <div>
          <Typography variant="subtitle1">Cores:</Typography>
          {colors.map((color) => (
            <IconButton
              key={color}
              onClick={() => handleColorChange(color)}
              style={{ backgroundColor: color, margin: '5px' }}
            />
          ))}
        </div>

        {/* Tamanhos */}
        <div>
          <Typography variant="subtitle1">Tamanhos:</Typography>
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? 'contained' : 'outlined'}
              onClick={() => handleSizeChange(size)}
              style={{ margin: '5px' }}
            >
              {size}
            </Button>
          ))}
        </div>

        {/* Quantidade */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            <Remove />
          </IconButton>
          <TextField
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">Qtd</InputAdornment>,
            }}
            style={{ width: '80px', margin: '0 10px' }}
          />
          <IconButton onClick={() => setQuantity(quantity + 1)}>
            <Add />
          </IconButton>
        </div>

        {/* Botões */}
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary">
            Comprar Agora
          </Button>
          <IconButton>
            <Favorite />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

const App: React.FC = () => {
  const product: Product = {
    id: 1,
    name: 'Havic HV G-92 Gamepad',
    description: 'Gamepad para PlayStation 5',
    price: 192.00,
    imageUrl: 'https://example.com/gamepad.jpg',
    colors: ['red', 'blue', 'black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <ProductCard {...product} />
      </Grid>
    </Grid>
  );
};

export default App;