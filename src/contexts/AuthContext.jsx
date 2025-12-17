import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const USERS_KEY = "ecom_users";
const CURRENT_USER_KEY = "ecom_current_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setAuthReady(true); // ✅ auth is ready
  }, []);

  // Persist current user
  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  // Login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    setUser(foundUser);
  };

  // Register
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    if (users.some((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = { name, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    setUser(newUser);
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, authReady, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
