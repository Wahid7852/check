import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getStoredUser = () => {
    try {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      sessionStorage.removeItem("user"); // Remove invalid data
      return null;
    }
  };

  const getStoredRole = () => {
    return sessionStorage.getItem("userRole") || "user"; // Default to "user"
  };

  const [user, setUser] = useState(getStoredUser);
  const [role, setRole] = useState(getStoredRole);

  const login = (userInfo, userRole) => {
    if (!userInfo || !userRole) {
      console.error("Invalid login data");
      return;
    }

    setUser(userInfo);
    setRole(userRole);

    sessionStorage.setItem("user", JSON.stringify(userInfo));
    sessionStorage.setItem("userRole", userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);