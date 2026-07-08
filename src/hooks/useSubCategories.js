import { useEffect, useState } from "react";
import { getallSubcategories } from "../config/axios";

export const useSubCategories = (params={}) => {
  const [sub, setSub] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchSubCategories = async () => {
  //     try {
  //       const data = await getallSubcategories(params);
  //       // console.log(data);
  //       setSub(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false); 
  //     }
  //   };

  //   fetchSubCategories();
  // }, []);


  useEffect(() => {
  const fetchSubCategories = async () => {
    setLoading(true);

    try {
      const data = await getallSubcategories(params);
      setSub(data || []);
      setError(null);
    } catch (err) {
      setError(err);
      setSub([]);
    } finally {
      setLoading(false);
    }
  };

  fetchSubCategories();
}, [JSON.stringify(params)]);

  return { sub, loading, error };
};