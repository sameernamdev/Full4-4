import { useEffect, useState } from "react"
import { getallcategories } from "../config/axios";

export const useCategories=()=>{
    const [categories,setCategories]=useState([])

    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{

    const fetchCategories=async()=>{
        try {
            const data=await getallcategories()
            console.log(data)
            setCategories(data)
        } catch (error) {
            setError(error)
        }
        finally{
            setError(false)
        }
    }

    fetchCategories()
  },[])

  return{categories,loading,error}
}
