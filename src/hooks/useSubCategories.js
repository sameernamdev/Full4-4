import { useEffect, useState } from "react";
import { getallSubcategories } from "../config/axios";

export const useSubCategories = (params={}) => {
  const [sub, setSub] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const data = await getallSubcategories(params);
        console.log(data);
        setSub(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchSubCategories();
  }, []);

  return { sub, loading, error };
};