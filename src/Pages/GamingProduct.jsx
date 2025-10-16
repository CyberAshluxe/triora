"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { Star } from "lucide-react";

export default function GamingPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState(new Set());
  const [sellerProducts, setSellerProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const location = useLocation();

  useEffect(() => {
    const savedProducts = localStorage.getItem("sellerProducts");
    if (savedProducts) {
      const allSellerProducts = JSON.parse(savedProducts);
      const gamingSellerProducts = allSellerProducts.filter(
        (product) => product.category === "gaming"
      );
      setSellerProducts(gamingSellerProducts);
    }
  }, []);

  useEffect(() => {
    if (location.state?.activeCategory) {
      setActiveCategory(location.state.activeCategory);
    }
  }, [location.state]);

  const categories = [
    { id: "all", name: "All" },
    { id: "consoles", name: "Consoles" },
    { id: "headsets", name: "Headsets" },
    { id: "keyboards", name: "Keyboards" },
    { id: "mice", name: "Gaming Mice" },
    { id: "monitors", name: "Monitors" },
    { id: "components", name: "PC Components" },
    { id: "controllers", name: "Controllers" },
    { id: "vr", name: "VR Headsets" },
    { id: "mobile", name: "Mobile Gaming" },
    { id: "merch", name: "Game Merch" },
    { id: "seller", name: "Seller Products" },
  ];

  const products = {
    consoles: [
      {
        id: 1,
        name: "Console X",
        price: "₦49900",
        rating: 4.9,
        reviews: 2156,
        image: "/futuristic-gaming-console-black-purple.jpg",
        category: "Consoles",
        description: "Next-generation gaming console with stunning graphics and immersive gameplay",
      },
      {
        id: 2,
        name: "Console Pro",
        price: "₦69900",
        rating: 4.8,
        reviews: 1897,
        image: "/premium-gaming-console-white-gold.jpg",
        category: "Consoles",
        description: "Professional-grade console for serious gamers with advanced features",
      },
      {
        id: 3,
        name: "Portable",
        price: "₦39900",
        rating: 4.7,
        reviews: 1678,
        image: "/portable-gaming-console-handheld.jpg",
        category: "Consoles",
        description: "Compact portable console perfect for gaming on the go",
      },
      {
        id: 4,
        name: "Tri- Retro Edition",
        price: "₦299000",
        rating: 4.6,
        reviews: 1456,
        image: "/retro-gaming-console-colorful.jpg",
        category: "Consoles",
        description: "Nostalgic retro gaming console with classic games and modern features",
      },
      {
        id: 5,
        name: "Tri- Elite Bundle",
        price: "₦89900",
        rating: 4.9,
        reviews: 2134,
        image: "/gaming-console-bundle-accessories.jpg",
        category: "Consoles",
        description: "Complete gaming bundle with console and premium accessories",
      },
    ],
    headsets: [
      {
        id: 6,
        name: " Sound Pro",
        price: "₦199",
        rating: 4.8,
        reviews: 2156,
        image: "/premium-gaming-headset-purple-led.jpg",
        category: "Headsets",
        description: "Premium gaming headset with exceptional sound quality and comfort",
      },
      {
        id: 7,
        name: " Wireless Elite",
        price: "₦249",
        rating: 4.7,
        reviews: 1897,
        image: "/wireless-gaming-headset-black.jpg",
        category: "Headsets",
        description: "Wireless gaming headset with long battery life and crystal clear audio",
      },
      {
        id: 8,
        name: " 7.1 Surround",
        price: "₦179",
        rating: 4.6,
        reviews: 1678,
        image: "/surround-sound-gaming-headset.jpg",
        category: "Headsets",
        description: "Immersive 7.1 surround sound gaming headset for competitive play",
      },
      {
        id: 9,
        name: " Stealth",
        price: "₦149",
        rating: 4.5,
        reviews: 1456,
        image: "/sleek-gaming-headset-minimalist.jpg",
        category: "Headsets",
        description: "Minimalist design gaming headset with excellent noise isolation",
      },
      {
        id: 10,
        name: " Tournament",
        price: "₦299",
        rating: 4.9,
        reviews: 2134,
        image: "/professional-esports-headset.jpg",
        category: "Headsets",
        description: "Professional esports headset designed for tournament-level performance",
      },
    ],
    keyboards: [
      {
        id: 11,
        name: " Mech Pro",
        price: "₦159",
        rating: 4.7,
        reviews: 1897,
        image: "/mechanical-gaming-keyboard-rgb.jpg",
        category: "Keyboards",
        description: "Mechanical gaming keyboard with RGB lighting and tactile switches",
      },
      {
        id: 12,
        name: " Wireless Mech",
        price: "₦189",
        rating: 4.6,
        reviews: 1678,
        image: "/wireless-mechanical-keyboard.jpg",
        category: "Keyboards",
        description: "Wireless mechanical keyboard with long battery life and customizable keys",
      },
      {
        id: 13,
        name: " Compact 60%",
        price: "₦129",
        rating: 4.5,
        reviews: 1456,
        image: "/compact-60-percent-gaming-keyboard.jpg",
        category: "Keyboards",
        description: "Compact 60% layout keyboard perfect for minimal desk setups",
      },
      {
        id: 14,
        name: " RGB Elite",
        price: "₦199",
        rating: 4.8,
        reviews: 2134,
        image: "/rgb-gaming-keyboard-colorful.jpg",
        category: "Keyboards",
        description: "Elite RGB gaming keyboard with customizable lighting effects",
      },
      {
        id: 15,
        name: " Tournament TKL",
        price: "₦169",
        rating: 4.7,
        reviews: 1987,
        image: "/tenkeyless-gaming-keyboard-professional.jpg",
        category: "Keyboards",
        description: "Tenkeyless tournament-grade keyboard for competitive gaming",
      },
    ],
    mice: [
      {
        id: 16,
        name: " Precision Pro",
        price: "₦79",
        rating: 4.6,
        reviews: 1678,
        image: "/gaming-mouse-ergonomic-purple.jpg",
        category: "Gaming Mice",
        description: "Ergonomic gaming mouse with precision tracking and customizable DPI",
      },
      {
        id: 17,
        name: " Wireless Ultra",
        price: "₦99",
        rating: 4.7,
        reviews: 1897,
        image: "/wireless-gaming-mouse-white.jpg",
        category: "Gaming Mice",
        description: "Ultra-lightweight wireless gaming mouse with long battery life",
      },
      {
        id: 18,
        name: " FPS Elite",
        price: "₦89",
        rating: 4.8,
        reviews: 2134,
        image: "/fps-gaming-mouse-lightweight.jpg",
        category: "Gaming Mice",
        description: "Elite FPS gaming mouse designed for competitive first-person shooters",
      },
      {
        id: 19,
        name: " MMO Master",
        price: "₦109",
        rating: 4.5,
        reviews: 1456,
        image: "/mmo-gaming-mouse-with-buttons.jpg",
        category: "Gaming Mice",
        description: "MMO gaming mouse with programmable buttons for complex macros",
      },
      {
        id: 20,
        name: " Ambidextrous",
        price: "₦69",
        rating: 4.4,
        reviews: 1234,
        image: "/ambidextrous-gaming-mouse.jpg",
        category: "Gaming Mice",
        description: "Ambidextrous gaming mouse suitable for left and right-handed users",
      },
    ],
    monitors: [
      {
        id: 21,
        name: ' Display 27" 4K',
        price: "₦599",
        rating: 4.7,
        reviews: 1897,
        image: "/4k-gaming-monitor-27-inch.jpg",
        category: "Monitors",
        description: "27-inch 4K gaming monitor with stunning visuals and high resolution",
      },
      {
        id: 22,
        name: ' Curved 34"',
        price: "₦799",
        rating: 4.8,
        reviews: 2134,
        image: "/curved-ultrawide-gaming-monitor.jpg",
        category: "Monitors",
        description: "34-inch curved ultrawide gaming monitor for immersive gaming experience",
      },
      {
        id: 23,
        name: " 240Hz Pro",
        price: "₦499",
        rating: 4.6,
        reviews: 1678,
        image: "/240hz-gaming-monitor.jpg",
        category: "Monitors",
        description: "240Hz refresh rate gaming monitor for smooth and fast-paced gameplay",
      },
      {
        id: 24,
        name: ' OLED 32"',
        price: "₦1299",
        rating: 4.9,
        reviews: 2156,
        image: "/oled-gaming-monitor.jpg",
        category: "Monitors",
        description: "32-inch OLED gaming monitor with perfect blacks and vibrant colors",
      },
      {
        id: 25,
        name: ' Portable 15"',
        price: "₦299",
        rating: 4.4,
        reviews: 1234,
        image: "/portable-gaming-monitor.jpg",
        category: "Monitors",
        description: "15-inch portable gaming monitor perfect for travel and on-the-go gaming",
      },
    ],
    components: [
      {
        id: 26,
        name: " GPU RTX Pro",
        price: "₦899",
        rating: 4.8,
        reviews: 2134,
        image: "/gaming-graphics-card-rgb.jpg",
        category: "PC Components",
        description: "High-performance RTX graphics card with RGB lighting for gaming",
      },
      {
        id: 27,
        name: " CPU Cooler RGB",
        price: "₦129",
        rating: 4.6,
        reviews: 1678,
        image: "/rgb-cpu-cooler.jpg",
        category: "PC Components",
        description: "RGB CPU cooler with efficient cooling and customizable lighting",
      },
      {
        id: 28,
        name: " RAM 32GB Kit",
        price: "₦179",
        rating: 4.7,
        reviews: 1897,
        image: "/rgb-gaming-ram.jpg",
        category: "PC Components",
        description: "32GB RGB gaming RAM kit for improved system performance",
      },
      {
        id: 29,
        name: " SSD 2TB NVMe",
        price: "₦249",
        rating: 4.9,
        reviews: 2156,
        image: "/nvme-ssd.jpg",
        category: "PC Components",
        description: "2TB NVMe SSD for lightning-fast storage and loading times",
      },
      {
        id: 30,
        name: " PSU 850W",
        price: "₦159",
        rating: 4.5,
        reviews: 1456,
        image: "/modular-power-supply.jpg",
        category: "PC Components",
        description: "850W modular power supply for reliable and efficient power delivery",
      },
    ],
    controllers: [
      {
        id: 31,
        name: " Pro Controller",
        price: "₦79",
        rating: 4.6,
        reviews: 1678,
        image: "/pro-gaming-controller.jpg",
        category: "Controllers",
        description: "Professional gaming controller with ergonomic design and precise controls",
      },
      {
        id: 32,
        name: " Elite Wireless",
        price: "₦99",
        rating: 4.7,
        reviews: 1897,
        image: "/wireless-gaming-controller.jpg",
        category: "Controllers",
        description: "Elite wireless gaming controller with long battery life and customizable buttons",
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
 const [sortBy, setSortBy] = useState("price-low"); // Initialize with a default value

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Level Up Your Gaming Arsenal
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
            Discover our premium selection of gaming accessories designed to
            enhance performance, elevate your setup, and dominate the
            competition.
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
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
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
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-emerald-600">
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
      {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 Tri-Aura. All rights reserved. Built for gamers, by gamers.
          </p>
        </div>
      </footer>
    </div>
  );
}
