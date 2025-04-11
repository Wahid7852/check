import React, { useState } from "react";
import Transactions from "./Transactions";
import Refunds from "./Refunds";
import Subscriptions from "./Subscriptions";

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("transactions");

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#111", // deep dark background
      color: "#f1f1f1",
      minHeight: "100vh",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "10px",
      color: "#00bcd4",
    },
    description: {
      marginBottom: "25px",
      color: "#aaa",
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginBottom: "30px",
    },
    tabButton: (active) => ({
      padding: "10px 18px",
      fontSize: "14px",
      border: "1px solid #00bcd4",
      borderRadius: "6px",
      backgroundColor: active ? "#00bcd4" : "transparent",
      color: active ? "#111" : "#00bcd4",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    }),
    tabContent: {
      backgroundColor: "rgba(255,255,255,0.05)",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 188, 212, 0.15)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Management</h1>
      <p style={styles.description}>Manage all payment transactions here.</p>

      <div style={styles.buttonGroup}>
        <button
          style={styles.tabButton(activeTab === "transactions")}
          onClick={() => setActiveTab("transactions")}
        >
          View Transactions
        </button>
        <button
          style={styles.tabButton(activeTab === "refunds")}
          onClick={() => setActiveTab("refunds")}
        >
          Process Refunds
        </button>
        <button
          style={styles.tabButton(activeTab === "subscriptions")}
          onClick={() => setActiveTab("subscriptions")}
        >
          Manage Subscriptions
        </button>
      </div>

      <div style={styles.tabContent}>
        {activeTab === "transactions" && <Transactions />}
        {activeTab === "refunds" && <Refunds />}
        {activeTab === "subscriptions" && <Subscriptions />}
      </div>
    </div>
  );
};

export default PaymentManagement;
