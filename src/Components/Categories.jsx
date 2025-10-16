// Add this style to hide scrollbars cross-browser
import "../styles/scrollbar-hide.css";
("use client");
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Gamepad2,
  Headphones,
  Keyboard,
  Mouse,
  Monitor,
  Cpu,
  Joystick,
  Tv,
  Smartphone,
  Sparkles,
  Droplet,
  Flower2,
  Heart,
  Sun,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Book,
  BookMarked,
  GraduationCap,
  Lightbulb,
  Library,
  FileText,
  PenTool,
  User,
} from "lucide-react";

export const Categories = () => {
  const categories = [
    // Gaming (10)
    { icon: Gamepad2, label: "Consoles" },
    { icon: Headphones, label: "Headsets" },
    { icon: Keyboard, label: "Keyboards" },
    { icon: Mouse, label: "Gaming Mice" },
    { icon: Monitor, label: "Monitors" },
    { icon: Cpu, label: "PC Components" },
    { icon: Joystick, label: "Controllers" },
    { icon: Tv, label: "VR Headsets" },
    { icon: Smartphone, label: "Mobile Gaming" },
    { icon: Sparkles, label: "Game Merch" },

    // Skincare (10)
    { icon: Droplet, label: "Serums & Oils" },
    { icon: Flower2, label: "Natural Beauty" },
    { icon: Heart, label: "Anti-Aging" },
    { icon: Sun, label: "Sunscreen" },
    { icon: FlaskConical, label: "Cleansers" },
    { icon: Leaf, label: "Organic Skincare" },
    { icon: ShieldCheck, label: "Acne Care" },
    { icon: Sparkles, label: "Face Masks" },
    { icon: Droplet, label: "Moisturizers" },
    { icon: Heart, label: "Eye Creams" },

    // E-books (10)
    { icon: Book, label: "E-Books" },
    { icon: BookMarked, label: "Fiction" },
    { icon: GraduationCap, label: "Educational" },
    { icon: Lightbulb, label: "Self-Help" },
    { icon: Library, label: "History" },
    { icon: FileText, label: "Non-Fiction" },
    { icon: PenTool, label: "Comics & Manga" },
    { icon: User, label: "Biographies" },
    { icon: Book, label: "Science & Tech" },
    { icon: Lightbulb, label: "Business & Finance" },
  ];

  const categoryHeadings = ["Gaming", "Skincare", "E-books"];
  const rows = [];
  const rowRefs = [useRef(null), useRef(null), useRef(null)];

  for (let i = 0; i < categories.length; i += 10) {
    rows.push(categories.slice(i, i + 10));
  }

  const scrollRow = (rowIndex, direction) => {
    if (rowRefs[rowIndex].current) {
      const scrollAmount = rowRefs[rowIndex].current.offsetWidth * 0.8;
      rowRefs[rowIndex].current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getGamingId = (label) => {
    const map = {
      "Consoles": "consoles",
      "Headsets": "headsets",
      "Keyboards": "keyboards",
      "Gaming Mice": "mice",
      "Monitors": "monitors",
      "PC Components": "components",
      "Controllers": "controllers",
      "VR Headsets": "vr",
      "Mobile Gaming": "mobile",
      "Game Merch": "merch"
    };
    return map[label] || "all";
  };

  const getEbooksId = (label) => {
    const map = {
      "E-Books": "ebooks",
      "Fiction": "fiction",
      "Educational": "educational",
      "Self-Help": "selfhelp",
      "History": "history",
      "Non-Fiction": "nonfiction",
      "Comics & Manga": "comics",
      "Biographies": "biographies",
      "Science & Tech": "science",
      "Business & Finance": "business"
    };
    return map[label] || "all";
  };

  return (
    <div className="bg-white w-full  py-4 sm:py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col gap-y-6 sm:gap-y-12">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative min-w-0">
              {/* Responsive section heading */}
              <h2 className="text-base sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 text-center">
                {categoryHeadings[rowIndex]}
              </h2>

              {/* Row items container */}
              <div
                ref={rowRefs[rowIndex]}
                className="flex gap-2 sm:gap-6 justify-start overflow-x-auto px-1 sm:px-12 scrollbar-hide scroll-smooth"
              >
                {row.map((category, index) => {
                  let to = "";
                  let state = {};
                  if (rowIndex === 0) {
                    to = "/gaming";
                    state = { activeCategory: getGamingId(category.label) };
                  } else if (rowIndex === 1) {
                    to = "/skincare";
                    state = { selectedCategory: category.label };
                  } else if (rowIndex === 2) {
                    to = "/ebooks";
                    state = { activeCategory: getEbooksId(category.label) };
                  }
                  return (
                    <Link
                      key={index}
                      to={to}
                      state={state}
                      className="flex flex-col scrollbar-hide items-center gap-1  sm:gap-2 min-w-[64px] sm:min-w-[120px] cursor-pointer group"
                    >
                      <div className="w-10 h-10 sm:w-24 sm:h-24 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white group-hover:border-green-500 group-hover:shadow-lg transition-all duration-300">
                        <category.icon className="w-5 h-5 sm:w-10 sm:h-10 text-gray-700 group-hover:text-green-600 transition-colors" />
                      </div>
                      <p className="text-[0.65rem] sm:text-sm text-center text-gray-800 font-medium leading-tight">
                        {category.label}
                      </p>
                    </Link>
                  );
                })}
              </div>

              {/* ✅ Buttons are hidden on mobile, visible on larger screens */}
              <button
                onClick={() => scrollRow(rowIndex, "left")}
                className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => scrollRow(rowIndex, "right")}
                className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
