import { useEffect, useState } from "react";
import { getcoupons } from "../config/axios";

export const useCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);

        const response = await getcoupons();

        if (response?.success) {
          setCoupons(response.data || []);
        } else {
          setCoupons([]);
        }
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return {
    coupons,
    loading,
    error,
  };
};