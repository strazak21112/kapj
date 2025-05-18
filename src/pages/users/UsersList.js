import React from "react";

const BuildingsList = ({ buildings, onShow, onEdit, onDelete, onAdd, translations }) => {
  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          📋 {translations?.buildings_list_title || "Lista budynków"}
        </h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-xl shadow transition duration-200"
        >
          ➕ {translations?.add_building || "Dodaj budynek"}
        </button>
      </div>

      {buildings.length === 0 ? (
        <p className="text-gray-500 text-center">
          {translations?.no_buildings || "Brak budynków do wyświetlenia."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">{translations?.address || "Adres"}</th>
                <th className="px-4 py-3">{translations?.floor_count || "Liczba pięter"}</th>
                <th className="px-4 py-3 text-center">{translations?.actions || "Akcje"}</th>
              </tr>
            </thead>
            <tbody>
              {buildings.map((building) => (
                <tr key={building.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{building.id}</td>
                  <td className="px-4 py-3">
                    {building.address
                      ? `${building.address.street?.trim()} /${building.address.number?.trim()}, ${building.address.postalCode?.trim()} ${building.address.city?.trim()}`
                      : translations?.no_address || "Brak adresu"}
                  </td>
                  <td className="px-4 py-3">{building.numberOfFloors}</td>
                  <td className="px-4 py-3 space-x-2 text-center">
                    <button
                      onClick={() => onShow(building)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      👁️ {translations?.show || "Pokaż"}
                    </button>
                    <button
                      onClick={() => onEdit(building)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      ✏️ {translations?.edit || "Edytuj"}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(building.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      🗑️ {translations?.delete || "Usuń"}
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
