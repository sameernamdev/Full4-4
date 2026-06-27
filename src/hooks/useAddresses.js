import { useState, useEffect } from "react";
import { getAddresses, createAddress as createAddressAPI, deleteAddressAPI } from "../config/axios";

export function useAddresses(initialFetch = true) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAddresses();
      console.log("📦 useAddresses fetch data:", data);
      setAddresses(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      setAddresses([]);
      setError(err.message || "Failed to fetch addresses");
      console.error("❌ Fetch addresses error:", err);
      return []; // Always return array
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (addressData) => {
    try {
      setLoading(true);
      setError(null);
      const newAddress = await createAddressAPI(addressData);
      if (newAddress) {
        // After creation, refetch to get the updated list
        await fetchAddresses();
        return newAddress;
      }
    } catch (err) {
      setError(err.message || "Failed to create address");
      throw err;
    } finally {
      setLoading(false);
    }
  };

   const deleteAddress = async (addressId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteAddressAPI(addressId);
      // After deletion, refresh the list
      await fetchAddresses();
    } catch (err) {
      setError(err.message || "Failed to delete address");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetch) {
      fetchAddresses();
    }
  }, [initialFetch]);

  return { addresses, loading, error, fetchAddresses, createAddress, deleteAddress };
}