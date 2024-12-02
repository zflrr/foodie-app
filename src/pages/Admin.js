import React from 'react';
import Meals from '../components/Meals';
import { Box, Container } from '@mui/material';

const Admin = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, mb: 4 }}>
        <Box sx={{ py: 4 }}>
          <Meals />
        </Box>
      </Container>
    </Box>
  );
};

export default Admin;
