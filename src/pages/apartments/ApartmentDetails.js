import React from "react";

const BuildingDetails = ({ building, onBack, translations }) => {
  if (!building) return <p>{translations?.noData || "Brak danych do wyświetlenia."}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {translations?.buildingDetailsTitle || "Szczegóły budynku"}
      </h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.address || "Adres"}</h3>
        <p className="text-gray-600">
          {building.address.street?.trim()} /{building.address.number?.trim()}, {building.address.postalCode?.trim()} {building.address.city?.trim()}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.info || "Informacje"}</h3>
        <p className="text-gray-600">{translations?.numberOfFloors || "Liczba pięter"}: {building.numberOfFloors}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.rates || "Stawki"}</h3>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>{translations?.electricityRate || "Stawka za prąd"}: {building.electricityRate} zł/kWh</li>
          <li>{translations?.coldWaterRate || "Stawka za zimną wodę"}: {building.coldWaterRate} zł/m³</li>
          <li>{translations?.hotWaterRate || "Stawka za ciepłą wodę"}: {building.hotWaterRate} zł/m³</li>
          <li>{translations?.heatingRate || "Stawka za ogrzewanie"}: {building.heatingRate} zł/GJ</li>
          <li>{translations?.rentRatePerM2 || "Czynsz"}: {building.rentRatePerM2} zł/m²</li>
          <li>{translations?.otherChargesPerM2 || "Inne opłaty"}: {building.otherChargesPerM2} zł/m²</li>
          <li>{translations?.flatElectricityRate || "Ryczałt za prąd"}: {building.flatElectricityRate} zł</li>
          <li>{translations?.flatColdWaterRate || "Ryczałt za zimną wodę"}: {building.flatColdWaterRate} zł</li>
          <li>{translations?.flatHotWaterRate || "Ryczałt za ciepłą wodę"}: {building.flatHotWaterRate} zł</li>
          <li>{translations?.flatHeatingRate || "Ryczałt za ogrzewanie"}: {building.flatHeatingRate} zł</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.apartments || "Apartamenty"}</h3>
        <ul className="text-gray-600 list-disc pl-6">
          {building.apartments.length > 0 ? (
            building.apartments.map((id) => <li key={id}>{id}</li>)
          ) : (
            <li>{translations?.noApartments || "Brak przypisanych apartamentów"}</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">{translations?.managers || "Zarządcy"}</h3>
        <ul className="text-gray-600 list-disc pl-6">
          {building.managers.length > 0 ? (
            building.managers.map((id) => <li key={id}>{id}</li>)
          ) : (
            <li>{translations?.noManagers || "Brak przypisanych zarządców"}</li>
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

export default BuildingDetails;
