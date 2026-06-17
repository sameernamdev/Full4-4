import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import BrandsPage from '../pages/BrandsPage'
import ContactPage from '../pages/ContactPage'
import AboutPage from '../pages/AboutPage'
import ProductsDetails from '../pages/ProductDetailsPage'

function AppRoutes() {
  return (
    <>

       <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="products" element={<ProductsPage/>}/>
        <Route path="brands" element={<BrandsPage/>}/>
        <Route path="contact" element={<ContactPage/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="products/:id" element={<ProductsDetails/>}/>
        </Routes> 
    
    </>
  )
}

export default AppRoutes