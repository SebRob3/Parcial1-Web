'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
export const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: any}) {
    const [items, setItems] = useState<any[]>([]);

    function addCart(product:any) {
        setItems((prevItems) => {
            if (prevItems.find((item: any) => item.id === product.id)) {
                return prevItems.map((item: any) => item.id === product.id ? {...item, quantity: item.quantity +1}: item);
            }

            return [...prevItems, {...product, quantity:1}];
        });        
    }

    const totalItems = items.reduce((sum, item:any) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('userCart must be used within a CartProvider');
    }
    return context;
};