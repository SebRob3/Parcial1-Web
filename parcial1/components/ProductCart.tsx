'use client'

import { Product } from "@/types/product";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { useCart } from "@/context/Cart";

function subtotal(product: Product) {
    return (product.price * (product.quantity ? product.quantity : 0))
}

export function ProductCart({ product }: { product: Product }) {
    const { addCart, removeCart } = useCart()

    return <div className="cart-product-detail">
        <div className="image-container">
            <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="product-info">
            <h1 className="title-product">{product.title}</h1>
            <p>${subtotal(product)}</p>
            <p>{product.category}</p>
        </div>
        <div className="quantity-button-sheet">
            <div className="quantity-check">
                <span onClick={() => removeCart(product)} className="quantity-modify"><FaMinus /></span>
                <span className="quantity-display">{product.quantity}</span>
                <span onClick={() => addCart(product)} className="quantity-modify"><IoMdAdd /></span>
            </div>
        </div>
    </div>
}