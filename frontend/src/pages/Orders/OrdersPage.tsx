import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../services/orderService';
import { OrderResponse } from '../../types';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err: any) {
        console.error('Fetch orders failed:', err);
        setApiError(`Fetching orders failed, please try again: ${err.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }
  if (!orders.length) {
    return <Typography sx={{ mt: 4, textAlign: 'center' }}>No orders yet.</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Your Orders</Typography>
      <Paper>
        <List>
          {orders.map(o => (
            <ListItemButton key={o.id} onClick={() => navigate(`/order/${o.id}`)}>
              <ListItemText
                primary={`Order ${o.id.slice(0, 8)}`}
                secondary={o.status}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default OrdersPage;
