import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import * as jwtDecodeModule from "jwt-decode";
import logo from "../assets/my-icon.png"; // Assuming you have a logo image
import icon from "../assets/my-icon.svg"; // Assuming you have a logo image
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCrown,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const SellerSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:7145/seller/login", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Response:", res.data);

      // ✅ If login is successful
      if (res.data.token) {
        localStorage.setItem("sellerToken", res.data.token);

        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem("sellerRememberMe", "true");
          localStorage.setItem("sellerEmail", email);
        } else {
          localStorage.removeItem("sellerRememberMe");
          localStorage.removeItem("sellerEmail");
        }

        setShowModal(true); // show success modal

        // redirect after 2s
        setTimeout(() => {
          navigate("/seller-dashboard");
        }, 2000);
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // Facebook Sign-In handler (placeholder)
  const handleFacebookSignIn = () => {
    setError("Facebook sign-in not implemented yet");
    // Implement Facebook OAuth here
  };

  // Twitter Sign-In handler (placeholder)
  const handleTwitterSignIn = () => {
    setError("Twitter sign-in not implemented yet");
    // Implement Twitter OAuth here
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const remembered = localStorage.getItem("sellerRememberMe");
    const rememberedEmail = localStorage.getItem("sellerEmail");

    if (remembered === "true" && rememberedEmail) {
      setRememberMe(true);
      setEmail(rememberedEmail);
    }
  }, []);

  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seller Login Successful!
              </h3>
              <p className="text-gray-600">
                Redirecting to seller dashboard...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center items-center text-3xl font-bold">
            <img src={icon} alt="Triora Logo" width={50} height={50} />
            <span
              className="text-green-900 text-3xl"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Triora
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-green-900">
            Sign in as Seller
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-green-600 hover:text-green-800"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => setError("")}
              className="absolute top-0 right-0 px-2 py-1"
            >
              ×
            </button>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="Email address"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-green-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-green-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-green-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-green-900">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-green-600 hover:text-green-800"
            >
              Forgot your password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaLock className="text-green-300" />
                </span>
                Sign in as Seller
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              Or sign in with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center space-x-4">
            <div>
              <button type="button">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    try {
                      const userData = jwtDecodeModule.jwtDecode(
                        credentialResponse.credential
                      );
                      localStorage.setItem(
                        "sellerGoogleUser",
                        JSON.stringify(userData)
                      );
                      setShowModal(true);
                      setTimeout(() => {
                        navigate("/seller-dashboard");
                      }, 2000);
                    } catch (err) {
                      setError("Google sign-in failed");
                    }
                  }}
                  onError={() => setError("Google sign-in failed")}
                />
              </button>
            </div>
            <button
              type="button"
              onClick={handleFacebookSignIn}
              aria-label="Sign in with Facebook"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800 text-white hover:bg-green-900 transition-colors"
              disabled={loading}
            >
              <FaFacebookF />
            </button>
            <button
              type="button"
              onClick={handleTwitterSignIn}
              aria-label="Sign in with Twitter"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-400 text-white hover:bg-green-500 transition-colors"
              disabled={loading}
            >
              <FaTwitter />
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have a seller account?{" "}
            <a
              href="/seller-signup"
              className="font-medium text-green-600 hover:text-green-800"
            >
              Sign up as Seller
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerSignIn;
