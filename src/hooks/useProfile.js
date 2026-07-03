import { useState, useEffect, useCallback } from "react";
import { getUserProfile } from "../config/axios";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getUserProfile();

      // response = { success: true, data: {...} }
      setProfile(response?.data || null);
    } catch (err) {
      setError(err);
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    setProfile, // useful after updating profile
  };
};

export default useProfile;