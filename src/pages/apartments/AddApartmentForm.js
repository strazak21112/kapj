import React, { useState } from "react";

const AddBuildingForm = ({ onSubmit, onCancel, translations }) => {
  const [form, setForm] = useState({
    address: {
      city: "",
      street: "",
      number: "",
      postalCode: "",
    },
    numberOfFloors: 1,
    electricityRate: 0.01,
    coldWaterRate: 0.01,
    hotWaterRate: 0.01,
    heatingRate: 0.01,
    rentRatePerM2: 0.01,
    otherChargesPerM2: 0.01,
    flatElectricityRate: 0.01,
    flatColdWaterRate: 0.01,
    flatHotWaterRate: 0.01,
    flatHeatingRate: 0.01,
  });

  const handleAddressChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAddressInvalid = Object.values(form.address).some(
      (val) => !val || val.trim() === ""
    );

    const isFloorInvalid = isNaN(form.numberOfFloors) || form.numberOfFloors < 1;

    const numericFields = [
      "electricityRate",
      "coldWaterRate",
      "hotWaterRate",
      "heatingRate",
      "rentRatePerM2",
      "otherChargesPerM2",
      "flatElectricityRate",
      "flatColdWaterRate",
      "flatHotWaterRate",
      "flatHeatingRate",
    ];

    const hasInvalidRates = numericFields.some(
      (key) => isNaN(form[key]) || parseFloat(form[key]) <= 0
    );

    if (isAddressInvalid || isFloorInvalid || hasInvalidRates) {
      alert(translations?.formError || "Uzupełnij wszystkie pola poprawnie. Wszystkie stawki muszą być większe od 0, a adres nie może być pusty.");
      return;
    }

    onSubmit(form);
  };

  const resetForm = () => {
    setForm({
      address: {
        city: "",
        street: "",
        number: "",
        postalCode: "",
      },
      numberOfFloors: 1,
      electricityRate: 0.01,
      coldWaterRate: 0.01,
      hotWaterRate: 0.01,
      heatingRate: 0.01,
      rentRatePerM2: 0.01,
      otherChargesPerM2: 0.01,
      flatElectricityRate: 0.01,
      flatColdWaterRate: 0.01,
      flatHotWaterRate: 0.01,
      flatHeatingRate: 0.01,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{translations?.addBuilding || "Dodaj budynek"}</h2>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{translations?.address || "Adres"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[ 
            { label: translations?.street || "Ulica", field: "street" },
            { label: translations?.number || "Numer", field: "number" },
            { label: translations?.postalCode || "Kod pocztowy", field: "postalCode" },
            { label: translations?.city || "Miasto", field: "city" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
              <input
                type="text"
                value={form.address[field]}
                onChange={(e) => handleAddressChange(field, e.target.value)}
                required
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{translations?.buildingInfo || "Informacje o budynku"}</h3>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-1">{translations?.numberOfFloors || "Liczba pięter"}</label>
          <input
            type="number"
            min="1"
            required
            value={form.numberOfFloors}
            onChange={(e) => handleChange("numberOfFloors", parseInt(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{translations?.rates || "Stawki i opłaty"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[ 
            { label: translations?.electricityRate || "Stawka za prąd (zł/kWh)", field: "electricityRate" },
            { label: translations?.coldWaterRate || "Stawka za zimną wodę (zł/m³)", field: "coldWaterRate" },
            { label: translations?.hotWaterRate || "Stawka za ciepłą wodę (zł/m³)", field: "hotWaterRate" },
            { label: translations?.heatingRate || "Stawka za ogrzewanie (zł/GJ)", field: "heatingRate" },
            { label: translations?.rentRatePerM2 || "Czynsz (zł/m²)", field: "rentRatePerM2" },
            { label: translations?.otherChargesPerM2 || "Inne opłaty (zł/m²)", field: "otherChargesPerM2" },
            { label: translations?.flatElectricityRate || "Ryczałt za prąd (zł)", field: "flatElectricityRate" },
            { label: translations?.flatColdWaterRate || "Ryczałt za zimną wodę (zł)", field: "flatColdWaterRate" },
            { label: translations?.flatHotWaterRate || "Ryczałt za ciepłą wodę (zł)", field: "flatHotWaterRate" },
            { label: translations?.flatHeatingRate || "Ryczałt za ogrzewanie (zł)", field: "flatHeatingRate" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={form[field]}
                onChange={(e) => handleChange(field, parseFloat(e.target.value))}
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {translations?.addBuilding || "Dodaj budynek"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {translations?.cancel || "Anuluj"}
        </button>
      </div>
    </form>
  );
};

export default AddBuildingForm;
