import { ChevronRight } from "lucide-react";
import { BRANDS } from "../data/data";
import { useReveal } from "../hooks/useReveal";
import { useBrands } from "../hooks/useBrands.js";
import { Link, useNavigate } from "react-router-dom";
import { useVehicles } from "../hooks/useVehicle.js";
import { useModels } from "../hooks/useModels.js";

export default function BrandsPage({ setPage }) {
  useReveal();

  const{model}=useModels()
  console.log(model)
  const{vehicles}=useVehicles()
  console.log(vehicles)

  const navigate=useNavigate()

  const{brands,loading,error}=useBrands()
  

   // Loading state
  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 font-body">Loading brands...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-body text-lg">Failed to load brands</p>
          <p className="text-white/40 text-sm mt-2">{error.message || "Please try again later."}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-brand-red text-white rounded-full hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="pt-24 min-h-screen bg-[#080808]">
      <div className="dark-panel relative py-20 bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="font-body text-brand-red text-xs tracking-[0.3em] uppercase mb-3">/ Our Partners</div>
          <h1 className="font-display text-6xl lg:text-8xl font-black text-white">TRUSTED <span className="text-gradient">BRANDS</span></h1>
          <p className="font-body text-white/55 mt-4 max-w-xl mx-auto">We carry parts from over 20+ world-class automotive brands, each vetted for quality and authenticity.</p>
        </div>
      </div>

      <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Featured brands */}
        <h2 className="font-display text-3xl font-black text-brand-ink mb-8 reveal">FEATURED BRANDS</h2>

          
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">  
          {brands.map((brand, i) => (
            <button key={brand.id} onClick={() => {
              // setPage('products')
              navigate(`/products?brandId=${brand.id}`)
              // navigate(`/products?brandId=${brand.id}&brand_name=${brand.name}`)
            }}
            // onClick={() => navigate(`/products?brandId=${brand.id}`)}
              className="reveal bg-gray-50 border border-white/10 rounded-2xl p-8 text-center group hover:border-brand-red/60  hover:shadow-xl hover:shadow-brand-red/15 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="w-32 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-display text-2xl font-black text-black group-hover:scale-110 transition-transform" style={{ background: `${brand.color}55` }}>
                
                {brand?.logo_url ? (  <img src={brand.logo_url} alt="" />): (  brand.name[0] )}

              </div>
              <h3 className="font-display text-xl font-black text-black mb-1 group-hover:text-brand-red transition-colors">{brand.name}</h3>
              {/* <div className="font-body text-xs text-white/50 mb-1">{brand.origin}</div> */}
              {/* <div className="font-body text-xs text-brand-red">{brand.specialty}</div> */}
              <div className="mt-4 font-body text-xs text-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
               <Link to="/products" > View Parts <ChevronRight size={12} /></Link>
              </div>
            </button>
          ))}
        </div>

      </div>
      </section>

      <section className="dark-panel bg-[#080808] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* All brands A-Z */}
        <h2 className="font-display text-3xl font-black text-white mb-8 reveal">ALL BRANDS A-Z</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 reveal">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['ACDelco','Aisin','ATE','Bando','Behr','Bilstein','Bosch','Brembo','Continental','Dayco','Denso','Delphi',
              'Exide','Febi','Gates','Hella','Herth+Buss','KW','K&N','Lemförder','LuK','Mann+Hummel',
              'Meyle','Monroe','NGK','OZ Racing','Philips','Sachs','SKF','TRW','Valeo','ZF'].map(b => (
              <button key={b} onClick={() => setPage('products')} className="text-left font-body text-white/50 hover:text-brand-red transition-colors text-sm py-1">
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
