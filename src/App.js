import React, { useState, createContext, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import User from './pages/User';
import Manager from './pages/Manager';
import Admin from './pages/Admin';
import Activate from './pages/auth/Activate';

export const LanguageContext = createContext();
export const TranslationContext = createContext();

const getDefaultLanguage = () => {
  const savedLang = localStorage.getItem('lang');
  if (savedLang && ['pl', 'en', 'de'].includes(savedLang)) {
    return savedLang;
  }
  const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.split('-')[0];
  return ['pl', 'en', 'de'].includes(lang) ? lang : 'pl';
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getDefaultLanguage());
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (language === 'pl') {
      setTranslations(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch('http://localhost:8080/Spring6_war_exploded/translations', {
      headers: { 'Accept-Language': language },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Błąd pobierania tłumaczeń dla ${language}`);
        return res.json();
      })
      .then((data) => setTranslations(data))
      .catch((err) => {
        console.error('Błąd pobierania tłumaczeń:', err);
        setError(err.message);
        setTranslations(null);
      })
      .finally(() => setIsLoading(false));
  }, [language]);

  const handleLanguageChange = (lang) => {
    if (lang !== language && !isLoading) {
      localStorage.setItem('lang', lang);
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange, isLoading }}>
      <TranslationContext.Provider value={{ translations, error, isLoading, language }}>
        {children}
      </TranslationContext.Provider>
    </LanguageContext.Provider>
  );
};

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      switch (role) {
        case 'ADMIN':
          navigate('/admin', { replace: true });
          break;
        case 'MANAGER':
          navigate('/manager', { replace: true });
          break;
        case 'USER':
          navigate('/user', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    }
  }, [navigate]);

  return null;
};

const LanguageSelector = () => {
  const { language, handleLanguageChange, isLoading } = useContext(LanguageContext);

  return (
    <div style={styles.languageSelector}>
      {['pl', 'en', 'de'].map((lang) => (
        <button
          key={lang}
          style={language === lang ? styles.languageButtonActive : styles.languageButton}
          onClick={() => handleLanguageChange(lang)}
          disabled={isLoading || language === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
      {isLoading && <span style={{ marginLeft: '10px' }}>⏳</span>}
    </div>
  );
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
              <Route path="/user" element={<User />} />
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
    alignItems: 'flex-start',
    overflowY: 'auto',
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
