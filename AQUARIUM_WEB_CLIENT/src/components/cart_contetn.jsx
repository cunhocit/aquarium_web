/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(0);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        setCart(savedCart.length);
    }, []);

    const updateCart = (id) => {
        const shoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        if (!shoppingCart.includes(id)) {
            shoppingCart.push(id);
            localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart));
            setCart(shoppingCart.length);
        }
    };

    const deleteCart = (id) => {
        const shoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        const newCart = shoppingCart.filter(item => item !== id);
        localStorage.setItem('shopping_cart', JSON.stringify(newCart));
        setCart(newCart.length);
    }

    return (
        <CartContext.Provider value={{ cart, updateCart, deleteCart }}>
            {children}
        </CartContext.Provider>
    );
};