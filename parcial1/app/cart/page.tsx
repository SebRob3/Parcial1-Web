'use client'

import { useCart } from "@/context/Cart"
import { ProductCart } from "@/components/ProductCart"
import Link from "next/link";
import "@/app/globals.css"

export default function cartView() {
    const { items, totalPrice } = useCart();
    return <div className="cart-view">
    <div className="cart-products">
        {items.map((product) => (<ProductCart product={product} key={product.id}></ProductCart>))}
    </div>
        <div>
            <div>
                <div className="cart-summary">
                    <h1 color="#7fffd4">Resumen de Compra:</h1>
                    <p>Total: {totalPrice}</p>
                    <Link href="/payments">Ir a Pagar</Link>
                </div>
            </div>
        </div>
    </div>
}