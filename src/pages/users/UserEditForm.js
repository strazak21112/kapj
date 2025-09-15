import React, { useState, useEffect } from "react";

const UserEditForm = ({ user, apartments, buildings, translations, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });
  const [addingApartment, setAddingApartment] = useState(false);
  const [apartmentChanged, setApartmentChanged] = useState(false);

  const labels = {
    username: translations?.username || "Nazwa użytkownika",
    email: translations?.email || "E-mail",
    apartment: translations?.apartment || "Mieszkanie",
    remove: translations?.remove || "Usuń",
    addApartment: translations?.addApartment || "Dodaj mieszkanie",
    noApartments: translations?.noApartments || "Brak dostępnych mieszkań",
    buildings: translations?.buildings || "Budynki",
    cancel: translations?.cancel || "Anuluj",
    save: translations?.save || "Zapisz",
  };

  useEffect(() => {
    setFormData({ ...user });
    setAddingApartment(false);
    setApartmentChanged(false);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">{labels.username}</label>
        <input
          type="text"
          value={formData.username || ""}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">{labels.email}</label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />
      </div>

      {/* Apartment section only for USER */}
      {formData.role === "USER" && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">{labels.apartment}</label>

          {formData.apartment ? (
            <div className="flex items-center justify-between border border-gray-300 p-2 rounded-lg">
              <span>{formData.apartment.identifier || `ID ${formData.apartment.id}`}</span>
              <button
                type="button"
                disabled={apartmentChanged}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, apartment: null }));
                  setAddingApartment(false);
                  setApartmentChanged(true);
                }}
                className={`${
                  apartmentChanged ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:text-red-800"
                }`}
              >
                {labels.remove}
              </button>
            </div>
          ) : !addingApartment && apartments.length > 0 && !apartmentChanged ? (
            <button
              type="button"
              onClick={() => setAddingApartment(true)}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              {labels.addApartment}
            </button>
          ) : !formData.apartment && apartments.length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">{labels.noApartments}</p>
          ) : null}

          {addingApartment && !formData.apartment && (
            <select
              className="border border-gray-300 p-2 rounded-lg w-full mt-2"
              value=""
              onChange={(e) => {
                const apartmentId = parseInt(e.target.value);
                const selected = apartments.find((a) => a.id === apartmentId);
                setFormData((prev) => ({ ...prev, apartment: selected || null }));
                setAddingApartment(false);
                setApartmentChanged(true);
              }}
            >
              <option value="">--</option>
              {apartments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.identifier || `ID ${a.id}`}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Buildings section only for MANAGER */}
      {formData.role === "MANAGER" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">{labels.buildings}</label>
          <select
            multiple
            className="border border-gray-300 p-2 rounded-lg w-full"
            value={formData.buildings?.map((b) => b.id) || []}
            onChange={(e) => {
              const selectedIds = Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value));
              const selectedBuildings = buildings.filter((b) => selectedIds.includes(b.id));
              setFormData((prev) => ({ ...prev, buildings: selectedBuildings }));
            }}
          >
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name || `ID ${b.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
        >
          {labels.cancel}
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {labels.save}
        </button>
      </div>
    </form>
  );
};

export default UserEditForm;
