import React, { useState } from "react";

const ApartmentEditForm = ({ apartment, onSave, onCancel, translations }) => {
  const [formData, setFormData] = useState({
    number: apartment?.number || "",
    area: apartment?.area || 0.01,
  });

  const labels = {
    editApartment: translations?.editApartment || "Edytuj mieszkanie",
    number: translations?.number || "Numer mieszkania",
    area: translations?.area || "Powierzchnia (m²)",
    save: translations?.save || "Zapisz",
    cancel: translations?.cancel || "Anuluj",
    formError: translations?.formError || "Uzupełnij wszystkie pola poprawnie.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "area" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isInvalid =
      !formData.number.trim() || isNaN(formData.area) || formData.area <= 0;

    if (isInvalid) {
      alert(labels.formError);
      return;
    }

    onSave({
      ...apartment,
      number: formData.number.trim(),
      area: formData.area,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{labels.editApartment}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{labels.number}</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{labels.area}</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {labels.save}
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
    </div>
  );
};

export default ApartmentEditForm;
