/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import { apiUrl } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });

  async function login(email, password) {
    const response = await fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(body?.message || "Unable to log in");
      error.status = response.status;
      throw error;
    }
    localStorage.setItem("authToken", body.token);
    const authenticatedUser = { name: body.name, email: body.email, role: body.role };
    localStorage.setItem("authUser", JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
