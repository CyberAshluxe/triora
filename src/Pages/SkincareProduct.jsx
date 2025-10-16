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

const skincareProducts = [
  // Serums & Oils (6 products)
  {
    id: 1,
    name: "Vitamin C Brightening Serum",
    category: "Serums & Oils",
    price: "₦34.99",
    rating: 4.8,
    reviews: 1247,
    image: "/vitamin-c-serum-bottle.jpg",
    description:
      "Powerful antioxidant serum that brightens and evens skin tone",
  },
  {
    id: 2,
    name: "Hyaluronic Acid Hydration Serum",
    category: "Serums & Oils",
    price: "₦29.99",
    rating: 4.9,
    reviews: 2103,
    image: "/hyaluronic-acid-serum.jpg",
    description: "Deep hydration serum with multi-weight hyaluronic acid",
  },
  {
    id: 3,
    name: "Retinol Night Serum",
    category: "Serums & Oils",
    price: "₦42.99",
    rating: 4.7,
    reviews: 892,
    image: "/retinol-night-serum.jpg",
    description: "Advanced retinol formula for overnight skin renewal",
  },
  {
    id: 4,
    name: "Niacinamide Pore Refining Serum",
    category: "Serums & Oils",
    price: "₦26.99",
    rating: 4.6,
    reviews: 1456,
    image: "/niacinamide-serum.jpg",
    description: "Minimizes pores and balances oil production",
  },
  {
    id: 5,
    name: "Rosehip Seed Oil",
    category: "Serums & Oils",
    price: "₦24.99",
    rating: 4.8,
    reviews: 743,
    image: "/rosehip-seed-oil.jpg",
    description: "100% pure cold-pressed rosehip oil for radiant skin",
  },
  {
    id: 6,
    name: "Peptide Complex Serum",
    category: "Serums & Oils",
    price: "₦48.99",
    rating: 4.9,
    reviews: 621,
    image: "/peptide-complex-serum.jpg",
    description: "Multi-peptide formula for firmer, smoother skin",
  },

  // Natural Beauty (6 products)
  {
    id: 7,
    name: "Aloe Vera Soothing Gel",
    category: "Natural Beauty",
    price: "₦16.99",
    rating: 4.7,
    reviews: 1834,
    image: "/aloe-vera-gel.jpg",
    description: "Pure aloe vera gel for instant hydration and soothing",
  },
  {
    id: 8,
    name: "Green Tea Antioxidant Toner",
    category: "Natural Beauty",
    price: "₦22.99",
    rating: 4.6,
    reviews: 967,
    image: "/green-tea-toner.jpg",
    description: "Refreshing toner with green tea extract and antioxidants",
  },
  {
    id: 9,
    name: "Chamomile Calming Mist",
    category: "Natural Beauty",
    price: "₦18.99",
    rating: 4.8,
    reviews: 1123,
    image: "/chamomile-mist.jpg",
    description: "Gentle facial mist with chamomile for sensitive skin",
  },
  {
    id: 10,
    name: "Coconut Oil Moisturizer",
    category: "Natural Beauty",
    price: "₦21.99",
    rating: 4.5,
    reviews: 856,
    image: "/coconut-oil-moisturizer.jpg",
    description: "Nourishing moisturizer with organic coconut oil",
  },
  {
    id: 11,
    name: "Honey & Propolis Essence",
    category: "Natural Beauty",
    price: "₦28.99",
    rating: 4.9,
    reviews: 734,
    image: "/honey-propolis-essence.jpg",
    description: "Natural essence with honey and propolis for glowing skin",
  },
  {
    id: 12,
    name: "Lavender Night Cream",
    category: "Natural Beauty",
    price: "₦25.99",
    rating: 4.7,
    reviews: 1045,
    image: "/lavender-night-cream.jpg",
    description: "Calming night cream with lavender essential oil",
  },

  // Anti-Aging (6 products)
  {
    id: 13,
    name: "Collagen Boosting Cream",
    category: "Anti-Aging",
    price: "₦54.99",
    rating: 4.8,
    reviews: 1567,
    image: "/collagen-boosting-cream.jpg",
    description: "Advanced formula to boost collagen production",
  },
  {
    id: 14,
    name: "Wrinkle Repair Night Treatment",
    category: "Anti-Aging",
    price: "₦62.99",
    rating: 4.9,
    reviews: 1289,
    image: "/wrinkle-repair-treatment.jpg",
    description: "Intensive overnight treatment for visible wrinkle reduction",
  },
  {
    id: 15,
    name: "Firming Neck & Décolleté Cream",
    category: "Anti-Aging",
    price: "₦46.99",
    rating: 4.7,
    reviews: 892,
    image: "/firming-neck-cream.jpg",
    description: "Specialized cream for neck and chest area",
  },
  {
    id: 16,
    name: "Age-Defying Eye Serum",
    category: "Anti-Aging",
    price: "₦38.99",
    rating: 4.8,
    reviews: 1456,
    image: "/age-defying-eye-serum.jpg",
    description: "Targets fine lines and crow's feet around eyes",
  },
  {
    id: 17,
    name: "Resveratrol Anti-Aging Serum",
    category: "Anti-Aging",
    price: "₦56.99",
    rating: 4.9,
    reviews: 743,
    image: "/resveratrol-serum.jpg",
    description: "Powerful antioxidant serum with resveratrol",
  },
  {
    id: 18,
    name: "Lifting & Tightening Mask",
    category: "Anti-Aging",
    price: "₦32.99",
    rating: 4.6,
    reviews: 621,
    image: "/lifting-mask.jpg",
    description: "Instant lifting effect with long-term firming benefits",
  },

  // Sunscreen (5 products)
  {
    id: 19,
    name: "SPF 50+ Mineral Sunscreen",
    category: "Sunscreen",
    price: "₦28.99",
    rating: 4.8,
    reviews: 2134,
    image: "/mineral-sunscreen-spf50.jpg",
    description: "Broad spectrum mineral sunscreen with zinc oxide",
  },
  {
    id: 20,
    name: "Lightweight Daily SPF 30",
    category: "Sunscreen",
    price: "₦22.99",
    rating: 4.7,
    reviews: 1876,
    image: "/daily-spf30.jpg",
    description: "Non-greasy daily sunscreen for all skin types",
  },
  {
    id: 21,
    name: "Tinted Sunscreen SPF 45",
    category: "Sunscreen",
    price: "₦32.99",
    rating: 4.9,
    reviews: 1543,
    image: "/tinted-sunscreen.jpg",
    description: "Sheer tint with high SPF protection",
  },
  {
    id: 22,
    name: "Water-Resistant Sport Sunscreen",
    category: "Sunscreen",
    price: "₦26.99",
    rating: 4.6,
    reviews: 987,
    image: "/sport-sunscreen.jpg",
    description: "80-minute water-resistant formula for active lifestyles",
  },
  {
    id: 23,
    name: "Anti-Aging Sunscreen SPF 40",
    category: "Sunscreen",
    price: "₦36.99",
    rating: 4.8,
    reviews: 1234,
    image: "/anti-aging-sunscreen.jpg",
    description: "Sun protection with anti-aging peptides",
  },

  // Cleansers (6 products)
  {
    id: 24,
    name: "Gentle Foaming Cleanser",
    category: "Cleansers",
    price: "₦18.99",
    rating: 4.7,
    reviews: 2456,
    image: "/gentle-cleanser.jpg",
    description: "Soft foam cleanser for daily use on all skin types",
  },
  {
    id: 25,
    name: "Micellar Cleansing Water",
    category: "Cleansers",
    price: "₦16.99",
    rating: 4.8,
    reviews: 3102,
    image: "/micellar-water.jpg",
    description: "No-rinse micellar water removes makeup and impurities",
  },
  {
    id: 26,
    name: "Charcoal Deep Cleansing Gel",
    category: "Cleansers",
    price: "₦21.99",
    rating: 4.6,
    reviews: 1678,
    image: "/charcoal-cleanser.jpg",
    description: "Activated charcoal draws out impurities and toxins",
  },
  {
    id: 27,
    name: "Oil-Based Makeup Remover",
    category: "Cleansers",
    price: "₦24.99",
    rating: 4.9,
    reviews: 1345,
    image: "/oil-makeup-remover.jpg",
    description: "Dissolves waterproof makeup without stripping skin",
  },
  {
    id: 28,
    name: "Exfoliating Cleanser with AHA",
    category: "Cleansers",
    price: "₦26.99",
    rating: 4.7,
    reviews: 1123,
    image: "/exfoliating-cleanser.jpg",
    description: "Gentle exfoliation with alpha hydroxy acids",
  },
  {
    id: 29,
    name: "Cream Cleanser for Dry Skin",
    category: "Cleansers",
    price: "₦19.99",
    rating: 4.8,
    reviews: 987,
    image: "/cream-cleanser.jpg",
    description: "Rich, creamy cleanser that hydrates while cleansing",
  },

  // Organic Skincare (6 products)
  {
    id: 30,
    name: "Organic Argan Oil",
    category: "Organic Skincare",
    price: "₦32.99",
    rating: 4.9,
    reviews: 1567,
    image: "/organic-argan-oil.jpg",
    description: "100% certified organic argan oil from Morocco",
  },
  {
    id: 31,
    name: "Organic Shea Butter Balm",
    category: "Organic Skincare",
    price: "₦22.99",
    rating: 4.8,
    reviews: 1234,
    image: "/shea-butter-balm.jpg",
    description: "Pure organic shea butter for intense moisture",
  },
  {
    id: 32,
    name: "Organic Rose Water Spray",
    category: "Organic Skincare",
    price: "₦18.99",
    rating: 4.7,
    reviews: 1876,
    image: "/rose-water-spray.jpg",
    description: "Certified organic rose water facial mist",
  },
  {
    id: 33,
    name: "Organic Jojoba Oil",
    category: "Organic Skincare",
    price: "₦26.99",
    rating: 4.8,
    reviews: 945,
    image: "/jojoba-oil.jpg",
    description: "Cold-pressed organic jojoba oil for all skin types",
  },
  {
    id: 34,
    name: "Organic Calendula Cream",
    category: "Organic Skincare",
    price: "₦24.99",
    rating: 4.9,
    reviews: 823,
    image: "/calendula-cream.jpg",
    description: "Soothing organic calendula for sensitive skin",
  },
  {
    id: 35,
    name: "Organic Tea Tree Oil",
    category: "Organic Skincare",
    price: "₦16.99",
    rating: 4.6,
    reviews: 1456,
    image: "/tea-tree-oil.jpg",
    description: "Pure organic tea tree oil for blemish-prone skin",
  },

  // Acne Care (6 products)
  {
    id: 36,
    name: "Salicylic Acid Spot Treatment",
    category: "Acne Care",
    price: "₦14.99",
    rating: 4.7,
    reviews: 2345,
    image: "/spot-treatment.jpg",
    description: "Fast-acting spot treatment with 2% salicylic acid",
  },
  {
    id: 37,
    name: "Benzoyl Peroxide Acne Gel",
    category: "Acne Care",
    price: "₦16.99",
    rating: 4.6,
    reviews: 1987,
    image: "/benzoyl-peroxide-gel.jpg",
    description: "Maximum strength acne treatment gel",
  },
  {
    id: 38,
    name: "Tea Tree Blemish Serum",
    category: "Acne Care",
    price: "₦22.99",
    rating: 4.8,
    reviews: 1543,
    image: "/tea-tree-serum.jpg",
    description: "Natural tea tree oil serum for acne-prone skin",
  },
  {
    id: 39,
    name: "Clarifying Toner with Witch Hazel",
    category: "Acne Care",
    price: "₦18.99",
    rating: 4.7,
    reviews: 1234,
    image: "/clarifying-toner.jpg",
    description: "Alcohol-free toner that minimizes pores",
  },
  {
    id: 40,
    name: "Sulfur Acne Mask",
    category: "Acne Care",
    price: "₦24.99",
    rating: 4.5,
    reviews: 876,
    image: "/sulfur-mask.jpg",
    description: "Deep-cleaning mask with sulfur for breakouts",
  },
  {
    id: 41,
    name: "Oil-Free Acne Moisturizer",
    category: "Acne Care",
    price: "₦21.99",
    rating: 4.8,
    reviews: 1678,
    image: "/acne-moisturizer.jpg",
    description: "Lightweight, non-comedogenic moisturizer",
  },

  // Face Masks (5 products)
  {
    id: 42,
    name: "Clay Detox Mask",
    category: "Face Masks",
    price: "₦26.99",
    rating: 4.8,
    reviews: 1987,
    image: "/clay-detox-mask.jpg",
    description: "Purifying clay mask draws out impurities",
  },
  {
    id: 43,
    name: "Hydrating Sheet Mask Set",
    category: "Face Masks",
    price: "₦19.99",
    rating: 4.9,
    reviews: 2456,
    image: "/sheet-mask-set.jpg",
    description: "Pack of 10 hydrating sheet masks",
  },
  {
    id: 44,
    name: "Overnight Sleeping Mask",
    category: "Face Masks",
    price: "₦32.99",
    rating: 4.7,
    reviews: 1345,
    image: "/sleeping-mask.jpg",
    description: "Intensive overnight hydration mask",
  },
  {
    id: 45,
    name: "Brightening Vitamin C Mask",
    category: "Face Masks",
    price: "₦28.99",
    rating: 4.8,
    reviews: 1123,
    image: "/vitamin-c-mask.jpg",
    description: "Illuminating mask with vitamin C and niacinamide",
  },
  {
    id: 46,
    name: "Peel-Off Charcoal Mask",
    category: "Face Masks",
    price: "₦22.99",
    rating: 4.6,
    reviews: 1876,
    image: "/peel-off-mask.jpg",
    description: "Removes blackheads and unclogs pores",
  },
];

export default function SkincarePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const location = useLocation();

  useEffect(() => {
    const savedProducts = localStorage.getItem("sellerProducts");
    if (savedProducts) {
      const allSellerProducts = JSON.parse(savedProducts);
      const skincareSellerProducts = allSellerProducts.filter(
        (product) => product.category === "skincare"
      );
      setSellerProducts(skincareSellerProducts);
    }
  }, []);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  const categories = [
    "All",
    "Serums & Oils",
    "Natural Beauty",
    "Anti-Aging",
    "Sunscreen",
    "Cleansers",
    "Organic Skincare",
    "Acne Care",
    "Face Masks",
    "Moisturizers",
    "Eye Creams",
    "Seller Products",
  ];

  const allProducts = [
    ...skincareProducts,
    ...sellerProducts.map((product) => ({
      ...product,
      category: "Seller Products",
    })),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : allProducts.filter(
          (product) =>
            product.category === selectedCategory &&
            (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
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

  return (
    <>
      {/* <AuthButtons /> */}

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Skincare Collection
            </h1>
            <p className="text-lg text-emerald-50 max-w-2xl">
              Discover our premium selection of skincare products designed to
              nourish, protect, and rejuvenate your skin.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">
                  Filter by Category
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="md:w-64">
              <label className="block font-semibold text-gray-700 mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {sortedProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-emerald-50 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">
                      {product.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-200"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm font-medium">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
