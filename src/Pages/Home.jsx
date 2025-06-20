import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { delay, motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart, FaSearch, FaExchangeAlt } from 'react-icons/fa';
import axiosInstance from "../service/Axiosconfig";
import DealOfTheWeek from "../Components/Divider";
import InstagramSection from "../Components/instagram";
import Banner from "../Components/Banner";
import TestimonialSlider from "../Components/Feedbacke";
import ProductList from "../Components/Product";
const Home = () => {
  const { userid, IsAthenticated } = useSelector(state => state.auth)
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${baseURL}/products/`
    )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {

        console.error("Error fetching products:", error)

      });
  }, []);
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
        {hasHalfStar && <FaStarHalfAlt key="half" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
      </div>
    );
  };
  const calculateRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  useEffect(() => {
    if (IsAthenticated) {

      axiosInstance.get(`user/profile/${userid}/`,
      )
        .then((response) => {
          // console.log(response.data.data)
          if (response.data.isadmin) {
            navigate('/dashboard')
          }
          setProducts(response.data);
        })
        .catch((error) => {

          console.error("Error fetching :", error)

        });
    }
    else {
      return
    }

  }
    , [])


  // Animation variants for wishlist & actions
  const actionVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, delay: 0.3, ease: "easeOut" } },
  };

  // "Add to Cart" animation
  const addEffect = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };
  return (
    <div className="">
      <Banner />
      <section className="py-16 bg-gray-50">
        <div className=" mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="">
            <div className="flex justify-center ">
            <ProductList/>
            </div>
          </div>
        </div>
      </section>
      <div className="">
        <DealOfTheWeek />
        <InstagramSection />
      </div>     
      <div className=""><TestimonialSlider /></div>
      <Footer />
    </div>
  );
};

export default Home;
