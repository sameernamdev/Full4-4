import { useEffect, useState } from "react";
import { getAllVehicleMakes } from "../config/axios";

export const useVehicleMakes = () => {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVehicleMakes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllVehicleMakes();
      setMakes(data || []);
    } catch (err) {
      console.error("Error fetching vehicle makes:", err);
      setError(err.response?.data?.message || "Failed to fetch vehicle makes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleMakes();
  }, []);

  return {
    makes,
    loading,
    error,
    refetch: fetchVehicleMakes,
  };
};