import React, { useContext, useState, useEffect } from "react";
import { TranslationContext } from "../App";
import { useNavigate } from "react-router-dom";
import Users from "./users/Users";
import Buildings from "./buildings/Buildings";
import Apartments from "./Apartments";
import Readings from "./Readings";

const Admin = () => {
  const { translations } = useContext(TranslationContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const plLabels = {
    admin_dashboard: "Panel administratora",
    users: "Użytkownicy",
    buildings: "Budynki",
    apartments: "Apartamenty",
    readings: "Odczyty",
    logout: "Wyloguj się",
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
            {labels[section]}
          </button>
        ))}
      </div>

      <div style={styles.centerSection}>
        {renderSection()}
      </div>

      <div style={styles.rightSection}>
        <button style={styles.adminLogoutButton} onClick={handleLogout}>
          {labels.logout}
        </button>
      </div>
    </div>
  );
};

const styles = {
  adminContainer: {
    display: "flex",
    height: "100vh",
    flexDirection: "row", // Sekcje ustawione w wierszu
    width: "100%", // Ustalamy, żeby kontener miał pełną szerokość
  },
  leftMenu: {
    width: "20%", // Lewa sekcja zajmuje 20% szerokości
    height: "100vh", // Cała wysokość ekranu
    padding: "10px",
    backgroundColor: "#f0f0f0",
    position: "fixed", // Ustalamy lewą sekcję jako fixed, aby pozostała na swoim miejscu
    top: "60px", // Dopasowanie do górnej części ekranu poniżej navbaru
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Upewniamy się, że menu jest wyrównane do góry
  },
  centerSection: {
    width: "70%", // Środkowa sekcja zajmuje 70% szerokości
    marginLeft: "20%", // Zaczyna się po lewej sekcji
    height: "calc(100vh - 60px)", // Cała wysokość z uwzględnieniem navbaru
    padding: "20px",
    overflowY: "auto", // Włącz scroll w pionie, gdy zawartość będzie większa niż dostępna wysokość
    display: "flex",
    flexDirection: "column", // Pozwala na rozciąganie zawartości na całą szerokość
    flexGrow: 1, // Pozwól tej sekcji rosnąć, by wypełnić dostępną przestrzeń
    justifyContent: "center", // Wyśrodkowanie w pionie
    alignItems: "center", // Wyśrodkowanie w poziomie
  },
  rightSection: {
    width: "10%", // Prawa sekcja zajmuje 10% szerokości
    height: "100vh", // Cała wysokość ekranu
    padding: "10px",
    backgroundColor: "#f0f0f0",
    position: "fixed", // Prawa sekcja jest "przyklejona" do prawej krawędzi
    top: "60px", // Dopasowanie do górnej części ekranu
    right: 0,
    display: "flex",
    justifyContent: "flex-end", // Wyrównanie przycisku do prawej strony
    alignItems: "flex-start", // Ustalamy górną część
    paddingTop: "20px", // Możemy dostosować odległość od góry
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
