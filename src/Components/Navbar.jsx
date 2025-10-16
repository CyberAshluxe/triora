import React, { useState } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/my=icon.svg";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartItemsCount } = useCart();
  const itemCount = getCartItemsCount();
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isLoggedIn =
    !!localStorage.getItem("token") || !!localStorage.getItem("googleUser");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("googleUser");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleChat = () => {
    navigate("/chat-ai"); // or your AI chat route
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex items-center text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors"
            >
              <img src={logo} alt="Triora Logo" className="h-8 w-8 mr-2" />
              Triora
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden sm:inline-flex text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User Account */}
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg">
                  {isLoggedIn ? (
                    <>
                      <a
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        My Account
                      </a>
                      <a
                        href="/seller-dashboard"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Seller Dashboard
                      </a>
                      <a
                        href="/admin-dashboard"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Admin Dashboard
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="/signin"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Sign In
                      </a>
                      <a
                        href="/signup"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
              <span>Cart</span>
            </Link>
            {/* Chat with AI */}

            {/* Logout */}
            {isLoggedIn && (
              <div className="relative group">
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Logout
                </span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Mobile Search */}
            <button
              onClick={() => {
                setSearchModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="top-2 inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Search Products
                </h2>
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      navigate(
                        `/shop?search=${encodeURIComponent(searchQuery)}`
                      );
                      setSearchModalOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                    setSearchModalOpen(false);
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
