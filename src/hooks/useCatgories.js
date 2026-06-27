import { useEffect, useState } from "react";
import { getallcategories } from "../config/axios";

export const useCategories = (params={}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getallcategories(params);
        console.log(data);
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); // ✅ Missing tha
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};