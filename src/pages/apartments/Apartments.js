import React, { useState, useEffect, useContext } from "react";
import ApartmentsList from "./ApartmentsList";
import ApartmentDetails from "./ApartmentDetails";
import ApartmentEditForm from "./ApartmentEditForm";
import AddApartmentForm from "./AddApartmentForm";
import { LanguageContext, TranslationContext } from "../../App";

const API_URL = "http://localhost:8080/untitled_war_exploded/api/apartments";

const Apartments = () => {
  const [view, setView] = useState("list");
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const token = localStorage.getItem("token");
  const { language } = useContext(LanguageContext);
  const { translations } = useContext(TranslationContext);

  const fetchApartments = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Accept-Language": language,
        },
      });

      const data = await response.json();
      const sorted = data.data.sort((a, b) => a.id - b.id);
      setApartments(sorted);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [language]);

  const handleShow = (apartment) => {
    setSelectedApartment(apartment);
    setView("details");
  };

  const handleEdit = (apartment) => {
    setSelectedApartment(apartment);
    setView("edit");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(translations?.confirm_delete || "Czy na pewno chcesz usunąć to mieszkanie?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}?lang=${language}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      if (response.status === 204) {
        alert(translations?.delete_success || "Mieszkanie zostało usunięte.");
      } else {
        const data = await response.json();
        alert(`${translations?.delete_error || "Błąd usuwania"}: ${data.message}`);
      }

      await fetchApartments();
    } catch (error) {
      console.error("Błąd podczas usuwania mieszkania:", error);
      alert(translations?.delete_exception || "Wystąpił błąd podczas usuwania mieszkania.");
    }
  };

  const handleAdd = () => {
    setSelectedApartment(null);
    setView("add");
  };

  const handleSave = async (apartmentData) => {
    try {
      await fetch(`${API_URL}/${apartmentData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(apartmentData),
      });
      await fetchApartments();
      setView("list");
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };

  const handleCreate = async (newApartment) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newApartment),
      });
      await fetchApartments();
      setView("list");
    } catch (error) {
      console.error("Error creating apartment:", error);
    }
  };

  const handleCancel = () => {
    setView("list");
    setSelectedApartment(null);
  };

  const handleBack = () => {
    setView("list");
    setSelectedApartment(null);
  };

  return (
    <div className="p-4">
      {view === "list" && (
        <ApartmentsList
          apartments={apartments}
          onShow={handleShow}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          translations={translations}
        />
      )}

      {view === "details" && selectedApartment && (
        <ApartmentDetails
          apartment={selectedApartment}
          onBack={handleBack}
          translations={translations}
        />
      )}

      {view === "edit" && selectedApartment && (
        <ApartmentEditForm
          apartment={selectedApartment}
          onSave={handleSave}
          onCancel={handleCancel}
          translations={translations}
        />
      )}

      {view === "add" && (
        <AddApartmentForm
          onSubmit={handleCreate}
          onCancel={handleCancel}
          translations={translations}
        />
      )}
    </div>
  );
};

export default Apartments;
