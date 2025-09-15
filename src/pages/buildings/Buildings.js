import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BuildingsList from "./BuildingsList";
import BuildingDetails from "./BuildingDetails";
import BuildingEditForm from "./BuildingEditForm";
import AddBuildingForm from "./AddBuildingForm";
import { LanguageContext, TranslationContext } from "../../App";

const API_URL = "http://localhost:8080/Spring6_war_exploded/api/buildings";

const Buildings = () => {
  const [view, setView] = useState("list");
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const token = localStorage.getItem("token");

  const { language } = useContext(LanguageContext);
  const { translations } = useContext(TranslationContext);

  const navigate = useNavigate();

  const plLabels = {
    session_expired: "Twoja sesja wygasła. Zaloguj się ponownie.",
    load_error: "Nie udało się załadować danych .",
    load_exception: "Wystąpił błąd podczas pobierania danych .",
    delete_error: "Błąd usuwania",
    delete_exception: "Wystąpił błąd podczas usuwania.",
    save_error: "Błąd zapisu",
    save_exception: "Wystąpił błąd podczas zapisywania.",
    create_error: "Błąd dodawania",
    create_exception: "Błąd podczas dodawania.",
    confirm_delete: "Czy na pewno chcesz usunąć ten budynek?",
  };

  const labels = translations || plLabels;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const checkUnauthorized = (response) => {
    if (response.status === 401) {
      alert(labels.session_expired);
      handleLogout();
      return true;
    }
    return false;
  };

  const fetchBuildings = async () => {
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
        const sortedBuildings = data.data.sort((a, b) => a.id - b.id);
        setBuildings(sortedBuildings);
      } else {
        console.warn("Unexpected data structure:", data);
        setBuildings([]);
      }
    } catch (error) {
      console.error("Error fetching buildings:", error);
      alert(labels.load_exception);
      setBuildings([]);
    }
  };

const fetchBuildingById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/details?lang=${language}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (checkUnauthorized(response)) return null;

    const data = await response.json();

    if (response.ok && data.status === "success" && data.data) {
      return data.data;
    } else {
      alert(`${labels.load_error}: ${data.message || "Nieznany błąd."}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching building by ID:", error);
    alert(labels.load_exception);
    return null;
  }
};


  useEffect(() => {
    fetchBuildings();
  }, [language]);

  const handleShow = async (building) => {
    const fullBuilding = await fetchBuildingById(building.id);
    if (fullBuilding) {
      setSelectedBuilding(fullBuilding);
      setView("details");
    } else {
      alert(labels.load_error);
    }
  };

  const handleEdit = async (building) => {
    const fullBuilding = await fetchBuildingById(building.id);
    if (fullBuilding) {
      setSelectedBuilding(fullBuilding);
      setView("edit");
    } else {
      alert(labels.load_error);
    }
  };

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
        await fetchBuildings();
      } else {
        alert(`${labels.delete_error}: ${data.message}`);
      }
    } catch (error) {
      console.error("Błąd podczas usuwania budynku:", error);
      alert(labels.delete_exception);
    }
  };

  const handleAdd = () => {
    setSelectedBuilding(null);
    setView("add");
  };

  const handleSave = async (buildingData) => {
    try {
      const response = await fetch(`${API_URL}/${buildingData.id}?lang=${language}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildingData),
      });

      if (checkUnauthorized(response)) return;

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert(data.message);
        await fetchBuildings();
        setView("list");
      } else {
        alert(`${labels.save_error}: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating building:", error);
      alert(labels.save_exception);
    }
  };

  const handleCreate = async (newBuilding) => {
    try {
      const response = await fetch(`${API_URL}?lang=${language}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBuilding),
      });

      if (checkUnauthorized(response)) return;

      const data = await response.json();

if ((response.status >= 200 && response.status < 300) && data.status === "success") {
        alert(data.message);
        await fetchBuildings();
        setView("list");
      } else {
        alert(`${labels.create_error}: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating building:", error);
      alert(labels.create_exception);
    }
  };

  const handleCancel = () => {
    setView("list");
    setSelectedBuilding(null);
  };

  const handleBack = () => {
    setView("list");
    setSelectedBuilding(null);
  };

  return (
    <div className="p-4">
      {view === "list" && (
        <BuildingsList
          buildings={buildings}
          onShow={handleShow}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          translations={translations}
        />
      )}

      {view === "details" && selectedBuilding && (
        <BuildingDetails
          building={selectedBuilding}
          onBack={handleBack}
          translations={translations}
        />
      )}

      {view === "edit" && selectedBuilding && (
        <BuildingEditForm
          building={selectedBuilding}
          onSave={handleSave}
          onCancel={handleCancel}
          translations={translations}
        />
      )}

      {view === "add" && (
        <AddBuildingForm
          onSubmit={handleCreate}
          onCancel={handleCancel}
          translations={translations}
        />
      )}
    </div>
  );
};

export default Buildings;
