import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    setError("Password must contain at least one uppercase letter");
    return;
  }

  if (!/[0-9]/.test(password)) {
    setError("Password must contain at least one number");
    return;
  }

  try {
    register(name, email, password);
    navigate("/");
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="container">
      <div className="product-info" style={{ maxWidth: 420, margin: "auto" }}>
        <h2>Create Account</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 12 }}
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 12 }}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 12 }}
          />

          <button className="nav-btn primary" style={{ width: "100%" }}>
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: 16 }} className="login">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
