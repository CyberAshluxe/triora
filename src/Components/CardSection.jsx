"use client";
import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

// ...existing code...

import { ShoppingCart } from "lucide-react";

const productData = [
  {
    id: 1,
    name: "RGB Gaming Keyboard",
    description:
      "Mechanical keyboard with customizable RGB lighting and premium switches",
    image: "/gaming-keyboard-rgb.jpg",
    category: "Gaming Accessories",
    price: 149.99,
  },
  {
    id: 2,
    name: "Wireless Gaming Mouse",
    description:
      "High-precision wireless mouse with adjustable DPI and ergonomic design",
    image: "/gaming-mouse-wireless.jpg",
    category: "Gaming Accessories",
    price: 89.99,
  },
  {
    id: 3,
    name: "Gaming Headset Pro",
    description: "7.1 surround sound headset with noise-canceling microphone",
    image: "/gaming-headset-pro.jpg",
    category: "Gaming Accessories",
    price: 129.99,
  },
  {
    id: 4,
    name: "Gaming Controller Elite",
    description:
      "Professional-grade controller with programmable buttons and haptic feedback",
    image: "/gaming-controller-elite.jpg",
    category: "Gaming Accessories",
    price: 79.99,
  },
  {
    id: 5,
    name: "Gaming Monitor 144Hz",
    description:
      "Ultra-smooth 144Hz display with HDR support and 1ms response time",
    image: "/gaming-monitor-144hz.jpg",
    category: "Gaming Accessories",
    price: 399.99,
  },
  {
    id: 6,
    name: "Vitamin C Serum",
    description:
      "Brightening serum with 20% vitamin C for radiant, youthful skin",
    image: "/vitamin-c-serum.jpg",
    category: "Skincare",
    price: 34.99,
  },
  {
    id: 7,
    name: "Hydrating Face Cream",
    description:
      "Deep moisturizing cream with hyaluronic acid and natural extracts",
    image: "/hydrating-face-cream.jpg",
    category: "Skincare",
    price: 28.99,
  },
  {
    id: 8,
    name: "Anti-Aging Night Serum",
    description:
      "Powerful retinol formula for overnight skin renewal and repair",
    image: "/anti-aging-serum.jpg",
    category: "Skincare",
    price: 42.99,
  },
  {
    id: 9,
    name: "Gentle Cleanser",
    description:
      "pH-balanced facial cleanser that removes impurities without stripping moisture",
    image: "/gentle-cleanser.jpg",
    category: "Skincare",
    price: 18.99,
  },
  {
    id: 10,
    name: "Eye Cream Complex",
    description:
      "Reduces dark circles and puffiness with caffeine and peptides",
    image: "/eye-cream-complex.jpg",
    category: "Skincare",
    price: 32.99,
  },
  {
    id: 11,
    name: "Web Development Mastery",
    description:
      "Complete guide to modern web development with React and Next.js",
    image: "/web-dev-ebook.jpg",
    category: "E-Books",
    price: 19.99,
  },
  {
    id: 12,
    name: "Digital Marketing Guide",
    description: "Master social media marketing and grow your online presence",
    image: "/digital-marketing-ebook.jpg",
    category: "E-Books",
    price: 17.99,
  },
  {
    id: 13,
    name: "Personal Finance 101",
    description: "Learn investment strategies and build wealth for your future",
    image: "/finance-ebook.jpg",
    category: "E-Books",
    price: 15.99,
  },
  {
    id: 14,
    name: "UI/UX Design Principles",
    description:
      "Create stunning user interfaces with proven design methodologies",
    image: "/uiux-design-ebook.jpg",
    category: "E-Books",
    price: 21.99,
  },
  {
    id: 15,
    name: "Python Programming Pro",
    description:
      "From beginner to expert - master Python for data science and automation",
    image: "/python-programming-ebook.jpg",
    category: "E-Books",
    price: 24.99,
  },
];

export function CardSection() {
  const { addToCart } = useCart();
  // Only add to cart, do not navigate
  const handleAddToCart = (product) => {
    const price =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^\d.]/g, ""))
        : product.price;
    addToCart({ ...product, price });
    // No navigation here; user stays on current page
  };
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium gaming gear, skincare
            essentials, and knowledge-packed e-books
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {productData.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Card Button */}
                <button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
