import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Category from "./pages/Category";
import ProtectedRoute from "./components/ProtectedRoute";



export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Routes>
          <Route path="/cart"element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
          <Route path="/product/:id" element={<ProtectedRoute> <ProductView /></ProtectedRoute>}/>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:categoryName" element={<Category />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  );
}
