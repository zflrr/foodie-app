import React, { useContext } from 'react';
import { Box, Button, Container, styled} from '@mui/material';
import ItemsContext from '../store/ItemsContext';

const StyledFooter = styled(Box)(({ theme }) => ({
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#1F4529",
    padding: "1rem 0",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    padding: "12px 32px",
    borderRadius: "30px",
    backgroundColor: "#ffffff",
    color: "#1F4529",
    fontWeight: "600",
    
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "#f5f5f5",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
    },
    "&:active": {
      transform: "translateY(0)"
    },
 
  }));
  

const Footer = () => {

    const ItemsCtx = useContext(ItemsContext);
    const togglePageHandler = () => {
        ItemsCtx.setSwitchPage(prev => !prev);
    };

    return (
        <StyledFooter>
            <Container maxWidth="lg">
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <StyledButton variant="contained" onClick={togglePageHandler}>
                Switch to {ItemsCtx.switchPage ? 'User  ' : 'Admin'} View
            </StyledButton>
            </Box>
        </Container>


        </StyledFooter>
          
    );
};

export default Footer;