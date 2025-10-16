"use client"
import React from "react"

import { useState } from "react"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setEmail("")
        setIsSubscribed(false)
      }, 3000)
    }
  }

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stay Ahead of the Tech Game</h2>

        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Subscribe to get exclusive deals, early access to new product drops, and insider updates delivered straight to
          your inbox.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubscribed}
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isSubscribed ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Subscribed!
              </>
            ) : (
              "Join Now"
            )}
          </button>
        </form>

        {/* Trust Badge */}
        <p className="text-sm text-gray-500 mt-4">🔒 We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
