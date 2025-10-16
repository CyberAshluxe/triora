"use client"
import React from "react"

import { useState } from "react"
import { LogIn, LogOut, UserPlus } from "lucide-react"

export function AuthButtons() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const handleSignIn = () => {
    // Simulate sign in
    setIsSignedIn(true)
  }

  const handleSignUp = () => {
    // Simulate sign up
    setIsSignedIn(true)
  }

  const handleLogout = () => {
    setIsSignedIn(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {!isSignedIn ? (
        <>
          <button
            onClick={handleSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up
          </button>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      )}
    </div>
  )
}
