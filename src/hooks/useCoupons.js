import { useEffect, useState } from "react"
import { getcoupons } from "../config/axios"

export const useCoupons=()=>{
    const [coupons,setCoupons]=useState([])
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        const fecthCoupons=async()=>{
            try {
                setLoading(true)
                const data=await getcoupons()
                setCoupons(data)
                console.log(data)
            }
            catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
        }
        fecthCoupons()
    },[])
    return{coupons,loading}
}