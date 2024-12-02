import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CoffeeShop from '../Assets/CoffeeShop.jpg' 

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '600px', 
        overflow: 'hidden',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundImage: `url(${CoffeeShop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          padding: 2, 
        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight:'bold'}}>
          ZAFFOODIE !
        </Typography>
        <Typography variant="h6" component="h1" sx={{ mb: 2}}>
          A full-service food delivery platform that offer a wide variety of cuisines
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ borderRadius:'30px', fontWeight:"bold"}}>
          Order Now
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;