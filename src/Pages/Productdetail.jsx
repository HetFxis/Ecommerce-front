import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import axiosInstance from "../service/Axiosconfig";
import { setItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);  
  const [quantity, setquantity] = useState(1);
  const qua =[1,2,3,4]
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize,setSelectedSize]= useState()
  const token = localStorage.getItem("access_token");
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${baseURL}/products/${id}/`, {
         })
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(response.data.images.length > 0 ? response.data.images[0].image : "");
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id, token]);

  const handleAddToCart = () => {
    if(token){
    axiosInstance
      .post(
        "cart/",
        { product_id: product.id, quantity:quantity, selectedSize :selectedSize},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Added to cart!");
          axiosInstance.get('cart/', {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            const totalItems = response.data.length
            dispatch(setItem(totalItems)); // Update Redux cart count
          });
        
      })
      .catch((error) => {   console.error("Error adding product to cart:", error)  (toast.error("Product is not add"))} );
  }
  else{
    toast.error("Login For Access")
  }}
  const buynow=()=>{
    check()
    handleAddToCart()
  }
const check=()=>{
  if(token){
  navigate("/cart")
  }
  else{
return  }
}

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
              className="w-20 h-20 object-cover border border-gray-300 rounded cursor-pointer"
              onClick={() => setSelectedImage(img.image)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
          </div>
        </div>

         <div className="flex flex-col ml-3 mr-3 ">
          <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
          <h2 className="text-xl text-gray-600 mt-2">{product.brand}</h2>
          <p className="text-lg mt-4 text-gray-800">{product.description}</p>
          <div className="mt-6 flex items-center">
            <p className="text-xl font-bold text-blue-500">Rs {product.price}</p>
            <p className={`text-md ml-5 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>       
             </div>
                    {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <label className="block  text-gray-700 font-semibold mb-2">Select Size:</label>
            
                <div  className="flex flex-row md:gap-4 gap-3 " >
                {product.sizes.map((size, index) => (
  <div
    key={index}
    onClick={() => setSelectedSize(size)}
    className={`md:px-4 md:py-2 px-3 py-1 flex items-center justify-center border rounded-md shadow-sm cursor-pointer transition duration-200
      ${selectedSize === size ? 'bg-black font-bold text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
    `}
  >
    {size}
  </div>
))}
              </div> 
              </div>
            )}
            <label className="block text-gray-700 font-semibold mb-2">Select Quantity:</label>
<select
  className="border  outline-none rounded px-4 py-2 w-20 text-gray-700 focus:ring-2 focus:ring-blue-500"
value={quantity}
onChange={(e) => setquantity(Number(e.target.value))}

>
  {qua.map((qty, index) => (
    <option key={index} className="bg-white p" value={qty}>
      {qty}
    </option>
  ))}
</select>

<p className="text-gray-800 mt-3 text-sm">
  Product Review: <span className="font-semibold text-black">{product.review}</span>
</p>


          {/* Buttons */}
          <div className="mt-8 flex space-x-4">
            <button className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300" onClick={handleAddToCart}>
              Add to Cart
            </button>

          <button className="border-2 hover:shadow-lg border-blue-500 text-blue-500 py-2 px-6 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"onClick={buynow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ProductDetail;
