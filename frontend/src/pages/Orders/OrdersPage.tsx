import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Chip,
  Divider,
  Collapse,
  useTheme,
  Button,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OrderResponse } from '../../types';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const OrdersPage: React.FC = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const handleToggleOrder = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'CANCELLED': return 'error';
      case 'SHIPPED': return 'info';
      case 'DELIVERED': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotal = (order: OrderResponse) => {
    return order.products.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      order.freight
    );
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (!orders.length) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mt: 4 }}>
          There are no orders yet.
        </Typography>
        <Button 
          variant="outlined" 
          sx={{ mt: 2, backgroundColor: '#ffffff', '&:hover': { backgroundColor: theme.palette.primary.dark, color: '#ffffff' } }}
          onClick={() => navigate('/products')}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>Your Orders</Typography>
      
      <Paper sx={{ 
        boxShadow: theme.shadows[3], 
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden'
      }}>
        <List>
          {orders.map(order => {
            const isExpanded = expandedOrderId === order.id;
            const total = calculateTotal(order);
            
            return (
              <React.Fragment key={order.id}>
                <ListItem 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    px: 0,
                    py: 0
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => handleToggleOrder(order.id)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      px: 3,
                      py: 2,
                      textTransform: 'none'
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </Typography>
                      <Typography variant="body2" color={theme.palette.primary.main}>
                        {formatDate(order.created_at)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip 
                        label={order.status} 
                        color={getStatusColor(order.status)} 
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                      {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                  </Button>
                  
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{ px: 3, py: 2, bgcolor: theme.palette.background.default }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Order Details
                      </Typography>
                      
                      <List>
                        {order.products.map((product, index) => (
                          <ListItem 
                            key={product.id} 
                            sx={{ px: 0, py: 1.5 }}
                          >
                            <ListItemAvatar>
                              <Avatar 
                                src={product.imageUrl} 
                                alt={product.name}
                                variant="rounded"
                                sx={{ width: 56, height: 56, mr: 2 }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={product.name}
                              secondary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.primary.main }}>
                                  <span>Quantity: {product.quantity}</span>
                                  <span>R$ {(product.price * product.quantity).toFixed(2)}</span>
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                        <Typography>Shipping:</Typography>
                        <Typography>R$ {order.freight.toFixed(2)}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                          R$ {total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Collapse>
                </ListItem>
                
                {order.id !== orders[orders.length - 1].id && (
                  <Divider />
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
      
      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default OrdersPage;