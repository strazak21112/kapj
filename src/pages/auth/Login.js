import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TranslationContext, LanguageContext } from "../../App";

const defaultLabels = {
  login_title: "Logowanie",
  login_email_placeholder: "Adres email",
  login_password_placeholder: "Hasło",
  login_role_label: "Wybierz rolę",
  login_button: "Zaloguj się",
  login_user: "Najemca",
  login_manager: "Menadżer",
  login_admin: "Administrator",
  login_error_network: "Błąd sieci:",
};

const rolePaths = {
  USER: "/user",
  MANAGER: "/manager",
  ADMIN: "/admin",
};

const Login = () => {
  const { translations } = useContext(TranslationContext);
  const { language } = useContext(LanguageContext);
  const labels = translations || defaultLabels;
  const currentLang = language || "pl";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token && storedRole && rolePaths[storedRole]) {
      navigate(rolePaths[storedRole], { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BASE_URL = "http://localhost:8080/Spring6_war_exploded";
    const endpoint =
      role === "ADMIN"
        ? `${BASE_URL}/auth/login/admin?lang=${currentLang}`
        : `${BASE_URL}/auth/login?lang=${currentLang}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", email);

      const targetRoute = rolePaths[data.role] || "/";
      navigate(targetRoute, { replace: true });
    } catch (err) {
      alert(`${labels.login_error_network} ${err.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{labels.login_title}</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={labels.login_email_placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder={labels.login_password_placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <label>{labels.login_role_label}</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="USER">{labels.login_user}</option>
          <option value="MANAGER">{labels.login_manager}</option>
          <option value="ADMIN">{labels.login_admin}</option>
        </select>
        <button type="submit" style={styles.button}>
          {labels.login_button}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
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
};

export default Login;
