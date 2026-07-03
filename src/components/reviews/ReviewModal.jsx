import { useState, useEffect } from "react";
import { Star, Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { useReviews } from "../../hooks/useReviews";
import { toast } from "react-toastify";

export default function ReviewModal({
  open,
  onClose,
  orderItem,
  productId,
}) {
  const {reviews, addReview, submitting,updateReview } = useReviews(productId);
    const existingReview = reviews.find(
  (r) => r.order_item_id === orderItem?.id
);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setRating(0);
      setHover(0);
      setReview("");
      setImages([]);
      setPreviewImages([]);
      setError("");
    }
  }, [open]);

 useEffect(() => {
  if (!open) return;

  if (existingReview) {
    setRating(existingReview.rating);
    setReview(existingReview.review);
  } else {
    setRating(0);
    setReview("");
  }
}, [open, existingReview]);


  if (!open) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    if (images.length + files.length > 5) {
      setError("Maximum 5 images allowed.");
      return;
    }

    setError("");

    const updatedImages = [...images, ...files];
    setImages(updatedImages);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previewImages[index].url);

    setImages((prev) => prev.filter((_, i) => i !== index));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!rating) {
      setError("Please select rating.");
      return;
    }

    if (!review.trim()) {
      setError("Please write your review.");
      return;
    }

    setError("");

    const formData = new FormData();

    formData.append("order_item_id", orderItem.id);
    formData.append("rating", rating);
    formData.append("review", review);

    images.forEach((image) => {
      formData.append("review_images", image);
    });

//   const result = await addReview(formData);
const result = existingReview
  ? await updateReview(existingReview.id, formData)
  : await addReview(formData);

if (result.success) {
  toast.success(
   existingReview
    ? "Review updated successfully."
    : "Review submitted successfully.", {
    position: "top-right",
    autoClose: 2000,
  });

  setRating(0);
  setHover(0);
  setReview("");
  setImages([]);
  setPreviewImages([]);
  setError("");

  onClose();
} else {
  toast.error(result.message || "Failed to submit review.", {
    position: "top-right",
    autoClose: 3000,
  });

  setError(result.message || "Failed to submit review.");
}
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

     <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition"
        >
          <X size={18} />
        </button>

        <div className="border-b px-6 py-4">

          <h2 className="text-3xl font-bold text-gray-900">
           {existingReview ? "Edit Review" : "Write Review"}
          </h2>

          <p className="mt-2 text-gray-500">
            Share your experience with this product.
          </p>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <h3 className="font-semibold text-lg mb-4">
              Overall Rating
            </h3>

            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={28}
                    className={`transition ${
                      star <= (hover || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}

            </div>

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Your Review
            </label>

            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell others what you liked or disliked about this product..."
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-red-500"
            />

          </div>

          <div>

            <label className="mb-3 block font-semibold">
              Upload Images
            </label>

            <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-red-500 transition">

              <Upload
                size={28}
                className="mb-3 text-red-600"
              />

              <span className="font-medium">
                Click to upload images
              </span>

              <span className="mt-1 text-sm text-gray-500">
                Maximum 5 images
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

            </label>

            {previewImages.length > 0 && (

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

                {previewImages.map((img, index) => (

                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl border"
                  >

                    <img
                      src={img.url}
                      alt=""
                    className="h-20 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                    >
                      <X size={14} />
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-red-600">
              {error}
            </div>
          )}

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <ImageIcon size={18} />
                  {existingReview ? "Update Review" : "Submit Review"}
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}