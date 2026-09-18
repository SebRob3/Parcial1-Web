'use client'

import { Product } from "@/types/product";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { useCart } from "@/context/Cart";

function subtotal(product: Product) {
    return (product.price*(product.quantity ? product.quantity : 0))
}

export function ProductCart({product}: {product: Product}) {
    const {addCart, removeCart} = useCart()

    return <div>
        <div>
            <img src={product.thumbnail} alt={product.title} />
        </div>
        <div>
            <h1>{product.title}</h1>
            <p>${subtotal(product)}</p>
            <p>{product.category}</p>
        </div>
        <div>
            <div>                
                <span onClick={() => removeCart(product)}><FaMinus /></span>
                <p>{product.quantity}</p>
                <span onClick={() => addCart(product)}><IoMdAdd /></span>
            </div>
        </div>
    </div>
}