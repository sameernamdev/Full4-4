import { Search } from "lucide-react";
import { useCategories } from "../hooks/useCatgories";


export default function Categories() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;

  if (error) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">Something went wrong.</div>;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-600/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-red-600/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-3xl mx-auto text-center">

            <span className="inline-flex items-center rounded-full border border-red-600 px-5 py-2 text-sm font-semibold tracking-widest text-red-600 uppercase">
              Drive Ranger
            </span>

            <h1 className="mt-6 text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Explore Our <span className="text-red-600">Categories</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Browse premium accessories and off-road equipment carefully organized into categories to help you find exactly what your vehicle needs.
            </p>

            <div className="relative mt-10 max-w-xl mx-auto">

              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

              <input type="text" placeholder="Search categories..." className="w-full rounded-full border border-gray-200 bg-white py-4 pl-14 pr-6 text-lg outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-100 shadow-lg" />

            </div>

          </div>

        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">

  <div className="flex items-center justify-between mb-12">

    <div>
      <p className="text-red-600 font-semibold tracking-[0.2em] uppercase">Browse</p>
      <h2 className="text-4xl font-black text-gray-900 mt-2">All Categories</h2>
    </div>

    <div className="hidden md:block text-gray-500">
      {categories.data?.length || 0} Categories
    </div>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {categories.data?.map((category) => (

      <div
        key={category.id}
        className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      >

        <div className="overflow-hidden">

          <img
            src={category.image_url}
            alt={category.name}
            className="h-80 w-full object-cover duration-700 group-hover:scale-110"
          />

        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6">

          <div className="flex items-center justify-between">

            <h3 className="text-white text-2xl font-bold leading-tight">
              {category.name}
            </h3>

            <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>

            </div>

          </div>

        </div>

      </div>

    ))}

  </div>

</section>
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

<section className="relative overflow-hidden bg-gray-950 py-24 mt-24">

  <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"></div>

  <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6 text-center">

    <span className="inline-block rounded-full border border-red-500 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
      Drive Ranger
    </span>

    <h2 className="mt-6 text-4xl md:text-6xl font-black text-white leading-tight">
      Ready To Upgrade
      <span className="block text-red-500">
        Your Vehicle?
      </span>
    </h2>

    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 leading-8">
      Discover premium accessories and off-road equipment built for every journey. Find the perfect products for your vehicle today.
    </p>

    <Link
      to="/products"
      className="inline-flex items-center gap-3 mt-10 rounded-full bg-red-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:scale-105"
    >
      Explore Products
      <ArrowRight size={20} />
    </Link>

  </div>

</section>
    </>
  );
}