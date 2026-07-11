import { useEffect, useState } from "react";
import { getallvehiclemodels } from "../config/axios";

export const useModels = (makeId) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVehicleModels = async () => {
    if (!makeId) {
      setModels([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getallvehiclemodels(makeId);
      setModels(data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch models");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleModels();
  }, [makeId]);

  return {
    models,
    loading,
    error,
    refetch: fetchVehicleModels,
  };
};