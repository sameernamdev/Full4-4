import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useSubCategories } from "../hooks/useSubCategories";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { error, loading, products } = useProducts({ category_id: categoryId });
  const { sub, loading: subLoading, error: subError } = useSubCategories({ category_id: categoryId });

  const [selectedSubId, setSelectedSubId] = useState(null);

  const filteredProducts = selectedSubId
    ? products.filter((product) => product.sub_category_id === selectedSubId)
    : products;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">Error: {error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 pt-16 mt-28 ">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition duration-200"
        >
          <span className="transform group-hover:-translate-x-1 transition">←</span>
          Back to Categories
        </button>

        {/* Subcategories Section */}
        {subLoading ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 text-center border border-gray-100">
            <p className="text-gray-500">Loading subcategories...</p>
          </div>
        ) : subError ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 text-center border border-gray-100">
            <p className="text-red-500">Error loading subcategories</p>
          </div>
        ) : sub && sub.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-blue-600"></span> Sub Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSubId(null)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedSubId === null
                    ? "bg-red-600 text-white shadow-md shadow-blue-200/50 scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                All
              </button>
              {sub.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSubId(item.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedSubId === item.id
                      ? "bg-red-600 text-white shadow-md shadow-blue-200/50 scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 text-center border border-gray-100">
            <p className="text-gray-500">No subcategories available.</p>
          </div>
        )}

        {/* Products Count & Clear Filter */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products found
          </p>
          {selectedSubId !== null && (
            <button
              onClick={() => setSelectedSubId(null)}
              className="text-sm text-blue-600 hover:text-blue-800 transition"
            >
              Clear filter ✕
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">No products available in this category.</p>
            <p className="text-gray-400 text-sm mt-2">Try selecting a different subcategory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;