import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Manager = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Usunięcie danych logowania z localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');

    // Zabezpieczenie przed powrotem: przekierowanie na stronę startową z opcją 'replace'
    navigate('/', { replace: true });
  };

  useEffect(() => {
    // Sprawdzenie, czy użytkownik jest zalogowany
    const token = localStorage.getItem('token');
    if (!token) {
      // Jeśli użytkownik nie jest zalogowany, przekieruj go na stronę startową
      navigate('/', { replace: true });
    }

    // Nasłuchiwanie na cofanie strony (popstate)
    const handleBackNavigation = () => {
      // Usunięcie danych logowania z localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');

      // Przekierowanie na stronę startową
      navigate('/', { replace: true });
    };

    // Zabezpieczenie przed cofnięciem się na stronę
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      // Usunięcie nasłuchu przy odmontowaniu komponentu
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1>Panel Menadżera</h1>
      <p>Witaj w panelu menadżera. Tutaj możesz zarządzać najemcami i mieszkaniami.</p>
      <button style={styles.button} onClick={handleLogout}>
        Wyloguj
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default Manager;
