// import { useState, useEffect, useCallback } from "react";
// import {
//   getProductReviews,
//   addReview as addReviewApi,
//   updateReview as updateReviewApi,
//   getMyReview,
// } from "../config/axios";

// export const useReviews = (productId, page = 1, limit = 10) => {
//   const [reviews, setReviews] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);

// // getting my reviews
//   const [myReview, setMyReview] = useState(null);
// const [myReviewLoading, setMyReviewLoading] = useState(false);

// const fetchMyReviews = useCallback(async () => {
//   try {
//     setMyReviewLoading(true);

//     const data = await getMyReview();
//     console.log("Fetched my reviews:", data);

//     setMyReview(data || []);

//     return data || [];
//   } catch (err) {
//     setMyReview([]);
//     return [];
//   } finally {
//     setMyReviewLoading(false);
//   }
// }, []);







//   const fetchReviews = useCallback(async () => {
//     if (!productId) return;

//     try {
//       setLoading(true);
//       setError(null);

//       const res = await getProductReviews(productId, page, limit);

//       setReviews(res.data?.data || []);
//       setPagination(res.data?.pagination || null);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Failed to fetch reviews."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [productId, page, limit]);

//   useEffect(() => {
//     fetchReviews();
//   }, [fetchReviews]);

//   const addReview = async (formData) => {
//     try {
//       setSubmitting(true);
//       setError(null);

//       const res = await addReviewApi(formData);

//       await fetchReviews();

//       return {
//         success: true,
//         data: res.data,
//       };
//     } catch (err) {
//       const message =
//         err.response?.data?.message || "Failed to add review.";

//       setError(message);

//       return {
//         success: false,
//         message,
//       };
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const updateReview = async (reviewId, formData) => {
//     try {
//       setSubmitting(true);
//       setError(null);

//       const res = await updateReviewApi(reviewId, formData);

//       await fetchReviews();

//       return {
//         success: true,
//         data: res.data,
//       };
//     } catch (err) {
//       const message =
//         err.response?.data?.message || "Failed to update review.";

//       setError(message);

//       return {
//         success: false,
//         message,
//       };
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return {
//     reviews,
//     pagination,
//     loading,
//     submitting,
//     error,
//     fetchReviews,
//     addReview,
//     updateReview,

//     // my reviews
//     myReview,
//     myReviewLoading,
//     fetchMyReviews,
//   };
// };















import { useState, useEffect, useCallback } from "react";
import {
  getProductReviews,
  getFeaturedReviews,
  addReview as addReviewApi,
  updateReview as updateReviewApi,
  getMyReview,
} from "../config/axios";

export const useReviews = (productId, page = 1, limit = 10) => {
  // Product Reviews
  const [reviews, setReviews] = useState([]);

  // Featured Reviews (Homepage)
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);

  // My Reviews
  const [myReview, setMyReview] = useState([]);
  const [myReviewLoading, setMyReviewLoading] = useState(false);

  // Common
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ==========================================
  // My Reviews
  // ==========================================

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

  // ==========================================
  // Product Reviews
  // ==========================================

  const fetchReviews = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await getProductReviews(productId, page, limit);

      setReviews(res.data?.data || []);
      setPagination(res.data?.pagination || null);

      return res.data?.data || [];
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch reviews."
      );

      return [];
    } finally {
      setLoading(false);
    }
  }, [productId, page, limit]);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [fetchReviews, productId]);

  // ==========================================
  // Featured Reviews (Homepage)
  // ==========================================

  const fetchFeaturedReviews = useCallback(
    async (page = 1, limit = 6) => {
      try {
        setFeaturedLoading(true);

        const res = await getFeaturedReviews(page, limit);
        console.log(res.data);

        setFeaturedReviews(res.data || []);
        setPagination(res.data?.pagination || null);

        return res.data?.data || [];
      } catch (err) {
        setFeaturedReviews([]);

        return [];
      } finally {
        setFeaturedLoading(false);
      }
    },
    []
  );

  // ==========================================
  // Add Review
  // ==========================================

  const addReview = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await addReviewApi(formData);

      await fetchReviews();
      await fetchMyReviews();

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

  // ==========================================
  // Update Review
  // ==========================================

  const updateReview = async (reviewId, formData) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await updateReviewApi(reviewId, formData);

      await fetchReviews();
      await fetchMyReviews();

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
    // Product Reviews
    reviews,
    fetchReviews,
    loading,

    // Featured Reviews
    featuredReviews,
    featuredLoading,
    fetchFeaturedReviews,

    // My Reviews
    myReview,
    myReviewLoading,
    fetchMyReviews,

    // Common
    pagination,
    submitting,
    error,

    // Actions
    addReview,
    updateReview,
  };
};