import { useCallback, useEffect, useState } from "react";
import { getMyWarranties, claimWarranty } from "../config/axios";

export const useWarranty = () => {
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimLoading, setClaimLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWarranties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getMyWarranties();

      if (res.success) {
        setWarranties(res.data || []);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitClaim = async (orderItemId, claimQuantity = 1) => {
    try {
      setClaimLoading(true);

      const res = await claimWarranty(orderItemId, claimQuantity);

      if (res.success) {
        await fetchWarranties(); // Refresh warranties after claim
      }

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setClaimLoading(false);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, [fetchWarranties]);

  return {
    warranties,
    loading,
    claimLoading,
    error,
    refetch: fetchWarranties,
    submitClaim,
  };
};