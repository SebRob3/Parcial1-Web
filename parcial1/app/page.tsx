import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";

async function fetchProducts(): Promise<any[]> {
    const response = await fetch("https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock");

    const data =  await response.json();
    return data.products;
}

export default async function Home() {
  const products = await fetchProducts();
  return (
    <div className="products-cards">{products.map((product) => (<ProductCard key={product.id} product={product}/>))}</div>
  );
}
