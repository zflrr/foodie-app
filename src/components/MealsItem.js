import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import CartContext from '../store/CartContext';

const MealsItem = ({ meal }) => {
  
  const cartContext = useContext(CartContext);
  const addToCartHandler = () => {
    cartContext.addItem({ id: meal.id, title: meal.title, price: meal.price, amount: 1 });
  };

  return (
    <Card sx={{ margin: '1rem', width: '250px', borderRadius: '15px',}}>
      <CardMedia
        component="img"
        height="250"
        width="250"
        image={meal.image}
        alt={meal.title}
        style={{ objectFit: 'cover' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/250x250?text=No+Image';
        }}
      />
      <CardContent>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
          <Box>
            <Typography variant="h6" component="div" gutterBottom fontWeight="bold">
              {meal.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {meal.desc}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2" color="primary" fontWeight="bold">
              RM{meal.price.toFixed(2)}
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Button 
            variant="text" 
            color="primary" 
            onClick={addToCartHandler}
            sx={{ 
              fontWeight: 'bold', 
              padding: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealsItem;
