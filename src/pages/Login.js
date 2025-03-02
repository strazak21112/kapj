import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TranslationContext } from "../App";

const Login = () => {
  const { translations } = useContext(TranslationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Domyślnie najemca
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Polskie etykiety lokalne (fallback)
  const plLabels = {
    login_title: "Logowanie",
    email_placeholder: "Adres email",
    password_placeholder: "Hasło",
    role_label: "Wybierz rolę",
    login_button: "Zaloguj się",
    tenant: "Najemca",
    manager: "Menadżer",
    admin: "Administrator",
    error_message: "Nieprawidłowe dane logowania",
  };

  const labels = translations || plLabels;

  // Blokowanie cofania w przeglądarce tylko wtedy, gdy użytkownik jest zalogowany
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Jeśli użytkownik jest zalogowany, przekierowanie na odpowiednią stronę
      const storedRole = localStorage.getItem('role');
      const targetRoute = storedRole === 'USER' ? '/tenant'
                          : storedRole === 'MANAGER' ? '/manager'
                          : '/admin';

      // Użycie navigate() z replace: true, aby zablokować cofanie
      navigate(targetRoute, { replace: true });
    }
  }, [navigate]);

  // Obsługa logowania
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const BASE_URL = "http://localhost:8080/untitled_war_exploded";
    const loginEndpoint = `${BASE_URL}${role === "ADMIN" ? "/auth/login/admin" : "/auth/login"}`;

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(labels.error_message);
      }

      // Zapisanie tokena, roli i emaila
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", email);

      // Przekierowanie na odpowiednią stronę po zalogowaniu
      const targetRoute = data.role === "USER" ? "/tenant"
                        : data.role === "MANAGER" ? "/manager"
                        : "/admin";

      // Użycie navigate() z replace: true, aby zablokować cofanie
      navigate(targetRoute, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{labels.login_title}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={labels.email_placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder={labels.password_placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <label>{labels.role_label}</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="USER">{labels.tenant}</option>
          <option value="MANAGER">{labels.manager}</option>
          <option value="ADMIN">{labels.admin}</option>
        </select>

        <button type="submit" style={styles.button}>
          {labels.login_button}
        </button>
      </form>
    </div>
  );
};

// Style
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default Login;
