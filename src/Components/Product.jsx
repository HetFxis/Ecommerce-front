import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart, FaSearch, FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductList = ({ selectedCategory,selectedPrice }) => {
  const [products, setProducts] = useState([]);
  const { token } = useSelector(state => state.auth);
  const [wishlist, setWishlist] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null); // Track which product is hovered
   const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `${baseURL}/products/?category=${selectedCategory}`
          : `${baseURL}/products/`;
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);
  const handleAddToCart = () => {
    if(token){
    axiosInstance
      .post(
        "cart/",
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Added to cart!");
      })
      .catch((error) => console.error("Error adding product to cart:", error));
  }
  else{
    toast.error("Login For Access")
  }}
  const checkLogin = () => {
    if (!token) {
      toast.error("Login for Access");
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const calculateRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  // Animation variants for wishlist & actions
  const actionVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };

  // "Add to Cart" animation
  const addEffect = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };

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

  return (
    <div className="flex flex-wrap lg:justify-start justify-center gap-8 p-8">
      {products.length === 0 ? (
        <p>No product Found</p>
      ) : (
        products.map((product) => {
          const avgRating = calculateRating(product.reviews);
          const isOnSale = product.original_price > product.price;

          return (
            <Link
              key={product.id}
              to={`/Detail/${product.id}`}
              onClick={checkLogin}
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

              <div className="p-4 relative ">
                <motion.div
                  variants={addEffect}
                  initial="hidden"
                  animate={hoveredProduct === product.id ? "visible" : "hidden"}
                  className="absolute top-3 text-base z-50 text-red-600 font-bold rounded "
                   >
                  {product.brand}
                </motion.div>
                <motion.div
                  variants={addEffect}
                  initial="visible"
                  animate={hoveredProduct === product.id ? "hidden" : "visible"}
                  className="absolute top-3 text-lg text-gray-600 font-bold rounded"
                >
                  {product.name} 
                </motion.div>
                <div className="text-lg font-semibold absolute group-hover:hidden text-gray-800">
                </div>

                {/* Rating */}
                <div className="mt-8 flex items-center">
                  {renderStars(avgRating)}
                  <span className="ml-2 text-gray-600 text-sm">({avgRating.toFixed(1)})</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>

                {/* Price & Stock */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-600">In Stock: {product.stock}</p>
                  <div>
                    {isOnSale ? (
                      <div className="flex items-center">
                        <p className="text-lg font-bold text-red-500 mr-2">₹{product.price}</p>
                        <p className="text-sm line-through text-gray-500">₹{product.original_price}</p>
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-blue-500">₹{product.price}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductList;
