// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
// import { useOrders } from "../hooks/useOrders";

// export default function MyOrdersPage() {
//   const { orders, loading, error } = useOrders();

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return <Clock className="text-yellow-500" size={20} />;
//       case "confirmed":
//       case "processing": return <Truck className="text-blue-500" size={20} />;
//       case "shipped": return <Truck className="text-purple-500" size={20} />;
//       case "delivered": return <CheckCircle className="text-green-500" size={20} />;
//       case "cancelled": return <XCircle className="text-red-500" size={20} />;
//       default: return <Package className="text-gray-400" size={20} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return "bg-yellow-500/20 text-yellow-500";
//       case "confirmed":
//       case "processing": return "bg-blue-500/20 text-blue-500";
//       case "shipped": return "bg-purple-500/20 text-purple-500";
//       case "delivered": return "bg-green-500/20 text-green-500";
//       case "cancelled": return "bg-red-500/20 text-red-500";
//       default: return "bg-gray-500/20 text-gray-400";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
//         <div className="text-white">Loading orders...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
//         <div className="text-center">
//           <Package size={64} className="text-white/20 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-white">Error Loading Orders</h2>
//           <p className="text-gray-400 mt-2">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
//         <div className="text-center">
//           <Package size={64} className="text-white/20 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-white">No Orders Yet</h2>
//           <p className="text-gray-400 mt-2">Start shopping to place your first order</p>
//           <Link
//             to="/products"
//             className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-24 min-h-screen bg-gray-50 py-10">
//     {/* <div className="pt-24 min-h-screen bg-[#080808] py-10"> */}
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold text-black">My Orders</h1>
//           <Link
//             to="/products"
//             className="text-sm text-red-500 hover:text-red-400 transition"
//           >
//             Continue Shopping
//           </Link>
//         </div>

//         <div className="space-y-4">
//           {orders.map((order) => (
//             <motion.div
//               key={order.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               // className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition"
//               className="bg-black rounded-xl p-6 border border-white/10 hover:border-white/20 transition"
//             >
//               <div className="flex flex-wrap items-start justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="text-white font-semibold">Order #{order.id}</span>
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
//                       {order.order_status || "Pending"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-400">
//                     {new Date(order.order_date).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     Total: ₹{Number(order.total_amount || 0).toFixed(2)}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     Payment: {order.payment_status || "Pending"}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Link
//                     to={`/orders/${order.id}`}
//                     className="flex items-center gap-1 text-red-500 hover:text-red-400 transition text-sm font-medium"
//                   >
//                     View Details
//                     <ChevronRight size={16} />
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }















import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";
import { useOrders } from "../hooks/useOrders";

export default function MyOrdersPage() {
  const { orders, loading, error,pagination,refetch } = useOrders();

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="text-yellow-600" size={18} />;

      case "confirmed":
      case "processing":
        return <Truck className="text-blue-600" size={18} />;

      case "shipped":
        return <Truck className="text-purple-600" size={18} />;

      case "delivered":
        return <CheckCircle className="text-green-600" size={18} />;

      case "cancelled":
        return <XCircle className="text-red-600" size={18} />;

      default:
        return <Package className="text-gray-500" size={18} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-5">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>

          <p className="text-lg font-medium text-gray-700">
            Loading Orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-center max-w-md w-full">

          <Package
            size={70}
            className="mx-auto mb-6 text-red-600 bg-red-100 p-4 rounded-full"
          />

          <h2 className="text-2xl font-bold text-gray-900">
            Error Loading Orders
          </h2>

          <p className="text-gray-600 mt-3">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-center max-w-md w-full">

          <Package
            size={70}
            className="mx-auto mb-6 text-red-600 bg-red-100 p-4 rounded-full"
          />

          <h2 className="text-2xl font-bold text-gray-900">
            No Orders Yet
          </h2>

          <p className="text-gray-600 mt-3">
            Start shopping to place your first order.
          </p>

          <Link
            to="/products"
            className="inline-flex mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Browse Products
          </Link>

        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Track and manage your orders
            </p>
          </div>

          <Link
            to="/products"
            className="text-red-600 font-semibold hover:text-red-700 transition"
          >
            Continue Shopping
          </Link>

        </div>

        <div className="space-y-5">
                  {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-5 sm:p-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  {/* Left */}
                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3 mb-4">

                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Order #{order.id}
                      </h2>

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.order_status
                        )}`}
                      >
                        {getStatusIcon(order.order_status)}
                        {order.order_status || "Pending"}
                      </span>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">

                      <div>
                        <p className="text-gray-500 mb-1">
                          Order Date
                        </p>

                        <p className="font-medium text-gray-900">
                          {new Date(order.order_date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">
                          Total Amount
                        </p>

                        <p className="font-semibold text-red-600 text-base">
                          ₹{Number(order.total_amount || 0).toFixed(2)}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 mb-1">
                          Payment Status
                        </p>

                        <p className="font-medium text-gray-900 capitalize">
                          {order.payment_status || "Pending"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="flex items-center justify-end">

                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      View Details

                      <ChevronRight size={18} />

                    </Link>

                  </div>

                </div>

              </div>
            </motion.div>
          ))}
          </div>


          {pagination.totalPages > 1 && (
  <div className="flex items-center justify-center gap-3 mt-10">
    <button
      disabled={pagination.page === 1}
      onClick={() => refetch(pagination.page - 1)}
      className="px-4 py-2 rounded-lg border disabled:opacity-50 bg-brand-red text-white"
    >
      Previous
    </button>

    <div className="flex items-center gap-2">
  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
    .filter((page) => {
      return (
        page === 1 ||
        page === pagination.totalPages ||
        Math.abs(page - pagination.page) <= 1
      );
    })
    .map((page, index, arr) => (
      <div key={page} className="flex items-center gap-2">
        {index > 0 && arr[index - 1] !== page - 1 && (
          <span className="px-2 text-gray-500">...</span>
        )}

        <button
          onClick={() => refetch(page)}
          className={`h-10 w-10 rounded-lg border transition ${
            pagination.page === page
              ? "bg-red-600 text-white border-red-600"
              : "bg-white hover:bg-red-50 border-gray-300"
          }`}
        >
          {page}
        </button>
      </div>
    ))}
</div>

    <button
      disabled={pagination.page === pagination.totalPages}
      onClick={() => refetch(pagination.page + 1)}
      className="px-4 py-2 rounded-lg border disabled:opacity-50 bg-brand-red text-white"
    >
      Next
    </button>
  </div>
)}
        </div>

      

    </section>
  );
}