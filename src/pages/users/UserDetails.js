import React from "react";

const UserDetails = ({ user, onBack, translations }) => {
  if (!user) return <p>{translations?.noData || "Brak danych do wyświetlenia."}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {translations?.userDetailsTitle || "Szczegóły użytkownika"}
      </h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.firstName || "Imię"}</h3>
        <p className="text-gray-600">{user.firstName}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.lastName || "Nazwisko"}</h3>
        <p className="text-gray-600">{user.lastName}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.email || "Email"}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.telephone || "Telefon"}</h3>
        <p className="text-gray-600">{user.telephone}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.role || "Rola"}</h3>
        <p className="text-gray-600">{user.role}</p>
      </div>

      {user.pesel?.number && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">{translations?.pesel || "PESEL"}</h3>
          <p className="text-gray-600">{user.pesel.number}</p>
        </div>
      )}

      {user.apartment?.id && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">{translations?.apartment || "Apartament"}</h3>
          <p className="text-gray-600">ID: {user.apartment.id}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.managedBuildings || "Zarządzane budynki"}</h3>
        <ul className="text-gray-600 list-disc pl-6">
          {user.managedBuildings?.length > 0 ? (
            user.managedBuildings.map((building) => (
              <li key={building.id}>ID: {building.id}</li>
            ))
          ) : (
            <li>{translations?.noManagedBuildings || "Brak przypisanych budynków"}</li>
          )}
        </ul>
      </div>

      <button
        onClick={onBack}
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        {translations?.back || "Powrót"}
      </button>
    </div>
  );
};

export default UserDetails;
