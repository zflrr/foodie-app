import React, { Fragment, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Users from './pages/Users';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import { ItemsProvider } from './store/ItemsProvider';
import { CartProvider } from './store/CartProvider';
import ItemsContext from './store/ItemsContext';
import CartContext from './store/CartContext';
import AppBar from './components/AppBar';
import Cart from './components/Cart';
import Dialog from '@mui/material/Dialog';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from '@mui/material';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1F4529',
        second: '#47663B'
      },
      secondary: {
        main: '#EED3B1',
      },
    },
    typography: {
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ItemsProvider>
        <CartProvider>
          <Router>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh' 
            }}>
              <Box sx={{ flexGrow: 1 }}>
                <MainContent />
              </Box>
              <Footer />
            </Box>
          </Router>
        </CartProvider>
      </ItemsProvider>
    </ThemeProvider>
  );
};

const MainContent = () => {
  const ItemsCtx = useContext(ItemsContext);
  const cartCtx = useContext(CartContext);
  const [cartVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true);
  };

  const hideCartHandler = () => {
    setCartVisible(false);
  };

  return (
    <Fragment>
      {!ItemsCtx.switchPage && (
        <AppBar onCartClick={showCartHandler} cartItemCount={cartCtx.items.length}/>
      )}
      <Box sx={{ pb: 4 }}>
        <Routes>
          <Route path="/" element={ItemsCtx.switchPage ? <Admin /> : <Users />} />
        </Routes>
      </Box>
      {cartVisible && ReactDOM.createPortal(
        <Dialog open={cartVisible} onClose={hideCartHandler}>
          <Cart hideModalHandler={hideCartHandler} />
        </Dialog>,
        document.getElementById('modal-root')
      )}
    </Fragment>
  );
};

export default App;
