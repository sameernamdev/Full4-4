// components/InlineCheckoutForm.jsx
import { useState, useEffect, useRef } from "react";
import {
  X,
  CreditCard,
  Truck,
  AlertCircle,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useAddresses } from "../hooks/useAddresses";
import { api, createOrder } from "../config/axios";
import Swal from "sweetalert2";

const openRazorpay = async (
  data,
  setSuccess,
  onOrderPlaced,
  setLoading,
  fetchCart,
  onBack,
  setError,
) => {
  console.log(data);

  console.log("Inside OpenRazoprPay");

  const options = {
    key: data.key, // or import.meta.env.VITE_RAZORPAY_KEY

    amount: data.amount,
    currency: data.currency,
    order_id: data.razorpayOrderId,

    name: "My Ecom",
    description: "Order Payment",

    handler: async function (response) {
      try {
        setLoading(true);
        console.log(response);
        const verify = await api.post("/orders/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        // if (verify.data.success) {
        //   alert("Payment Successful");
        // }

        if (verify.data.success) {
          setSuccess(true);
          await fetchCart();
          Swal.fire({
            title: "Order Placed!",
            text: "Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          if (onOrderPlaced) onOrderPlaced();
          setTimeout(() => onBack(), 2000);
        } else {
          const message = verify.data.message || "Payment verification failed.";

          setError(message);

          Swal.fire({
            title: "Payment Verification Failed",
            text: message,
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error);
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Payment verification failed";

        setError(message);

        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: message,
        });
      } finally {
        setLoading(false);
      }

      // else {
      //   alert("Payment Failed");
      // }
    },

    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  // addding this for any error occur
  rzp.on("payment.failed", function (response) {
    const message = response.error?.description || "Payment failed";

    setError(message);

    Swal.fire({
      icon: "error",
      title: "Payment Failed",
      text: message,
    });

    setLoading(false);
  });

  await rzp.open();
  // fetchCart();
};

export default function InlineCheckoutForm({
  onBack,
  onOrderPlaced,
  couponDiscount = 0, // discount amount
  couponCode = null, // coupon code
  taxAmount = 0,
  finalTotal = 0,
}) {
  const { isAuthenticated } = useAuth();
  const { cart, totalPrice, fetchCart } = useCart();
  const {
    addresses,
    loading: addressLoading,
    error: addressError,
    fetchAddresses,
    createAddress,
    deleteAddress,
  } = useAddresses(false);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchedRef = useRef(false);

  const [newAddress, setNewAddress] = useState({
    address_type: "shipping",
    full_name: "",
    phone: "",
    line1: "",
    line2: "",
    landmark: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  });

  // const [paymentMethod, setPaymentMethod] = useState("cash");

  const [notes, setNotes] = useState("");

  // Fetch addresses only once
  useEffect(() => {
    if (isAuthenticated && !fetchedRef.current) {
      fetchedRef.current = true;
      fetchAddresses()
        .then((data) => {
          if (data?.length) {
            const defaultAddr = data.find((addr) => addr.is_default);
            setSelectedAddressId(defaultAddr?.id || data[0].id);
          }
        })
        .catch((err) => console.warn("Address fetch failed:", err));
    }
  }, [isAuthenticated, fetchAddresses]);

  // Auto-select default when addresses change
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((addr) => addr.is_default);
      setSelectedAddressId(defaultAddr?.id || addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    setError("");
    if (!newAddress.full_name.trim()) {
      setError("Full name is required");
      return;
    }
    if (!newAddress.phone.trim() || !/^[0-9]{10}$/.test(newAddress.phone)) {
      setError("Valid 10-digit phone number is required");
      return;
    }
    if (!newAddress.line1.trim()) {
      setError("Address line 1 is required");
      return;
    }
    if (!newAddress.city.trim()) {
      setError("City is required");
      return;
    }
    if (!newAddress.state.trim()) {
      setError("State is required");
      return;
    }
    if (
      !newAddress.postal_code.trim() ||
      !/^[1-9][0-9]{5}$/.test(newAddress.postal_code)
    ) {
      setError("Valid 6-digit PIN code is required");
      return;
    }

    try {
      await createAddress(newAddress);
      setShowNewAddressForm(false);
      setNewAddress({
        address_type: "shipping",
        full_name: "",
        phone: "",
        line1: "",
        line2: "",
        landmark: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        is_default: false,
      });
      setError("");
    } catch (err) {
      setError(err.message || "Failed to create address");
    }
  };

  const handleRefresh = async () => {
    setError("");
    try {
      await fetchAddresses();
    } catch (err) {
      setError(err.message || "Failed to refresh addresses");
    }
  };

  const handleDeleteAddress = (addressId, fullName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the address for "${fullName}"?`,
      )
    ) {
      deleteAddress(addressId)
        .then(() => {
          if (selectedAddressId === addressId) {
            setSelectedAddressId(null);
          }
        })
        .catch((err) => {
          setError(err.message || "Failed to delete address");
        });
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedAddressId) {
      setError("Please select or add a shipping address");
      setLoading(false);
      return;
    }

    try {
      const orderPayload = {
        shipping_address_id: selectedAddressId,
        billing_address_id: selectedAddressId,
        customer_notes: notes,
        shipping_cost: 0,
        tax_amount: 0,
        discount_amount: couponDiscount,
        coupon_code: couponCode,
        currency_code: "INR",
        // payment_method: paymentMethod,
      };
      const response = await createOrder(orderPayload);
      // console.log(response)

      openRazorpay(
        response.data,
        setSuccess,
        onOrderPlaced,
        setLoading,
        fetchCart,
        onBack,
        setError,
      );

      // if (response.success) {
      //   setSuccess(true);
      //   if (onOrderPlaced) onOrderPlaced();
      //   setTimeout(() => onBack(), 2000);
      // } else {
      //   setError(response.message || "Failed to place order");
      // }
    } catch (err) {
      console.error("Order submission failed:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to create order";

      setError(message);

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: message,
      });
      // setError(err.message || "Something went wrong");
    } finally {
      // console.log("HIIIIIIIII");

      setLoading(false);
    }
  };

  // if (success) {
  //   return (
  //     <div className="text-center py-8">
  //       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //         <Truck size={40} className="text-green-600" />
  //       </div>
  //       <h3 className="text-2xl font-bold text-gray-800">Order Placed!</h3>
  //       <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
  //       {/* <p className="text-gray-500 text-sm mt-4">Redirecting to summary...</p> */}
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      {loading && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Loading...</h2>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmitOrder} className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h3 className="text-gray-800 font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {cart.map((item) => {
              const productName =
                item.product?.name || item.product_name || "Product";
              const price = Number(item.current_price || item.price || 0);
              // const itemId = item.product_item_id || item.id;  pehle product item id ja rahi thi ab product_id kar diya hai

              const itemId = item.product_id || item.id;

              return (
                <>
                  <div
                    key={itemId}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {productName} × {item.quantity}
                    </span>
                    <span>₹{(price * item.quantity).toFixed(2)}</span>
                  </div>
                  {/* <div>
                    <img src={item.primary_image} alt="" />
                  </div> */}
                </>
              );
            })}
          </div>
          {/* <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between text-gray-800 font-bold">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          {couponDiscount > 0 && (
            <>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{couponDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-bold text-lg border-t border-gray-200 mt-2 pt-2">
                <span>Final Total</span>
                <span>₹{(totalPrice - couponDiscount).toFixed(2)}</span>
              </div>
            </>
          )} */}

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>TAX</span>
            <span>₹{taxAmount.toFixed(2)}</span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{couponDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2 flex justify-between text-gray-900 font-bold">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Address Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-800 font-semibold">Shipping Address</h3>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={addressLoading}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={addressLoading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
          {addressLoading ? (
            <div className="text-gray-500">Loading addresses...</div>
          ) : addressError ? (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
              <AlertCircle size={16} className="inline mr-2" />
              {addressError}
              <button
                type="button"
                onClick={handleRefresh}
                className="ml-2 text-red-600 underline hover:text-red-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {addresses.length > 0 ? (
                <>
                  {/* {console.log("Addresses:", addresses)} */}

                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {addresses.map((addr, index) => {
                      // console.log(`Address ${index}:`, addr);
                      // console.log("Address ID:", addr.id);

                      return (
                        <div
                          key={addr.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition ${
                            selectedAddressId === addr.id
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 text-red-600 cursor-pointer flex-shrink-0"
                          />

                          <div className="flex-1 text-sm">
                            <p className="text-gray-800 font-medium">
                              {addr.full_name}
                            </p>

                            <p className="text-gray-600">
                              {addr.line1}
                              {addr.line2 ? `, ${addr.line2}` : ""}
                            </p>

                            <p className="text-gray-600">
                              {addr.city}, {addr.state} {addr.postal_code}
                            </p>

                            <p className="text-gray-600">{addr.country}</p>

                            <p className="text-gray-600">Phone: {addr.phone}</p>

                            {addr.is_default && (
                              <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteAddress(addr.id, addr.full_name)
                            }
                            className="text-red-500 hover:text-red-700 transition p-1 flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  No saved addresses found. Please add a new address.
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowNewAddressForm(!showNewAddressForm);
                  setError("");
                }}
                className="mt-3 flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
              >
                <Plus size={16} />
                {showNewAddressForm ? "Cancel" : "Add New Address"}
              </button>
            </>
          )}
        </div>

        {/* New Address Form */}
        {showNewAddressForm && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4">
            <h4 className="text-gray-800 font-medium">New Address</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={newAddress.full_name}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="John Doe"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="9876543210"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="line1"
                  value={newAddress.line1}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="Street, building, apartment"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="line2"
                  value={newAddress.line2}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="Near landmark..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postal_code"
                  value={newAddress.postal_code}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="462038"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleNewAddressChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  placeholder="India"
                />
              </div>
              <div className="col-span-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="is_default"
                    checked={newAddress.is_default}
                    onChange={handleNewAddressChange}
                    className="text-red-600"
                  />
                  Set as default
                </label>
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleCreateAddress}
              disabled={addressLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {addressLoading ? "Saving..." : "Save Address"}
            </button>
          </div>
        )}

        {/* Payment Method */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="text-red-600"
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="text-red-600"
              />
              Credit / Debit Card
            </label>
          </div>
        </div> */}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="2"
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
            placeholder="Any special instructions..."
          />
        </div>

        {/* Global Error */}
        {error && !error.includes("address") && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !selectedAddressId}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Placing Order...
              </>
            ) : (
              <>
                <CreditCard size={18} />
                Place Order
              </>
            )}
          </button>
        </div>
        {!selectedAddressId &&
          !showNewAddressForm &&
          addresses.length === 0 &&
          !addressLoading && (
            <p className="text-yellow-600 text-sm text-center -mt-2">
              Please add a shipping address to continue
            </p>
          )}
      </form>
    </div>
  );
}
