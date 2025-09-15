import React from "react";

const BuildingDetails = ({ building, onBack, translations }) => {
  if (!building) return <p>{translations?.noData || "Brak danych do wyświetlenia."}</p>;

  const labels = {
    buildingDetailsTitle: translations?.buildingDetailsTitle || "Szczegóły budynku",
    address: translations?.address || "Adres",
    info: translations?.info || "Informacje",
    numberOfFloors: translations?.numberOfFloors || "Liczba pięter",
    rates: translations?.rates || "Stawki",
    electricityRate: translations?.electricityRate || "Stawka za prąd",
    coldWaterRate: translations?.coldWaterRate || "Stawka za zimną wodę",
    hotWaterRate: translations?.hotWaterRate || "Stawka za ciepłą wodę",
    heatingRate: translations?.heatingRate || "Stawka za ogrzewanie",
    rentRatePerM2: translations?.rentRatePerM2 || "Czynsz",
    otherChargesPerM2: translations?.otherChargesPerM2 || "Inne opłaty",
    flatElectricityRate: translations?.flatElectricityRate || "Ryczałt za prąd",
    flatColdWaterRate: translations?.flatColdWaterRate || "Ryczałt za zimną wodę",
    flatHotWaterRate: translations?.flatHotWaterRate || "Ryczałt za ciepłą wodę",
    flatHeatingRate: translations?.flatHeatingRate || "Ryczałt za ogrzewanie",
    apartments: translations?.apartments || "Apartamenty",
    apartmentNumber: translations?.buildingapartmentNumber || "Numer",
    floor: translations?.floor || "Piętro",
    noApartments: translations?.noApartments || "Brak przypisanych apartamentów",
    managers: translations?.managers || "Zarządcy",
    noManagers: translations?.noManagers || "Brak przypisanych zarządców",
    back: translations?.back || "Powrót"
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {labels.buildingDetailsTitle}
      </h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{labels.address}</h3>
        <p className="text-gray-600">
          {building.address.street?.trim()} /{building.address.number?.trim()}, {building.address.postalCode?.trim()} {building.address.city?.trim()}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{labels.info}</h3>
        <p className="text-gray-600">{labels.numberOfFloors}: {building.numberOfFloors}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{labels.rates}</h3>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>{labels.electricityRate}: {building.electricityRate} zł/kWh</li>
          <li>{labels.coldWaterRate}: {building.coldWaterRate} zł/m³</li>
          <li>{labels.hotWaterRate}: {building.hotWaterRate} zł/m³</li>
          <li>{labels.heatingRate}: {building.heatingRate} zł/GJ</li>
          <li>{labels.rentRatePerM2}: {building.rentRatePerM2} zł/m²</li>
          <li>{labels.otherChargesPerM2}: {building.otherChargesPerM2} zł/m²</li>
          <li>{labels.flatElectricityRate}: {building.flatElectricityRate} zł</li>
          <li>{labels.flatColdWaterRate}: {building.flatColdWaterRate} zł</li>
          <li>{labels.flatHotWaterRate}: {building.flatHotWaterRate} zł</li>
          <li>{labels.flatHeatingRate}: {building.flatHeatingRate} zł</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{labels.apartments}</h3>
        <ul className="text-gray-600 list-disc pl-6">
          {building.apartments.length > 0 ? (
            building.apartments.map((apt) => (
              <li key={apt.id}>
                {labels.apartmentNumber}: {apt.number}, {labels.floor}: {apt.floor}
              </li>
            ))
          ) : (
            <li>{labels.noApartments}</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">{labels.managers}</h3>
        <ul className="text-gray-600 list-disc pl-6">
          {building.managers.length > 0 ? (
            building.managers.map((mgr) => (
              <li key={mgr.id}>
                {mgr.firstName} {mgr.lastName}
              </li>
            ))
          ) : (
            <li>{labels.noManagers}</li>
          )}
        </ul>
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

export default BuildingDetails;
