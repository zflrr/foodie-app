import React, { useEffect, useState, useContext } from 'react';
import MealsItem from '../components/MealsItem';
import { Typography, Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'; 
import AboutUs from '../components/AboutUs';
import ItemsContext from '../store/ItemsContext';
import Hero from '../components/Hero.js';

const Users = () => {

  const { fetchMeals, items: meals } = useContext(ItemsContext);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMeals().catch(err => setError('Failed to load meals. Please try again later.'));
  }, [fetchMeals]);

  useEffect(() => {
    fetchMeals();
  }, []);

  return (

    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      pb: { xs: 8, sm: 9 } 
    }}>
      <Hero/>
      <AboutUs/>
      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Available Meals
          </Typography>
        <Typography variant="body1" gutterBottom>
          Choose from our wide selection of delicious meals.
          </Typography>
        </Box>

        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {meals.map(meal => (
            <Grid xs={12} sm={6} md={4} lg={3} key={meal.id}>
              <MealsItem meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Users;
