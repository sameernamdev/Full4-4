import { useEffect, useState } from "react"
import { getallbrands} from "../config/axios";

export const useBrands=()=>{
    const [brands,setBrands]=useState([])

    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{

    const fetchBrands=async()=>{
        try {
            const data=await getallbrands()
            console.log(data)
            setBrands(data)
        } catch (error) {
            setError(error)
        }
        finally{
            setError(false)
        }
    }

    fetchBrands()
  },[])

  return{brands,loading,error}
}
