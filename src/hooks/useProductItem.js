import { useEffect, useState } from "react"
import {  getallproducts } from "../config/axios";

export const useProducts=()=>{
    const [products,setProducts]=useState([])

    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{

    const fetchProducts=async()=>{
        try {
            const data=await getallproducts()
            console.log(data)
            setProducts(data)
        } catch (error) {
            setError(error)
        }
        finally{
            setError(false)
            setLoading(false)
        }
    }

    fetchProducts()
  },[])

  return{products,loading,error}
}
