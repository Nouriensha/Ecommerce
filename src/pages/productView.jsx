import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { AuthContext } from "../contexts/AuthContext";
import useCart from "../hooks/useCart";
import { toast } from "react-toastify";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();

  // 🔴 If id is missing → blank page
  if (!id) {
    return <div>Invalid product</div>;
  }

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <div>Loading product...</div>;
  if (isError || !product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please login to proceed");
      navigate("/login");
      return;
    }
    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <div className="container product-detail">
      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
        <div><strong>Rating:</strong>⭐ {product.rating}</div>

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
