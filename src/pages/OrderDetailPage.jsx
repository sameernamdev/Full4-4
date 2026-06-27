import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, MapPin, CreditCard } from "lucide-react";
import { useOrderDetails } from "../hooks/useOrderDetails";
import { useAuth } from "../context/AuthContext";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { order, loading, error } = useOrderDetails(id);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return <Clock className="text-yellow-500" size={24} />;
      case "confirmed":
      case "processing": return <Truck className="text-blue-500" size={24} />;
      case "shipped": return <Truck className="text-purple-500" size={24} />;
      case "delivered": return <CheckCircle className="text-green-500" size={24} />;
      case "cancelled": return <XCircle className="text-red-500" size={24} />;
      default: return <Package className="text-gray-400" size={24} />;
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
        <div className="text-white">Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Order Not Found</h2>
          <p className="text-gray-400 mt-2">{error || "The order you're looking for doesn't exist."}</p>
          <Link
            to="/orders"
            className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = parseFloat(order.subtotal) || 0;
  const shipping = parseFloat(order.shipping_cost) || 0;
  const tax = parseFloat(order.tax_amount) || 0;
  const discount = parseFloat(order.discount_amount) || 0;
  const total = parseFloat(order.total_amount) || 0;

  return (
    <div className="pt-24 min-h-screen bg-[#080808] py-10">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Order #{order.id}</h1>
            <p className="text-gray-400 mt-1">
              Placed on {new Date(order.order_date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.order_status)}`}>
            {order.order_status || "Pending"}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
              <Package size={18} />
              <span>Order Status</span>
            </div>
            <div className="flex items-center gap-2 text-white font-semibold">
              {getStatusIcon(order.order_status)}
              {order.order_status || "Pending"}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
              <CreditCard size={18} />
              <span>Payment</span>
            </div>
            <div className="text-white font-semibold">{order.payment_method || "N/A"}</div>
            <div className="text-sm text-gray-400">{order.payment_status || "Pending"}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
              <Truck size={18} />
              <span>Total</span>
            </div>
            <div className="text-white font-bold text-xl">₹{total.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items?.map((item) => {
              let productName = item.product_name || "Product";
              let sku = item.sku || "";
              let unitPrice = parseFloat(item.unit_price) || 0;
              if (item.product_data_snapshot) {
                try {
                  const snapshot = typeof item.product_data_snapshot === "string"
                    ? JSON.parse(item.product_data_snapshot)
                    : item.product_data_snapshot;
                  productName = snapshot.product_name || productName;
                  sku = snapshot.sku || sku;
                } catch (e) {}
              }
              return (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white font-medium">{productName}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    {sku && <p className="text-xs text-gray-500">SKU: {sku}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₹{(unitPrice * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-400">₹{unitPrice.toFixed(2)} each</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {shipping > 0 && (
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
            )}
            {tax > 0 && (
              <div className="flex justify-between text-sm text-gray-400">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-500">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {order.shipping_address && (
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
              <MapPin size={18} />
              <span>Shipping Address</span>
            </div>
            <div className="text-white">
              <p>{order.shipping_address.full_name || "N/A"}</p>
              <p>{order.shipping_address.line1 || ""}</p>
              {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
              <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
              <p>{order.shipping_address.country}</p>
              <p>Phone: {order.shipping_address.phone || "N/A"}</p>
            </div>
          </div>
        )}

        {order.customer_notes && (
          <div className="mt-6 bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-2">Order Notes</h3>
            <p className="text-gray-400">{order.customer_notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}