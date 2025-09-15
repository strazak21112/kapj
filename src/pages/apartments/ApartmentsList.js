import React from "react";

const ApartmentsList = ({ apartments, onShow, onEdit, onDelete, onAdd, translations }) => {
  const labels = {
    title: translations?.apartments_list_title || "Lista mieszkań",
    add: translations?.apartments_add || "Dodaj mieszkanie",
    noData: translations?.apartments_no_data || "Brak mieszkań do wyświetlenia.",
    address: translations?.apartments_address || "Adres",
    number: translations?.apartments_number || "Numer mieszkania",
    actions: translations?.apartments_actions || "Akcje",
    noAddress: translations?.apartments_no_address || "Brak adresu",
    show: translations?.apartments_show || "Pokaż",
    edit: translations?.apartments_edit || "Edytuj",
    delete: translations?.apartments_delete || "Usuń",
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">🏠 {labels.title}</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-xl shadow transition duration-200"
        >
          ➕ {labels.add}
        </button>
      </div>

      {apartments.length === 0 ? (
        <p className="text-gray-500 text-center">{labels.noData}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">{labels.address}</th>
                <th className="px-4 py-3">{labels.number}</th>
                <th className="px-4 py-3 text-center">{labels.actions}</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
                <tr key={apartment.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{apartment.id}</td>
                  <td className="px-4 py-3">
                    {apartment.address
                      ? `${apartment.address.street?.trim()} ${apartment.address.number?.trim()}, ${apartment.address.postalCode?.trim()} ${apartment.address.city?.trim()}`
                      : labels.noAddress}
                  </td>
                  <td className="px-4 py-3">{apartment.number}</td>
                  <td className="px-4 py-3 space-x-2 text-center">
                    <button
                      onClick={() => onShow(apartment)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      👁️ {labels.show}
                    </button>
                    <button
                      onClick={() => onEdit(apartment)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      ✏️ {labels.edit}
                    </button>
                    <button
                      onClick={() => onDelete(apartment.id)}
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

export default ApartmentsList;
