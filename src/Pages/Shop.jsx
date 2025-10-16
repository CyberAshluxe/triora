"use client";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, Sparkles, Gamepad, Search, X } from "lucide-react";

export default function ProductsPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [showSearch, setShowSearch] = useState(!!searchParams.get("search"));

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
      setShowSearch(true);
    }
  }, [searchParams]);

  const categories = [
    {
      id: "skincare",
      title: "Radiant Skincare Essentials",
      description:
        "Take your skincare game to the next level with premium essentials made to hydrate, refresh, and boost your natural glow. Everything you need for everyday confidence and self-care.",
      cta: "Shop Skincare",
      link: "/skincare",
      image: "/premium-skincare-products-bottles-and-serums-on-cl.jpg",
      icon: Sparkles,
    },
    {
      id: "gaming",
      title: "Next-Level Gaming Gear",
      description:
        "Game smarter and play longer with our collection of reliable gaming accessories. From high-precision mice to ultra-responsive keyboards, upgrade your setup the right way.",
      cta: "Explore Gaming",
      link: "/gaming",
      image: "/futuristic-gaming-setup-with-rgb-keyboard-mouse-an.jpg",
      icon: Gamepad,
    },
    {
      id: "ebooks",
      title: "Digital Knowledge Library",
      description:
        "Instant access to eBooks that fuel curiosity and growth. Explore tech guides, personal development reads, and inspiring lifestyle content that fits your goals.",
      cta: "Browse eBooks",
      link: "/ebooks",
      image: "/digital-ebook-library-on-tablet-with-modern-interf.jpg",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      {/* Search Section */}
      {showSearch && (
        <section className="bg-white border-b py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                  setSearchParams({});
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setSearchParams({ search: searchQuery });
                  }
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <p className="text-gray-600">
              Search results for "
              <span className="font-semibold">{searchQuery}</span>" - Try
              searching in specific categories for better results.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`${category.link}?search=${encodeURIComponent(searchQuery)}`}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                >
                  Search in {category.title.split(" ")[0]}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Tri-Aura’s Product Universe
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Discover the balance between self-care, creativity, and growth.
            Explore premium skincare, pro-level gaming gear, and digital
            knowledge — all in one place.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-emerald-100"
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 text-3xl">
                  <category.icon className="w-8 h-8 text-emerald-500" />
                </div>
                {hoveredCard === category.id && (
                  <div className="absolute inset-0 bg-emerald-900/20 transition-opacity"></div>
                )}
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                  {category.title}
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <Link to={category.link}>
                  <button className="w-full py-3 px-6 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-300">
                    {category.cta}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Upgrade Your Lifestyle?
          </h3>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who trust Tri-Aura for products that bring
            confidence, comfort, and creativity into everyday life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/skincare">
              <button className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition-all">
                Shop Skincare
              </button>
            </Link>
            <Link to="/gaming">
              <button className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition-all">
                Shop Gaming
              </button>
            </Link>
            <Link to="/ebooks">
              <button className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-100 transition-all">
                Shop eBooks
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
