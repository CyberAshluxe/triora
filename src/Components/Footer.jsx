"use client"
import { Facebook, Twitter, Instagram } from "lucide-react"
import React from "react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-emerald-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="#new-arrivals" className="hover:text-emerald-400 transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-emerald-400 transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#accessories" className="hover:text-emerald-400 transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#gift-cards" className="hover:text-emerald-400 transition-colors">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#faqs" className="hover:text-emerald-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-emerald-400 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <p className="text-sm mb-4">Stay connected for the latest updates and exclusive deals</p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Tri-Aura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
