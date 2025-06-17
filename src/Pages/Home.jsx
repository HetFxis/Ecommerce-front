import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { delay, motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart, FaSearch, FaExchangeAlt } from 'react-icons/fa';
import axiosInstance from "../service/Axiosconfig";
import DealOfTheWeek from "../Components/Divider";
import InstagramSection from "../Components/instagram";
import Banner from "../Components/Banner";
const Home = () => {
  const [products, setProducts] = useState([]);
  const {userid,IsAthenticated}=useSelector(state=>state.auth)
   const baseURL = import.meta.env.VITE_BACKEND_URL;

  const [wishlist, setWishlist] = useState({});
   const [hoveredProduct, setHoveredProduct] = useState(null); // Track which product is hovered
  const dispatch =useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
        axios.get(`${baseURL}/products/`
    )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) =>{

         console.error("Error fetching products:",error)
       
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

  useEffect(()=>{
    if(IsAthenticated){

      axiosInstance.get(`user/profile/${userid}/`,
      )
        .then((response) => {
          // console.log(response.data.data)
          if(response.data.isadmin){
            navigate('/dashboard')
          }
          setProducts(response.data);
        })
        .catch((error) =>{
         
           console.error("Error fetching :",error)
         
        });
    }
else{
   return 
}
    
  }
  ,[])

 
  // Animation variants for wishlist & actions
  const actionVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3,delay:0.3, ease: "easeOut" } },
  };

  // "Add to Cart" animation
  const addEffect = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };
  return (
    <div className="">
      
     <Banner/>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className=" mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="">
          <div className="flex justify-center flex-wrap gap-8">

            {products.length > 0 ? (
              products.map((product, i) => 
              {   const avgRating = calculateRating(product.reviews);
                const isOnSale = product.original_price > product.price;
      
                return(
                
             <Link
                          key={product.id}
                          to='/shop'
                          className="relative max-w-xs bg-white rounded-lg shadow-lg overflow-hidden p4"
                          onMouseEnter={() => setHoveredProduct(product.id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          {/* Product Image */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-t-lg"
                          />
            
                          {/* Wishlist & Action Buttons */}
                          <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <motion.button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleWishlist(product.id);
                              }}
                              variants={actionVariants}
                              initial="hidden"
                              animate={hoveredProduct === product.id ? "visible" : "hidden"}
                              className="text-xl bg-white p-2 rounded-sm shadow-md"
                            >
                              {wishlist[product.id] ? (
                                <FaHeart className="text-red-500" />
                              ) : (
                                <FaRegHeart className="text-gray-600 hover:text-red-500" />
                              )}
                            </motion.button>
            
                            <motion.button
                              variants={actionVariants}
                              initial="hidden"
                              animate={hoveredProduct === product.id ? "visible" : "hidden"}
                              className="text-xl  bg-white p-2 rounded-sm shadow-md"
                            >
                              <FaSearch className="text-gray-600 " />
                            </motion.button>
            
                            <motion.button
                              variants={actionVariants}
                              initial="hidden"
                              animate={hoveredProduct === product.id ? "visible" : "hidden"}
                              className="text-xl bg-white p-2 rounded-sm shadow-md"
                            >
                              <FaExchangeAlt className="text-gray-600" />
                            </motion.button>
                          </div>
            
                          <div className="p-4 relative my-3 ">
                            <motion.div
                              variants={addEffect}
                              initial="hidden"
                              animate={hoveredProduct === product.id ? "visible" : "hidden"}
                              className="absolute top-2  text-base text-gray-600 font-bold rounded "
                          >
                              {product.brand}
                            </motion.div>
                            <motion.div
                              variants={addEffect}
                              initial="visible"
                              animate={hoveredProduct === product.id ? "hidden" : "visible"}
                              className="absolute top-2 text-lg text-gray-800 font-bold rounded"
                            >
                              {product.name} 
                            </motion.div>
                            <div className="mt-8 flex items-center">
                  {renderStars(avgRating)}
                  <span className="ml-2 text-gray-600 text-sm">{product.review}</span>
                </div>

            
                            {/* Description */}
            
                            {/* Price & Stock */}
                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-sm text-gray-600">In Stock: {product.stock}</p>
                              <p className="text-xl font-bold text-blue-500">₹{product.price}</p>

                            </div>
                          </div>
                        </Link>
              )}
              )
            ) : (
              <p>Please Login products...</p>
            )}
          </div>
          </div>
        </div>
      </section>
        <div className="">
<DealOfTheWeek/>
<InstagramSection/>
  
  </div>      {/* Feedback Section */}
      <section className="py-16 text-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-200 p-6 rounded-lg shadow-md"
              >
                <p className="t mb-4">
                  "This is the best shopping experience I've ever had. Highly recommend!"
                </p>
                <p className=" font-bold">- Customer {i + 1}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default Home;
