import React from "react";

const UsersList = ({ users, onShow, onEdit, onDelete, onAdd, translations }) => {
  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  const labels = {
    title: translations?.users_list_title || "Lista użytkowników",
    add: translations?.users_add || "Dodaj użytkownika",
    noData: translations?.users_no_data || "Brak użytkowników do wyświetlenia.",
    email: translations?.users_email || "E-mail",
    role: translations?.users_role || "Rola",
    actions: translations?.users_actions || "Akcje",
    show: translations?.users_show || "Pokaż",
    edit: translations?.users_edit || "Edytuj",
    delete: translations?.users_delete || "Usuń",
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">👥 {labels.title}</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-xl shadow transition duration-200"
        >
          ➕ {labels.add}
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">{labels.noData}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">{labels.email}</th>
                <th className="px-4 py-3">{labels.role}</th>
                <th className="px-4 py-3 text-center">{labels.actions}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3 space-x-2 text-center">
                    <button
                      onClick={() => onShow(user)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      👁️ {labels.show}
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg shadow"
                    >
                      ✏️ {labels.edit}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.id)}
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

export default UsersList;
