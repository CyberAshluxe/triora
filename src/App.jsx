import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import SkincarePage from "./Pages/SkincareProduct";
import GamingPage from "./Pages/GamingProduct";
import EbooksPage from "./Pages/EbooksProduct";
import FlashSalePage from "./Pages/FlashSale";
import NewArrivalsPage from "./Pages/NewArrivals";
import BestSellersPage from "./Pages/BestSellers";
import DealOfTheMonthPage from "./Pages/DealOfTheMonth";
import UpTo80OffPage from "./Pages/UpTo80Off";
import SendPackagesSecurelyPage from "./Pages/SendPackagesSecurely";
import Buy2PayFor1Page from "./Pages/Buy2PayFor1";
import TrioraPrimePage from "./Pages/TrioraPrime";
import NotFound from "./Pages/NotFound";
import Shop from "./Pages/Shop";
import Account from "./Pages/Account";
import SellerDashboard from "./Pages/SellerDashboard";
import SellerSignIn from "./Pages/SellerSignIn";
import SellerSignUp from "./Pages/SellerSignUp";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminSignIn from "./Pages/AdminSignIn";
import AdminSignUp from "./Pages/AdminSignUp";
import { CartProvider } from "./Context/CartContext";
import CartPage from "./Pages/Cartpage";
import Checkout from "./Pages/Checkout";
import Shipping from "./Pages/Shipping";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar";
import { ScrollToTop } from "./Components/ScrollTop";
import { ChatAI } from "./Components/ChatAI";
import WelcomeScreen from "./Components/WelcomeScreen";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user has just logged in
    const hasLoggedIn = sessionStorage.getItem('hasLoggedIn');

    if (hasLoggedIn) {
      setShowWelcome(true);
      sessionStorage.removeItem('hasLoggedIn'); // Remove it so it doesn't show again

      // Hide welcome screen after 3 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Router>
      <CartProvider>
        {showWelcome && <WelcomeScreen />}
        <Navbar />
        <ScrollToTop />
        <ChatAI />
        <div className="font-sans">
          <Routes>
            {/* Auth Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/seller-signin" element={<SellerSignIn />} />
            <Route path="/seller-signup" element={<SellerSignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/skincare" element={<ProtectedRoute><SkincarePage /></ProtectedRoute>} />
            <Route path="/gaming" element={<ProtectedRoute><GamingPage /></ProtectedRoute>} />
            <Route path="/ebooks" element={<ProtectedRoute><EbooksPage /></ProtectedRoute>} />
            <Route path="/flash-sale" element={<ProtectedRoute><FlashSalePage /></ProtectedRoute>} />
            <Route path="/new-arrivals" element={<ProtectedRoute><NewArrivalsPage /></ProtectedRoute>} />
            <Route path="/best-sellers" element={<ProtectedRoute><BestSellersPage /></ProtectedRoute>} />
            <Route path="/deal-of-the-month" element={<ProtectedRoute><DealOfTheMonthPage /></ProtectedRoute>} />
            <Route path="/up-to-80-off" element={<ProtectedRoute><UpTo80OffPage /></ProtectedRoute>} />
            <Route path="/send-packages-securely" element={<ProtectedRoute><SendPackagesSecurelyPage /></ProtectedRoute>} />
            <Route path="/buy-2-pay-for-1" element={<ProtectedRoute><Buy2PayFor1Page /></ProtectedRoute>} />
            <Route path="/triora-prime" element={<ProtectedRoute><TrioraPrimePage /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-signin" element={<AdminSignIn />} />
            <Route path="/admin-signup" element={<AdminSignUp />} />
            {/* Future Routes */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/store" element={<Store />} /> */}
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
