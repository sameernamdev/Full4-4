// import { createContext, useContext, useState, useEffect } from "react";
// import {
//   registerUser,
//   verifyOTP,
//   resendOTP,
//   loginUser,
//   logoutUser,
//   getCurrentUser,
// } from "../config/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(null);

//   // Check if user is logged in on mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem("authToken");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken && storedUser) {
//       try {
//         setToken(storedToken);
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         logout();
//       }
//     }
//     setLoading(false);
//   }, []);

//   // Register user
//   const register = async (userData) => {
//     try {
//       const response = await registerUser(userData);
//       console.log("Register Response in AuthContext:", response);
      
//       if (response.success) {
//         // Store email and phone for OTP
//         sessionStorage.setItem("registerEmail", userData.email);
//         sessionStorage.setItem("registerPhone", userData.phone);
//         return { success: true, data: response.data };
//       } else {
//         return { success: false, error: response.message || "Registration failed" };
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       return { 
//         success: false, 
//         error: error.message || "Registration failed. Please try again." 
//       };
//     }
//   };

//   // Verify OTP
//   const verifyOTPCode = async (data) => {
//     try {
//       console.log("Verifying OTP with data:", data);
//       const response = await verifyOTP(data);
//       console.log("OTP Verification Response:", response);
      
//       if (response.success) {
//         return { success: true, data: response.data };
//       } else {
//         return { success: false, error: response.message || "Invalid OTP" };
//       }
//     } catch (error) {
//       console.error("OTP verification error:", error);
//       return { 
//         success: false, 
//         error: error.message || "OTP verification failed. Please try again." 
//       };
//     }
//   };

//   // Resend OTP
//   const resendOTPCode = async (data) => {
//     try {
//       console.log("Resending OTP for:", data);
//       const response = await resendOTP(data);
//       console.log("Resend OTP Response:", response);
      
//       if (response.success) {
//         return { success: true, message: response.message || "OTP resent successfully" };
//       } else {
//         return { success: false, error: response.message || "Failed to resend OTP" };
//       }
//     } catch (error) {
//       console.error("Resend OTP error:", error);
//       return { 
//         success: false, 
//         error: error.message || "Failed to resend OTP. Please try again." 
//       };
//     }
//   };

//  // Login user - FIXED
// const login = async (email, password) => {
//   try {
//     const response = await loginUser({ email, password });
//     console.log("Login Response in AuthContext:", response);
    
//     // Check if login was successful
//     if (response.success) {
//       // The token and user are at the root level of response
//       const token = response.token;
//       const user = response.user;
      
//       // Store in state
//       setToken(token);
//       setUser(user);
      
//       // Store in localStorage (already done in axios, but just in case)
//       localStorage.setItem("authToken", token);
//       localStorage.setItem("user", JSON.stringify(user));
      
//       return { success: true, data: user };
//     } else {
//       return { success: false, error: response.message || "Invalid credentials" };
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     return { 
//       success: false, 
//       error: error.message || "Login failed. Please try again." 
//     };
//   }
// };

//   // Logout user
//   const logout = async () => {
//     try {
//       await logoutUser();
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       setToken(null);
//       setUser(null);
//     }
//   };

//   // Update user profile
//   const updateUser = (updatedData) => {
//     const updatedUser = { ...user, ...updatedData };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//   };

  


//    // Add new address to user
//   const addAddress = (newAddress) => {
//     if (!user) return;
//     const updatedUser = { ...user };
//     if (!updatedUser.addresses) {
//       updatedUser.addresses = [];
//     }
//     // Check if address already exists (by id)
//     const exists = updatedUser.addresses.some(addr => addr.id === newAddress.id);
//     if (!exists) {
//       updatedUser.addresses = [...updatedUser.addresses, newAddress];
//     }
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//   };

//   // Remove address (optional)
//   const removeAddress = (addressId) => {
//     if (!user || !user.addresses) return;
//     const updatedUser = { ...user };
//     updatedUser.addresses = updatedUser.addresses.filter(addr => addr.id !== addressId);
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//   };




//   // Check if user is authenticated
//   const isAuthenticated = !!token && !!user;

//   // Get auth token for API requests
//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   const value = {
//     user,
//     token,
//     loading,
//     isAuthenticated,
//     register,
//     verifyOTP: verifyOTPCode,
//     resendOTP: resendOTPCode,
//     login,
//     logout,
//     updateUser,
//     getAuthToken,
//      addAddress,
//     removeAddress,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use auth context
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }







import { createContext, useContext, useState, useEffect } from "react";
import {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  logoutUser,
  getCurrentUser,
  resetPassword,
  updateProfileImage,
  changePassword,
} from "../config/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // On mount: if a token exists, validate it against the server (/auth/me)
  // rather than blindly trusting whatever is cached.
  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        setLoading(false);
        return;
      }
      setToken(storedToken);
      try {
        const me = await getCurrentUser();
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
      } catch (error) {
        console.error("Stored session invalid, logging out:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ---------- Step 1: Register ----------
  // userData = { full_name, email, phone, password, profile_image? }
  const register = async (userData) => {
    try {
      const response = await registerUser(userData); // { success, message, otp, data }

      if (response.success) {
        sessionStorage.setItem("registerEmail", userData.email);
        sessionStorage.setItem("registerPhone", userData.phone);
        return { success: true, data: response.data, otp: response.otp };
      }
      return { success: false, error: response.message || "Registration failed" };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message || "Registration failed. Please try again.",
      };
    }
  };

  // ---------- Step 2: Verify OTP ----------
  // data = { email, otp }
  const verifyOTPCode = async (data) => {
    try {
      const response = await verifyOTP(data); // { success, message }
      if (response.success) {
        return { success: true, message: response.message };
      }
      return { success: false, error: response.message || "Invalid OTP" };
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        error: error.message || "OTP verification failed. Please try again.",
      };
    }
  };

  // ---------- Step 3: Resend OTP ----------
  // Keyed by EMAIL, never phone.
  const resendOTPCode = async (email) => {
    try {
      const response = await resendOTP({ email });
      if (response.success) {
        return { 
          success: true,
           message: response.message || "OTP resent successfully",
          data: response.data,
          };
      }
      return { success: false, error: response.message || "Failed to resend OTP" };
    } catch (error) {
      console.error("Resend OTP error:", error);
      return {
        success: false,
        error: error.message || "Failed to resend OTP. Please try again.",
      };
    }
  };

  // ---------- Step 4: Login ----------
  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password }); // { success, message, token, user }

      if (response.success) {
        // Single source of truth for storing auth state — axios.js never
        // touches localStorage for auth, only this function does.
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setToken(response.token);
        setUser(response.user);
        return { success: true, data: response.user };
      }
      return { success: false, error: response.message || "Invalid credentials" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please try again.",
      };
    }
  };

  // ---------- Step 5: Logout ----------
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  // ---------- Forgot password (bonus, not part of the 5 core steps) ----------
  const requestPasswordReset = async (email) => resendOTPCode(email);

  const confirmPasswordReset = async ({ email, otp, password, confirmPassword }) => {
    try {
      const response = await resetPassword({ email, otp, password, confirmPassword });
      if (response.success) {
        return { success: true, message: response.message };
      }
      return { success: false, error: response.message || "Password reset failed" };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        error: error.message || "Password reset failed. Please try again.",
      };
    }
  };

  const changeProfileImage = async (file) => {
    try {
      const response = await updateProfileImage(file);
      if (response.success && response.data) {
        const updatedUser = { ...user, ...response.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.message || "Failed to update profile image" };
    } catch (error) {
      console.error("Update profile image error:", error);
      return {
        success: false,
        error: error.message || "Failed to update profile image",
      };
    }
  };

  // updated password
const updatePassword = async (passwordData) => {
  try {
    const response = await changePassword(passwordData);

    return {
      success: response.success,
      message: response.message,
      error: response.message,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error?.message ||
        "Failed to change password.",
    };
  }
};



  // Local-only patch — no backend endpoint exists for editing text profile fields
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const addAddress = (newAddress) => {
    if (!user) return;
    const updatedUser = { ...user };
    if (!updatedUser.addresses) {
      updatedUser.addresses = [];
    }
    const exists = updatedUser.addresses.some((addr) => addr.id === newAddress.id);
    if (!exists) {
      updatedUser.addresses = [...updatedUser.addresses, newAddress];
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const removeAddress = (addressId) => {
    if (!user || !user.addresses) return;
    const updatedUser = { ...user };
    updatedUser.addresses = updatedUser.addresses.filter((addr) => addr.id !== addressId);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const isAuthenticated = !!token && !!user;
  const getAuthToken = () => localStorage.getItem("authToken");

  const value = {
    user,
    setUser,
    token,
    loading,
    isAuthenticated,
    register,
    verifyOTP: verifyOTPCode,
    resendOTP: resendOTPCode,
    login,
    logout,
    requestPasswordReset,
    confirmPasswordReset,
    changeProfileImage,
    updateUser,
    getAuthToken,
    addAddress,
    removeAddress,

    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}