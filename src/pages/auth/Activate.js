import React, { useEffect, useState, useRef, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TranslationContext, LanguageContext } from '../../App';

const Activate = () => {
  const { translations, isLoading } = useContext(TranslationContext);
  const { language } = useContext(LanguageContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hasActivated, setHasActivated] = useState(false);
  const isLoadingRef = useRef(false);

  const defaultLabels = {
    activating_account: "Aktywacja konta...",
    please_wait: "Proszę czekać, trwa przetwarzanie żądania.",
    token_missing: "Brak tokena aktywacyjnego.",
    error_activation_failed: "Wystąpił problem z połączeniem lub aktywacją konta."
  };

  const labels = translations || defaultLabels;
  const currentLang = language || "pl";

  useEffect(() => {
    if (isLoading) return;

    const token = searchParams.get('token');
    if (!token) {
      alert(labels.token_missing);
      navigate('/');
      return;
    }

    if (hasActivated || isLoadingRef.current) {
      console.log('Aktywacja już wykonana lub trwa.');
      return;
    }

    console.log('Rozpoczynamy aktywację konta. Token:', token);
    isLoadingRef.current = true;

    fetch(`http://localhost:8080/Spring6_war_exploded/auth/activate?lang=${currentLang}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          alert(data.message); 
          throw new Error(data.message);
        }
        return data;
      })
      .then((data) => {
        alert(data.message);
        setHasActivated(true);
        navigate('/');
      })
      .catch((error) => {
        console.error("Błąd aktywacji:", error);
         alert(labels.error_activation_failed);
      })
      .finally(() => {
        isLoadingRef.current = false;
      });
  }, [searchParams, navigate, hasActivated, isLoading, currentLang]);

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
