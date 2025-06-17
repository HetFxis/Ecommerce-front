import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../service/Axiosconfig';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setItem, updateCartItem } from '../redux/productSlice';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axiosInstance.get('cart/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setCart(response.data);
        const totalItems =response.data.length
        dispatch(setItem(totalItems)); // Update Redux cart count
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, [token, dispatch]);

  const handleRemoveFromCart = (productId) => {
    axiosInstance.delete(`cart/${productId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        const updatedCart = cart.filter(item => item.product_id !== productId);
        setCart(updatedCart);
        const totalItems = updatedCart.length
        dispatch(setItem(totalItems)); // Update Redux cart count
      })
      .catch(error => console.error('Error removing from cart:', error));
  };

  const handleUpdateQuantity = (productId, quantityChange, product_price) => {
    const updatedItem = cart.find(item => item.product_id === productId);
    if (!updatedItem) return;

    const newQuantity = updatedItem.quantity + quantityChange;

    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      axiosInstance.post('cart/', {
        product_id: productId,
        quantity: quantityChange,
        total: product_price * newQuantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          axiosInstance.get('cart/', {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            setCart(response.data);
            const totalItems = response.data.length
            dispatch(setItem(totalItems)); // Update Redux cart count
          });
        })
        .catch(error => console.error('Error updating quantity:', error));
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.product_price * item.quantity, 0);

  return (
    <div className="mx-auto my-28 py-20 md:px-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty. <Link to="/shop" className="text-blue-500">Go back to shopping</Link></p>
        </div>
      ) : (
        <div className='flex gap-10 justify-center flex-wrap lg:flex-nowrap'>
          <ul className="space-y-10 md:w-2/3 w-full shadow-sm my-4 mx-2 md:p-6 p-2">
            <div className='flex justify-between'>
              <div className='text-lg font-bold md:mb-4 md:ml-10'>Product</div>
              <div className='text-lg font-bold md:mb-4 md:ml-28'>Quantity</div>
              <div className='text-lg font-bold mb-4 mr-3'>Price</div>
            </div>
            {cart.map(item => (
              <div key={item.product_id} className="flex items-center justify-between border-b pb-4">
                <div className="flex flex-wrap">
                  <img
                    src={`${baseURL}` + item.product_image}
                    alt={item.product_name}
                    className="md:w-32 w-24 rounded hover:opacity-75 object-contain"
                  />
                  <div className="flex flex-col justify-center md:pl-9 pl-2">
                    <p className="text-xl font-semibold">{item.product_name}</p>
                    <p className="text-md font-bold text-slate-800">Rs {item.product_price}</p>
                  </div>
                </div>
                <div className="flex items-center md:mr-12 mr-8">
                  <button
                    className="md:px-1 px-1 py-1 text-2xl rounded-md"
                    onClick={() => handleUpdateQuantity(item.product_id, -1, item.product_price)}
                  >
                    -
                  </button>
                  <p className="md:px-4 px-1 font-bold">{item.quantity}</p>
                  <button
                    className="md:px-1 text-xl px-1 py-1 bg rounded-md"
                    onClick={() => handleUpdateQuantity(item.product_id, 1, item.product_price)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition p-2 shadow-md bg-neutral-50 rounded-lg ease-in-out duration-300 hover:scale-95"
                  onClick={() => handleRemoveFromCart(item.product_id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <Link to='/shop'>
              <button className="md:hover:bg-black md:hover:text-white py-2 md:px-14 px-4 my-3 border md:bg-white transition duration-300">
                CONTINUE SHOPPING
              </button>
            </Link>
          </ul>

          {/* Cart Summary */}
          <div className="p-10 mt-2 md:ml-0 sm:ml-20 flex flex-col gap-6 md:w-1/3 h-fit justify-center bg-gray-50">
            <p className="text-lg font-semibold">Cart Summary</p>
           
            <div className='flex justify-between'>
              <p className="text-lg font-semibold">Total Price</p>
              <p className="text-lg font-semibold text-red-500">Rs {totalPrice}.00</p>
            </div>
            <Link to='/checkout'>
              <button className="bg-black text-white py-2 px-20 hover:bg-slate-600 transition duration-300">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
