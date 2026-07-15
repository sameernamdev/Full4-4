import { useState, useEffect } from "react";
import { getOrders } from "../config/axios";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchOrders = async (page = pagination.page || 1) => {
  try {
    setLoading(true);
    setError(null);

    const data = await getOrders(page, pagination.limit || 10);

    setOrders(data.data || []);
    setPagination(data.pagination || {});
  } catch (err) {
    setError(err.message || "Failed to fetch orders");
    setOrders([]);
    setPagination({});  
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error,pagination, refetch: fetchOrders };
}