'use client';

import "@/app/globals.css"
import {AddCartButton} from "@/components/AddCartButton"

function addCart() {
    console.log("Add Cart");
}

export function ProductCard({ product }: any) {
    return <div className="product-card">
        <img className="product-image" src={product.thumbnail} alt={product.title} />
        <h1 className="product-title">{product.title}</h1>
        <p className="product-info">categoria: {product.category}</p>
        <p className="product-info">unidades: {product.stock}</p>
        <p className="product-info">precio: ${product.price}</p>
        <div className="product-button-sheet">
            <AddCartButton product={product}></AddCartButton>
        </div>
    </div>
}