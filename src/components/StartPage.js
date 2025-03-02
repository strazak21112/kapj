import React from 'react';

const StartPage = ({ onLanguageChange, language }) => {
  return (
    <div>
      <div className="language-selector">
        <button onClick={() => onLanguageChange('pl')}>PL</button>
        <button onClick={() => onLanguageChange('en')}>EN</button>
        <button onClick={() => onLanguageChange('de')}>DE</button>
      </div>
      <div className="content">
        <button className="btn login">Logowanie</button>
        <button className="btn register">Rejestracja</button>
      </div>
    </div>
  );
};

export default StartPage;
