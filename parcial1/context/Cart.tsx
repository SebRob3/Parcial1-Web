'use client';

import { Product } from '@/types/product';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
    items: Product[];
    addCart: (product: Product) => void;
    totalItems: number;
    removeCart: (product: Product) => void;
    totalPrice: number;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([]);

    function addCart(product: Product) {
        setItems((prevItems) => {
            if (prevItems.find((item) => item.id === product.id)) {
                return prevItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity ? item.quantity + 1 : 1 } : item);
            }

            return [...prevItems, { ...product, quantity: 1 }];
        });
    }

    function removeCart(product: Product) {
        setItems((prevItems) => {
            if (prevItems.find((item) => (item.id === product.id && (item.quantity ? item.quantity : 0) > 1))) {
                return prevItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity ? item.quantity - 1 : 1 } : item);
            } else if (prevItems.find((item) => (item.id === product.id))) {
                return prevItems.filter((item) => item.id !== product.id);
            }

            return [...prevItems];
        })
    }

    function clearCart() {
        while (items.length > 0) {
            items.pop()
        }
    }

    const totalItems = items.reduce((sum, item) => sum + (item.quantity ?? 0), 0)

    const totalPrice = items.reduce((sum, item) => sum + (item.quantity ?? 0) * item.price, 0)

    return (
        <CartContext.Provider value={{ items, addCart, totalItems, removeCart, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};