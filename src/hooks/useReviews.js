import { useState, useEffect, useCallback } from "react";
import {
  getProductReviews,
  addReview as addReviewApi,
  updateReview as updateReviewApi,
  getMyReview,
} from "../config/axios";

export const useReviews = (productId, page = 1, limit = 10) => {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

// getting my reviews
  const [myReview, setMyReview] = useState(null);
const [myReviewLoading, setMyReviewLoading] = useState(false);

const fetchMyReviews = useCallback(async () => {
  try {
    setMyReviewLoading(true);

    const data = await getMyReview();
    console.log("Fetched my reviews:", data);

    setMyReview(data || []);

    return data || [];
  } catch (err) {
    setMyReview([]);
    return [];
  } finally {
    setMyReviewLoading(false);
  }
}, []);







  const fetchReviews = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await getProductReviews(productId, page, limit);

      setReviews(res.data?.data || []);
      setPagination(res.data?.pagination || null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch reviews."
      );
    } finally {
      setLoading(false);
    }
  }, [productId, page, limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await addReviewApi(formData);

      await fetchReviews();

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to add review.";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setSubmitting(false);
    }
  };

  const updateReview = async (reviewId, formData) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await updateReviewApi(reviewId, formData);

      await fetchReviews();

      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update review.";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    reviews,
    pagination,
    loading,
    submitting,
    error,
    fetchReviews,
    addReview,
    updateReview,

    // my reviews
    myReview,
    myReviewLoading,
    fetchMyReviews,
  };
};