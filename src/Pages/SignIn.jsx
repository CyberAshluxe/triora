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
import WelcomeScreen from "../Components/WelcomeScreen";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to user
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
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
      const endpoint =
        role === "admin"
          ? "https://tri-aura-backend.onrender.com/admin/login"
          : role === "seller"
          ? "https://tri-aura-backend.onrender.com/seller/login"
          : "https://tri-aura-backend.onrender.com/user/login";
      const res = await axios.post(endpoint, {
        email,
        password,
      });

      // ✅ If login is successful
      if (res.data.token) {
        const tokenKey =
          role === "admin"
            ? "adminToken"
            : role === "seller"
            ? "sellerToken"
            : "token";
        const emailKey =
          role === "admin"
            ? "adminEmail"
            : role === "seller"
            ? "sellerEmail"
            : "userEmail";
        const rememberKey =
          role === "admin"
            ? "adminRememberMe"
            : role === "seller"
            ? "sellerRememberMe"
            : "rememberMe";

        localStorage.setItem(tokenKey, res.data.token);

        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem(rememberKey, "true");
          localStorage.setItem(emailKey, email);
        } else {
          localStorage.removeItem(rememberKey);
          localStorage.removeItem(emailKey);
        }

        // Show welcome screen immediately
        setShowWelcome(true);

        // redirect after 3s based on role (welcome screen duration)
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else if (role === "seller") {
            navigate("/seller-dashboard");
          } else {
            navigate("/");
          }
        }, 3000);
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
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

  // Load remembered email on component mount based on role
  React.useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    const rememberedEmail = localStorage.getItem("userEmail");

    if (remembered === "true" && rememberedEmail) {
      setRememberMe(true);
      setEmail(rememberedEmail);
    }
  }, [role]);

  return (
    <div className="bg-emerald-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {showWelcome && <WelcomeScreen />}
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center items-center text-3xl font-bold">
            <img src={icon} alt="Triora Logo" width={50} height={50} />
            <span
              className="text-emerald-900 text-3xl"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Triora
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-emerald-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-emerald-600 hover:text-emerald-800"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-emerald-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-emerald-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-emerald-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-emerald-900 mb-2">
              Sign in as:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  disabled={loading}
                />
                <span className="ml-2 text-sm text-emerald-900">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="seller"
                  checked={role === "seller"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  disabled={loading}
                />
                <span className="ml-2 text-sm text-emerald-900">Seller</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  disabled={loading}
                />
                <span className="ml-2 text-sm text-emerald-900">Admin</span>
              </label>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-emerald-900">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-800"
            >
              Forgot your password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
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
                  <FaLock className="text-emerald-300" />
                </span>
                Sign in
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
                        "googleUser",
                        JSON.stringify(userData)
                      );
                      // Show welcome screen immediately
                      setShowWelcome(true);
                      setTimeout(() => {
                        navigate("/");
                      }, 3000);
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
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-emerald-600 hover:text-emerald-800"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
