import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  IconButton,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { cart, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateItemQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/cart' } });
    }
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#4D2D51' }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#666' }}>
          Start adding some amazing gaming products to your cart!
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/products')}
          sx={{
            bgcolor: '#804188',
            '&:hover': { bgcolor: '#6a3570' },
            py: 1.5,
            px: 4,
            fontSize: '1rem'
          }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#4D2D51' }}>
        Your Shopping Cart
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2, bgcolor: '#f9f9f9' }}>
            <List>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar 
                        variant="rounded"
                        src={item.product.imageUrl || `https://source.unsplash.com/random/80x80/?gaming,${item.product.id}`}
                        alt={item.product.name}
                        sx={{ width: 80, height: 80, mr: 2 }}
                      />
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {item.product.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {item.product.brand}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                            ${item.product.price.toFixed(2)}
                          </Typography>
                        </>
                      }
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        size="small"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      
                      <IconButton 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        size="small"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <IconButton 
                      onClick={() => removeFromCart(item.id)}
                      sx={{ color: '#ff6b6b', ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button 
              variant="outlined"
              onClick={() => navigate('/products')}
              sx={{ color: '#804188', borderColor: '#804188' }}
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outlined"
              onClick={() => clearCart()}
              sx={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#4D2D51' }}>
              Order Summary
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Items:</Typography>
              <Typography variant="body1">{cart.length}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#804188' }}>
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              sx={{
                bgcolor: '#804188',
                '&:hover': { bgcolor: '#6a3570' },
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;