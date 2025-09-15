import React, { useState } from "react";

const AddUserForm = ({ onSubmit, onCancel, translations }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    pesel: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const labels = {
    addUser: translations?.addUser || "Dodaj użytkownika",
    cancel: translations?.cancel || "Anuluj",
    formError:
      translations?.userformError ||
      "Uzupełnij wszystkie pola poprawnie.\n\nPESEL musi być poprawny.\nTelefon: 9 cyfr.\nHasło: min. 12 znaków, z małą i dużą literą, cyfrą i znakiem specjalnym.",
    firstName: translations?.firstName || "Imię",
    lastName: translations?.lastName || "Nazwisko",
    pesel: translations?.pesel || "PESEL",
    phoneNumber: translations?.phoneNumber || "Telefon",
    email: translations?.email || "E-mail",
    password: translations?.password || "Hasło",
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidPesel = (pesel) => {
    if (!/^\d{11}$/.test(pesel)) return false;
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const sum = weights.reduce((acc, w, i) => acc + w * parseInt(pesel[i], 10), 0);
    const controlDigit = (10 - (sum % 10)) % 10;
    return controlDigit === parseInt(pesel[10], 10);
  };

  const isValidPhone = (phone) => /^\d{9}$/.test(phone);

  const isValidPassword = (password) => {
    return (
      password.length >= 12 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^a-zA-Z0-9]/.test(password)
    );
  };

  const validateForm = () => {
    const { firstName, lastName, pesel, phoneNumber, email, password } = form;
    return (
      firstName.trim() &&
      lastName.trim() &&
      isValidPesel(pesel) &&
      isValidPhone(phoneNumber) &&
      email.includes("@") &&
      isValidPassword(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert(labels.formError);
      return;
    }
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{labels.addUser}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { field: "firstName", label: labels.firstName },
          { field: "lastName", label: labels.lastName },
          { field: "pesel", label: labels.pesel, maxLength: 11 },
          { field: "phoneNumber", label: labels.phoneNumber, maxLength: 9 },
          { field: "email", label: labels.email, type: "email" },
          { field: "password", label: labels.password, type: "password" },
        ].map(({ field, label, type, maxLength }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
            <input
              type={type || "text"}
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              maxLength={maxLength}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {labels.addUser}
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

export default AddUserForm;
