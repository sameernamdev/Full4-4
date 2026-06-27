import { createContext, useContext, useState, useEffect } from "react";
import {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../config/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      console.log("Register Response in AuthContext:", response);
      
      if (response.success) {
        // Store email and phone for OTP
        sessionStorage.setItem("registerEmail", userData.email);
        sessionStorage.setItem("registerPhone", userData.phone);
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        error: error.message || "Registration failed. Please try again." 
      };
    }
  };

  // Verify OTP
  const verifyOTPCode = async (data) => {
    try {
      console.log("Verifying OTP with data:", data);
      const response = await verifyOTP(data);
      console.log("OTP Verification Response:", response);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.message || "Invalid OTP" };
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      return { 
        success: false, 
        error: error.message || "OTP verification failed. Please try again." 
      };
    }
  };

  // Resend OTP
  const resendOTPCode = async (data) => {
    try {
      console.log("Resending OTP for:", data);
      const response = await resendOTP(data);
      console.log("Resend OTP Response:", response);
      
      if (response.success) {
        return { success: true, message: response.message || "OTP resent successfully" };
      } else {
        return { success: false, error: response.message || "Failed to resend OTP" };
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to resend OTP. Please try again." 
      };
    }
  };

 // Login user - FIXED
const login = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    console.log("Login Response in AuthContext:", response);
    
    // Check if login was successful
    if (response.success) {
      // The token and user are at the root level of response
      const token = response.token;
      const user = response.user;
      
      // Store in state
      setToken(token);
      setUser(user);
      
      // Store in localStorage (already done in axios, but just in case)
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      return { success: true, data: user };
    } else {
      return { success: false, error: response.message || "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { 
      success: false, 
      error: error.message || "Login failed. Please try again." 
    };
  }
};

  // Logout user
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

  // Update user profile
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  


   // Add new address to user
  const addAddress = (newAddress) => {
    if (!user) return;
    const updatedUser = { ...user };
    if (!updatedUser.addresses) {
      updatedUser.addresses = [];
    }
    // Check if address already exists (by id)
    const exists = updatedUser.addresses.some(addr => addr.id === newAddress.id);
    if (!exists) {
      updatedUser.addresses = [...updatedUser.addresses, newAddress];
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Remove address (optional)
  const removeAddress = (addressId) => {
    if (!user || !user.addresses) return;
    const updatedUser = { ...user };
    updatedUser.addresses = updatedUser.addresses.filter(addr => addr.id !== addressId);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };




  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Get auth token for API requests
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    register,
    verifyOTP: verifyOTPCode,
    resendOTP: resendOTPCode,
    login,
    logout,
    updateUser,
    getAuthToken,
     addAddress,
    removeAddress,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}