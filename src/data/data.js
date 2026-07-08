// export const NAV_LINKS = [
//   { label: "Home",     page: "" },
//   { label: "Products", page: "products", sub: ["Engine Parts","Suspension","Brakes","Electrical","Body Parts","Wheels & Tyres"] },
//   { label: "Brands",   page: "brands" },
//   { label: "About Us", page: "about" },
//   { label: "Contact",  page: "contact" },
  
// ];

export const PRODUCTS = [
  { id:1, name:"Performance Brake Pads",    brand:"Brembo",   category:"Brakes",        price:4299,  oldPrice:5999,  rating:4.8, reviews:234, badge:"Best Seller", compatible:"Universal Fit",
    img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80" },
  { id:2, name:"Turbocharged Air Filter",   brand:"K&N",      category:"Engine Parts",  price:2799,  oldPrice:3500,  rating:4.7, reviews:189, badge:"Hot Deal",    compatible:"Multi-fit",
    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" },
  { id:3, name:'Alloy Sport Wheels 17"',    brand:"OZ Racing",category:"Wheels & Tyres",price:12999, oldPrice:16000, rating:4.9, reviews:312, badge:"Premium",     compatible:"5x114.3",
    img:"https://images.unsplash.com/photo-1600706432502-77a0e2e32790?w=500&q=80" },
  { id:4, name:"LED Headlight Kit",         brand:"Philips",  category:"Electrical",    price:3499,  oldPrice:4200,  rating:4.6, reviews:156, badge:"New",          compatible:"H4 / H7",
    img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=500&q=80" },
  { id:5, name:"Coilover Suspension Kit",   brand:"KW",       category:"Suspension",    price:28999, oldPrice:35000, rating:4.9, reviews:87,  badge:"Pro Choice",  compatible:"Check fitment",
    img:"https://images.unsplash.com/photo-1547060122-35b69ef18c2a?w=500&q=80" },
  { id:6, name:"Carbon Fibre Hood",         brand:"Seibon",   category:"Body Parts",    price:18500, oldPrice:22000, rating:4.5, reviews:43,  badge:"Exclusive",   compatible:"Model Specific",
    img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80" },
  { id:7, name:"High Flow Fuel Injectors",  brand:"Delphi",   category:"Engine Parts",  price:7200,  oldPrice:9000,  rating:4.7, reviews:98,  badge:"OEM Grade",   compatible:"Universal",
    img:"https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80" },
  { id:8, name:"Sport Exhaust System",      brand:"Borla",    category:"Engine Parts",  price:22000, oldPrice:27500, rating:4.8, reviews:67,  badge:"Top Rated",   compatible:"Model Specific",
    img:"https://images.unsplash.com/photo-1617654112368-307921291f42?w=500&q=80" },
];

export const BRANDS = [
  { name:"Brembo",   origin:"Italy",       specialty:"Braking Systems",   color:"#E31E24" },
  { name:"Bosch",    origin:"Germany",     specialty:"Electrical & Fuel",  color:"#009BDE" },
  { name:"KW",       origin:"Germany",     specialty:"Suspension",         color:"#1A1A1A" },
  { name:"K&N",      origin:"USA",         specialty:"Air Intake",         color:"#D4A017" },
  { name:"Bilstein", origin:"Germany",     specialty:"Shock Absorbers",    color:"#FFD700" },
  { name:"Philips",  origin:"Netherlands", specialty:"Lighting",           color:"#0066A1" },
  { name:"NGK",      origin:"Japan",       specialty:"Spark Plugs",        color:"#E31E24" },
  { name:"OZ Racing",origin:"Italy",       specialty:"Wheels",             color:"#C0C0C0" },
];

export const CATEGORIES = [
  { name:"Engine Parts",  img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80", count:234, desc:"Pistons, crankshafts, camshafts & more" },
  { name:"Brake Systems", img:"https://images.unsplash.com/photo-1547060122-35b69ef18c2a?w=600&q=80",   count:189, desc:"Pads, rotors, calipers, lines" },
  { name:"Wheels & Tyres",img:"https://images.unsplash.com/photo-1600706432502-77a0e2e32790?w=600&q=80", count:445, desc:"Alloys, steel rims, performance tyres" },
  { name:"Suspension",    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",   count:156, desc:"Coilovers, shocks, control arms" },
  { name:"Electrical",    img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", count:312, desc:"Alternators, sensors, wiring" },
  { name:"Body Parts",    img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", count:98,  desc:"Bumpers, hoods, fenders, doors" },
];

export const STATS = [
  { value:15000, suffix:"+",  label:"Parts in Stock" },
  { value:20,   suffix:"+",  label:"Trusted Brands" },
  { value:16000, suffix:"+",  label:"Happy Customers" },
  { value:9,    suffix:"Yr", label:"Experience" },
];

export const TESTIMONIALS = [
  { name:"Rajesh Kumar", city:"Mumbai",    car:"Honda City 2020",   rating:5, text:"Got my Brembo brake pads within 2 days. Fitment was perfect and quality is outstanding. Drive Ranger is my go-to for all car parts!" },
  { name:"Priya Sharma", city:"Delhi",     car:"Volkswagen Polo",   rating:5, text:"The KW coilovers transformed my car completely. Customer support helped me verify fitment before purchase. Highly recommend!" },
  { name:"Arjun Mehta",  city:"Bangalore", car:"Hyundai i20 N",     rating:5, text:"Best prices for genuine parts online. The OZ Racing wheels arrived perfectly packed. Installation was smooth. 10/10!" },
];

export const TICKER_ITEMS = [
  "🔴 FREE SHIPPING on orders above ₹5,000",
  "⚡ Genuine Parts Guaranteed",
  "🏆 ISO 9001 Certified Supplier",
  "🚚 Pan India Delivery in 2-5 Days",
  "🔧 Expert Technical Support",
  "💳 EMI Available on Orders above ₹10,000",
  "🎯 50,000+ Parts Available",
  "✅ 1 Year Warranty on All Parts",
];

export const BRAND_NAMES = [
  "BREMBO","BOSCH","KW SUSPENSION","K&N","BILSTEIN","PHILIPS",
  "NGK","OZ RACING","DELPHI","BORLA","SEIBON","DENSO","VALEO","TRW",
];

export const BRAND_PHOTOS = [
  "https://images.unsplash.com/photo-1617654112368-307921291f42?w=400&q=75",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=75",
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&q=75",
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&q=75",
];