import { useEffect, useState } from "react";
import { getvehiclesGenerations } from "../config/axios";

export const useVehicleGenerations = (modelId) => {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGenerations = async () => {
    if (!modelId) {
      setGenerations([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getvehiclesGenerations(modelId);
      setGenerations(data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch generations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenerations();
  }, [modelId]);

  return {
    generations,
    loading,
    error,
    refetch: fetchGenerations,
  };
};