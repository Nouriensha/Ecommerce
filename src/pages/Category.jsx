import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const { categoryName } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error loading products</h2>;

  const filteredProducts = data.products.filter(
    (p) => p.category === categoryName
  );

  return (
    <div className="container">
      <h2 style={{ textTransform: "capitalize" }}>{categoryName}</h2>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
