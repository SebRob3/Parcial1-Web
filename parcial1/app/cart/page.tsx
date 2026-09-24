'use client'

import { useCart } from "@/context/Cart"
import { ProductCart } from "@/components/ProductCart"
import Link from "next/link";
import "@/app/globals.css"

export default function cartView() {
    const { items, totalPrice, totalItems } = useCart();
    return <div className="cart-view">
        <div className="cart-products">
            {items.map((product) => (<ProductCart product={product} key={product.id}></ProductCart>))}
        </div>
        <div>
            <div>
                <div className="cart-summary">
                    <h1 className="summary-title">Resumen de Compra</h1>
                    <p className="summary-info">Total price: {totalPrice}</p>
                    <p className="summary-info">Total items: {totalItems}</p>
                    <Link href="/payments" className="payments-button">Ir a Pagar</Link>
                </div>
            </div>
        </div>
    </div>
}