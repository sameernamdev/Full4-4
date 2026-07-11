import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CarFront,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { useVehicleMakes } from "../hooks/useVehicleMakes";
import { useModels } from "../hooks/useModels";
import { useVehicleGenerations } from "../hooks/useVehicleGenerations";
import { useProducts } from "../hooks/useProducts";

import ProductCard from "../components/ProductCard";

export default function FindVehiclePage() {
  const [makeId, setMakeId] = useState("");
  const [modelId, setModelId] = useState("");
  const [generationId, setGenerationId] = useState("");

  const [params, setParams] = useState({
    page: 1,
    limit: 12,
  });

  const { makes, loading: makesLoading } = useVehicleMakes();

  const { models, loading: modelsLoading } =
    useModels(makeId);

  const { generations, loading: generationsLoading } =
    useVehicleGenerations(modelId);

  const {
    products,
    loading: loadingProducts,
  } = useProducts(params);

  const handleSearch = () => {
    if (!generationId) return;

    setParams((prev) => ({
      ...prev,
      generation_id: generationId,
      page: 1,
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}

      <section className="relative overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/find-vehicle-banner.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="inline-flex items-center bg-red-600 text-white rounded-full px-5 py-2 mb-6">

              <CarFront className="mr-2" size={18} />

              Drive Ranger Vehicle Finder

            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight max-w-4xl">

              Find Parts

              <span className="text-red-500">
                {" "}
                For Your Vehicle
              </span>

            </h1>

            <p className="text-gray-200 text-lg mt-6 max-w-2xl">

              Select your Make, Model and Generation to instantly
              discover accessories perfectly compatible with
              your vehicle.

            </p>

          </motion.div>

        </div>

      </section>

      {/* Search */}

      <section className="-mt-16 relative z-30 px-6">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-8"
        >

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold">

                Vehicle Selector

              </h2>

              <p className="text-gray-500 mt-1">

                Choose your vehicle to browse compatible
                products.

              </p>

            </div>

            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-red-600 text-white items-center justify-center">

              <CarFront size={30} />

            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

            {/* Make */}

            <div>

              <label className="block mb-2 text-sm font-semibold">

                Vehicle Make

              </label>

              <select
                value={makeId}
                onChange={(e) => {
                  setMakeId(e.target.value);
                  setModelId("");
                  setGenerationId("");
                }}
                className="w-full h-14 rounded-xl border border-gray-300 px-5"
              >

                <option value="">
                  {makesLoading ? "Loading..." : "Select Make"}
                </option>

                {makes.map((make) => (

                  <option
                    key={make.id}
                    value={make.id}
                  >
                    {make.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Model */}

            <div>

              <label className="block mb-2 text-sm font-semibold">

                Vehicle Model

              </label>

              <select
                value={modelId}
                disabled={!makeId}
                onChange={(e) => {
                  setModelId(e.target.value);
                  setGenerationId("");
                }}
                className="w-full h-14 rounded-xl border border-gray-300 px-5 disabled:bg-gray-100"
              >

                <option value="">
                  {modelsLoading
                    ? "Loading..."
                    : "Select Model"}
                </option>

                {models.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Generation */}

            <div>

              <label className="block mb-2 text-sm font-semibold">

                Generation

              </label>

              <select
                value={generationId}
                disabled={!modelId}
                onChange={(e) =>
                  setGenerationId(e.target.value)
                }
                className="w-full h-14 rounded-xl border border-gray-300 px-5 disabled:bg-gray-100"
              >

                <option value="">
                  {generationsLoading
                    ? "Loading..."
                    : "Select Generation"}
                </option>

                {generations.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Button */}

            <div className="flex items-end">

              <button
                onClick={handleSearch}
                disabled={!generationId}
                className="w-full h-14 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300"
              >

                <Search size={20} />

                Find Parts

              </button>

            </div>

          </div>

        </motion.div>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">

            Compatible Products

          </h2>

          {products.length > 0 && (

            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">

              {products.length} Products

            </span>

          )}

        </div>

        {loadingProducts ? (

          <div className="flex justify-center py-20">

            <Loader2
              className="animate-spin text-red-600"
              size={42}
            />

          </div>

        ) : products.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        ) : (          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm py-20 px-6 text-center">

            <CarFront
              size={60}
              className="mx-auto text-red-600 mb-5"
            />

            <h3 className="text-3xl font-bold text-gray-900">
              Find Compatible Products
            </h3>

            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Select your Vehicle Make, Model and Generation
              above, then click
              <span className="font-semibold text-red-600">
                {" "}Find Parts
              </span>
              {" "}to view products compatible with your vehicle.
            </p>

          </div>

        )}

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Perfect Fit",
              text: "Only compatible accessories are displayed for your selected vehicle.",
            },
            {
              title: "Premium Brands",
              text: "Browse trusted 4x4 aftermarket brands and genuine accessories.",
            },
            {
              title: "Fast Search",
              text: "Find the right products within seconds using your vehicle details.",
            },
          ].map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -8,
                transition: { duration: 0.25 },
              }}
              className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8"
            >

              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-6">

                <ChevronRight
                  className="text-red-600"
                  size={24}
                />

              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {item.text}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

    </div>
  );
}