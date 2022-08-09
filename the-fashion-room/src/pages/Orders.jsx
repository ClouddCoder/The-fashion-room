import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context/AuthContext";
import axios from "axios";

function Orders() {
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState();

  const loadOrders = async () => {
    const res = axios.post("http://localhost:3001/orders", { userId }).then((response) => {
      console.log(response.data);
    });
    const data = await res.data;
    setOrders(data);
    console.log(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return <div>Orders</div>;
}

export default Orders;
