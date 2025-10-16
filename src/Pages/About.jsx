"use client"
import React from "react"


export default function About() {
  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero Header Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">About Triora</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
              Discover our story, mission, and commitment to delivering exceptional products and experiences to our customers worldwide.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Founded with a passion for innovation and quality, Triora has grown from a small startup to a leading e-commerce platform, connecting customers with premium products across multiple categories.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">From Humble Beginnings</h3>
                <p className="text-gray-600 mb-4">
                  Triora was born out of a simple idea: to create a marketplace where quality meets affordability. Our founders, a team of tech enthusiasts and retail experts, recognized the need for a seamless online shopping experience that prioritizes customer satisfaction.
                </p>
                <p className="text-gray-600">
                  Since our inception, we've expanded our product range to include everything from cutting-edge gaming gear to luxurious skincare products, all while maintaining our commitment to excellence and sustainability.
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">2020</div>
                  <p className="text-gray-700">Founded</p>
                </div>
                <div className="text-center mt-6">
                  <div className="text-4xl font-bold text-teal-600 mb-2">1M+</div>
                  <p className="text-gray-700">Happy Customers</p>
                </div>
                <div className="text-center mt-6">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">50K+</div>
                  <p className="text-gray-700">Products Sold</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're driven by a commitment to innovation, sustainability, and customer-centric excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push boundaries to bring you the latest and greatest products, leveraging cutting-edge technology to enhance your shopping experience.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600">
                  Every product in our catalog undergoes rigorous quality checks to ensure you receive only the best, most reliable items available.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to eco-friendly practices, from sustainable packaging to supporting brands that prioritize environmental responsibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The passionate individuals behind Triora, dedicated to making your shopping experience exceptional.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">JD</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">John Doe</h3>
                <p className="text-emerald-600 mb-2">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Visionary leader with 15+ years in e-commerce, passionate about connecting customers with quality products.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">JS</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Jane Smith</h3>
                <p className="text-teal-600 mb-2">Head of Product</p>
                <p className="text-gray-600 text-sm">
                  Product expert ensuring our catalog features the best items from trusted brands worldwide.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">MJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Mike Johnson</h3>
                <p className="text-cyan-600 mb-2">Lead Developer</p>
                <p className="text-gray-600 text-sm">
                  Tech innovator building the platform that powers seamless shopping experiences for millions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </>
  )
}
