
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useAddresses } from "../hooks/useAddresses";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { INDIAN_STATES } from "../data/states";


export default function MyAddresses() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const {
    addresses,
    loading: addressesLoading,
    error,
    createAddress,
    updateAddress,
    deleteAddress,
  } = useAddresses();

 

  // ---------- State ----------
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    address_type: "shipping",   // ✅ add this
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
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
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
  };

  // ---------- Handlers ----------
  const handleAddClick = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setFormData({
      address_type: address.address_type || "shipping",
      full_name: address.full_name || "",
      phone: address.phone || "",
      line1: address.line1 || "",
      line2: address.line2 || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      postal_code: address.postal_code || "",
      country: address.country || "India",
      is_default: address.is_default || false,
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingAddress(null);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createAddress(formData);   // ✅ includes address_type
      toast.success("Address added successfully!");
      closeModals();
    } catch (err) {
      const msg = err.message || "Failed to add address";
      toast.error(msg);
      console.error("Add address error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingAddress) return;
    setSubmitting(true);
    try {
      await updateAddress(editingAddress.id, formData);
      toast.success("Address updated successfully!");
      closeModals();
    } catch (err) {
      const msg = err.message || "Failed to update address";
      toast.error(msg);
      console.error("Update address error:", err);
    } finally {
      setSubmitting(false);
    }
  };

 const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Address?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteAddress(id);
        toast.success("Address deleted successfully!");
      } catch (err) {
        const msg = err.message || "Failed to delete address";
        toast.error(msg);
        console.error("Delete address error:", err);
      }
    }
  };



   useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-700 text-xl">Loading...</div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  // ---------- JSX (unchanged from previous version, but ensure fields are correct) ----------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-24 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-wide text-gray-900">My Addresses</h1>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
          >
            <Plus size={20} /> Add New Address
          </button>
        </div>

        {addressesLoading && <p className="text-gray-500">Loading addresses...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!addressesLoading && !error && (
          <>
            {addresses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-600 text-lg">No addresses saved yet.</p>
                <p className="text-gray-500 mt-2">Click the button above to add one.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition hover:border-brand-red/40"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 text-gray-700">
                        <p className="font-semibold text-gray-900">{addr.full_name}</p>
                        <p>{addr.line1}</p>
                        {addr.line2 && <p>{addr.line2}</p>}
                        {addr.landmark && <p className="text-sm text-gray-500">Landmark: {addr.landmark}</p>}
                        <p>{addr.city}, {addr.state} {addr.postal_code}</p>
                        <p className="text-sm text-gray-500">{addr.country}</p>
                        <p className="text-sm text-gray-500">📞 {addr.phone}</p>
                        {/* {addr.is_default && (
                          <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )} */}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(addr)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                          <Edit size={18} className="text-blue-600" />
                        </button>
                        <button onClick={() => handleDelete(addr.id)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ===== ADD MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
              <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              {/* Line 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  name="line1"
                  value={formData.line1}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              {/* Line 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (optional)</label>
                <input
                  type="text"
                  name="line2"
                  value={formData.line2}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              {/* City / State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <select
    name="state"
    value={formData.state}
    onChange={handleChange}
    required
    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
  >
    <option value="">Select State</option>

    {INDIAN_STATES.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
                </div>
              </div>
              {/* Postal / Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                  />
                </div>
              </div>
              {/* Default checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
                />
                <label className="text-sm text-gray-700">Set as default address</label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-red hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Address"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && editingAddress && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-900">Edit Address</h2>
              <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Same fields as add modal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  name="line1"
                  value={formData.line1}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (optional)</label>
                <input
                  type="text"
                  name="line2"
                  value={formData.line2}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                   <select
    name="state"
    value={formData.state}
    onChange={handleChange}
    required
    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
  >
    <option value="">Select State</option>

    {INDIAN_STATES.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
                />
                <label className="text-sm text-gray-700">Set as default address</label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-red hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Address"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}