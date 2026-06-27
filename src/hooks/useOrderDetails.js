import { useState, useEffect } from "react";
import { getOrderById } from "../config/axios";

export function useOrderDetails(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message || "Failed to fetch order details");
      console.error("Fetch order details error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return { order, loading, error, refetch: fetchOrder };
}