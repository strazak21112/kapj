import React, { useContext } from "react";
import { TranslationContext } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { translations, isLoading } = useContext(TranslationContext); // Usunięto `error`
  const navigate = useNavigate();

  const plLabels = {
    welcome_message: "Witamy w systemie zarządzania spółdzielnią mieszkaniową",
    login_button: "Zaloguj się",
    register_button: "Zarejestruj się",
  };

  const labels = translations || plLabels;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{labels.welcome_message}</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/login")}>
          {labels.login_button}
        </button>
        <button style={styles.button} onClick={() => navigate("/register")}>
          {labels.register_button}
        </button>
      </div>
      {isLoading && <p>Ładowanie tłumaczeń...</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Home;
