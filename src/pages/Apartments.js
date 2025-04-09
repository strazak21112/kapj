import React, { useEffect, useState } from "react";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    fetch("https://example.com/api/apartments") // Zamień na prawidłowy endpoint
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Apartamenty</h2>
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id}>{apartment.name} - {apartment.floor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Apartments;
