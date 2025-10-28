import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../service/Axiosconfig";
import { setItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setquantity] = useState(1);
  const qua = [1, 2, 3, 4];
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState();
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${baseURL}/products/${id}/`, {})
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(
          response.data.images.length > 0 ? response.data.images[0].image : ""
        );
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id, token]);

  const handleAddToCart = () => {
    if (token) {
      axiosInstance
        .post(
          "cart/",
          {
            product_id: product.id,
            quantity: quantity,
            selectedSize: selectedSize,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          toast.success("Added to cart!");
          axiosInstance
            .get("cart/", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              const totalItems = response.data.length;
              dispatch(setItem(totalItems)); // Update Redux cart count
            });
        })
        .catch((error) => {
          console.error(
            "Error adding product to cart:",
            error
          )(toast.error("Product is not add"));
        });
    } else {
      toast.error("Login For Access");
    }
  };
  const buynow = () => {
    if (token) {
      handleAddToCart();
      navigate("/checkout");
    } else {
      toast.error("Login For Access");

      localStorage.removeItem("buy");
      localStorage.setItem("buy", product.id);
    }
  };

  if (!product) {
    return <p>Please Login...</p>;
  }

  return (
    <div className="mx-auto py-32 ">
      <div className="flex flex-wrap justify-center  gap-20">
        <div className="flex flex-col justify-center ">
          <img
            src={product.image}
            alt={product.name}
            className="w-fit max-w-lg border border-gray-300 rounded-lg"
          />
          <div className="flex mt-4 justify-center space-x-4">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={3}
              navigation
              autoplay
              className="mt-4 w-64"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img.image}
                    alt={product.name}
                    onClick={() => setSelectedImage(img.image)}
                    className={`w-20 h-20 object-cover border border-gray-300 rounded cursor-pointer ${
                      selectedImage === img.image
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="flex flex-col ml-3 mr-3 ">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <h2 className="text-xl text-gray-600 mt-2">{product.brand}</h2>
          <p className="text-lg mt-4 text-gray-800">{product.description}</p>

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-6  py-4  rounded-xl">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                ₹{product.price}
              </p>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>
            <div className="text-right">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    product.stock > 0 ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of Stock"}
              </div>
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`md:px-4 md:py-2 px-3 py-1 flex items-center justify-center border rounded-md shadow-sm cursor-pointer transition duration-200
      ${
        selectedSize === size
          ? "bg-black  text-white border-black"
          : "bg-white text-gray-700  hover:bg-gray-100"
      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Quantity
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setquantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
              >
                <span className=" font-medium">-</span>
              </button>
              <span className="font-semibold w-9 text-center">{quantity}</span>
              <button
                onClick={() => setquantity(Math.min(10, quantity + 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
              >
                <span className="text-lg font-medium">+</span>
              </button>
            </div>
          </div>

          {/* Product Review */}
          {product.review && (
            <div className=" p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">
                  Customer Review
                </span>
              </div>
              <p className="text-gray-800 text-sm">{product.review}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="border-2 hover:shadow-lg border-blue-500 text-blue-500 py-2 px-6 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
              onClick={buynow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
