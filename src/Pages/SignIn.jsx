"use client"

import React, { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import * as jwtDecodeModule from "jwt-decode"
import icon from "../assets/my-icon.svg"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FaLock, FaFacebookF, FaTwitter, FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa"
import WelcomeScreen from "../Components/WelcomeScreen"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      const endpoint =
        role === "admin"
          ? "https://tri-aura-backend.onrender.com/admin/login"
          : role === "seller"
            ? "https://tri-aura-backend.onrender.com/seller/login"
            : "https://tri-aura-backend.onrender.com/user/login"
      const res = await axios.post(endpoint, {
        email,
        password,
      })

      if (res.data.token) {
        const tokenKey = role === "admin" ? "adminToken" : role === "seller" ? "sellerToken" : "token"
        const emailKey = role === "admin" ? "adminEmail" : role === "seller" ? "sellerEmail" : "userEmail"
        const rememberKey = role === "admin" ? "adminRememberMe" : role === "seller" ? "sellerRememberMe" : "rememberMe"

        localStorage.setItem(tokenKey, res.data.token)

        if (rememberMe) {
          localStorage.setItem(rememberKey, "true")
          localStorage.setItem(emailKey, email)
        } else {
          localStorage.removeItem(rememberKey)
          localStorage.removeItem(emailKey)
        }

        setShowWelcome(true)

        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin-dashboard")
          } else if (role === "seller") {
            navigate("/seller-dashboard")
          } else {
            navigate("/")
          }
        }, 3000)
      } else {
        setError(res.data.message || "Invalid credentials")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your email or password.")
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookSignIn = () => {
    setError("Facebook sign-in not implemented yet")
  }

  const handleTwitterSignIn = () => {
    setError("Twitter sign-in not implemented yet")
  }

  React.useEffect(() => {
    const remembered = localStorage.getItem("rememberMe")
    const rememberedEmail = localStorage.getItem("userEmail")

    if (remembered === "true" && rememberedEmail) {
      setRememberMe(true)
      setEmail(rememberedEmail)
    }
  }, [role])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {showWelcome && <WelcomeScreen />}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-6">
            <img src={icon || "/placeholder.svg"} alt="Triora Logo" width={48} height={48} className="drop-shadow-lg" />
            <span
              className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Triora
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-600 leading-relaxed">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in">
              <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-600 flex-shrink-0"
                aria-label="Close error"
              >
                ✕
              </button>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Sign in as</label>
              <div className="grid grid-cols-3 gap-3">
                {["user", "seller", "admin"].map((r) => (
                  <label key={r} className="relative cursor-pointer">
                    <input
                      type="radio"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={loading}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 rounded-lg border-2 transition-all text-center font-medium text-sm capitalize ${
                        role === r
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {r}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
              />
              <span className="text-sm text-slate-700 font-medium">Remember me</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold transition-all hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
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
                </>
              ) : (
                <>
                  <FaLock size={18} />
                  Sign in
                </>
              )}
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-sm text-slate-500 font-medium">Or continue with</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    try {
                      const userData = jwtDecodeModule.jwtDecode(credentialResponse.credential)
                      localStorage.setItem("googleUser", JSON.stringify(userData))
                      setShowWelcome(true)
                      setTimeout(() => {
                        navigate("/")
                      }, 3000)
                    } catch (err) {
                      setError("Google sign-in failed")
                    }
                  }}
                  onError={() => setError("Google sign-in failed")}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  disabled={loading}
                  className="py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaFacebookF size={18} />
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={handleTwitterSignIn}
                  disabled={loading}
                  className="py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaTwitter size={18} />
                  <span className="hidden sm:inline">Twitter</span>
                </button>
              </div>
            </div>
          </form>

          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-slate-600 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          Or{" "}
          <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            start your 14-day free trial
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignIn
