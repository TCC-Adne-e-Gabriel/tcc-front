import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { createOrder } from '../../services/orderService';
import { CreateOrderRequest } from '../../types';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';

const OrderPage: React.FC = () => {
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
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Order
      </Typography>
      <List>
        {cart.map(item => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.product.name}
              secondary={`${item.quantity} x R$${item.price.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">R${total.toFixed(2)}</Typography>
      </Box>
      <Button
        variant="contained"
        onClick={handleProceed}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Proceed to Payment'}
      </Button>
      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default OrderPage;