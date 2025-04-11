import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import "./AdminDashboard.css"; // uses your dark theme CSS
import { color } from "framer-motion";
import { GiWhiteBook } from "react-icons/gi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Manage Users", path: "/admin/manage-users", icon: "👥" },
    { label: "View Reports", path: "/admin/reports", icon: "📊" },
    { label: "System Settings", path: "/admin/settings", icon: "⚙️" },
    { label: "Payment Management", path: "/admin/payment-management", icon: "💳" },
    { label: "Logout", path: "/login", icon: "🚪", logout: true },
  ];

  return (
    <div className="admin-dashboard">
      {!isSidebarOpen && (
        <button className="menu-toggle open" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
          <button className="menu-toggle close" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, i) => (
            <li
              key={i}
              className={item.logout ? "logout" : ""}
              onClick={() => navigate(item.path)}
            >
              <span>{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`admin-content ${isSidebarOpen ? "shifted" : ""}`}>
        <h1 className="admin-title">Admin Dashboard</h1>
        <p>Welcome, Admin! Manage users, view reports, and control system settings.</p>

        <div className="admin-options">
          {menuItems
            .filter((item) => !item.logout)
            .map((item, i) => (
              <button
                key={i}
                className="admin-btn"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
        </div>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          <div style={{ color: "white" }}>Logout</div>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
