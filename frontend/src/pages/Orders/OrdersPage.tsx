import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, List, ListItemButton, ListItemText, CircularProgress } from '@mui/material';
import { getMyOrders } from '../services/orderService';
import { OrderResponse } from '../types';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (!orders.length) return <Typography>No orders yet.</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Your Orders</Typography>
      <Paper>
        <List>
          {orders.map(o => (
            <ListItemButton key={o.id} onClick={() => navigate(`/order/${o.id}`)}>
              <ListItemText
                primary={`Order ${o.id.slice(0,8)}`}
                secondary={o.status}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default OrdersPage;