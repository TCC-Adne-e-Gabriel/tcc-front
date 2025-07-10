import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../../contexts/CartContext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { cart, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        {cart.length === 0 ? (
          <Typography>No items in cart</Typography>
        ) : (
          <List>
            {cart.map(item => (
              <ListItem key={item.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar variant="rounded" src={item.product.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.product.name}
                  secondary={`R$${item.price.toFixed(2)}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)} size="small"><RemoveIcon /></IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)} size="small"><AddIcon /></IconButton>
                </Box>
                <IconButton onClick={() => removeFromCart(item.id)}><DeleteIcon /></IconButton>
              </ListItem>
            ))}
          </List>
        )}
        <Divider sx={{ my: 2 }} />
         <Typography variant="subtitle1">
           Subtotal: R${subtotal.toFixed(2)}
         </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            onClose();
            navigate('/order');
          }}
        >
          Checkout
        </Button>
         <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={clearCart}>
           Clear Cart
         </Button>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;