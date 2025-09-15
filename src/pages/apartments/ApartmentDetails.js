import React from "react";

const ApartmentDetails = ({ apartment, onBack, translations }) => {
  if (!apartment) return <p>{translations?.noData || "Brak danych do wyświetlenia."}</p>;

  const labels = {
    apartmentDetailsTitle: translations?.apartmentDetailsTitle || "Szczegóły mieszkania",
    number: translations?.apartmentNumber || "Numer mieszkania",
    area: translations?.area || "Powierzchnia",
    floor: translations?.floor || "Piętro",
    buildingAddress: translations?.buildingAddress || "Adres budynku",
    tenant: translations?.tenant || "Najemca",
    noTenant: translations?.noTenant || "Brak przypisanego najemcy",
    back: translations?.back || "Powrót"
  };

  const { number, area, floor, buildingInfo, tenant } = apartment;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{labels.apartmentDetailsTitle}</h2>

      <div className="mb-4">
        <p><strong>{labels.number}:</strong> {number}</p>
        <p><strong>{labels.area}:</strong> {area} m²</p>
        <p><strong>{labels.floor}:</strong> {floor}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{labels.buildingAddress}</h3>
        <p className="text-gray-600">
          {buildingInfo?.address?.street?.trim()} {buildingInfo?.address?.number?.trim()},{" "}
          {buildingInfo?.address?.postalCode?.trim()} {buildingInfo?.address?.city?.trim()}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">{labels.tenant}</h3>
        {tenant ? (
          <p className="text-gray-600">{tenant.firstName} {tenant.lastName}</p>
        ) : (
          <p className="text-gray-500 italic">{labels.noTenant}</p>
        )}
      </div>

      <button
        onClick={onBack}
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        {labels.back}
      </button>
    </div>
  );
};

export default ApartmentDetails;
