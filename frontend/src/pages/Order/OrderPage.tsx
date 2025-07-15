import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Paper,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { createOrder } from '../../services/orderService';
import { CreateOrderRequest } from '../../types';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';

const OrderPage: React.FC = () => {
  const theme = useTheme();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceed = async () => {
    setLoading(true);
    const payload: CreateOrderRequest = {
      freight: 0,
      products: cart.map(i => ({ product_id: i.product.id, quantity: i.quantity })),
    };
    try {
      const order = await createOrder(payload);
      clearCart();
      navigate(`/payment/${order.id}`);
    } catch (err: any) {
      console.error('Order creation failed:', err);
      setApiError(`Order failed, please try again: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length) {
    return (
      <Typography sx={{ mt: 4, textAlign: 'center' }}>
        Your cart is empty.
      </Typography>
    );
  }

  return (
    <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Your Order
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 4, 
        width: '100%',
        maxWidth: 800
      }}>
        <Paper sx={{ 
          p: 3, 
          flex: 1,
          boxShadow: theme.shadows[3],
          borderRadius: theme.shape.borderRadius,
        }}>
          <List>
            {cart.map(item => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.product.name}
                  secondary={
                    <span style={{ color: theme.palette.primary.main }}>
                      {item.quantity} x R${item.price.toFixed(2)}
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">R${total.toFixed(2)}</Typography>
          </Box>
        </Paper>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          width: { xs: '100%', md: 'auto' }
        }}>
          <Button
            variant="contained"
            onClick={handleProceed}
            disabled={loading}
            sx={{ 
              minWidth: 200,
              height: 56,
              alignSelf: { xs: 'center', md: 'flex-start' }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Proceed to Payment'}
          </Button>
        </Box>
      </Box>
      
      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default OrderPage;