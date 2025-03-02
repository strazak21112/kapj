import React, { useState, createContext, useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tenant from './pages/Tenant';
import Manager from './pages/Manager';
import Admin from './pages/Admin';
import Activate from './pages/Activate';

export const LanguageContext = createContext();
export const TranslationContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getDefaultLanguage());
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);
  const pendingLanguageRef = useRef(null);

  function getDefaultLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.split('-')[0];
    return ['pl', 'en', 'de'].includes(lang) ? lang : 'pl';
  }

  async function fetchTranslations(lang) {
    if (lang === 'pl') {
      setTranslations(null);
      setLanguage('pl');
      pendingLanguageRef.current = null;
      return;
    }

    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    pendingLanguageRef.current = lang;

    try {
      const response = await fetch(`http://localhost:8080/untitled_war_exploded/translations`, {
        method: 'GET',
        headers: { 'Accept-Language': lang },
      });

      if (!response.ok) throw new Error(`Błąd pobierania tłumaczeń dla ${lang}`);

      const data = await response.json();
      setTranslations(data);
      setLanguage(lang);
    } catch (err) {
      console.error('Błąd pobierania tłumaczeń:', err);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
      pendingLanguageRef.current = null;
    }
  }

  useEffect(() => {
    if (language !== 'pl') fetchTranslations(language);
  }, []);

  const handleLanguageChange = (lang) => {
    if (lang !== language && !isLoading) fetchTranslations(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange, isLoading, pendingLanguageRef }}>
      <TranslationContext.Provider value={{ translations }}>
        {children}
      </TranslationContext.Provider>
    </LanguageContext.Provider>
  );
};

// Obsługa przekierowań po zalogowaniu
const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      switch (role) {
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'manager':
          navigate('/manager', { replace: true });
          break;
        case 'tenant':
          navigate('/tenant', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    }
  }, []);

  return null; // Nie renderuje nic, tylko przekierowuje
};

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <AuthRedirect />
        <div style={styles.container}>
          <div style={styles.navbar}>
            <LanguageSelector />
          </div>
          <div style={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tenant" element={<Tenant />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/activate" element={<Activate />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
};

const LanguageSelector = () => {
  const { language, handleLanguageChange, isLoading, pendingLanguageRef } = useContext(LanguageContext);

  return (
    <div style={styles.languageSelector}>
      {['pl', 'en', 'de'].map((lang) => (
        <button
          key={lang}
          style={language === lang ? styles.languageButtonActive : styles.languageButton}
          onClick={() => handleLanguageChange(lang)}
          disabled={isLoading || pendingLanguageRef.current === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
      {isLoading && <p>Ładowanie tłumaczeń...</p>}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageSelector: {
    display: 'flex',
    gap: '10px',
  },
  languageButton: {
    padding: '8px 15px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  languageButtonActive: {
    padding: '8px 15px',
    backgroundColor: '#1d4ed8',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default App;
