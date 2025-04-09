import React, { useContext, useEffect } from "react";
import { TranslationContext } from "../App"; // Importujemy TranslationContext
import { useNavigate } from "react-router-dom"; // Importujemy useNavigate

const Home = () => {
  const { translations, isLoading, error, language } = useContext(TranslationContext); // Pobieramy tłumaczenia i stan z kontekstu
  const navigate = useNavigate();

  // Polskie etykiety zdefiniowane lokalnie (domyślnie, gdy brak tłumaczeń)
  const plLabels = {
    welcome_message: "Witamy w systemie zarządzania spółdzielnią mieszkaniową",
    login_button: "Zaloguj się",
    register_button: "Zarejestruj się",
  };

  // Wybieramy tłumaczenia, jeśli są dostępne, lub używamy lokalnych (polskich)
  const labels = translations || plLabels;

  // Funkcja do ponownego renderowania komponentu po zmianie języka
  useEffect(() => {
    // Jeżeli tłumaczenia zostały załadowane, możemy odświeżyć widok.
  }, [language, translations]);

  const handleLogin = () => {
    // Przed przeniesieniem na stronę logowania, czyścimy dane z localStorage
    localStorage.clear();
    // Przenosimy użytkownika do strony logowania
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{labels.welcome_message}</h1>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={handleLogin} // Wywołanie funkcji logowania (czyści dane i przenosi na stronę logowania)
        >
          {labels.login_button}
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/register")} // Przenosimy na stronę rejestracji
        >
          {labels.register_button}
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
