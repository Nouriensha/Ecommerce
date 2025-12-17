import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";




export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  toast.success("Logged out successfully");
  navigate("/", { replace: true });
};

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Brand */}
        <Link to="/" className="brand">
          E-Shop
        </Link>

        {/* Categories */}
        <div className="nav-categories">
          <Link to="/category/groceries" className="nav-link">Groceries</Link>
          <Link to="/category/beauty" className="nav-link">Cosmetics</Link>
          <Link to="/category/furniture" className="nav-link">Furniture</Link>
          <Link to="/category/fragrances" className="nav-link">Perfumes</Link>
        </div>

        {/* Right side actions */}
        <div className="nav-actions">
          <Link to="/cart" className="nav-btn primary">
            Cart {count > 0 && <span className="badge">{count}</span>}
          </Link>

          {user ? (
  <div className="profile-dropdown" tabIndex="0">
    <div className="profile-avatar">
      {user.name.charAt(0)}
    </div>

    {/* ✅ ONLY ONE dropdown-menu */}
    <div className="dropdown-menu">
      <div className="dropdown-item">{user.name}</div>
      <button onClick={handleLogout} className="dropdown-item">
        Logout
      </button>
    </div>
  </div>
) : (
  <Link to="/login" className="nav-btn">
    Login
  </Link>
)}


        </div>

      </div>
    </nav>
  );
}
