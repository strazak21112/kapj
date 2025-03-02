import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { TranslationContext } from '../App'; 

const Register = () => {
  const { translations, isLoading } = useContext(TranslationContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    pesel: '',
    phoneNumber: '',
    email: '',
    password: '',
    recaptchaToken: '',
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const plLabels = {
    register_title: "Rejestracja",
    firstName_placeholder: "Imię",
    lastName_placeholder: "Nazwisko",
    pesel_placeholder: "PESEL",
    phoneNumber_placeholder: "Numer telefonu",
    email_placeholder: "Adres email",
    password_placeholder: "Hasło",
    submit_button: "Zarejestruj się",
    recaptcha_label: "Proszę potwierdzić, że nie jesteś robotem.",
    error_pesel: "PESEL musi mieć 11 cyfr i poprawną sumę kontrolną.",
    error_phone: "Numer telefonu musi mieć dokładnie 9 cyfr.",
    error_password: "Hasło musi mieć co najmniej 12 znaków, w tym dużą literę, małą literę, cyfrę i znak specjalny.",
    error_required: "To pole jest wymagane.",
    error_invalidData: "Niepoprawne dane. Proszę sprawdzić formularz i spróbować ponownie.",
    success_registration: "Rejestracja zakończona sukcesem! Zostaniesz przekierowany na stronę główną.",
    error_generic: "Wystąpił błąd. Spróbuj ponownie później."
  };

 
  const labels = translations || plLabels;

  const validatePesel = (pesel) => {
    if (!/^[0-9]{11}$/.test(pesel)) return labels["error_pesel"];
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const sum = pesel.split('').slice(0, 10).reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const controlDigit = (10 - (sum % 10)) % 10;
    return controlDigit === parseInt(pesel[10]) ? '' : labels["error_pesel"];
  };

  const validatePhoneNumber = (phoneNumber) => /^[0-9]{9}$/.test(phoneNumber) ? '' : labels["error_phone"];

  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(password) ? '' : labels["error_password"];

  
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "recaptchaToken") newErrors[key] = labels["error_required"];
    });
    newErrors.pesel = validatePesel(formData.pesel);
    newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    newErrors.password = validatePassword(formData.password);
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '' || error === labels["error_required"]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!validateForm()) {
      alert(labels["error_invalidData"]);
      return;
    }


    if (!recaptchaValue) {
      setErrors({ ...errors, recaptcha: labels["recaptcha_label"] });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/untitled_war_exploded/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaValue }),
      });

      if (response.ok) {
    
        setSuccessMessage(labels["success_registration"]);
        setTimeout(() => navigate('/'), 3000);
      } else {
        alert(labels["error_invalidData"]); 
      }
    } catch (error) {
    
      alert(labels["error_generic"]);
    }
  };

  useEffect(() => {

  }, [translations]);

  if (isLoading) return <div>Ładowanie...</div>;

  return (
    <div style={styles.container}>
      <h2>{labels.register_title}</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          key !== 'recaptchaToken' && (
            <div key={key} style={styles.inputContainer}>
              <input
                type={key === 'password' ? 'password' : 'text'}
                name={key}
                placeholder={labels[`${key}_placeholder`]}
                value={formData[key]}
                onChange={handleChange}
                required
                style={styles.input}
              />
              {errors[key] && <p style={styles.errorText}>{errors[key]}</p>}
            </div>
          )
        ))}
        <div style={styles.inputContainer}>
          <ReCAPTCHA 
            sitekey="6LcmuoMqAAAAAEDAyNyH6E70-_6gTr9YU0IyZSKi" 
            onChange={setRecaptchaValue} 
            style={styles.recaptcha}
          />
          {errors.recaptcha && <p style={styles.errorText}>{errors.recaptcha}</p>}
        </div>
        <button type="submit" style={styles.button}>{labels.submit_button}</button>
      </form>
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#2563eb',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  recaptcha: {
    marginBottom: '15px',
  },
  successMessage: {
    color: 'green',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default Register;
