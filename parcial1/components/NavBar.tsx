'use client';

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import "@/app/globals.css"
import { useCart } from "@/context/Cart";

export function NavBar() {
    const { totalItems } = useCart();
    return (
        <header>
            <div className="NavBar">
                <Link href="/">
                    <h1 >ShopHub</h1>
                </Link>

                <Link href="/cart" className="cart-counter">
                    <span className="cart-counter">
                        <h2 className="cart"><FiShoppingCart /></h2>
                        <div className="circle-num">{ totalItems }</div>
                    </span>
                </Link>
            </div>
        </header>
    )
}