import React, { useState, useEffect, useContext } from "react";
import BuildingsList from "./BuildingsList";
import BuildingDetails from "./BuildingDetails";
import BuildingEditForm from "./BuildingEditForm";
import AddBuildingForm from "./AddBuildingForm";
import { LanguageContext, TranslationContext } from "../../App";

const API_URL = "http://localhost:8080/untitled_war_exploded/api/buildings";

const Buildings = () => {
  const [view, setView] = useState("list");
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const token = localStorage.getItem("token");

  const { language } = useContext(LanguageContext);
  const { translations } = useContext(TranslationContext);

  const fetchBuildings = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Accept-Language": language,
        },
      });

      const data = await response.json();
      const sortedBuildings = data.data.sort((a, b) => a.id - b.id);
      setBuildings(sortedBuildings);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, [language]);

  const handleShow = (building) => {
    setSelectedBuilding(building);
    setView("details");
  };

  const handleEdit = (building) => {
    setSelectedBuilding(building);
    setView("edit");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(translations?.confirm_delete || "Czy na pewno chcesz usunąć ten budynek?");
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
        alert(translations?.delete_success || "Budynek został usunięty.");
      } else {
        const data = await response.json();
        alert(`${translations?.delete_error || "Błąd usuwania"}: ${data.message}`);
      }

      await fetchBuildings();
    } catch (error) {
      console.error("Błąd podczas usuwania budynku:", error);
      alert(translations?.delete_exception || "Wystąpił błąd podczas usuwania budynku.");
    }
  };

  const handleAdd = () => {
    setSelectedBuilding(null);
    setView("add");
  };

  const handleSave = async (buildingData) => {
    try {
      await fetch(`${API_URL}/${buildingData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(buildingData),
      });
      await fetchBuildings();
      setView("list");
    } catch (error) {
      console.error("Error updating building:", error);
    }
  };

  const handleCreate = async (newBuilding) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newBuilding),
      });
      await fetchBuildings();
      setView("list");
    } catch (error) {
      console.error("Error creating building:", error);
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
