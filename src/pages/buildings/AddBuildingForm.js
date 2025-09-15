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

  const labels = {
    addBuilding: translations?.addBuilding || "Dodaj budynek",
    cancel: translations?.cancel || "Anuluj",
    formError:
      translations?.buildingformError ||
      "Uzupełnij wszystkie pola poprawnie. Wszystkie stawki muszą być większe od 0, a adres nie może być pusty.",
    address: translations?.address || "Adres",
    street: translations?.street || "Ulica",
    number: translations?.buildingnumber || "Numer",
    postalCode: translations?.postalCode || "Kod pocztowy",
    city: translations?.city || "Miasto",
    buildingInfo: translations?.buildingInfo || "Informacje o budynku",
    numberOfFloors: translations?.numberOfFloors || "Liczba pięter",
    rates: translations?.rates || "Stawki i opłaty",
    electricityRate: translations?.electricityRate || "Stawka za prąd (zł/kWh)",
    coldWaterRate: translations?.coldWaterRate || "Stawka za zimną wodę (zł/m³)",
    hotWaterRate: translations?.hotWaterRate || "Stawka za ciepłą wodę (zł/m³)",
    heatingRate: translations?.heatingRate || "Stawka za ogrzewanie (zł/GJ)",
    rentRatePerM2: translations?.rentRatePerM2 || "Czynsz (zł/m²)",
    otherChargesPerM2: translations?.otherChargesPerM2 || "Inne opłaty (zł/m²)",
    flatElectricityRate: translations?.flatElectricityRate || "Ryczałt za prąd (zł)",
    flatColdWaterRate: translations?.flatColdWaterRate || "Ryczałt za zimną wodę (zł)",
    flatHotWaterRate: translations?.flatHotWaterRate || "Ryczałt za ciepłą wodę (zł)",
    flatHeatingRate: translations?.flatHeatingRate || "Ryczałt za ogrzewanie (zł)",
  };

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
      alert(labels.formError);
      return;
    }

    onSubmit(form);
    resetForm();
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{labels.addBuilding}</h2>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{labels.address}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: labels.street, field: "street" },
            { label: labels.number, field: "number" },
            { label: labels.postalCode, field: "postalCode" },
            { label: labels.city, field: "city" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
              <input
                type="text"
                value={form.address[field]}
                onChange={(e) => handleAddressChange(field, e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{labels.buildingInfo}</h3>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-1">{labels.numberOfFloors}</label>
          <input
            type="number"
            min="1"
            value={form.numberOfFloors}
            onChange={(e) => handleChange("numberOfFloors", parseInt(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{labels.rates}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: labels.electricityRate, field: "electricityRate" },
            { label: labels.coldWaterRate, field: "coldWaterRate" },
            { label: labels.hotWaterRate, field: "hotWaterRate" },
            { label: labels.heatingRate, field: "heatingRate" },
            { label: labels.rentRatePerM2, field: "rentRatePerM2" },
            { label: labels.otherChargesPerM2, field: "otherChargesPerM2" },
            { label: labels.flatElectricityRate, field: "flatElectricityRate" },
            { label: labels.flatColdWaterRate, field: "flatColdWaterRate" },
            { label: labels.flatHotWaterRate, field: "flatHotWaterRate" },
            { label: labels.flatHeatingRate, field: "flatHeatingRate" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
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
          {labels.addBuilding}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {labels.cancel}
        </button>
      </div>
    </form>
  );
};

export default AddBuildingForm;
