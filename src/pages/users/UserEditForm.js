import React, { useState } from "react";

const BuildingEditForm = ({ building, onSave, onCancel, translations }) => {
  const [formData, setFormData] = useState({
    ...building,
    address: { ...building.address },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    const anyInvalid = numericFields.some(
      (key) => parseFloat(formData[key]) <= 0 || isNaN(formData[key])
    );
    const addressEmpty = Object.values(formData.address).some(
      (val) => !val || val.trim() === ""
    );
    if (anyInvalid || addressEmpty) {
      alert(translations?.formError || "Uzupełnij wszystkie pola i upewnij się, że stawki są większe od zera.");
      return;
    }

    const payload = {
      ...formData,
      apartments: (formData.apartments || []).map(a => typeof a === "object" ? a.id : a),
      managers: (formData.managers || []).map(m => typeof m === "object" ? m.id : m),
    };

    onSave(payload);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {translations?.editBuilding || "Edytuj budynek"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">{translations?.address || "Adres"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[ 
              ["address.street", translations?.street || "Ulica"],
              ["address.number", translations?.number || "Numer"],
              ["address.postalCode", translations?.postalCode || "Kod pocztowy"],
              ["address.city", translations?.city || "Miasto"]
            ].map(([name, label]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={name.startsWith("address") ? formData.address[name.split(".")[1]] : formData[name]}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">{translations?.rates || "Stawki"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[ 
              ["electricityRate", translations?.electricityRate || "Stawka za prąd (PLN/kWh)"],
              ["coldWaterRate", translations?.coldWaterRate || "Stawka za zimną wodę (PLN/m³)"],
              ["hotWaterRate", translations?.hotWaterRate || "Stawka za ciepłą wodę (PLN/m³)"],
              ["heatingRate", translations?.heatingRate || "Stawka za ogrzewanie (PLN/m²)"],
              ["rentRatePerM2", translations?.rentRatePerM2 || "Czynsz za m² (PLN)"],
              ["otherChargesPerM2", translations?.otherChargesPerM2 || "Inne opłaty za m² (PLN)"],
              ["flatElectricityRate", translations?.flatElectricityRate || "Ryczałt za prąd (PLN)"],
              ["flatColdWaterRate", translations?.flatColdWaterRate || "Ryczałt za zimną wodę (PLN)"],
              ["flatHotWaterRate", translations?.flatHotWaterRate || "Ryczałt za ciepłą wodę (PLN)"],
              ["flatHeatingRate", translations?.flatHeatingRate || "Ryczałt za ogrzewanie (PLN)"]
            ].map(([name, label]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                  required
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
            {translations?.save || "Zapisz"}
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
    </div>
  );
};

export default BuildingEditForm;
