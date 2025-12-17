import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";


export default function ProductCard({ product }) {
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!user) {
      toast.info("Please login to proceed");
      navigate("/login");
      return;
    }
    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
        <h4>{product.title}</h4>
      </Link>
      <div className="product-meta">
        <div>₹{product.price}</div>
        <div>⭐ {product.rating}</div>
      </div>
      <button onClick={handleAdd} className="btn">Add to Cart</button>
    </div>
  );
}
