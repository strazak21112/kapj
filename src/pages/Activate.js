import React, { useEffect, useState, useRef, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TranslationContext } from '../App'; 
const Activate = () => {
  const { translations, isLoading } = useContext(TranslationContext); 
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hasActivated, setHasActivated] = useState(false); 
  const isLoadingRef = useRef(false); 

  const plLabels = {
    activating_account: "Aktywacja konta...",
    please_wait: "Proszę czekać, trwa przetwarzanie żądania.",
    activation_token_missing: "Brak tokena aktywacyjnego.",
    account_activated_successfully: "Konto zostało pomyślnie aktywowane!",
    failed_to_activate_account: "Nie udało się aktywować konta.",
    error_occurred: "Wystąpił błąd podczas aktywacji. Spróbuj ponownie później.",
  };

  const labels = translations || plLabels;

  useEffect(() => {
    if (isLoading) return;
    const token = searchParams.get('token');

    if (!token) {
      alert(labels.activation_token_missing);
      navigate('/');
      return;
    }

    if (hasActivated || isLoadingRef.current) {
      console.log('Aktywacja już wykonana lub trwa.');
      return;
    }

    console.log('Rozpoczynamy aktywację konta. Token:', token);
    isLoadingRef.current = true;

    fetch('http://localhost:8080/untitled_war_exploded/auth/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Błąd serwera: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Odpowiedź aktywacji:', data);
        if (data.status === 'success') {
          alert(labels.account_activated_successfully);
          setHasActivated(true);
          navigate('/');
        } else {
          alert(data.message || labels.failed_to_activate_account);
        }
      })
      .catch((error) => {
        console.error('Błąd aktywacji:', error);
        alert(labels.error_occurred);
      })
      .finally(() => {
        isLoadingRef.current = false;
      });
  }, [searchParams, navigate, hasActivated, translations, isLoading]);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      <h1>{labels.activating_account}</h1>
      <p>{labels.please_wait}</p>
    </div>
  );
};

export default Activate;
