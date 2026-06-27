// import { useEffect, useState } from "react"
// import { getallbrands} from "../config/axios";

// export const useBrands=()=>{
//     const [brands,setBrands]=useState([])

//     const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(()=>{

//     const fetchBrands=async()=>{
//         try {
//             const data=await getallbrands()
//             console.log(data)
//             setBrands(data)
//         } catch (error) {
//             setError(error)
//         }
//         finally{
//             setError(false)
//         }
//     }

//     fetchBrands()
//   },[])

//   return{brands,loading,error}
// }






import { useEffect, useState } from "react";
import { getallbrands, getbrandsById } from "../config/axios";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const data = await getallbrands();
      setBrands(data || []);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getBrandById = async (id) => {
    try {
      setLoading(true);
      const data = await getbrandsById(id);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    error,
    fetchBrands,
    getBrandById,
  };
};
