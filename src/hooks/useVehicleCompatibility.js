import { useEffect, useState } from "react"
import { getVehicleCompatibility } from "../config/axios"
import { data } from "react-router-dom"


export const useVehicleCompatibility=(product)=>{
    const [vehiclecompat,setVehicleCompat]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)

useEffect(()=>{
    if(!product?.id) return;
    fetchVehicleCompatibility()
},[product?.id])

    const fetchVehicleCompatibility=async()=>{
        try {
            if(!product?.id) return;
            setLoading(true)
            setError(null)
            const res=await getVehicleCompatibility(product?.id)
           
            setVehicleCompat(res||[])
        } catch (error) {
            setError(error)
        }
        finally{
            setLoading(false)
        }
    }
   

    return {
        vehiclecompat,
        loading,
        error,
        refetch:fetchVehicleCompatibility
    }
}