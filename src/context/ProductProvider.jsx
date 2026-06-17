import React, { createContext, useContext, useState } from 'react'


const ProductContext = createContext()
export default function ProductProvider({children}) {
    const [products, setProducts]= useState([])
    const [select, setSelect] = useState(null)
    const handleSelect = (id)=>{
        setSelect(id)
    }

    console.log(select);
    
  return (
    <ProductContext.Provider value={{select, handleSelect, products, setProducts}}>{children}</ProductContext.Provider>
  )
}


export const useProduct = ()=>{
    const context = useContext(ProductContext)
    if(!context) {
        throw new Error("Error")
        return
    }

return context
}
