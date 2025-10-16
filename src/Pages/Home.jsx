import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "/src/Components/Navbar.jsx";
import { TrioraHero } from "../Components/TrioraHero";
import Categories from "../Components/Categories";
import { CardSection } from "../Components/CardSection.jsx";
import { TestimonialsSection } from "../Components/Testimonials.jsx";
import { NewsletterSignup } from "../Components/Newsletter.jsx";
import { ChatAI } from "../Components/ChatAI.jsx";
import { ScrollToTop } from "../Components/ScrollTop.jsx";
import { Footer } from "../Components/Footer.jsx";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    user: {},
    stats: {},
    recentActivities: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);

  const count = useSelector((state) => state.counterReducer?.count);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboard();
  }, []);

  const token = localStorage.getItem("token");
  const url = "http://localhost:7145/user/dashboard";

  const getDashboard = async () => {
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!res.data.status) {
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        setDashboardData(res.data);
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      {/* <Navbar /> */}
      <TrioraHero />
      <Categories />
      <CardSection />
      <TestimonialsSection />
      <NewsletterSignup />
      <ChatAI />
      <ScrollToTop />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
