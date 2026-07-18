import { useEffect, useState } from "react";
import { getAllVehicleProducts } from "../config/axios";

export const useVehicleProducts = (params) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params.generation_id) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllVehicleProducts(params);

       setProducts(data.data || []);
setPagination(data.pagination || {});
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return {
    products,
    pagination,
    loading,
    error,
  };
};