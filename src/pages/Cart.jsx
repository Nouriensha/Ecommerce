import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";


export default function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart();

  if (!cart || cart.length === 0) {
  return (
    <div className="container empty-cart">
      <h2>Your cart is empty</h2>

      <Link to="/" className="continue-shopping">
        Continue Shopping
      </Link>
    </div>
  );
}


  return (
    <div className="container">
      <h2>My Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail} alt={item.title} />

          <div className="cart-info">
            <h4>{item.title}</h4>
            <p>
              ₹{item.price} × {item.qty}
            </p>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
    </div>

    
  );
}
