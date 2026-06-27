import { useEffect, useState } from "react"
import { getVehicleCompatibility } from "../config/axios"
import { data } from "react-router-dom"


export const useVehicleCompatibility=(productId)=>{
    const [vehiclecompat,setVehicleCompat]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)



    const fetchVehicleCompatibility=async()=>{
        try {
            setLoading(true)
            setError(null)
            const res=await getVehicleCompatibility(productId)
           
            setVehicleCompat(res||[])
        } catch (error) {
            setError(error)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchVehicleCompatibility()
    },[productId])

    return {
        vehiclecompat,
        loading,
        error,
        refetch:fetchVehicleCompatibility
    }
}