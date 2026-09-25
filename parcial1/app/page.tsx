import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch("https://dummyjson.com/products?limit=20&select=id,title,price,category,thumbnail,stock");

    const data: { products: Product[] } = await response.json();
    return data.products;
}

export default async function Home() {
  const products = await fetchProducts();
  return (
    <div className="products-cards">{products.map((product) => (<ProductCard key={product.id} product={product}/>))}</div>
  );
}
