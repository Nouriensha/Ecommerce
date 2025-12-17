import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products: {error.message}</div>;

  const products = data?.products || [];

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
