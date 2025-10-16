"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useCart } from "../Context/CartContext";

export default function BestSellersPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState(new Set());
  const [sellerProducts, setSellerProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const savedProducts = localStorage.getItem("sellerProducts");
    if (savedProducts) {
      const allSellerProducts = JSON.parse(savedProducts);
      const bestSellersSellerProducts = allSellerProducts.filter(
        (product) => product.category === "best-sellers"
      );
      setSellerProducts(bestSellersSellerProducts);
    }
  }, []);

  const categories = [
    { id: "all", name: "All" },
    { id: "gaming", name: "Gaming" },
    { id: "skincare", name: "Skincare" },
    { id: "ebooks", name: "E-Books" },
    { id: "seller", name: "Seller Products" },
  ];

  const products = {
    gaming: [
      {
        id: 1,
        name: "Tri-Aura Console X - Best Seller",
        price: "₦499",
        image: "/futuristic-gaming-console-black-purple.jpg",
        category: "Gaming",
        isBestSeller: true,
      },
      {
        id: 2,
        name: "Aura Mech Pro Keyboard - Best Seller",
        price: "₦159",
        image: "/mechanical-gaming-keyboard-rgb.jpg",
        category: "Gaming",
        isBestSeller: true,
      },
      {
        id: 3,
        name: "Aura Precision Pro Mouse - Best Seller",
        price: "₦79",
        image: "/gaming-mouse-ergonomic-purple.jpg",
        category: "Gaming",
        isBestSeller: true,
      },
    ],
    skincare: [
      {
        id: 4,
        name: "Hyaluronic Acid Serum - Best Seller",
        price: "₦49",
        image: "/hyaluronic-acid-serum.jpg",
        category: "Skincare",
        isBestSeller: true,
      },
      {
        id: 5,
        name: "Retinol Night Serum - Best Seller",
        price: "₦59",
        image: "/retinol-night-serum.jpg",
        category: "Skincare",
        isBestSeller: true,
      },
    ],
    ebooks: [
      {
        id: 6,
        name: "Digital Marketing Ebook - Best Seller",
        price: "₦19",
        image: "/digital-marketing-ebook.jpg",
        category: "E-Books",
        isBestSeller: true,
      },
      {
        id: 7,
        name: "Python Programming Ebook - Best Seller",
        price: "₦24",
        image: "/python-programming-ebook.jpg",
        category: "E-Books",
        isBestSeller: true,
      },
    ],
  };

  const allProducts = [
    ...Object.values(products).flat(),
    ...sellerProducts.map((product) => ({
      ...product,
      price: `${product.price.toFixed(2)}`,
      category: "Seller Products",
    })),
  ];

  const filteredProducts =
    activeCategory === "all"
      ? allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : activeCategory === "seller"
      ? sellerProducts
          .map((product) => ({
            ...product,
            price: `${product.price.toFixed(2)}`,
            category: "Seller Products",
          }))
          .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      : (products[activeCategory] || []).filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Best Sellers
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
            Explore our top-rated and most popular products. Customer favorites
            across all categories!
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="font-semibold text-gray-900">
                Filter by Category
              </span>
            </div>
            <div className="ml-auto">
              <span className="text-sm text-gray-600">Sort By</span>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all text-sm ${
                  activeCategory === category.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredProducts.length}</span>{" "}
              products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Best Seller Badge */}
                  {product.isBestSeller && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                        BEST SELLER
                      </span>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    aria-label="Add to favorites"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        favorites.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                      fill={favorites.has(product.id) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 hover:scale-105 transition-all duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 Tri-Aura. All rights reserved. Shop our best-selling
            products!
          </p>
        </div>
      </footer>
    </div>
  );
}
