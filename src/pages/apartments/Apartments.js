import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ApartmentsList from "./ApartmentsList";
import ApartmentDetails from "./ApartmentDetails";
import ApartmentEditForm from "./ApartmentEditForm";
import AddApartmentForm from "./AddApartmentForm";
import { LanguageContext, TranslationContext } from "../../App";

const API_URL = "http://localhost:8080/Spring6_war_exploded/api/apartments";

const Apartments = () => {
  const [view, setView] = useState("list");
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [buildings, setBuildings] = useState([]);

  const token = localStorage.getItem("token");
  const { language } = useContext(LanguageContext);
  const { translations } = useContext(TranslationContext);
  const navigate = useNavigate();

  const plLabels = {
    session_expired: "Twoja sesja wygasła. Zaloguj się ponownie.",
    load_error: "Nie udało się załadować danych.",
    load_exception: "Wystąpił błąd podczas pobierania danych.",
    delete_error: "Błąd usuwania",
    delete_exception: "Wystąpił błąd podczas usuwania.",
    save_error: "Błąd zapisu",
    save_exception: "Wystąpił błąd podczas zapisywania.",
    create_error: "Błąd dodawania",
    create_exception: "Błąd podczas dodawania.",
    confirm_delete: "Czy na pewno chcesz usunąć to mieszkanie?",
    no_buildings_available:"Brak dostępnych budynków. Dodaj budynek przed dodaniem mieszkania.",
  };
//++
  const labels = translations || plLabels;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
//++
  const checkUnauthorized = (response) => {
    if (response.status === 401) {
      alert(labels.session_expired);
      handleLogout();
      return true;
    }
    return false;
  };
//++
  const fetchBuildings = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/Spring6_war_exploded/api/buildings/info?lang=${language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (checkUnauthorized(response)) return [];

      const data = await response.json();

      if (data.status === "success" && Array.isArray(data.data)) {
        return data.data;
      } else {
        console.warn("Unexpected data structure:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching buildings:", error);
      alert(labels.load_exception);
      return [];
    }
  };
//++
  const fetchApartments = async () => {
    try {
const response = await fetch(`${API_URL}/rows?lang=${language}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (checkUnauthorized(response)) return;

      const data = await response.json();

      if (data.status === "success" && Array.isArray(data.data)) {
        const sorted = data.data.sort((a, b) => a.id - b.id);
        setApartments(sorted);  
      } else {
        console.warn("Unexpected data structure:", data);
        setApartments([]);
      }
    } catch (error) {
      console.error("Error fetching apartments:", error);
      alert(labels.load_exception);
      setApartments([]);
    }
  };
///++
const fetchApartmentDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/details?lang=${language}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (checkUnauthorized(response)) return null;

    const data = await response.json();

    if (response.ok && data.status === "success") {
      return data.data;  
    } else {
      console.warn("Nieoczekiwana struktura odpowiedzi:", data);
        alert(data.message);
      return null;
    }
  } catch (error) {
    console.error("Błąd podczas pobierania szczegółów mieszkania:", error);
    alert(labels.load_exception);
    return null;
  }
};


  useEffect(() => {
    fetchApartments();
  }, [language]);
//++
const handleShow = async (apartmentRow) => {
  const details = await fetchApartmentDetails(apartmentRow.id);
  if (details) {
    setSelectedApartment(details);
    setView("details");
  }
};
//++
const handleEdit = async (apartmentRow) => {
  const buildingList = await fetchBuildings();
  const details = await fetchApartmentDetails(apartmentRow.id);
  if (details) {
    setBuildings(buildingList);
    setSelectedApartment(details);
    setView("edit");
  }
};
//++
const handleAdd = async () => {
  const buildingList = await fetchBuildings();
  
  if (buildingList.length === 0) {
    alert(labels.no_buildings_available);
    return;
  }

  setBuildings(buildingList);
  setSelectedApartment(null);
  setView("add");
};

//++
  const handleDelete = async (id) => {
    const confirmed = window.confirm(labels.confirm_delete);
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}?lang=${language}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (checkUnauthorized(response)) return;

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert(data.message);
        await fetchApartments();
      } else {
        alert(`${labels.delete_error}: ${data.message}`);
      }
    } catch (error) {
      console.error("Błąd podczas usuwania mieszkania:", error);
      alert(labels.delete_exception);
    }
  };
//++
  const handleSave = async (apartmentData) => {
    try {
      const response = await fetch(`${API_URL}/${apartmentData.id}?lang=${language}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apartmentData),
      });

      if (checkUnauthorized(response)) return;

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert(data.message);
        await fetchApartments();
        setView("list");
      } else {
        alert(`${labels.save_error}: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating apartment:", error);
      alert(labels.save_exception);
    }
  };
//++
  const handleCreate = async (newApartment) => {
    try {
      const response = await fetch(`${API_URL}?lang=${language}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newApartment),
      });

      if (checkUnauthorized(response)) return;

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert(data.message);
        await fetchApartments();
        setView("list");
      } else {
        alert(`${labels.create_error}: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating apartment:", error);
      alert(labels.create_exception);
    }
  };
//+
  const handleCancel = () => {
    setView("list");
    setSelectedApartment(null);
  };
//+
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
          translations={translations}//+
        />
      )}

      {view === "edit" && selectedApartment && (
        <ApartmentEditForm
          apartment={selectedApartment}
          onSave={handleSave}
          onCancel={handleCancel}
          translations={translations}
          buildings={buildings}
        />
      )}

      {view === "add" && (
        <AddApartmentForm
          onSubmit={handleCreate}
          onCancel={handleCancel}
          translations={translations}
          buildings={buildings} 
        />
      )}
    </div>
  );
};

export default Apartments;
