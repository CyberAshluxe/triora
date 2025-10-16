import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const googleUser = localStorage.getItem("googleUser");
    const regularUser = localStorage.getItem("user");

    if (!token && !googleUser) {
      navigate("/signin");
      return;
    }

    if (googleUser) {
      const userData = JSON.parse(googleUser);
      setUser({
        firstName: userData.given_name || "",
        lastName: userData.family_name || "",
        email: userData.email || "",
      });
      setFormData({
        firstName: userData.given_name || "",
        lastName: userData.family_name || "",
        email: userData.email || "",
      });
      setLoading(false);
    } else if (regularUser) {
      const userData = JSON.parse(regularUser);
      setUser(userData);
      setFormData(userData);
      setLoading(false);
    } else if (token) {
      // Fetch user data from backend
      fetchUserProfile(token);
    }
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get("http://localhost:7145/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setFormData(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(user);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:7145/user/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setSuccess("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile data</p>
          <button
            onClick={() => navigate("/signin")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-purple-600 px-6 py-8">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <FaUser className="text-3xl text-green-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-green-100">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Account Information
              </h2>
              {!editing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <FaSave className="mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {editing ? (
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    <FaUser className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                ) : (
                  <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                    <FaUser className="text-gray-400 mr-3" />
                    <span>{user.firstName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {editing ? (
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    <FaUser className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                ) : (
                  <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                    <FaUser className="text-gray-400 mr-3" />
                    <span>{user.lastName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {editing ? (
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    <FaEnvelope className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                ) : (
                  <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                    <FaEnvelope className="text-gray-400 mr-3" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
