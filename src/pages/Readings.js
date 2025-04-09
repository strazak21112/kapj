import React, { useEffect, useState } from "react";

const Readings = () => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    fetch("https://example.com/api/readings")
      .then((res) => res.json())
      .then((data) => setReadings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Odczyty</h2>
      <ul>
        {readings.map((reading) => (
          <li key={reading.id}>{reading.date} - {reading.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Readings;
