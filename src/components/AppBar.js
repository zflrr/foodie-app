import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Badge, styled } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CustomAppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const AppBar = ({ onCartClick, cartItemCount }) => {
  return (
    <CustomAppBar position="sticky" color='primary'>
      <Toolbar>
        <Typography variant="h5" 
          sx={{ 
            flexGrow: 1,
            fontWeight: "1000",
          }} color='primary'>
          FOODIE
        </Typography>

        <Badge badgeContent={cartItemCount} color="secondary" onClick={onCartClick}>
          <ShoppingBagIcon  color='primary'/>
        </Badge>
      </Toolbar>
    </CustomAppBar>
  );
};

export default AppBar;