import React, { useEffect, useContext, useState } from 'react';
import { Button, Typography, Card, CardContent, CardMedia, Box, Snackbar, IconButton } from '@mui/material';
import Form from './Form';
import ItemsContext from '../store/ItemsContext';
import CloseIcon from '@mui/icons-material/Close';

const Meals = () => {
  const { items: meals, fetchMeals, removeItem, error } = useContext(ItemsContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' }); 

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false }); 
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Meals Management</Typography>

      <Button variant="contained" color="primary" onClick={handleOpenForm} sx={{ mb: 2 }}>
        Add New Meal
      </Button>

      <Form 
        open={isFormOpen} 
        handleClose={handleCloseForm}
        setAlert={setAlert} 
      />

      <Typography variant="h5" gutterBottom>Meals List</Typography>

      {error && <Typography color="error">{error}</Typography>} 

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {meals.map((meal) => (
          <Card key={meal.id} sx={{ margin: '1rem', width: '250px' }}>
            <CardMedia
              component="img"
              height="250"
              width="250"
              image={meal.image}
              alt={meal.title}
              sx={{ objectFit: 'cover' }}
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
                  onClick={() => removeItem(meal.id)} 
                  sx={{ 
                    fontWeight: 'bold', 
                    padding: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  Remove
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        ContentProps={{
          sx: {
            backgroundColor: (theme) => theme.palette.secondary.main, 
            color: 'white', 
          },
        }}
        message={alert.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseAlert}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default Meals;