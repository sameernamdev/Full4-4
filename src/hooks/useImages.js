import { useEffect, useState } from "react";
import { getProductImages } from "../config/axios";

export const useImages = (productId) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getProductImages(productId);
      setImages(data || []);
      console.log(data)
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [productId]);

  return { images, loading, error, refetch: fetchImages };
};

export default useImages;