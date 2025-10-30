"use client"
import React from "react"
import { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import * as jwtDecodeModule from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash, FaLock, FaUser, FaEnvelope, FaCheck } from "react-icons/fa"
import icon from "../assets/my-icon.svg";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [role, setRole] = useState("user")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error || success) {
      setError("")
      setSuccess("")
    }
  }

  const validateForm = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("All fields are required")
      return false
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) return

    setLoading(true)
    try {
      const endpoint =
        role === "admin"
          ? "https://tri-aura-backend.onrender.com/admin/register"
          : role === "seller"
            ? "https://tri-aura-backend.onrender.com/seller/register"
            : "https://tri-aura-backend.onrender.com/user/register"
      const res = await axios.post(endpoint, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })

      setSuccess("Signup successful! Redirecting to login...")
      setTimeout(() => navigate("/signin"), 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (response) => {
    setLoading(true)
    setError("")
    try {
      const userData = jwtDecodeModule.jwtDecode(response.credential)

      const backendRes = await axios.post("https://tri-aura-backend.onrender.com/user/google-auth", {
        token: response.credential,
      })

      if (backendRes.data.token) {
        localStorage.setItem("token", backendRes.data.token)
        localStorage.setItem("user", JSON.stringify(backendRes.data.user))
        setSuccess("Google signup successful! Redirecting...")
        setTimeout(() => navigate("/signin"), 2000)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Google signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => setError("Google sign up failed. Please try again.")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
         <div className="flex justify-center items-center text-3xl font-bold">
                     <img src={icon} alt="Triora Logo" width={50} height={50} />
                     <span
                       className="text-emerald-900 text-3xl"
                       style={{ fontFamily: "'Orbitron', sans-serif" }}
                     >
                       Triora
                     </span>
                   </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600 text-sm leading-relaxed">Join our community and start your journey today</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
            <button onClick={() => setError("")} className="text-red-600 hover:text-red-700 transition-colors">
              ✕
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex-shrink-0 mt-0.5">
              <FaCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-emerald-800">{success}</p>
          </div>
        )}

        {/* Google Login */}
        <div className="mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_green"
            size="large"
            text="signup_with"
            shape="rectangular"
            width="100%"
          />
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs font-medium text-slate-500 uppercase tracking-wide">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative group">
              <input
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                disabled={loading}
                className="w-full px-4 py-3 pl-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
                required
              />
              <FaUser className="absolute left-3.5 top-3.5 text-slate-400 text-sm group-focus-within:text-emerald-500 transition-colors" />
            </div>

            <div className="relative group">
              <input
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                disabled={loading}
                className="w-full px-4 py-3 pl-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
                required
              />
              <FaUser className="absolute left-3.5 top-3.5 text-slate-400 text-sm group-focus-within:text-emerald-500 transition-colors" />
            </div>
          </div>

          {/* Email */}
          <div className="relative group">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              disabled={loading}
              className="w-full px-4 py-3 pl-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
              required
            />
            <FaEnvelope className="absolute left-3.5 top-3.5 text-slate-400 text-sm group-focus-within:text-emerald-500 transition-colors" />
          </div>

          {/* Password */}
          <div className="relative group">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              disabled={loading}
              className="w-full px-4 py-3 pl-11 pr-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
              required
            />
            <FaLock className="absolute left-3.5 top-3.5 text-slate-400 text-sm group-focus-within:text-emerald-500 transition-colors" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-emerald-600 transition-colors disabled:cursor-not-allowed"
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              disabled={loading}
              className="w-full px-4 py-3 pl-11 pr-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
              required
            />
            <FaLock className="absolute left-3.5 top-3.5 text-slate-400 text-sm group-focus-within:text-emerald-500 transition-colors" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-emerald-600 transition-colors disabled:cursor-not-allowed"
              disabled={loading}
            >
              {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
            </button>
          </div>

          {/* Role Selection */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
              Sign up as
            </label>
            <div className="flex gap-3">
              {["user", "seller", "admin"].map((roleOption) => (
                <label key={roleOption} className="flex items-center cursor-pointer group flex-1">
                  <input
                    type="radio"
                    value={roleOption}
                    checked={role === roleOption}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    disabled={loading}
                  />
                  <span className="ml-2 text-sm font-medium text-slate-700 capitalize group-hover:text-emerald-600 transition-colors">
                    {roleOption}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <a href="/signin" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
