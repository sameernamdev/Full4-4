import axios from "axios";

export const api=axios.create({
    baseURL:"https://ecom-drive-range.onrender.com/api",
    withCredentials:true


})


export const getallproducts=async()=>{
    try {
        const res=await api.get("/products/get_all_products")
        console.log(res);
        
        return res.data?.data;
    } catch (error) {
        console.log(error);
        
    }
}



export const getallcategories=async()=>{
    try {
        const res=await api.get("/categories/get_all_categories")
       
        
        return res.data?.data;
    } catch (error) {
        console.log(error);
        
    }
}


export const getallbrands=async()=>{
    try {

        const res=await api.get("/brands/get_all_brands")
        return res.data?.data
    } catch (error) {
        console.log(error)
    }
}
