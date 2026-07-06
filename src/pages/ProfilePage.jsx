import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Camera, Edit3, Save, X, Mail, Phone, User } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import useProfile from "../hooks/useProfile";
import { updateUserProfilepage } from "../config/axios";

export default function ProfilePage() {
  const { isAuthenticated,updatePassword,setUser, loading: authLoading } = useAuth();

  if (!authLoading&&!isAuthenticated) {
    // console.log("Not autheticated");
    
    return <Navigate to="/login" replace />;
  }

  const { profile, loading, error, refetch } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    profile_image: null,
  });

  const [preview, setPreview] = useState("");



  // Password change state
  const [passwordError, setPasswordError] = useState("");
const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const [changingPassword, setChangingPassword] = useState(false);

const handlePasswordInput = (e) => {
  const { name, value } = e.target;

  setPasswordData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleChangePassword = async () => {
  setPasswordError("");
  setPasswordSuccess("");

  if (
    !passwordData.currentPassword ||
    !passwordData.newPassword ||
    !passwordData.confirmPassword
  ) {
    setPasswordError("Please fill all fields.");
    return;
  }

  // New Password validation
  if (passwordData.newPassword.length < 6) {
    setPasswordError("New password must be at least 6 characters.");
    return;
  }

  if (passwordData.newPassword.length > 10) {
    setPasswordError("New password cannot be more than 10 characters.");
    return;
  }

  // Confirm Password validation
  if (passwordData.confirmPassword.length < 6) {
    setPasswordError("Confirm password must be at least 6 characters.");
    return;
  }

  if (passwordData.confirmPassword.length > 10) {
    setPasswordError("Confirm password cannot be more than 10 characters.");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordError("New password and confirm password do not match.");
    return;
  }

  try {
    setChangingPassword(true);

    const result = await updatePassword(passwordData);

    if (result.success) {
      setPasswordSuccess(result.message || "Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordSuccess("");
      }, 1500);
    } else {
      setPasswordError(result.error || "Failed to change password.");
    }
  } catch (err) {
    setPasswordError(err?.message || "Something went wrong.");
  } finally {
    setChangingPassword(false);
  }
};


  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        profile_image: null,
      });

      setPreview(profile.profile_image || "");
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profile_image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = new FormData();

      payload.append("full_name", formData.full_name);

      if (formData.profile_image) {
        payload.append("profile_image", formData.profile_image);
      }

     const res =  await updateUserProfilepage(payload);
     setUser(res?.data);
     

      // await refetch();

      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-red-600 border-r-red-600"></div>
          </div>

          <h2 className="mt-6 text-xl font-semibold text-gray-800">
            Loading Profile
          </h2>

          <p className="mt-2 text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="profile-loading">
        {error?.message || "Failed to load profile"}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-5 sm:px-8 py-8 sm:py-10 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5">
            <div className="relative">
              <img
                src={
                  preview ||
                  `https://ui-avatars.com/api/?background=ffffff&color=dc2626&size=200&name=${encodeURIComponent(
                    profile?.full_name[0] || "User",
                  )}`
                }
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />

              {isEditing && (
                <>
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition"
                  >
                    <Camera size={18} />
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImage}
                  />
                </>
              )}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {profile?.full_name}
              </h2>

              <p className="text-sm sm:text-base text-red-100 mt-1">
                Manage your personal information
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full lg:w-auto flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User size={18} />
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 text-sm sm:text-base outline-none transition ${
                isEditing
                  ? "border border-gray-300 focus:border-red-500"
                  : "bg-gray-100 border border-gray-200"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail size={18} />
              Email Address
            </label>

            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm sm:text-base"
            />
          </div>

          {/* Phone */}
          <div className="lg:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone size={18} />
              Phone Number
            </label>

            <input
              type="text"
              value={profile?.phone || ""}
              disabled
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm sm:text-base cursor-not-allowed"
            />
          </div>
        </div>
        

        <div className="border-t border-gray-200 px-5 sm:px-8 py-6">

  <div className="flex items-center justify-between">

    <div>

      <h3 className="text-lg font-semibold">
        Security
      </h3>

      <p className="text-sm text-gray-500">
        Change your account password
      </p>

    </div>

    {!showPasswordForm && (

      <button
        onClick={() => setShowPasswordForm(true)}
        className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
      >
        Change Password
      </button>

    )}

  </div>

  {showPasswordForm && (

    <div className="mt-6 space-y-4">

      <input
        type="password"
        name="currentPassword"
        placeholder="Current Password"
        value={passwordData.currentPassword}
        onChange={handlePasswordInput}
        className="w-full border rounded-xl px-4 py-3"
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={passwordData.newPassword}

        onChange={handlePasswordInput}
        className="w-full border rounded-xl px-4 py-3"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"

        value={passwordData.confirmPassword}
        onChange={handlePasswordInput}
        className="w-full border rounded-xl px-4 py-3"
      />

      {passwordError && (
  <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
    {passwordError}
  </div>
)}

{passwordSuccess && (
  <div className="rounded-lg bg-green-50 border border-green-200 text-green-600 px-4 py-3 text-sm">
    {passwordSuccess}
  </div>
)}

      <div className="flex justify-end gap-3">

        <button
          onClick={()=>{
            setShowPasswordForm(false);

            setPasswordData({
              currentPassword:"",
              newPassword:"",
              confirmPassword:"",
            });

          }}
          className="px-5 py-3 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={handleChangePassword}
          disabled={changingPassword}
          className="px-5 py-3 rounded-xl bg-red-600 text-white"
        >
          {changingPassword
            ? "Updating..."
            : "Update Password"}
        </button>

      </div>

    </div>

  )}

</div>

        {/* Footer */}
        {isEditing && (
          <div className="border-t border-gray-200 px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              onClick={() => {
                setIsEditing(false);

                setFormData({
                  full_name: profile?.full_name || "",

                  profile_image: null,
                });

                setPreview(profile?.profile_image || "");
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      
    </section>
  );
}
