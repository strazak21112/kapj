import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("users"); // Domyślnie widok użytkowników

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Panel Administratora</h1>
      <p className="text-center text-gray-600 mb-4">Zarządzaj systemem spółdzielni mieszkaniowej</p>

      {/* Przycisk wylogowania */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Wyloguj
        </button>
      </div>

      {/* Nawigacja wewnętrzna */}
      <div className="flex justify-center space-x-4 mb-6">
        <button className="tab-button" onClick={() => setCurrentView("users")}>Użytkownicy</button>
        <button className="tab-button" onClick={() => setCurrentView("buildings")}>Budynki</button>
        <button className="tab-button" onClick={() => setCurrentView("invoices")}>Rachunki</button>
        <button className="tab-button" onClick={() => setCurrentView("meters")}>Liczniki</button>
        <button className="tab-button" onClick={() => setCurrentView("finances")}>Finanse</button>
      </div>

      {/* Dynamiczna zawartość sekcji */}
      <div className="bg-white p-6 rounded shadow">
        {currentView === "users" && <UsersSection />}
        {currentView === "buildings" && <BuildingsSection />}
        {currentView === "invoices" && <InvoicesSection />}
        {currentView === "meters" && <MetersSection />}
        {currentView === "finances" && <FinancesSection />}
      </div>
    </div>
  );
};

// 🔹 Sekcja użytkowników
const UsersSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-3">Zarządzanie Użytkownikami</h2>
    <p>Lista użytkowników, edycja, usuwanie...</p>
  </div>
);

// 🔹 Sekcja budynków
const BuildingsSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-3">Zarządzanie Budynkami</h2>
    <p>Dodawanie i edycja budynków...</p>
  </div>
);

// 🔹 Sekcja rachunków
const InvoicesSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-3">Wystawianie Rachunków</h2>
    <p>Generowanie rachunków dla lokatorów...</p>
  </div>
);

// 🔹 Sekcja liczników (odczyty prąd, gaz, woda itp.)
const MetersSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-3">Odczyty Liczników</h2>
    <p>Dodawanie i weryfikacja odczytów...</p>
  </div>
);

// 🔹 Sekcja finansów (opłaty, fundusz remontowy)
const FinancesSection = () => (
  <div>
    <h2 className="text-xl font-semibold mb-3">Finanse i Opłaty</h2>
    <p>Przegląd wpłat, fundusz remontowy...</p>
  </div>
);

export default Admin;
