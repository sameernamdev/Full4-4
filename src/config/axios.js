import axios from "axios";
import { data } from "react-router-dom";

export const api = axios.create({
  // baseURL:"http://localhost:3000/api"  || "https://ecom-drive-range.onrender.com/api",
  baseURL:"https://ecom-drive-range.onrender.com/api",
  withCredentials: true,
});

// 🟢 Interceptor for Guest Token (unchanged)
api.interceptors.request.use(
  (config) => {
    const guestToken = localStorage.getItem("guestToken");
    if (guestToken) {
      config.headers["x-session-token"] = guestToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🟢 NEW: Interceptor for Auth Token (JWT)
api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
      // Also set x-session-token if your backend expects it
      config.headers["x-session-token"] = authToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // 🟢 Optional: Response interceptor to handle 401 globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // If unauthorized, clear tokens and redirect to login
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       // Optionally redirect
//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    const isTokenExpired =
      status === 401 && String(data?.data || "").includes("jwt expired");

    if (isTokenExpired) {
      console.log("Logging out because token expired");

      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/auth";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);


export async function getGuestToken() {
  try {
    const response = await api.post("/guests/token");
    const token = response.data.token;
    localStorage.setItem("guestToken", token);
    return token;
  } catch (error) {
    console.error("Failed to fetch guest token:", error);
    throw error;
  }
}









//get user profile
export const getUserProfile=async()=>{
  try {
    const res=await api.get("/users/me")
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}
export const updateUserProfilepage=async(data)=>{
  try {
    const res=await api.put("/users/update-profile", data,{
      headers: { "Content-Type": "multipart/form-data" }
    })
    
    return res.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
}
export const changePassword = async (data) => {
  try {
    const res = await api.post("/users/change-password", data);

    return res.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error.response?.data || error;
  }
};






// ... rest of your existing functions (products, categories, cart, auth, addresses, orders)
// Make sure they are all present from your original file.




//products
// export const getallproducts=async(params = {})=>{
//     try {
//         const res=await api.get("/products/get_all_products", {
//           params
//         })
//         console.log(res);
        
//         return res.data?.data;
//     } catch (error) {
//         console.log(error);
        
//     }
// }


//products
export const getallproducts = async (params = {}) => {
  try {
    const res = await api.get(
      `/products/get_all_products`,
      {
        params
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getProductId=async(id)=>{
    try {
        const res=await api.get(`/products/get_product_by_id/${id}`)
        console.log(res);
        
        return res.data?.data;
    } catch (error) {
        console.log(error);
        
    }
}


//products item
export const getallproductsItems=async(id)=>{
    try {
        const res=await api.get(`/products/get_all_items?product_id=${id}`)
        console.log(res);
        
        return res.data?.data;
    } catch (error) {
        console.log(error);
        
    }
}





export const getProductItemId=async()=>{
    try {
        const res=await api.get(`/products/get_item_by_id/${id}`)
        console.log(res);
        
        return res.data?.data;
    } catch (error) {
        console.log(error);
        
    }
}




//categories
export const getallcategories=async(params={})=>{
    try {
        const res=await api.get("/categories/get_all_categories",{
          params
        })
        
        return res.data?.data;
    } catch (error) {
        console.log(error);
        
    }
}

export const getcategoryById=async()=>{
    try {
        const res=await api.get(`/categories/get_category_by_id=${id}`)
       
        
        return res.data?.data;
    } catch (error) {
        console.log(error);
        
    }
}






// Sub categories
export const getallSubcategories=async(params)=>{
    try {
        const res=await api.get("/sub-categories/get_all_subcategories",{
          params
        })
       
        
        return res.data?.data;
    } catch (error) {
        console.log(error);

    }
}



//brands
export const getallbrands=async()=>{
    try {

        const res=await api.get("/brands/get_all_brands?status=active")
        return res.data?.data
    } catch (error) {
        console.log(error)
    }
}

export const getbrandsById=async()=>{
    try {

        const res=await api.get(`/brands/get_brand_by_id=${id}`)
        return res.data?.data
    } catch (error) {
        console.log(error)
    }
}




// cart
export const addToCart = async (data) => {
  try {
    const res = await api.post("/carts/add", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const res = await api.get("/carts");
    return res.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCart = async (id, quantity) => {
  try {
    const res = await api.put(`/carts/item/${id}`, {
      quantity,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeCartItem = async (id) => {
  try {
    const res = await api.delete(`/carts/item/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};







// // ============= AUTH FUNCTIONS =============

// // Register User
// export const registerUser = async (userData) => {
//   try {
//     const res = await api.post("/auth/register", userData);
//     console.log("Register Response:", res);
//     return res.data;
//   } catch (error) {
//     console.error("Register error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Verify OTP
// export const verifyOTP = async (data) => {
//   try {
//     const res = await api.post("/auth/verify-otp", data); // data = { phone, otp }
//     console.log("OTP Verification Response:", res);
//     return res.data;
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Resend OTP
// export const resendOTP = async (data) => {
//   try {
//     const res = await api.post("/auth/resend-otp", data); // data = { phone }
//     console.log("Resend OTP Response:", res);
//     return res.data;
//   } catch (error) {
//     console.error("Resend OTP error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Login User - FIXED
// export const loginUser = async (data) => {
//   try {
//     const res = await api.post("/auth/login", data);
//     console.log("Login API Response:", res);
    
//     // The response is at the root level, not nested in data.data
//     // Check if the response has success and token directly
//     if (res.data?.success && res.data?.token) {
//       // Store auth token
//       localStorage.setItem("authToken", res.data.token);
//       if (res.data.user) {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       }
//       return res.data; // Return the whole response
//     } else {
//       // If the response is nested differently
//       return res.data;
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Logout User
// export const logoutUser = async () => {
//   try {
//     const res = await api.post("/auth/logout");
//     console.log("Logout Response:", res);
    
//     // Clear auth data from localStorage
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
    
//     return res.data;
//   } catch (error) {
//     console.error("Logout error:", error);
//     // Still clear localStorage even if API fails
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     throw error.response?.data || error;
//   }
// };

// // Forgot Password
// export const forgotPassword = async (data) => {
//   try {
//     const res = await api.post("/auth/forgot-password", data);
//     console.log("Forgot Password Response:", res);
//     return res.data;
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Reset Password
// export const resetPassword = async (data) => {
//   try {
//     const res = await api.post("/auth/reset-password", data);
//     console.log("Reset Password Response:", res);
//     return res.data;
//   } catch (error) {
//     console.error("Reset password error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Get Current User Profile
// export const getCurrentUser = async () => {
//   try {
//     const res = await api.get("/auth/me");
//     console.log("Get User Response:", res);
//     return res.data;
//   } catch (error) {
//     console.error("Get user error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Update User Profile
// export const updateUserProfile = async (data) => {
//   try {
//     const res = await api.put("/auth/profile", data);
//     console.log("Update Profile Response:", res);
    
//     // Update stored user data
//     if (res.data?.success && res.data?.data) {
//       localStorage.setItem("user", JSON.stringify(res.data.data));
//     }
    
//     return res.data;
//   } catch (error) {
//     console.error("Update profile error:", error);
//     throw error.response?.data || error;
//   }
// };

// // Change Password
// export const changePassword = async (data) => {
//   try {
//     const res = await api.put("/auth/change-password", data);
//     console.log("Change Password Response:", res);
//     return res.data;
//   } catch (error) {
//     console.error("Change password error:", error);
//     throw error.response?.data || error;
//   }
// };



// ============= AUTH FUNCTIONS =============
// Pure API calls only. No localStorage / state logic here — that all lives
// in AuthContext.jsx so there's a single source of truth for auth state.
 
// Register User — multipart/form-data, profile_image optional
export const registerUser = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("full_name", userData.full_name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("password", userData.password);
    if (userData.profile_image) {
      formData.append("profile_image", userData.profile_image);
    }
 
    const res = await api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data; // { success, message, otp, data }
  } catch (error) {
    console.error("Register error:", error);
    throw error.response?.data || error;
  }
};
 
// Verify OTP — { email, otp }
export const verifyOTP = async (data) => {
  try {
    const res = await api.post("/auth/verify-otp", data);
    return res.data; // { success, message }
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error.response?.data || error;
  }
};
 
// Resend OTP — keyed by EMAIL, not phone
export const resendOTP = async (data) => {
  try {
    const res = await api.post("/auth/resend", data); // { email }
    return res.data; // { success, message, data }
  } catch (error) {
    console.error("Resend OTP error:", error);
    throw error.response?.data || error;
  }
};
 
// Login User — { email, password } -> { success, message, token, user }
export const loginUser = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data || error;
  }
};
 
// Logout User
export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error.response?.data || error;
  }
};
 
// Forget Password — single endpoint: { email, otp, password, confirmPassword }
export const resetPassword = async (data) => {
  try {
    const res = await api.post("/auth/forget-password", data);
    return res.data; // { success, message, data }
  } catch (error) {
    console.error("Forget password error:", error);
    throw error.response?.data || error;
  }
};
 
// Get Current User Profile — flat user object
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error.response?.data || error;
  }
};
 
// Update Profile Image — PATCH, multipart
export const updateProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profile_image", file);
 
    const res = await api.patch("/auth/update-profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data; // { success, message, data }
  } catch (error) {
    console.error("Update profile image error:", error);
    throw error.response?.data || error;
  }
};






// ============= USER ADDRESSES FUNCTIONS =============

// Get all addresses for the logged-in user
export const getAddresses = async () => {
  try {
    const res = await api.get("/user-addresses"); // or "/user-addresses" – check your routes
    console.log("Get Addresses Response:", res);
    return res.data?.data;
  } catch (error) {
    console.error("Get addresses error:", error.response?.data || error);
    throw error.response?.data || { message: "Failed to fetch addresses" };
  }
};

// Create a new address
export const createAddress = async (addressData) => {
  try {
    const res = await api.post("/user-addresses/create_address", addressData);
    console.log("Create Address Response:", res);
    return res.data?.data;
  } catch (error) {
    console.error("Create address error:", error.response?.data || error);
    throw error.response?.data || { message: error.message || "Failed to create address" };
  }
};

// Get address by ID
export const getAddressById = async (id) => {
  try {
    const res = await api.get(`/user-addresses/${id}`);
    return res.data?.data;
  } catch (error) {
    console.error("Get address error:", error.response?.data || error);
    throw error.response?.data || { message: "Failed to fetch address" };
  }
};

// Update address
export const updateAddress = async (id, addressData) => {
  try {
    const res = await api.put(`/user-addresses/update-address/${id}`, addressData);
    return res.data?.data;
  } catch (error) {
    console.error("Update address error:", error.response?.data || error);
    throw error.response?.data || { message: "Failed to update address" };
  }
};

// Delete address
export const deleteAddressAPI = async (id) => {
  try {
    const res = await api.delete(`/user-addresses/delete_address/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete address error:", error.response?.data || error);
    throw error.response?.data || { message: "Failed to delete address" };
  }
};

// ============= ORDER FUNCTIONS =============

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const res = await api.post("/orders/create", orderData);
    console.log("Create Order Response:", res);
    return res.data;
  } catch (error) {
    console.error("Create order error:", error);
    throw error.response?.data || error;
  }
};

// Get user's orders
export const getOrders = async () => {
  try {
    const res = await api.get("/orders/my-orders");
    return res.data?.data;
  } catch (error) {
    console.error("Get orders error:", error);
    throw error.response?.data || error;
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const res = await api.get(`/orders/my-orders/${id}`);
    return res.data?.data;
  } catch (error) {
    console.error("Get order details error:", error);
    throw error.response?.data || error;
  }
};




// get products images
export const getProductImages = async (id) => {
  try {
    const res = await api.get(`/products/${id}/images`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




// coupons
export const getcoupons=async()=>{
  try {
    const res=await api.get("/coupons/my-coupons")
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const applycoupon=async(data)=>{
  try {
    const res=await api.post("/coupons/apply",data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}




// get all vehicle models
export const getallvehiclemodels=async()=>{
  try {
    const res=await api.get("/vehicle-models/get_all_models")
    return res.data?.data
  } catch (error) {
    console.log(error)
  }
}


// get all generations of vehicle
export const getvehiclesGenerations=async()=>{
  try {
    const res=await api.get("/vehicle-generations/get_all_generations")
    return res.data?.data
  } catch (error) {
    console.log(error)
  }
}


//get vehicle compatibility
export const getVehicleCompatibility=async(productId)=>{
  try {
    const res=await api.get(`/vehicle-compatibility/product/${productId}`)
    return res.data?.data
  } catch (error) {
    console.error("Error fetching vehicle compatibility ", error.response?.data || error);
    throw error
  }
}




// reviews
export const addReview = (formData) =>
  api.post("/reviews/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


  export const getMyReview = async() =>{
   const res = await api.get("/reviews/my-reviews")
    return res.data?.data
  }

export const updateReview = (id, formData) =>
  api.put(`/reviews/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getProductReviews = (
  productId,
  page = 1,
  limit = 10
) =>
  api.get(
    `/reviews/product/${productId}?page=${page}&limit=${limit}`
  );



  // on homepage
  export const getFeaturedReviews = async (page = 1, limit = 6) => {
  try {
    const res = await api.get("/reviews/get_featured_reviews", {
      params: {
        page,
        limit,
      },
    });

    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};





//warranty section
export const claimWarranty = async (orderItemId, claim_quantity) => {
  const res = await api.post(
    `/warranty/claim/${orderItemId}`,
    {
      claim_quantity,
    }
  );

  return res.data;
};

export const getMyWarranties = async () => {
  const res = await api.get("/warranty/my-warranties");
  return res.data;
};


