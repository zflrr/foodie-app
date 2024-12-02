import React, { useContext } from 'react';
import CartContext from '../store/CartContext';
import { Button, Typography, Box, IconButton, Divider, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid2'

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  backgroundColor: "#ffffff",
  color: "#1F4529",
  fontWeight: "bold",
}));

const Cart = ({ hideModalHandler }) => {
  const cartContext = useContext(CartContext);
  const totalAmount = cartContext.totalAmount;

  const addItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const clearCartHandler = () => {
    cartContext.clearCart();
  };

  return (
    <Box sx={{ p: 5, maxWidth: 1200, position: 'relative' }}>
      <IconButton 
        onClick={hideModalHandler} 
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cartContext.items.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <>
         {cartContext.items.map(item => (
            <Box key={item.id} sx={{ my: 2 }}>
              <Grid container alignItems="center" spacing={2} justifyContent="space-between">
                <Grid xs={12} sm={6}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    RM{item.price.toFixed(2)} 
                  </Typography>
                </Grid>
                <Grid xs={12} sm={4}>
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <IconButton onClick={() => removeItemHandler(item.id)} size="small">
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.amount}</Typography>
                    <IconButton onClick={() => addItemHandler(item)} size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography variant="h6">Total Amount: RM{totalAmount.toFixed(2)}</Typography>
          </Box>
        </>
      )}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StyledButton variant="contained" onClick={clearCartHandler} color="secondary" sx={{ mr: 2 }}>
          Clear Cart
        </StyledButton>
        <Button variant="contained" color="primary" sx={{borderRadius: "30px" , fontWeight:'bold' }}>
          Order
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
