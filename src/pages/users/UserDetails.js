import React from "react";

const UserDetails = ({ user, onBack, translations }) => {
  if (!user) return <p>{translations?.noData || "Brak danych do wyświetlenia."}</p>;

  const labels = {
    userDetailsTitle: translations?.userDetailsTitle || "Szczegóły użytkownika",
    firstName: translations?.firstName || "Imię",
    lastName: translations?.lastName || "Nazwisko",
    email: translations?.email || "E-mail",
    telephone: translations?.telephone || "Telefon",
    pesel: translations?.pesel || "PESEL",
    role: translations?.role || "Rola",
    role_user: translations?.role_user || "Wynajmujący",
    role_manager: translations?.role_manager || "Zarządca",
    enabled: translations?.enabled || "Status",
    enabled_true: translations?.enabled_true || "Aktywny",
    enabled_false: translations?.enabled_false || "Nieaktywny",
    apartment: translations?.apartment || "Apartament",
    apartmentNumber: translations?.buildingapartmentNumber || "Numer apartamentu",
    area: translations?.area || "Powierzchnia",
    floor: translations?.floor || "Piętro",
    address: translations?.address || "Adres",
    managedBuildings: translations?.managedBuildings || "Zarządzane budynki",
    noManagedBuildings: translations?.noManagedBuildings || "Brak zarządzanych budynków",
    noApartment: translations?.noApartment || "Brak przypisanego apartamentu",
    back: translations?.back || "Powrót",
  };

  const isManager = user.role === "MANAGER";
  const translatedRole = isManager ? labels.role_manager : labels.role_user;
  const translatedStatus = user.enabled ? labels.enabled_true : labels.enabled_false;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {labels.userDetailsTitle}
      </h2>

      <div className="mb-4">
        <p><strong>{labels.firstName}:</strong> {user.firstName}</p>
        <p><strong>{labels.lastName}:</strong> {user.lastName}</p>
        <p><strong>{labels.email}:</strong> {user.email}</p>
        <p><strong>{labels.telephone}:</strong> {user.telephone}</p>
        {user.pesel && <p><strong>{labels.pesel}:</strong> {user.pesel}</p>}
        <p><strong>{labels.role}:</strong> {translatedRole}</p>
        <p><strong>{labels.enabled}:</strong> {translatedStatus}</p>
      </div>

      {!isManager && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">{labels.apartment}</h3>
          {user.apartment ? (
            <ul className="text-gray-600 list-disc pl-6">
              <li>{labels.apartmentNumber}: {user.apartment.number}</li>
              <li>{labels.area}: {user.apartment.area} m²</li>
              <li>{labels.floor}: {user.apartment.floor}</li>
              <li>
                {labels.address}:{" "}
                {user.apartment.buildingInfo?.address?.street}{" "}
                {user.apartment.buildingInfo?.address?.number},{" "}
                {user.apartment.buildingInfo?.address?.postalCode}{" "}
                {user.apartment.buildingInfo?.address?.city}
              </li>
            </ul>
          ) : (
            <p className="text-gray-600">{labels.noApartment}</p>
          )}
        </div>
      )}

      {isManager && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">{labels.managedBuildings}</h3>
          {user.managedBuilding && user.managedBuilding.length > 0 ? (
            <ul className="text-gray-600 list-disc pl-6">
              {user.managedBuilding.map((b) => (
                <li key={b.id}>
                  {labels.address}: {b.address.street} {b.address.number}, {b.address.postalCode} {b.address.city}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{labels.noManagedBuildings}</p>
          )}
        </div>
      )}

      <button
        onClick={onBack}
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        {labels.back}
      </button>
    </div>
  );
};

export default UserDetails;
