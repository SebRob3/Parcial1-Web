'use client'

import "@/app/globals.css"
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from "@/context/Cart";

export function AddCartButton({product}:any) {
    const { addCart } = useCart();

    return <button onClick={() => addCart(product)} className="product-cart"><FaCartPlus /> Agregar</button>
}