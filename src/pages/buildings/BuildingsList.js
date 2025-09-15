import React from "react";

const BuildingsList = ({ buildings, onShow, onEdit, onDelete, onAdd, translations }) => {
  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  const labels = {
    title: translations?.buildings_list_title || "Lista budynków",
    add: translations?.buildings_add || "Dodaj budynek",
    noData: translations?.buildings_no_data || "Brak budynków do wyświetlenia.",
    address: translations?.buildings_address || "Adres",
    floors: translations?.buildings_floor_count || "Liczba pięter",
    actions: translations?.buildings_actions || "Akcje",
    noAddress: translations?.buildings_no_address || "Brak adresu",
    show: translations?.buildings_show || "Pokaż",
    edit: translations?.buildings_edit || "Edytuj",
    delete: translations?.buildings_delete || "Usuń",
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">📋 {labels.title}</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-xl shadow transition duration-200"
        >
          ➕ {labels.add}
        </button>
      </div>

      {buildings.length === 0 ? (
        <p className="text-gray-500 text-center">{labels.noData}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">{labels.address}</th>
                <th className="px-4 py-3">{labels.floors}</th>
                <th className="px-4 py-3 text-center">{labels.actions}</th>
              </tr>
            </thead>
            <tbody>
              {buildings.map((building) => (
                <tr key={building.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{building.id}</td>
                  <td className="px-4 py-3">
                    {building.address
                      ? `${building.address.street?.trim()} /${building.address.number?.trim()}, ${building.address.postalCode?.trim()} ${building.address.city?.trim()}`
                      : labels.noAddress}
                  </td>
                  <td className="px-4 py-3">{building.numberOfFloors}</td>
                  <td className="px-4 py-3 space-x-2 text-center">
                    <button
                      onClick={() => onShow(building)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      👁️ {labels.show}
                    </button>
                    <button
                      onClick={() => onEdit(building)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      ✏️ {labels.edit}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(building.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      🗑️ {labels.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuildingsList;
