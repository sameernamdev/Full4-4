// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowLeft, CheckCircle, Clock, Phone } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// // import { useAuth } from "../context/AuthContext";

// export default function VerifyOTPPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { verifyOTP, resendOTP } = useAuth();
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [timer, setTimer] = useState(120);
//   const [canResend, setCanResend] = useState(false);
//   const [showPhoneInput, setShowPhoneInput] = useState(true);
  
//   const inputRefs = useRef([]);
//   const phoneInputRef = useRef(null);

//   // Get phone from location state or session storage
//   const storedPhone = location.state?.phone || sessionStorage.getItem("registerPhone") || "";
//   console.log("Stored Phone:", storedPhone);

//   // Set phone if available
//   useEffect(() => {
//     if (storedPhone) {
//       setPhone(storedPhone);
//     }
//   }, [storedPhone]);

//   // Focus phone input on mount
//   useEffect(() => {
//     if (phoneInputRef.current) {
//       phoneInputRef.current.focus();
//     }
//   }, []);

//   // Timer for resend
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     } else {
//       setCanResend(true);
//     }
//   }, [timer]);

//   // Focus first OTP input when phone is submitted
//   useEffect(() => {
//     if (!showPhoneInput && inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, [showPhoneInput]);

//   const handlePhoneSubmit = (e) => {
//     e.preventDefault();
    
//     if (!phone.trim()) {
//       setError("Phone number is required");
//       return;
//     }
    
//     if (!/^[0-9]{10}$/.test(phone)) {
//       setError("Phone number must be 10 digits");
//       return;
//     }
    
//     setError("");
//     setShowPhoneInput(false);
    
//     // Store phone for OTP verification
//     sessionStorage.setItem("registerPhone", phone);
//   };

//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(0, 1);
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }

//     if (error) setError("");
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text");
//     const digits = pasteData.replace(/\D/g, "").slice(0, 6);
    
//     if (digits) {
//       const newOtp = [...otp];
//       for (let i = 0; i < digits.length && i < 6; i++) {
//         newOtp[i] = digits[i];
//       }
//       setOtp(newOtp);
      
//       const lastIndex = Math.min(digits.length - 1, 5);
//       if (inputRefs.current[lastIndex]) {
//         inputRefs.current[lastIndex].focus();
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const otpValue = otp.join("");
//     console.log("OTP Value:", otpValue);
//     console.log("Phone:", phone);
    
//     if (otpValue.length !== 6) {
//       setError("Please enter all 6 digits");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       // Send both phone and OTP for verification
//       const result = await verifyOTP({ phone, otp: otpValue });
//       console.log("OTP Verification Result:", result);

//       if (result.success) {
//         console.log("OTP Verified Successfully!");
//         setSuccess(true);
        
//         // Navigate to login after 2 seconds
//         setTimeout(() => {
//           console.log("Navigating to login...");
//           navigate("/login", { 
//             state: { 
//               message: "Account verified successfully! Please login." 
//             } 
//           });
//         }, 2000);
//       } else {
//         console.log("OTP Verification Failed:", result.error);
//         setError(result.error || "Invalid OTP. Please try again.");
//         // Clear OTP inputs on error
//         setOtp(["", "", "", "", "", ""]);
//         if (inputRefs.current[0]) {
//           inputRefs.current[0].focus();
//         }
//       }
//     } catch (error) {
//       console.error("OTP verification error:", error);
//       setError("OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (!canResend) return;
    
//     try {
//       console.log("Resending OTP for phone:", phone);
//       const result = await resendOTP({ phone });
//       console.log("Resend OTP Result:", result);
      
//       if (result.success) {
//         setTimer(120);
//         setCanResend(false);
//         setError("");
//         setOtp(["", "", "", "", "", ""]);
//         if (inputRefs.current[0]) {
//           inputRefs.current[0].focus();
//         }
//       } else {
//         setError(result.error || "Failed to resend OTP");
//       }
//     } catch (error) {
//       console.error("Resend OTP error:", error);
//       setError("Failed to resend OTP. Please try again.");
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   // Success state
//   if (success) {
//     return (
//       <div className="min-h-screen bg-[#080808] flex items-center justify-center py-12 px-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
//         >
//           <div className="flex justify-center mb-6">
//             <CheckCircle className="text-green-500" size={80} />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">Verified!</h2>
//           <p className="text-gray-400 mb-6">Your account has been verified successfully.</p>
//           <p className="text-gray-400 text-sm">Redirecting to login...</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#080808] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
//         >
//           {/* Back Button */}
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>

//           {/* Header */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-white">Verify OTP</h2>
//             <p className="text-gray-400 mt-2">
//               {showPhoneInput 
//                 ? "Enter your phone number to receive OTP" 
//                 : `We sent a 6-digit code to ${phone}`}
//             </p>
//           </div>

//           {/* Phone Input Section */}
//           {showPhoneInput ? (
//             <form onSubmit={handlePhoneSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     ref={phoneInputRef}
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className={`w-full bg-white/10 border ${
//                       error ? "border-red-500" : "border-white/10"
//                     } rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition`}
//                     placeholder="9876543210"
//                   />
//                 </div>
//                 {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
//               >
//                 Send OTP
//               </button>

//               <p className="text-center text-gray-400 text-sm">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-red-500 hover:text-red-400 transition">
//                   Login
//                 </Link>
//               </p>
//             </form>
//           ) : (
//             /* OTP Input Section */
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* OTP Inputs */}
//               <div>
//                 <div className="flex justify-between gap-2" onPaste={handlePaste}>
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => (inputRefs.current[index] = el)}
//                       type="text"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleChange(index, e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(index, e)}
//                       className={`w-14 h-14 text-center text-2xl font-bold text-white bg-white/10 border ${
//                         error ? "border-red-500" : "border-white/10"
//                       } rounded-xl focus:outline-none focus:border-red-500 transition`}
//                     />
//                   ))}
//                 </div>
//                 {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
//               </div>

//               {/* Change Phone Number */}
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowPhoneInput(true);
//                   setError("");
//                   setOtp(["", "", "", "", "", ""]);
//                 }}
//                 className="text-sm text-gray-400 hover:text-white transition text-center w-full"
//               >
//                 Change phone number
//               </button>

//               {/* Timer */}
//               <div className="flex items-center justify-center gap-2 text-gray-400">
//                 <Clock size={16} />
//                 <span>Resend code in {formatTime(timer)}</span>
//               </div>

//               {/* Verify Button */}
//               <button
//                 type="submit"
//                 disabled={loading || otp.join("").length !== 6}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Verifying...
//                   </>
//                 ) : (
//                   "Verify OTP"
//                 )}
//               </button>

//               {/* Resend Button */}
//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={handleResend}
//                   disabled={!canResend}
//                   className={`text-sm transition ${
//                     canResend
//                       ? "text-red-500 hover:text-red-400"
//                       : "text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   {canResend ? "Resend OTP" : "Waiting for resend..."}
//                 </button>
//               </div>

//               <p className="text-center text-gray-400 text-sm">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-red-500 hover:text-red-400 transition">
//                   Login
//                 </Link>
//               </p>
//             </form>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }






import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function VerifyOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // adding this for direct go from register to otp boxes and not goes from email input box
  // Both verify-otp and resend are keyed by EMAIL per the API spec.
  const storedEmail =location.state?.email  ||"";
  const [showEmailInput, setShowEmailInput] = useState(!storedEmail);

  // const [showEmailInput, setShowEmailInput] = useState(true);

  // for temporary ui otp
  const [serverOtp, setServerOtp] = useState(location.state?.otp || "");

  const inputRefs = useRef([]);
  const emailInputRef = useRef(null);

  // Both verify-otp and resend are keyed by EMAIL per the API spec.
  // const storedEmail = location.state?.email || sessionStorage.getItem("registerEmail") || "";

  // useEffect(() => {
  //   if (storedEmail) setEmail(storedEmail);
  // }, [storedEmail]);

    useEffect(() => {
  if (storedEmail) {
    setEmail(storedEmail);
    setShowEmailInput(false);
  }
}, [storedEmail]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    if (!showEmailInput && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [showEmailInput]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return;
    }

    setError("");
    setShowEmailInput(false);
    sessionStorage.setItem("registerEmail", email);
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (error) setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, 6);

    if (digits) {
      const newOtp = [...otp];
      for (let i = 0; i < digits.length && i < 6; i++) {
        newOtp[i] = digits[i];
      }
      setOtp(newOtp);

      const lastIndex = Math.min(digits.length - 1, 5);
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await verifyOTP({ email, otp: otpValue });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login", {
            state: { message: "Account verified successfully! Please login." },
          });
        }, 2000);
      } else {
        setError(result.error || "Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    if (!email) {
      setError("We don't have an email on file to resend the code to. Please register again.");
      return;
    }

    try {
      const result = await resendOTP(email);

      if (result.success) {
        // for temporaryui
          //  NEW OTP UI update
        setServerOtp(result.data?.otp || "");
        

        setTimer(60);
        setCanResend(false);
        setError("");
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        setError(result.error || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500" size={80} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Verified!</h2>
          <p className="text-gray-400 mb-6">Your account has been verified successfully.</p>
          <p className="text-gray-400 text-sm">Redirecting to login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Verify OTP</h2>
            <p className="text-gray-400 mt-2">
              {showEmailInput
                ? "Enter your email to receive OTP"
                : `We sent a 6-digit code to ${email}`}
            </p>
          </div>

          {showEmailInput ? (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-white/10 border ${
                      error ? "border-red-500" : "border-white/10"
                    } rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition`}
                    placeholder="john@example.com"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Continue
              </button>

              <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:text-red-400 transition">
                  Login
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex justify-between gap-2" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-14 h-14 text-center text-2xl font-bold text-white bg-white/10 border ${
                        error ? "border-red-500" : "border-white/10"
                      } rounded-xl focus:outline-none focus:border-red-500 transition`}
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}


                  {/* for temporary */}
                  {serverOtp && (
  <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center mt-4">
    <p className="text-xs text-gray-400">
      Development OTP
    </p>

    <p className="text-3xl font-bold tracking-[0.4em] text-green-400">
      {serverOtp}
    </p>
  </div>
)}

              </div>

                  

              <button
                type="button"
                onClick={() => {
                  setShowEmailInput(true);
                  setError("");
                  setOtp(["", "", "", "", "", ""]);
                }}
                className="text-sm text-gray-400 hover:text-white transition text-center w-full"
              >
                Change email address
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Clock size={16} />
                <span>Resend code in {formatTime(timer)}</span>
              </div>

              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`text-sm transition ${
                    canResend
                      ? "text-red-500 hover:text-red-400"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {canResend ? "Resend OTP" : "Waiting for resend..."}
                </button>
              </div>

              <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:text-red-400 transition">
                  Login
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}