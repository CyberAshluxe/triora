"use client";
import React from "react";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Graphic Designer",
      text: "I ordered a wireless mouse and keyboard combo from Tri-Aura and I'm blown away by the quality. The delivery was super fast, arrived in just 2 days, and when I had a question about compatibility, their customer service team responded within an hour. Definitely my go-to store for tech accessories now.",
      image: "/testimonial-sarah.jpg",
    },
    {
      name: "Marcus Johnson",
      role: "College Student",
      text: "As a broke college student, I was skeptical about ordering online, but Tri-Aura exceeded my expectations. My gaming headset arrived earlier than expected and works perfectly for both my classes and late-night gaming sessions. The customer support even helped me track my package when I got anxious about the delivery.",
      image: "/testimonial-marcus.jpg",
    },
    {
      name: "Jake Rodriguez",
      role: "Competitive Gamer",
      text: "I've been through so many gaming mice trying to find the perfect one, and Tri-Aura finally delivered. The product quality is legit pro-level, and when I needed to exchange for a different DPI model, they made it hassle-free. Fast shipping meant I didn't miss any tournament practice time.",
      image: "/testimonial-jake.jpg",
    },
    {
      name: "Emily Watson",
      role: "Remote Worker",
      text: "Working from home means I need reliable tech, and Tri-Aura has become my trusted source. I've ordered everything from webcams to ergonomic accessories, and every single item has been top quality. Their customer service is incredibly responsive, and I always get my orders within days, not weeks like other sites.",
      image: "/testimonial-emily.jpg",
    },
  ];

  const productReviews = [
    {
      name: "Alex Martinez",
      rating: 5,
      title: "Perfect for competitive gaming",
      text: "This mouse has completely changed my gameplay. The precision is unreal and the battery life means I never have to worry mid-match.",
    },
    {
      name: "Jessica Lee",
      rating: 5,
      title: "Worth every penny",
      text: "I was hesitant about the price, but the quality is outstanding. Fast delivery and the customer service answered all my questions before I bought.",
    },
    {
      name: "David Thompson",
      rating: 4,
      title: "Great mouse, minor learning curve",
      text: "Took a day to get used to the button layout, but now I love it. Super comfortable and the RGB lighting is a nice touch.",
    },
    {
      name: "Priya Patel",
      rating: 5,
      title: "Best purchase this year",
      text: "Arrived in 2 days and works flawlessly. The build quality feels premium and it glides so smoothly on my mousepad.",
    },
    {
      name: "Chris Anderson",
      rating: 5,
      title: "Finally, a wireless mouse that delivers",
      text: "No lag, amazing battery, and the ergonomics are perfect for my hand size. Tri-Aura has earned a loyal customer.",
    },
  ];

  const quickTestimonials = [
    "Fast delivery and perfect quality!",
    "My go-to tech shop!",
    "Best customer service I've experienced online.",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % quickTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + quickTestimonials.length) % quickTestimonials.length
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Here's what our customers are saying about Tri-Aura.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're proud to serve thousands of happy customers who trust us for
            their tech needs. From gamers and designers to students and remote
            workers, people choose Tri-Aura for quality products, lightning-fast
            delivery, and customer service that actually cares. Don't just take
            our word for it — see what real customers have to say about their
            experience shopping with us.
          </p>
        </div>

        {/* Quick Testimonials Carousel */}
        <div className="mb-16 bg-emerald-600 text-white rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-4 left-4 opacity-20">
            <Quote className="w-16 h-16" />
          </div>
          <div className="relative z-10 text-center">
            <p className="text-2xl font-semibold mb-6">
              {quickTestimonials[currentSlide]}
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {quickTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-8" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-emerald-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Product Reviews Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Product Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productReviews.map((review, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">
                    {review.name}
                  </span>
                  {renderStars(review.rating)}
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {review.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
