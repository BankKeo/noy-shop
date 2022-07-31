import { useState, useEffect } from "react";
import axios from "axios";

function SupplierAPI() {
  const [suppliers, setSuppliers] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getSupplier = async () => {
      const res = await axios.get("/api/supplier");
      setSuppliers(res.data);
    };

    getSupplier();
  }, [callback]);
  return {
    suppliers: [suppliers, setSuppliers],
    callback: [callback, setCallback],
  };
}

export default SupplierAPI;
