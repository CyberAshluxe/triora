"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Truck, MapPin, Clock, CheckCircle, Package } from "lucide-react";

export default function SendPackagesSecurelyPage() {
  const [deliveryStatus, setDeliveryStatus] = useState("processing");
  const [estimatedTime, setEstimatedTime] = useState("3-5 business days");
  const [progress, setProgress] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState("default");

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }

    // Simulate delivery progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDeliveryStatus("delivered");
          clearInterval(interval);
          // Send notification when delivered
          if (notificationPermission === "granted") {
            new Notification("Package Delivered!", {
              body: "Your package has been successfully delivered.",
              icon: "/favicon.ico",
            });
          } else {
            alert("Your package has been successfully delivered!");
          }
          return 100;
        }
        return prev + 10;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [notificationPermission]);

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-blue-600";
      case "shipped":
        return "text-yellow-600";
      case "in-transit":
        return "text-orange-600";
      case "delivered":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Package className="w-6 h-6" />;
      case "shipped":
        return <Truck className="w-6 h-6" />;
      case "in-transit":
        return <MapPin className="w-6 h-6" />;
      case "delivered":
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Send Packages Securely
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
            Reliable and secure package delivery services. Track your shipments in real-time.
          </p>
        </div>
      </section>

      {/* Order Tracking Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Order Shipping Status
            </h2>
            <p className="text-gray-600">
              Track your order delivery in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Order Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">#TR-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">{estimatedTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Delivery Address
                </h3>
                <div className="text-gray-700">
                  <p>John Doe</p>
                  <p>123 Main Street</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
              </div>
            </div>

            {/* Shipping Progress */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Shipping Progress
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getStatusColor("processing")}`}>
                      {getStatusIcon("processing")}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Order Processing</h4>
                      <p className="text-sm text-gray-600">
                        Your order is being prepared
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getStatusColor("shipped")}`}>
                      {getStatusIcon("shipped")}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Shipped</h4>
                      <p className="text-sm text-gray-600">
                        Order has been shipped
                      </p>
                    </div>
                    {progress >= 25 && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getStatusColor("in-transit")}`}>
                      {getStatusIcon("in-transit")}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">In Transit</h4>
                      <p className="text-sm text-gray-600">
                        Package is on the way
                      </p>
                    </div>
                    {progress >= 75 && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getStatusColor("delivered")}`}>
                      {getStatusIcon("delivered")}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Delivered</h4>
                      <p className="text-sm text-gray-600">
                        Package has been delivered
                      </p>
                    </div>
                    {progress >= 100 && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-lg font-bold text-gray-800">
                    Estimated Delivery Time
                  </h3>
                </div>
                <p className="text-gray-600">
                  Based on your location, your order is expected to arrive within{" "}
                  <span className="font-medium text-emerald-600">
                    {estimatedTime}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Packaging</h3>
              <p className="text-gray-600">Professional packaging to ensure your items arrive safely.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Track your packages every step of the way with our advanced tracking system.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Insurance Coverage</h3>
              <p className="text-gray-600">Full insurance coverage for peace of mind on valuable shipments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
          <p className="text-gray-600 mb-8">Contact us to arrange secure package delivery.</p>
          <Link to='/contact'>
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Contact Us
            </button>
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 Tri-Aura. All rights reserved. Secure Package Delivery Services.
          </p>
        </div>
      </footer>
    </div>
  );
}
