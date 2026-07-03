// import { useEffect, useState } from "react";
// import { getallproducts } from "../config/axios";

// export const useProducts = (params  ={}) => {
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getallproducts(params);
//         console.log(data);
//         setProducts(data?.data||{});
//         setPagination(data?.pagination||{})
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [params.page,params.limit,params.brand_id, params.category_id, params.subcategory_id, params.search,params.sort]);

//   return { products, pagination, loading, error };
// };




// import { useEffect, useState } from "react";
// import { getallproducts } from "../config/axios";

// export const useProducts = (params = {}) => {
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);            // Show loader on every fetch
//       try {
//         const data = await getallproducts(params);
//         setProducts(data?.data || []);
//         setPagination(data?.pagination || {});
//         setError(null);
//       } catch (err) {
//         setError(err);
//         setProducts([]);           // Clear products on error
//         setPagination({});
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [JSON.stringify(params)]);    // Re‑run when ANY param changes

//   return { products, pagination, loading, error };
// };






import { useEffect, useState } from "react";
import { getallproducts, getProductId } from "../config/axios";

export const useProducts = (params = {}, productId = null) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =======================
  // Get All Products
  // =======================
  useEffect(() => {
    const fetchProducts = async () => {
      // Agar productId diya hai to list fetch mat karo
      if (productId) return;

      setLoading(true);

      try {
        const data = await getallproducts(params);

        setProducts(data?.data || []);
        setPagination(data?.pagination || {});
        setError(null);
      } catch (err) {
        setError(err);
        setProducts([]);
        setPagination({});
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(params), productId]);

  // =======================
  // Get Product By ID
  // =======================
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setLoading(true);

      try {
        const data = await getProductId(productId);

        setProduct(data || null);
        setError(null);
      } catch (err) {
        setError(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return {
    products,
    product,
    pagination,
    loading,
    error,
  };
};