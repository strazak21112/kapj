import React, { useContext } from "react";
import { TranslationContext } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { translations, isLoading, error } = useContext(TranslationContext);
  const navigate = useNavigate();

  const defaultLabels = {
    home_welcome_message: "Witamy w systemie zarządzania spółdzielnią mieszkaniową",
    home_login_button: "Zaloguj się",
    home_register_button: "Zarejestruj się",
  };

  const labels = translations || defaultLabels;

const handleLogin = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');

  navigate("/login");
};


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{labels.home_welcome_message}</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleLogin}>
          {labels.home_login_button}
        </button>
        <button style={styles.button} onClick={() => navigate("/register")}>
          {labels.home_register_button}
        </button>
      </div>
      {isLoading && <p>Ładowanie tłumaczeń...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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
