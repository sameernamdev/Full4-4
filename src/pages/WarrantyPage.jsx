import React, { useState } from "react";
import { useWarranty } from "../hooks/useWarranty";
import {
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
  Hash,
} from "lucide-react";

const WarrantyPage = () => {
  const { warranties, loading, claimLoading, error, refetch, submitClaim } =
    useWarranty();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [claimQuantity, setClaimQuantity] = useState(1);
  const [claimStatus, setClaimStatus] = useState(null); // 'success' | 'error' | null

  const handleClaimClick = (warranty) => {
    setSelectedWarranty(warranty);
    setClaimQuantity(1);
    setClaimStatus(null);
    setShowModal(true);
  };

  const handleSubmitClaim = async () => {
    if (!selectedWarranty) return;
    try {
      const res = await submitClaim(
        selectedWarranty.order_item_id,
        claimQuantity,
      );
      if (res.success) {
        setClaimStatus("success");
        setTimeout(() => {
          setShowModal(false);
          refetch();
        }, 1500);
      } else {
        setClaimStatus("error");
      }
    } catch (err) {
      console.error(err);
      setClaimStatus("error");
    }
  };

  // Helper to get status badge (light theme)
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={14} /> Active
          </span>
        );
      case "partial":
        return (
          <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium">
            <Clock size={14} /> Partial
          </span>
        );
      case "fully_claimed":
        return (
          <span className="flex items-center gap-1 text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={14} /> Fully Claimed
          </span>
        );
      case "not_delivered":
        return (
          <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
            <XCircle size={14} /> Not Delivered
          </span>
        );
      case "expired":
        return (
          <span className="flex items-center gap-1 text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-medium">
            <XCircle size={14} /> Expired
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
            <AlertCircle size={14} /> {status || "Unknown"}
          </span>
        );
    }
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Loader className="animate-spin text-brand-red" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">
            Failed to load warranties
          </h2>
          <p className="text-gray-600 mt-2">
            {error.message || "Please try again later."}
          </p>
          <button
            onClick={refetch}
            className="mt-4 bg-brand-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield size={32} className="text-brand-red" />
          <h1 className="text-3xl font-bold text-gray-800">My Warranties</h1>
        </div>

        {warranties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <Shield size={56} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No warranties found
            </h3>
            <p className="text-gray-500 mt-2">
              Products you purchase with warranty coverage will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warranties.map((warranty) => {
              const remaining = warranty.quantity - warranty.claimed_quantity;
              const status = warranty.warranty_status?.toLowerCase();

              const isClaimable =
                (status === "active" || status === "partial") && remaining > 0;

              return (
                <div
                  key={warranty.order_item_id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition duration-300 flex flex-col"
                >
                  <div className="p-5 pb-3 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {warranty.product_name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Hash size={14} />
                        {warranty.sku || "No SKU"}
                      </p>
                    </div>
                    {getStatusBadge(warranty.warranty_status)}
                  </div>

                  <div className="px-5 pb-3 space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Order ID</span>
                      <span className="font-medium text-gray-800">
                        #{warranty.order_id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Warranty</span>
                      <span className="font-medium text-gray-800">
                        {warranty.warranty_months} months
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ends on</span>
                      <span className="font-medium text-gray-800">
                        {formatDate(warranty.warranty_end_date)}
                      </span>
                    </div>
                    {(status === "active" || status === "partial") && (
                      <p className="text-xs text-green-600">
                        Valid till {formatDate(warranty.warranty_end_date)}
                      </p>
                    )}

                    {status === "expired" && (
                      <p className="text-xs text-red-600">
                        Warranty expired on{" "}
                        {formatDate(warranty.warranty_end_date)}
                      </p>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivered</span>
                      <span className="font-medium text-gray-800">
                        {formatDate(warranty.delivered_at)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Quantity</span>
                      <span className="font-medium text-gray-800">
                        {warranty.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Claimed</span>
                      <span className="font-medium text-gray-800">
                        {warranty.claimed_quantity}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-1">
                      <span className="text-gray-500 font-medium">
                        Remaining
                      </span>
                      <span className="text-brand-red font-bold">
                        {remaining}
                      </span>
                    </div>
                  </div>

                  <div className="px-5 pb-5 mt-auto">
                    {isClaimable ? (
                      <button
                        onClick={() => handleClaimClick(warranty)}
                        disabled={claimLoading}
                        className="w-full bg-brand-red text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {claimLoading ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          "Claim Warranty"
                        )}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-lg text-sm font-semibold cursor-not-allowed"
                      >
                        {status === "fully_claimed"
                          ? "Already Claimed"
                          : status === "not_delivered"
                            ? "Not Delivered Yet"
                            : status === "expired"
                              ? "Warranty Expired"
                              : "Not Claimable"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Claim Modal (Light theme) */}
      {showModal && selectedWarranty && (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Claim Warranty
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Product:{" "}
              <span className="font-medium text-gray-800">
                {selectedWarranty.product_name}
              </span>
            </p>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Quantity to claim
              </label>
              <input
                type="number"
                min="1"
                max={
                  selectedWarranty.quantity - selectedWarranty.claimed_quantity
                }
                value={claimQuantity}
                onChange={(e) => setClaimQuantity(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max:{" "}
                {selectedWarranty.quantity - selectedWarranty.claimed_quantity}
              </p>
            </div>
            {claimStatus === "success" && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-4">
                Claim submitted successfully! Refreshing...
              </div>
            )}
            {claimStatus === "error" && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">
                Failed to submit claim. Please try again.
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                disabled={claimLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitClaim}
                disabled={claimLoading || claimStatus === "success"}
                className="flex-1 py-2 rounded-lg bg-brand-red text-white font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >
                {claimLoading ? (
                  <Loader size={18} className="animate-spin mx-auto" />
                ) : (
                  "Submit Claim"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarrantyPage;
