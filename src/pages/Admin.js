import React, { useContext, useState, useEffect } from "react";
import { TranslationContext } from "../App";
import { useNavigate } from "react-router-dom";
import Users from "./users/Users";
import Buildings from "./buildings/Buildings";
import Apartments from "./apartments/Apartments";
import Readings from "./Readings";

const Admin = () => {
  const { translations } = useContext(TranslationContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const plLabels = {
    admin_dashboard: "Panel administratora",
    admin_users: "Użytkownicy",
    admin_buildings: "Budynki",
    admin_apartments: "Apartamenty",
    admin_readings: "Odczyty",
    admin_logout: "Wyloguj się",
  };

  const labels = translations || plLabels;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/", { replace: true });
  }, [navigate]);

  const renderSection = () => {
    const uniqueKey = Date.now();

    switch (activeSection) {
      case "users":
        return <Users key={uniqueKey} />;
      case "buildings":
        return <Buildings key={uniqueKey} />;
      case "apartments":
        return <Apartments key={uniqueKey} />;
      case "readings":
        return <Readings key={uniqueKey} />;
      default:
        return <h1 key={uniqueKey}>{labels.admin_dashboard}</h1>;
    }
  };

  return (
    <div style={styles.adminContainer}>
      <div style={styles.leftMenu}>
        {["users", "buildings", "apartments", "readings"].map((section) => (
          <button
            key={section}
            style={styles.button}
            onClick={() => setActiveSection(section)}
          >
            {labels[`admin_${section}`]}
          </button>
        ))}
      </div>

      <div style={styles.centerSection}>
        {renderSection()}
      </div>

      <div style={styles.rightSection}>
        <button style={styles.adminLogoutButton} onClick={handleLogout}>
          {labels.admin_logout}
        </button>
      </div>
    </div>
  );
};

const styles = {
  adminContainer: {
    display: "flex",
    height: "100vh",
    flexDirection: "row",
    width: "100%",
  },
  leftMenu: {
    width: "20%",
    height: "100vh",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    position: "fixed",
    top: "60px",
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  centerSection: {
    width: "70%",
    marginLeft: "20%",
    height: "calc(100vh - 60px)",
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSection: {
    width: "10%",
    height: "100vh",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    position: "fixed",
    top: "60px",
    right: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingTop: "20px",
  },
  adminLogoutButton: {
    padding: "10px 15px",
    backgroundColor: "#ff4757",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  button: {
    padding: "15px",
    fontSize: "16px",
    backgroundColor: "#ddd",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "10px",
    textAlign: "left",
    width: "100%",
  },
};

export default Admin;
