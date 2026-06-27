import { useEffect, useState } from "react";
import {  getallvehiclemodels} from "../config/axios";

export const useModels = () => {
  const [model, setModel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVehiclesModels = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getallvehiclemodels();
      setModel(data || []);
    } catch (err) {
      console.error("Error fetching vehiclesmodels:", err);
      setError(err.response?.data?.message || "Failed to fetch vehiclemodels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiclesModels();
  }, []);

  return {
    model,
    loading,
    error,
    refetch: fetchVehiclesModels,
  };
};