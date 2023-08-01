import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (service) => {
        setCartItems((prevCartItems) => [...prevCartItems, service]);
    };

    return <CartContext.Provider value={{ cartItems, addToCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    return useContext(CartContext);
};
