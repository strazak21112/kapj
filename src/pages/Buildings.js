import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/untitled_war_exploded/api/buildings";

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBuilding, setNewBuilding] = useState({
    address: { street: "", number: "", postalCode: "", city: "" },
    numberOfFloors: 1,
    electricityRate: 0.1,
    coldWaterRate: 0.1,
    hotWaterRate: 0.1,
    heatingRate: 0.1,
    rentRatePerM2: 0.1,
    otherChargesPerM2: 0.1,
    flatElectricityRate: 0.1,
    flatColdWaterRate: 0.1,
    flatHotWaterRate: 0.1,
    flatHeatingRate: 0.1,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedBuilding, setEditedBuilding] = useState(null);
  const editBuildingHandler = (building) => {
    setEditedBuilding(building);
    setIsEditing(true);
  };
    
const handleEditInputChange = (e) => {
  const { name, value } = e.target;
  setEditedBuilding((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Błąd pobierania danych");
      setBuildings(data.data);
    } catch (error) {
      console.error("Błąd pobierania budynków:", error);
    }
  };

  const showDetailsHandler = (building) => {
    setSelectedBuilding(building);
    setShowDetails(true);
  };

  const hideDetailsHandler = () => {
    setSelectedBuilding(null);
    setShowDetails(false);
  };

  const deleteBuilding = async (buildingId) => {
    const lang = "en"; 
  
    try {
      const response = await fetch(`${API_URL}/${buildingId}?lang=${lang}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
  
      if (!response.ok) throw new Error("Błąd usuwania budynku");
  
      setBuildings(buildings.filter(building => building.id !== buildingId));
    } catch (error) {
      console.error("Błąd usuwania budynku:", error);
    }
  };


  const addBuildingHandler = async (e) => {
    e.preventDefault();
    const { address, numberOfFloors, electricityRate, coldWaterRate, hotWaterRate, heatingRate, rentRatePerM2, otherChargesPerM2, flatElectricityRate, flatColdWaterRate, flatHotWaterRate, flatHeatingRate } = newBuilding;
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          address,
          numberOfFloors: numberOfFloors >= 1 ? numberOfFloors : 1, // minimalna liczba pięter (1)
          electricityRate: electricityRate >= 0.1 ? electricityRate : 0.1, // minimalna stawka (0.1)
          coldWaterRate: coldWaterRate >= 0.1 ? coldWaterRate : 0.1, // minimalna stawka (0.1)
          hotWaterRate: hotWaterRate >= 0.1 ? hotWaterRate : 0.1, // minimalna stawka (0.1)
          heatingRate: heatingRate >= 0.1 ? heatingRate : 0.1, // minimalna stawka (0.1)
          rentRatePerM2: rentRatePerM2 >= 0.1 ? rentRatePerM2 : 0.1, // minimalna stawka (0.1)
          otherChargesPerM2: otherChargesPerM2 >= 0.1 ? otherChargesPerM2 : 0.1, // minimalna stawka (0.1)
          flatElectricityRate: flatElectricityRate >= 0.1 ? flatElectricityRate : 0.1, // minimalna stawka (0.1)
          flatColdWaterRate: flatColdWaterRate >= 0.1 ? flatColdWaterRate : 0.1, // minimalna stawka (0.1)
          flatHotWaterRate: flatHotWaterRate >= 0.1 ? flatHotWaterRate : 0.1, // minimalna stawka (0.1)
          flatHeatingRate: flatHeatingRate >= 0.1 ? flatHeatingRate : 0.1, // minimalna stawka (0.1)
        }),
      });

      if (!response.ok) throw new Error("Błąd dodawania budynku");

      const data = await response.json();
      setBuildings([...buildings, data.data]);
      setShowAddForm(false);
      setNewBuilding({
        address: { street: "", number: "", postalCode: "", city: "" },
        numberOfFloors: 1,
        electricityRate: 0.1,
        coldWaterRate: 0.1,
        hotWaterRate: 0.1,
        heatingRate: 0.1,
        rentRatePerM2: 0.1,
        otherChargesPerM2: 0.1,
        flatElectricityRate: 0.1,
        flatColdWaterRate: 0.1,
        flatHotWaterRate: 0.1,
        flatHeatingRate: 0.1,
      });
    } catch (error) {
      console.error("Błąd dodawania budynku:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuilding((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Lista budynków</h2>
      
      {/* Przycisk "Dodaj" */}
      <button onClick={addBuildingHandler} style={styles.addButton}>
        Dodaj Budynek
      </button>

 {/* Formularz dodawania budynku */}
 {showAddForm && (
        <form onSubmit={addBuildingHandler} style={styles.addForm}>
          <h3>Dodaj Budynek</h3>
          <label>
            Ulica:
            <input
              type="text"
              name="street"
              value={newBuilding.address.street}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Numer:
            <input
              type="text"
              name="number"
              value={newBuilding.address.number}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Kod pocztowy:
            <input
              type="text"
              name="postalCode"
              value={newBuilding.address.postalCode}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Miasto:
            <input
              type="text"
              name="city"
              value={newBuilding.address.city}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Liczba pięter:
            <input
              type="number"
              name="numberOfFloors"
              min="1"
              value={newBuilding.numberOfFloors}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Stawka za prąd:
            <input
              type="number"
              name="electricityRate"
              min="0.1"
              value={newBuilding.electricityRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Stawka za zimną wodę:
            <input
              type="number"
              name="coldWaterRate"
              min="0.1"
              value={newBuilding.coldWaterRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Stawka za ciepłą wodę:
            <input
              type="number"
              name="hotWaterRate"
              min="0.1"
              value={newBuilding.hotWaterRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Stawka za ogrzewanie:
            <input
              type="number"
              name="heatingRate"
              min="0.1"
              value={newBuilding.heatingRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Czynsz za m²:
            <input
              type="number"
              name="rentRatePerM2"
              min="0.1"
              value={newBuilding.rentRatePerM2}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Inne opłaty za m²:
            <input
              type="number"
              name="otherChargesPerM2"
              min="0.1"
              value={newBuilding.otherChargesPerM2}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Ryczałt za prąd:
            <input
              type="number"
              name="flatElectricityRate"
              min="0.1"
              value={newBuilding.flatElectricityRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Ryczałt za zimną wodę:
            <input
              type="number"
              name="flatColdWaterRate"
              min="0.1"
              value={newBuilding.flatColdWaterRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Ryczałt za ciepłą wodę:
            <input
              type="number"
              name="flatHotWaterRate"
              min="0.1"
              value={newBuilding.flatHotWaterRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Ryczałt za ogrzewanie:
            <input
              type="number"
              name="flatHeatingRate"
              min="0.1"
              value={newBuilding.flatHeatingRate}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Dodaj budynek</button>
        </form>
      )}




      <div style={styles.buildingsList}>
        {buildings.length === 0 ? (
          <p style={styles.noBuildingsText}>Brak budynków do wyświetlenia</p>
        ) : (
          buildings.map((building) => (
            <div key={building.id} style={styles.buildingItem}>
              <span>ID: {building.id}</span>
              <button
                onClick={() => showDetailsHandler(building)}
                style={styles.button}
              >
                Pokaż
              </button>
              {/* Przycisk Edytuj */}
              <button
                onClick={() => editBuildingHandler(building)}
                style={{ ...styles.button, ...styles.editButton }}
              >
                Edytuj
              </button>
              <button
                onClick={() => deleteBuilding(building.id)}
                style={{ ...styles.button, ...styles.deleteButton }}
              >
                Usuń
              </button>
            </div>
          ))
        )}
      </div>

      {showDetails && selectedBuilding && (
        <div style={styles.detailsContainer}>
          <h3>Szczegóły budynku ID: {selectedBuilding.id}</h3>
          <p>Adres: {selectedBuilding.address?.street} {selectedBuilding.address?.number}, {selectedBuilding.address?.postalCode} {selectedBuilding.address?.city}</p>
          <p>Liczba pięter: {selectedBuilding.numberOfFloors}</p>
          <h4>Stawki</h4>
          <ul>
            <li>Prąd: {selectedBuilding.electricityRate} zł</li>
            <li>Zimna woda: {selectedBuilding.coldWaterRate} zł</li>
            <li>Ciepła woda: {selectedBuilding.hotWaterRate} zł</li>
            <li>Ogrzewanie: {selectedBuilding.heatingRate} zł</li>
            <li>Czynsz za m²: {selectedBuilding.rentRatePerM2} zł</li>
            <li>Inne opłaty za m²: {selectedBuilding.otherChargesPerM2} zł</li>
          </ul>
          <h4>Ryczałty (z mieszkania)</h4>
          <ul>
            <li>Prąd: {selectedBuilding.flatElectricityRate} zł</li>
            <li>Zimna woda: {selectedBuilding.flatColdWaterRate} zł</li>
            <li>Ciepła woda: {selectedBuilding.flatHotWaterRate} zł</li>
            <li>Ogrzewanie: {selectedBuilding.flatHeatingRate} zł</li>
          </ul>
          <h4>Apartamenty</h4>
          <div style={styles.scrollableList}>
            {selectedBuilding.apartments?.length > 0 ? (
              selectedBuilding.apartments.map((apt) => (
                <li key={apt.id}>{apt.id}</li>
              ))
            ) : (
              <p>Brak apartamentów</p>
            )}
          </div>
          <h4>Menadżerowie</h4>
          <div style={styles.scrollableList}>
            {selectedBuilding.managers?.length > 0 ? (
              selectedBuilding.managers.map((mgr) => (
                <li key={mgr.id}>{mgr.id}</li>
              ))
            ) : (
              <p>Brak menadżerów</p>
            )}
          </div>
          <button
            onClick={hideDetailsHandler}
            style={{ ...styles.button, ...styles.hideButton }}
          >
            Ukryj
          </button>
        </div>
      )}
    </div>
  );
};

// Style CSS w obiekcie JavaScript
const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  buildingsList: {
    maxHeight: "300px",
    overflowY: "auto",
  },
  buildingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#f9f9f9",
    border: "1px solid #e2e2e2",
    borderRadius: "5px",
  },
  button: {
    padding: "8px 15px",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#3498db",
    color: "white",
    marginLeft: "10px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  editButton: {
    backgroundColor: "#f39c12",
  },
  hideButton: {
    backgroundColor: "#2ecc71",
    marginTop: "20px",
  },
  addButton: {
    padding: "8px 15px",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#9b59b6",
    color: "white",
    marginBottom: "20px",
  },
  detailsContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #e2e2e2",
    borderRadius: "8px",
  },
  scrollableList: {
    maxHeight: "150px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  noBuildingsText: {
    textAlign: "center",
    color: "#777",
  },
};

export default Buildings;
