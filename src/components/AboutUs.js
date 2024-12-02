import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import burgerImage from '../Assets/burger.jpg'; 

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img 
            src={burgerImage} 
            alt="About Us"
            style={{ width: '90%', borderRadius: '8px' }} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h3" color='primary' sx={{fontWeight:'bold'}}>
              WELCOME
            </Typography>
            <Typography variant="h2" color='primary.second' sx={{fontWeight:'bold'}}>
              TO ZAFFOODIE !
            </Typography>
            <Typography variant="body1" sx={{textAlign:'justify'}}>
              Our mission is to bring people together through great food. We believe that meals shared with family and friends create lasting memories. Whether you're here for a casual meal or a special occasion, we aim to make your experience memorable.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" sx={{ borderRadius:'30px', fontWeight:"bold"}} >
                More
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;