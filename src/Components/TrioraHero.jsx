"use client";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import gamingSetupImg from "../assets/gaming-setup-with-rgb-keyboard-and-mouse.jpg";
import skincareImg from "../assets/luxury-skincare-products-and-serums.jpg";
import ebookImg from "../assets/digital-books-and-reading-tablet.jpg";
import dealMonthImg from "../assets/special-deal-badge.jpg";
import clearanceSaleImg from "../assets/clearance-sale-tag.jpg";
import deliveryTruckImg from "../assets/delivery-truck-icon.png";
import buyOneGetOneImg from "../assets/buy-one-get-one-free.jpg";
import primeBadgeImg from "../assets/premium-membership-badge.png";
import flashSaleImg from "../assets/flash-sale-icon.svg";
import newArrivalsImg from "../assets/new-arrivals-icon.svg";
import bestSellersImg from "../assets/best-sellers-icon.svg";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  ShoppingBag,
  Package,
  Zap,
  Gamepad2,
  Sparkles,
  BookOpen,
} from "lucide-react";

const categories = [
  {
    icon: Gamepad2,
    label: "Gaming Accessories",
    href: "gaming",
    slideIndex: 0,
  },
  { icon: Sparkles, label: "Skincare", href: "/skincare", slideIndex: 1 },
  { icon: BookOpen, label: "E-Books", href: "/ebooks", slideIndex: 2 },
];

const heroSlides = [
  {
    title: "Gaming Mode",
    description: "Upgrade your gaming gear",
    date: "Sept 29 - Oct 5",
    bgColor: "from-purple-500/80 to-pink-500/80",
    image: gamingSetupImg,
  },
  {
    title: "Skincare Essentials",
    description: "Premium skincare products",
    date: "Limited Time",
    bgColor: "from-rose-400/80 to-green-400/80",
    image: skincareImg,
  },
  {
    title: "E-Book Collection",
    description: "Expand your digital library",
    date: "New Releases",
    bgColor: "from-green-500/80 to-cyan-500/80",
    image: ebookImg,
  },
];

const promoTiles = [
  {
    title: "Deal of the Month",
    bgColor: "bg-red-600",
    image: dealMonthImg,
  },
  {
    title: "Up to 80% Off",
    bgColor: "bg-yellow-500",
    image: clearanceSaleImg,
  },
  {
    title: "Send Packages Securely",
    bgColor: "bg-green-600",
    image: deliveryTruckImg,
  },
  {
    title: "Buy 2 pay for 1",
    bgColor: "bg-black",
    image: buyOneGetOneImg,
  },
  {
    title: "Triora Prime",
    subtitle: "JOIN NOW",
    bgColor: "bg-green-500",
    image: primeBadgeImg,
  },
  {
    title: "Flash Sale",
    bgColor: "bg-pink-600",
    image: flashSaleImg,
  },
  {
    title: "New Arrivals",
    bgColor: "bg-green-700",
    image: newArrivalsImg,
  },
  {
    title: "Best Sellers",
    bgColor: "bg-purple-700",
    image: bestSellersImg,
  },
];

export function TrioraHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );

  const scrollLeft = () =>
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () =>
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" });

  return (
    <div className=" bg-gradient-to-b from-green-600 to-green-700">
      <div className="container mx-auto px-2 py-2 sm:px-4 sm:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
          {/* Sidebar Categories */}
          <div className="col-span-1 sm:col-span-2 bg-white rounded shadow mb-2 sm:mb-0">
            <nav className="flex flex-col">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <a
                    key={index}
                    href={category.href}
                    onMouseEnter={() => setCurrentSlide(category.slideIndex)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">
                      {category.label}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Hero Carousel */}
          <div className="col-span-1 sm:col-span-7 relative mb-2 sm:mb-0">
            <div className="relative h-[200px] sm:h-[320px] rounded-lg overflow-hidden">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}
                  />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="relative h-full flex flex-col justify-center px-4 sm:px-10 text-white">
                    <h2 className="text-2xl sm:text-5xl font-bold mb-1 sm:mb-2 text-yellow-300">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-xl font-semibold mb-1 text-yellow-200">
                      {slide.date}
                    </p>
                    <p className="text-base sm:text-2xl font-bold mb-2 sm:mb-4 text-purple-200">
                      {slide.description}
                    </p>
                    <button className="bg-white text-gray-900 px-3 py-1 sm:px-6 sm:py-2 rounded font-semibold hover:bg-gray-100 text-xs sm:text-base">
                      <Link to="/shop" className="block w-full h-full">
                        SHOP NOW
                      </Link>
                    </button>
                  </div>
                </div>
              ))}

              {/* Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1 sm:col-span-3 flex flex-col gap-2 sm:gap-3">
            <div className="bg-white p-2 sm:p-4 flex items-center gap-2 sm:gap-3 rounded shadow cursor-pointer">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-sm">CALL TO ORDER</p>
                <p className="text-xs text-gray-600">0814-668-0963</p>
              </div>
            </div>
            <Link to="/seller-dashboard" className="block">
              <div className="bg-white p-2 sm:p-4 flex items-center gap-2 sm:gap-3 rounded shadow cursor-pointer transition-all hover:bg-green-50 hover:shadow-md">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-sm">Sell on Triora</p>
              </div>
            </Link>
            <Link to="/send-packages-securely" className="block">
              <div className="bg-white p-2 sm:p-4 flex items-center gap-2 sm:gap-3 rounded shadow cursor-pointer hover:bg-green-50 hover:shadow-md">
                <Package className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-sm">Send Your Packages</p>
              </div>
            </Link>
            <Link to="/triora-prime" className="block">
              <div className="bg-green-500 p-3 sm:p-6 flex flex-col items-center justify-center text-white rounded shadow cursor-pointer">
                <Zap className="w-10 h-10 mb-2" />
                <p className="text-base sm:text-xl font-bold">TRIORA FORCE</p>
                <button className="mt-2 sm:mt-3 bg-white text-green-600 px-2 py-1 sm:px-4 sm:py-2 rounded font-bold hover:bg-gray-100 text-xs sm:text-base">
                  JOIN NOW
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Promo Tiles */}
        <div className="mt-4 sm:mt-6 relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {promoTiles.map((tile, index) => {
              const getLink = (title) => {
                switch (title) {
                  case "Flash Sale":
                    return "/flash-sale";
                  case "New Arrivals":
                    return "/new-arrivals";
                  case "Best Sellers":
                    return "/best-sellers";
                  case "Deal of the Month":
                    return "/deal-of-the-month";
                  case "Up to 80% Off":
                    return "/up-to-80-off";
                  case "Send Packages Securely":
                    return "/send-packages-securely";
                  case "Buy 2 pay for 1":
                    return "/buy-2-pay-for-1";
                  case "Triora Prime":
                    return "/triora-prime";
                  default:
                    return null;
                }
              };
              const link = getLink(tile.title);
              const content = (
                <>
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain mb-1 sm:mb-2 rounded shadow-lg transition-transform duration-200 hover:scale-110"
                  />
                  <p className="font-bold text-xs sm:text-sm">{tile.title}</p>
                  {tile.subtitle && (
                    <p className="text-xs sm:text-base font-bold">
                      {tile.subtitle}
                    </p>
                  )}
                </>
              );
              return link ? (
                <Link
                  key={index}
                  to={link}
                  className={`${tile.bgColor} min-w-[120px] sm:min-w-[180px] h-[80px] sm:h-[120px] flex flex-col items-center justify-center text-white rounded cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:ring-4 active:ring-white/40`}
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={index}
                  className={`${tile.bgColor} min-w-[120px] sm:min-w-[180px] h-[80px] sm:h-[120px] flex flex-col items-center justify-center text-white rounded cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:ring-4 active:ring-white/40`}
                  onClick={() => window.alert(`You clicked: ${tile.title}`)}
                >
                  {content}
                </div>
              );
            })}
          </div>
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 sm:p-2 shadow"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
