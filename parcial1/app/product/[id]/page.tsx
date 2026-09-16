import { AddCartButton } from "@/components/AddCartButton";
import { Product } from "@/types/product";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data: Product = await response.json();
    return data;
}

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProduct(id);
    return <div className="product-detail-main">
        <Link href={"/"} className="back-button"><FaArrowLeftLong color="#7fffd4" /> Volver</Link>
        <div className="detail-view">
            <img src={product.thumbnail} alt={product.title} className="product-image-detail"/>
            <div>
                <h1 className="product-detail-title">{product.title}</h1>
                <div className="product-detail-info">
                <p className="product-price">${product.price}</p>
                <p>categoria: {product.category}</p>
                <p>unidades: {product.stock}</p>
                </div>
                <div>
                    <AddCartButton product={product}></AddCartButton>
                </div>
            </div>
        </div>
        <div className="product-description">
        <h1 className="description-title">Descripcion</h1>
        <p>{product.description}</p>
        </div>
    </div>
}