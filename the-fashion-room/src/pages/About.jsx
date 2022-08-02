import React, { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [stores, getStores] = useState([]);

  const loadStores = async () => {
    const response = await axios.get("http://localhost:3001/stores");
    const data = await response.data;
    getStores(data);
  };

  useEffect(() => {
    loadStores();
  }, []);

  return (
    <div>
      {stores.map(store => (
        <i key={store.nit}>{store.name}</i>
      ))}
    </div>
  );
}

export default About;
