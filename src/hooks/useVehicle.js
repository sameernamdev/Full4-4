import { useEffect, useState } from "react";
import {  getvehiclesGenerations } from "../config/axios";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getvehiclesGenerations();
      setVehicles(data || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError(err.response?.data?.message || "Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles,
    loading,
    error,
    refetch: fetchVehicles,
  };
};