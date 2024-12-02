import React, { createContext } from 'react';

const ItemsContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    updateItem: (id, updatedItem) => {},
    switchPage: false, // Default value for switchPage
    setSwitchPage: (value) => {} // Default function for setSwitchPage
});

export default ItemsContext;