import React, { useState } from "react";

const AddApartmentForm = ({ onSubmit, onCancel, translations, buildings }) => {
  const [form, setForm] = useState({
    apartmentNumber: "",
    floor: 0,
    area: 1,
    buildingInfo: null,
  });

  const labels = {
    addApartment: translations?.addApartment || "Dodaj mieszkanie",
    cancel: translations?.cancel || "Anuluj",
    formError:
      translations?.formError ||
      "Uzupełnij wszystkie pola poprawnie. Powierzchnia musi być większa od 0, numer mieszkania nie może być pusty, wybierz budynek.",
    apartmentNumber: translations?.apartmentNumber || "Numer mieszkania",
    floor: translations?.floor || "Piętro",
    area: translations?.area || "Powierzchnia (m²)",
    buildingId: translations?.buildingId || "Budynek",
    selectBuilding: translations?.selectBuilding || "-- wybierz budynek --",
  };

  const handleBuildingChange = (buildingId) => {
    const b = buildings.find((b) => b.id === parseInt(buildingId));
    setForm((prev) => ({
      ...prev,
      buildingInfo: b || null,
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

    const { apartmentNumber, floor, area, buildingInfo } = form;

    const isInvalid =
      !apartmentNumber.trim() ||
      isNaN(floor) ||
      isNaN(area) ||
      parseFloat(area) <= 0 ||
      !buildingInfo;

    if (isInvalid) {
      alert(labels.formError);
      return;
    }

    const payload = {
      number: apartmentNumber,
      floor,
      area,
      buildingInfo,
    };

    onSubmit(payload);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      apartmentNumber: "",
      floor: 0,
      area: 1,
      buildingInfo: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {labels.addApartment}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {labels.apartmentNumber}
          </label>
          <input
            type="text"
            value={form.apartmentNumber}
            onChange={(e) => handleChange("apartmentNumber", e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {labels.floor}
          </label>
          <input
            type="number"
            min={0}
            value={form.floor}
            onChange={(e) =>
              handleChange("floor", parseInt(e.target.value) || 0)
            }
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {labels.area}
          </label>
          <input
            type="number"
            min={0.01}
            step="0.01"
            value={form.area}
            onChange={(e) =>
              handleChange("area", parseFloat(e.target.value) || 1)
            }
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {labels.buildingId}
          </label>
          <select
            value={form.buildingInfo ? form.buildingInfo.id : ""}
            onChange={(e) => handleBuildingChange(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="">{labels.selectBuilding}</option>
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {`${building.address.street} ${building.address.number}, ${building.address.postalCode} ${building.address.city}`}
              </option>
            ))}
          </select>

          {form.buildingInfo && (
            <p className="mt-2 text-gray-700 text-sm">
              {`${form.buildingInfo.address.street} ${form.buildingInfo.address.number}, ${form.buildingInfo.address.postalCode} ${form.buildingInfo.address.city}`}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {labels.addApartment}
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

export default AddApartmentForm;
