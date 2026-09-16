'use client'

import "@/app/globals.css"
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from "@/context/Cart";
import { Product } from "@/types/product";
import type { MouseEvent } from "react";

export function AddCartButton({ product }: { product: Product }) {
    const { addCart } = useCart();

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        addCart(product);
    }

    return <button onClick={handleClick} className="product-cart"><FaCartPlus /> Agregar</button>
}