import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield, Wallet } from "lucide-react";

const API_BASE_URL = "http://localhost:7145";

const Checkout = () => {
  const { cart, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const navigate = useNavigate();
  const items = cart && Array.isArray(cart.items) ? cart.items : [];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});
  const [account, setAccount] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("flutterwave"); // 'flutterwave' or 'metamask'
  const [isFlutterwaveLoaded, setIsFlutterwaveLoaded] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        })
        .catch((err) => console.log(err));
    }

    // Check if Flutterwave is already loaded
    if (window.FlutterwaveCheckout) {
      setIsFlutterwaveLoaded(true);
    } else {
      // Load Flutterwave script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.onload = () => {
        setIsFlutterwaveLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Flutterwave script");
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const subtotal = getCartTotal();
  const shipping = 5.0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const validateForm = (paymentMethod) => {
    const newErrors = {};

    // Basic validation for shipping
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled) {
      alert(
        "MetaMask is not installed. Please install MetaMask to proceed with crypto payment."
      );
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Failed to connect to MetaMask. Please try again.");
    }
  };

  const handleMetaMaskPayment = async () => {
    if (!account) {
      alert("Please connect your MetaMask wallet first.");
      return;
    }

    try {
      const amountInWei = (total * 10 ** 18).toString(); // Convert to Wei (assuming ETH)
      const transactionParameters = {
        to: "0xYourMerchantWalletAddress", // Replace with your wallet address
        from: account,
        value: amountInWei,
        gas: "21000",
      };

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      alert("Payment successful! Transaction hash: " + txHash);
      clearCart();
      navigate("/shipping");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(paymentMethod)) {
      return;
    }

    if (paymentMethod === "flutterwave") {
      if (!isFlutterwaveLoaded) {
        alert("Flutterwave is still loading. Please try again in a moment.");
        return;
      }

      // Direct Flutterwave payment
      const config = {
        public_key: "FLWPUBK_TEST-2ebfecfc2f874a3db2393350e5edb3da-X", // Replace with your Flutterwave public key
        tx_ref: "tx-" + Date.now(),
        amount: total,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: formData.email,
          phone_number: formData.phone,
          name: `${formData.firstName} ${formData.lastName}`,
        },
        customizations: {
          title: "Triora Purchase",
          description: "Payment for items in cart",
          logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
        callback: function (response) {
          console.log(response);
          if (response.status === "successful") {
            clearCart();
            navigate("/shipping");
          } else {
            alert("Payment failed. Please try again.");
          }
        },
        onclose: function () {
          console.log("Payment modal closed");
        },
      };

      window.FlutterwaveCheckout(config);
    } else if (paymentMethod === "metamask") {
      if (!account) {
        alert("Please connect your MetaMask wallet first.");
        return;
      }

      try {
        const amountInWei = (total * 10 ** 18).toString();
        const transactionParameters = {
          to: "0xYourMerchantWalletAddress", // Replace with your wallet address
          from: account,
          value: amountInWei,
          gas: "21000",
        };

        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        alert("Payment successful! Transaction hash: " + txHash);
        clearCart();
        navigate("/");
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some products to your cart before checking out.
            </p>
            <Link
              to="/shop"
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium inline-flex items-center gap-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Only allow digits
                      setFormData((prev) => ({
                        ...prev,
                        phone: value,
                      }));
                      if (errors.phone) {
                        setErrors((prev) => ({
                          ...prev,
                          phone: "",
                        }));
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter phone number (digits only)"
                    maxLength={15}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123 Main St"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Method
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="flutterwave"
                      checked={paymentMethod === "flutterwave"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <CreditCard className="w-5 h-5 mr-2" />
                    Flutterwave (Card, Mobile Money, USSD)
                  </label>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="metamask"
                      checked={paymentMethod === "metamask"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <Wallet className="w-5 h-5 mr-2" />
                    MetaMask (Crypto)
                  </label>
                  {paymentMethod === "metamask" && (
                    <div className="ml-4">
                      {account ? (
                        <span className="text-sm text-green-600">
                          Connected: {account.slice(0, 6)}...{account.slice(-4)}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={connectMetaMask}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                        >
                          Connect MetaMask
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ₦{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₦{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₦{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₦{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold text-gray-800">Secure Checkout</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Your payment information is encrypted and secure. We use
                industry-standard SSL encryption to protect your data.
              </p>

              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold text-gray-800">Free Shipping</h3>
              </div>
              <p className="text-sm text-gray-600">
                Enjoy free shipping on all orders over ₦50. Standard delivery
                within 3-5 business days.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-500 text-white py-4 rounded-lg hover:bg-emerald-600 transition-colors font-bold text-lg flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
