import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { useOrders } from "../hooks/useOrders";

export default function MyOrdersPage() {
  const { orders, loading, error } = useOrders();

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return <Clock className="text-yellow-500" size={20} />;
      case "confirmed":
      case "processing": return <Truck className="text-blue-500" size={20} />;
      case "shipped": return <Truck className="text-purple-500" size={20} />;
      case "delivered": return <CheckCircle className="text-green-500" size={20} />;
      case "cancelled": return <XCircle className="text-red-500" size={20} />;
      default: return <Package className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-500/20 text-yellow-500";
      case "confirmed":
      case "processing": return "bg-blue-500/20 text-blue-500";
      case "shipped": return "bg-purple-500/20 text-purple-500";
      case "delivered": return "bg-green-500/20 text-green-500";
      case "cancelled": return "bg-red-500/20 text-red-500";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-white">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Error Loading Orders</h2>
          <p className="text-gray-400 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">No Orders Yet</h2>
          <p className="text-gray-400 mt-2">Start shopping to place your first order</p>
          <Link
            to="/products"
            className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#080808] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
          <Link
            to="/products"
            className="text-sm text-red-500 hover:text-red-400 transition"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-semibold">Order #{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                      {order.order_status || "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(order.order_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-400">
                    Total: ₹{Number(order.total_amount || 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Payment: {order.payment_status || "Pending"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={`/orders/${order.id}`}
                    className="flex items-center gap-1 text-red-500 hover:text-red-400 transition text-sm font-medium"
                  >
                    View Details
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}