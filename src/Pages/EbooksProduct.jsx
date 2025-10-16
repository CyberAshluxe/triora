"use client";
import React from "react";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";
// import { AuthButtons } from "../Components/auth-buttons"
import { Footer } from "../Components/Footer";
import { ScrollToTop } from "../Components/ScrollTop";
import { ChatAI } from "../Components/ChatAI";
import { Star, ShoppingCart, Heart, Filter } from "lucide-react";

export default function EbooksPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [sellerProducts, setSellerProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const location = useLocation();

  useEffect(() => {
    const savedProducts = localStorage.getItem("sellerProducts");
    if (savedProducts) {
      const allSellerProducts = JSON.parse(savedProducts);
      const ebooksSellerProducts = allSellerProducts.filter(
        (product) => product.category === "ebooks"
      );
      setSellerProducts(ebooksSellerProducts);
    }
  }, []);

  useEffect(() => {
    if (location.state?.activeCategory) {
      setActiveCategory(location.state.activeCategory);
    }
  }, [location.state]);

  const categories = [
    { id: "all", name: "All" },
    { id: "ebooks", name: "E-Books" },
    { id: "fiction", name: "Fiction" },
    { id: "educational", name: "Educational" },
    { id: "selfhelp", name: "Self-Help" },
    { id: "history", name: "History" },
    { id: "nonfiction", name: "Non-Fiction" },
    { id: "comics", name: "Comics & Manga" },
    { id: "biographies", name: "Biographies" },
    { id: "science", name: "Science & Tech" },
    { id: "business", name: "Business & Finance" },
    { id: "seller", name: "Seller Products" },
  ];

  const products = {
    ebooks: [
      {
        id: 1,
        name: "Digital Reading Revolution",
        price: "₦12.99",
        rating: 4.8,
        reviews: 1247,
        image: "/modern-ebook-cover-digital-reading.jpg",
        category: "E-Books",
        description:
          "A comprehensive guide to the digital reading revolution and its impact on modern literature",
      },
      {
        id: 2,
        name: "The Complete E-Reader Guide",
        price: "₦9.99",
        rating: 4.6,
        reviews: 892,
        image: "/ebook-reader-guide-cover.jpg",
        category: "E-Books",
        description:
          "Everything you need to know about choosing and using e-readers effectively",
      },
      {
        id: 3,
        name: "Digital Library Mastery",
        price: "₦14.99",
        rating: 4.9,
        reviews: 1567,
        image: "/digital-library-book-cover.jpg",
        category: "E-Books",
        description:
          "Master the art of building and managing your personal digital library",
      },
      {
        id: 4,
        name: "E-Publishing Essentials",
        price: "₦11.99",
        rating: 4.7,
        reviews: 743,
        image: "/publishing-book-cover-modern.jpg",
        category: "E-Books",
        description:
          "Essential guide to self-publishing your work in the digital age",
      },
      {
        id: 5,
        name: "The Future of Reading",
        price: "₦13.99",
        rating: 4.8,
        reviews: 1123,
        image: "/futuristic-book-cover-technology.jpg",
        category: "E-Books",
        description:
          "Exploring emerging technologies and trends shaping the future of reading",
      },
    ],
    fiction: [
      {
        id: 6,
        name: "Shadows of Tomorrow",
        price: "₦15.99",
        rating: 4.9,
        reviews: 2103,
        image: "/sci-fi-book-cover-dark-futuristic.jpg",
        category: "Fiction",
        description:
          "A thrilling sci-fi adventure exploring the shadows of a dystopian future",
      },
      {
        id: 7,
        name: "The Last Kingdom",
        price: "₦14.99",
        rating: 4.7,
        reviews: 1834,
        image: "/fantasy-kingdom-book-cover.jpg",
        category: "Fiction",
        description:
          "Epic fantasy tale of kingdoms, magic, and the fight for survival",
      },
      {
        id: 8,
        name: "Midnight Chronicles",
        price: "₦13.99",
        rating: 4.6,
        reviews: 1456,
        image: "/mystery-thriller-book-cover-night.jpg",
        category: "Fiction",
        description:
          "Gripping mystery thriller that unfolds under the cover of darkness",
      },
      {
        id: 9,
        name: "Echoes in the Void",
        price: "₦16.99",
        rating: 4.8,
        reviews: 987,
        image: "/space-fiction-book-cover-stars.jpg",
        category: "Fiction",
        description:
          "Space opera adventure through the vast emptiness of the cosmos",
      },
      {
        id: 10,
        name: "The Silent Observer",
        price: "₦12.99",
        rating: 4.5,
        reviews: 1678,
        image: "/psychological-thriller-book-cover.jpg",
        category: "Fiction",
        description:
          "Psychological thriller about a silent observer who sees too much",
      },
    ],
    educational: [
      {
        id: 11,
        name: "Mathematics Fundamentals",
        price: "₦29.99",
        rating: 4.8,
        reviews: 2456,
        image: "/mathematics-textbook-cover.jpg",
        category: "Educational",
        description:
          "Comprehensive mathematics textbook covering fundamental concepts",
      },
      {
        id: 12,
        name: "Physics for Everyone",
        price: "₦34.99",
        rating: 4.9,
        reviews: 1987,
        image: "/physics-education-book-cover.jpg",
        category: "Educational",
        description: "Accessible physics education for students of all levels",
      },
      {
        id: 13,
        name: "World History Comprehensive",
        price: "₦39.99",
        rating: 4.7,
        reviews: 1543,
        image: "/history-textbook-cover-world.jpg",
        category: "Educational",
        description:
          "Complete world history textbook from ancient times to present",
      },
      {
        id: 14,
        name: "Chemistry Made Simple",
        price: "₦31.99",
        rating: 4.6,
        reviews: 1234,
        image: "/chemistry-textbook-colorful.jpg",
        category: "Educational",
        description:
          "Simplified approach to understanding complex chemistry concepts",
      },
      {
        id: 15,
        name: "English Literature Guide",
        price: "₦27.99",
        rating: 4.8,
        reviews: 1876,
        image: "/literature-book-cover-classic.jpg",
        category: "Educational",
        description: "Essential guide to classic and modern English literature",
      },
    ],
    selfhelp: [
      {
        id: 16,
        name: "Mindful Living Daily",
        price: "₦18.99",
        rating: 4.7,
        reviews: 2103,
        image: "/ebooks1.jpg",
        category: "Self-Help",
        description: "Daily practices for mindful living and personal growth",
      },
      {
        id: 17,
        name: "The Confidence Blueprint",
        price: "₦19.99",
        rating: 4.8,
        reviews: 1834,
        image: "/ebooks2.jpg",
        category: "Self-Help",
        description: "Step-by-step guide to building unshakable confidence",
      },
      {
        id: 18,
        name: "Habits That Transform",
        price: "₦17.99",
        rating: 4.6,
        reviews: 1456,
        image: "/ebooks3.jpg",
        category: "Self-Help",
        description: "Powerful habits that can transform your life completely",
      },
      {
        id: 19,
        name: "Emotional Intelligence Mastery",
        price: "₦21.99",
        rating: 4.9,
        reviews: 987,
        image: "/ebooks4.jpg",
        category: "Self-Help",
        description:
          "Master the art of emotional intelligence for better relationships",
      },
      {
        id: 20,
        name: "Your Best Self",
        price: "₦16.99",
        rating: 4.7,
        reviews: 1678,
        image: "/ebooks5.jpg",
        category: "Self-Help",
        description: "Journey to becoming the best version of yourself",
      },
    ],
    history: [
      {
        id: 21,
        name: "Ancient Civilizations",
        price: "₦24.99",
        rating: 4.7,
        reviews: 1897,
        image: "/ebooks6.jpg",
        category: "History",
        description:
          "Comprehensive exploration of ancient civilizations and their legacies",
      },
      {
        id: 22,
        name: "The World Wars",
        price: "₦26.99",
        rating: 4.8,
        reviews: 2345,
        image: "/ebooks7.jpg",
        category: "History",
        description:
          "Detailed account of the World Wars and their global impact",
      },
      {
        id: 23,
        name: "Medieval Europe",
        price: "₦23.99",
        rating: 4.6,
        reviews: 1567,
        image: "/ebooks8.jpg",
        category: "History",
        description: "Journey through the medieval period in European history",
      },
      {
        id: 24,
        name: "American Revolution",
        price: "₦22.99",
        rating: 4.7,
        reviews: 1789,
        image: "/ebooks9.jpg",
        category: "History",
        description:
          "The story of America's fight for independence and freedom",
      },
      {
        id: 25,
        name: "Rise and Fall of Empires",
        price: "₦28.99",
        rating: 4.9,
        reviews: 2134,
        image: "/ebooks10.jpg",
        category: "History",
        description: "Epic tale of empires that shaped world history",
      },
    ],
    nonfiction: [
      {
        id: 26,
        name: "The Human Mind",
        price: "₦20.99",
        rating: 4.7,
        reviews: 1987,
        image: "/ebooks11.jpg",
        category: "Non-Fiction",
        description:
          "Deep dive into the complexities of human cognition and behavior",
      },
      {
        id: 27,
        name: "Climate Change Reality",
        price: "₦22.99",
        rating: 4.8,
        reviews: 2345,
        image: "/ebooks12.jpg",
        category: "Non-Fiction",
        description:
          "Comprehensive analysis of climate change and its global implications",
      },
      {
        id: 28,
        name: "The Art of Negotiation",
        price: "₦19.99",
        rating: 4.6,
        reviews: 1567,
        image: "/ebooks13.jpg",
        category: "Non-Fiction",
        description:
          "Master the skills of effective negotiation in business and life",
      },
      {
        id: 29,
        name: "Modern Philosophy",
        price: "₦24.99",
        rating: 4.7,
        reviews: 1789,
        image: "/ebooks14.jpg",
        category: "Non-Fiction",
        description:
          "Exploring contemporary philosophical thought and its relevance today",
      },
      {
        id: 30,
        name: "The Science of Sleep",
        price: "₦18.99",
        rating: 4.8,
        reviews: 2134,
        image: "/ebooks15.jpg",
        category: "Non-Fiction",
        description:
          "Understanding sleep science and its impact on health and performance",
      },
    ],
    comics: [
      {
        id: 31,
        name: "Cyber Samurai Vol. 1",
        price: "₦11.99",
        rating: 4.5,
        reviews: 1234,
        image: "/ebooks16.jpg",
        category: "Comics & Manga",
        description:
          "High-tech samurai battles in a futuristic cyberpunk world",
      },
      {
        id: 32,
        name: "Dragon's Legacy",
        price: "₦12.99",
        rating: 4.6,
        reviews: 1456,
        image: "/ebooks17.jpg",
        category: "Comics & Manga",
        description:
          "Ancient dragons and mystical adventures in a fantasy realm",
      },
      {
        id: 33,
        name: "Space Explorers",
        price: "₦10.99",
        rating: 4.4,
        reviews: 987,
        image: "/ebooks18.jpg",
        category: "Comics & Manga",
        description: "Epic space adventures and cosmic discoveries",
      },
      {
        id: 34,
        name: "Shadow Ninja Chronicles",
        price: "₦13.99",
        rating: 4.7,
        reviews: 1678,
        image: "/ebooks19.jpg",
        category: "Comics & Manga",
        description: "Stealthy ninja warriors in ancient Japan",
      },
      {
        id: 35,
        name: "Magical Academy",
        price: "₦11.99",
        rating: 4.5,
        reviews: 1345,
        image: "/ebooks20.jpg",
        category: "Comics & Manga",
        description: "Young wizards and witches at a magical school",
      },
    ],
    biographies: [
      {
        id: 36,
        name: "Einstein: A Life",
        price: "₦25.99",
        rating: 4.8,
        reviews: 2156,
        image: "/ebooks21.jpg",
        category: "Biographies",
        description:
          "The definitive biography of Albert Einstein, genius and revolutionary scientist",
      },
      {
        id: 37,
        name: "The Innovators",
        price: "₦27.99",
        rating: 4.7,
        reviews: 1897,
        image: "/ebooks22.jpg",
        category: "Biographies",
        description:
          "Stories of the people who created the computer and the internet",
      },
      {
        id: 38,
        name: "Leaders Who Changed History",
        price: "₦29.99",
        rating: 4.9,
        reviews: 2345,
        image: "/ebooks23.jpg",
        category: "Biographies",
        description:
          "Biographies of world leaders who shaped the course of human history",
      },
      {
        id: 39,
        name: "Artists and Visionaries",
        price: "₦24.99",
        rating: 4.6,
        reviews: 1678,
        image: "/ebooks24.jpg",
        category: "Biographies",
        description:
          "Lives of creative geniuses who revolutionized art and culture",
      },
      {
        id: 40,
        name: "Pioneers of Science",
        price: "₦26.99",
        rating: 4.8,
        reviews: 1987,
        image: "/ebooks25.jpg",
        category: "Biographies",
        description:
          "Biographies of scientists who advanced human knowledge and understanding",
      },
    ],
    science: [
      {
        id: 41,
        name: "Quantum Computing Explained",
        price: "₦32.99",
        rating: 4.9,
        reviews: 2345,
        image: "/ebooks26.jpg",
        category: "Science & Tech",
        description:
          "Comprehensive guide to quantum computing principles and applications",
      },
      {
        id: 42,
        name: "AI and Machine Learning",
        price: "₦34.99",
        rating: 4.8,
        reviews: 1987,
        image: "/ebooks27.jpg",
        category: "Science & Tech",
        description:
          "Deep dive into artificial intelligence and machine learning algorithms",
      },
      {
        id: 43,
        name: "The Universe Explained",
        price: "₦28.99",
        rating: 4.7,
        reviews: 1678,
        image: "/ebooks28.jpg",
        category: "Science & Tech",
        description:
          "Exploring the mysteries of the cosmos and modern astrophysics",
      },
      {
        id: 44,
        name: "Biotechnology Revolution",
        price: "₦31.99",
        rating: 4.8,
        reviews: 2134,
        image: "/ebooks29.jpg",
        category: "Science & Tech",
        description:
          "The latest advancements in biotechnology and genetic engineering",
      },
      {
        id: 45,
        name: "Cybersecurity Fundamentals",
        price: "₦29.99",
        rating: 4.6,
        reviews: 1456,
        image: "/ebooks30.jpg",
        category: "Science & Tech",
        description:
          "Essential principles of cybersecurity and digital protection",
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
      ? allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : activeCategory === "seller"
      ? sellerProducts
          .map((product) => ({
            ...product,
            price: `${product.price.toFixed(2)}`,
            category: "Seller Products",
          }))
          .filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
      : (products[activeCategory] || []).filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

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
            E-Books Collection
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
            Discover our premium selection of e-books designed to educate,
            inspire, and entertain. From fiction to business, find your next
            great read.
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
            <div className="ml-auto flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
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
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
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
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-900">
                      {product.price}
                    </span>
                    <button
                      type="button"
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
            &copy; 2025 E-Books Collection. All rights reserved. Read more,
            learn more.
          </p>
        </div>
      </footer>
    </div>
  );
}
