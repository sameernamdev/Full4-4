import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Edit, Loader2, Package } from "lucide-react";
import { useReviews } from "../hooks/useReviews";
import ReviewModal from "../components/reviews/ReviewModal";

export default function MyReviewsPage() {
  const { myReview, myReviewLoading, fetchMyReviews } = useReviews();
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const handleEdit = (review) => {
    setSelectedReview({
      id: review.order_item_id,
      product_id: review.product_id,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setShowModal(false);
    fetchMyReviews();
  };

  if (myReviewLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  // If myReview is null or empty array -> show empty state
  if (!myReview || myReview.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Reviews</h1>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Package size={56} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No reviews yet
            </h3>
            <p className="text-gray-500 mt-2">
              You haven't written any reviews. Go to your orders and share your
              experience!
            </p>
            <Link
              to="/orders"
              className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Reviews</h1>

        <div className="space-y-6">
          {myReview.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-900">
                      {review.product_name || "Product"}
                    </h2>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-500">
                        ({review.rating}/5)
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {review.review}
                  </p>

                  {review.images && review.images.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt="review"
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-sm text-gray-400">
                    {new Date(review.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <button
                    onClick={() => handleEdit(review)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedReview && (
        <ReviewModal
          open={showModal}
          onClose={handleCloseModal}
          orderItem={{ id: selectedReview.id }}
          productId={selectedReview.product_id}
        />
      )}
    </section>
  );
}