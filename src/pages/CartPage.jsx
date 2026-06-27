// pages/CartPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingCart, ArrowLeft, CreditCard, Ticket, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCoupons } from "../hooks/useCoupons";
import { applycoupon } from "../config/axios";
import InlineCheckoutForm from "../components/InlineCheckoutForm";

export default function CartPage() {
  const { cart, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, fetchCart, loading } =
    useCart();
  const { isAuthenticated } = useAuth();
  const { coupons } = useCoupons();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0); // always a number
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const handleRemove = (itemId) => {
    alert("are you sure");
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    if (cart.length === 0) return;
    setShowCheckout(true);
  };

  // Apply coupon – parse discount as number
  const handleApplyCoupon = async () => {
    const code = couponCode.trim();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setCouponError("");
    setCouponSuccess("");
    setCouponLoading(true);

    try {
      const response = await applycoupon({
        coupon_code: code,
        order_subtotal: totalPrice,
      });

      if (response.success) {
        const discount = Number(response.discount) || Number(response.discount_amount) || 0;
        setDiscountAmount(discount);
        setAppliedCoupon({ code: response.code || code, discount });
        setCouponSuccess(response.message || `Coupon applied! You saved ₹${discount}`);
        setCouponError("");
      } else {
        setCouponError(response.message || "Invalid coupon");
        setDiscountAmount(0);
        setAppliedCoupon(null);
      }
    } catch (err) {
      console.error("Coupon error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || err.message || "Failed to apply coupon";
      setCouponError(errorMsg);
      setDiscountAmount(0);
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
    setAppliedCoupon(null);
    setCouponSuccess("");
    setCouponError("");
  };

  const finalTotal = totalPrice - discountAmount;

  // Cart empty check
  if (!cart || cart.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={64} className="text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
          <p className="text-gray-400 mt-2">Start shopping to add items</p>
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
    <div className="pt-24 min-h-screen bg-[#080808] py-10 ">
      <div className="max-w-7xl mx-auto px-4  ">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/products"
            className="text-white/60 hover:text-white transition flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const productName = item.product?.name || item.product_name || "Product";
              const variation = item.variation_value || "";
              const price = Number(item.current_price || item.price || 0);
              const image = item.product?.primary_image || item.primary_image || null;
              const itemId = item.product_item_id || item.id;

              return (
                <motion.div
                  key={itemId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={image || "https://placehold.co/100x100?text=No+Image"}
                    alt={productName}
                    className="w-24 h-24 object-cover rounded-lg bg-white/5"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{productName}</h3>
                    {variation && <p className="text-gray-400 text-sm">Variation: {variation}</p>}
                    <p className="text-red-500 font-bold mt-1">₹{price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(itemId, item.quantity)}
                      className="p-1 bg-white/10 rounded-lg hover:bg-white/20 transition"
                    >
                      <Minus size={16} className="text-white" />
                    </button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(itemId, item.quantity)}
                      className="p-1 bg-white/10 rounded-lg hover:bg-white/20 transition"
                    >
                      <Plus size={16} className="text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(itemId)}
                    className="text-red-500 hover:text-red-400 transition p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary / Checkout Inline */}
          <div className="bg-white/5 rounded-xl p-6 border border-red-500 h-fit sticky top-28 ">
            {!showCheckout ? (
              // -------- SUMMARY VIEW --------
              <>
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>

                  {/* Coupon Section */}
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Ticket size={16} className="text-white/40" />
                      <span className="text-sm text-gray-400">Coupon</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-red-500 transition"
                        disabled={!!appliedCoupon || couponLoading}
                      />
                      {!appliedCoupon ? (
                        <button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
                        >
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      ) : (
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-red-500 hover:text-red-400 transition p-1"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                    {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                    {couponSuccess && <p className="text-green-500 text-xs mt-1">{couponSuccess}</p>}
                    {appliedCoupon && (
                      <p className="text-green-400 text-xs mt-1">
                        Coupon {appliedCoupon.code} applied – ₹{appliedCoupon.discount} off
                      </p>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-400 border-t border-white/10 pt-2 mt-2">
                      <span>Discount</span>
                      <span>- ₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </button>
                {!isAuthenticated && (
                  <p className="text-yellow-500 text-sm text-center mt-3">
                    Please login to checkout
                  </p>
                )}
              </>
            ) : (
              // -------- CHECKOUT FORM (inline) --------
              <InlineCheckoutForm
                onBack={() => setShowCheckout(false)}
                onOrderPlaced={() => {
                  setShowCheckout(false);
                  fetchCart();
                  handleRemoveCoupon();
                }}
                couponDiscount={discountAmount}   // already a number
                couponCode={appliedCoupon?.code || null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}