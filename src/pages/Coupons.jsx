import { useCoupons } from "../hooks/useCoupons";
import { Calendar, Tag, Percent, Copy, Users, User } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Coupons() {
  const { coupons, loading, error } = useCoupons();

  const handleCopy = (code) => {
    if (!code) return;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success(`✅ Coupon copied!`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(() => {
        toast.error("Failed to copy. Please try again.");
      });
  };

  const formatDiscount = (coupon) => {
    if (coupon.discount_type === "percentage") {
      return `${coupon.discount_value}% off`;
    } else if (coupon.discount_type === "fixed") {
      return `${parseFloat(coupon.discount_value).toFixed(2)} off`;
    }
    return "Discount";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your coupons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load coupons.</p>
          <p className="text-gray-500 text-sm mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
          My <span className="text-brand-red">Coupons</span>
        </h1>
        <p className="text-gray-600 mb-10">
          Here are all the discounts available for you.
        </p>

        {coupons.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-lg">No coupons available at the moment.</p>
            <p className="text-gray-500">Check back soon for new offers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coupons.map((coupon) => (
              <div
                key={coupon.coupon_id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {coupon.code}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {coupon.description || "No description"}
                      </p>
                    </div>
                    <span className="bg-brand-red/10 text-brand-red text-sm font-semibold px-3 py-1 rounded-full">
                      {formatDiscount(coupon)}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    {coupon.min_order_amount && (
                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <span>Min. order: {parseFloat(coupon.min_order_amount).toFixed(2)}</span>
                      </div>
                    )}
                    {coupon.max_discount_amount && (
                      <div className="flex items-center gap-2">
                        <Percent size={16} />
                        <span>Max discount: {parseFloat(coupon.max_discount_amount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        Valid: {new Date(coupon.valid_from).toLocaleDateString()} – {new Date(coupon.valid_to).toLocaleDateString()}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>Used {coupon.times_used_globally} times globally</span>
                    </div> */}
                    {coupon.usage_limit_per_user && (
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>Limit per user: {coupon.usage_limit_per_user}</span>
                      </div>
                    )}
                    {/* {coupon.total_usage_limit && (
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>Total limit: {coupon.total_usage_limit}</span>
                      </div>
                    )} */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <User size={14} />
                      <span>You have used this {coupon.times_used_by_user} time(s)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="mt-5 w-full py-2.5 rounded-lg bg-brand-red text-white font-semibold hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Copy size={16} />
                    Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}