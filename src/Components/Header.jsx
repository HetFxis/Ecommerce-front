import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { CartContext } from "../CartContext";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { IoIosLogOut } from "react-icons/io";

import logo from '../../public/logo.png'
const Header = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setcount] = useState();// State for side menu
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const menuRef = useRef(null);
// const IsAuthenticated=localStorage.getItem("IsAuthenticated")
  const [profileOpen, setProfileOpen] = useState(false);
  const { quantity } = useSelector(state => state.cart);
  const { token, IsAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  useEffect(() => {
    setcount(cart.length)
  }, [cart])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    dispatch(logout())
    setMenuOpen(false)
    navigate('/login');
  };

  return (
    <header className="shadow-md py-4 px-1 md:px-5 bg-white relative">
      <div className=" flex max-w-7xl mx-auto justify-between items-center">
      <Link to="/" className=''>
      <div className="flex w-12 place-items-center">
        <img src={logo} alt="" classname=" "/>
          <div className="md:text-xl text-lg font-bold">ClothingStore</div>
          </div></Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:border-b-2 hover:border-black text-lg font-semibold">Home</Link>
          <Link to="/shop" className="hover:border-b-2 hover:border-black text-lg font-semibold">Shop</Link>
          <Link to="/about" className="hover:border-b-2 hover:border-black text-lg font-semibold">About</Link>
          <Link to="/contact" className="  hover:border-b-2 hover:border-black  text-lg font-semibold">Contact</Link>
        </nav>

        <div className="hidden md:flex ">
          {!IsAuthenticated ? (
            <Link
              to="/login"
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Login
            </Link>
          ) : (
            <> 
             <Link to="/cart" className="relative">
      <IoMdCart className="md:size-6 hover:scale-110 transform duration-200" />
      
      {/* Badge for cart count */}
      {items > 0 && ( 
        <span className="absolute  bg-gray-300 -top-3 -right-3 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {items  }
        </span>
      )} 
    </Link>
              <div
                className="relative "
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <FaUserLarge className="md:size-5 ml-5 mb-3 items-center flex justify-center  hover:scale-110 ease-in-out transform duration-200 cursor-pointer" />

                {profileOpen && (
                  <div className="absolute right-0 z-40 w-40  bg-white shadow-lg rounded-lg border border-gray-200 transition-opacity duration-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 font-bold text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 font-bold text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      MyOrder
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className=" w-full flex text-left px-4 py-2 font-bold text-gray-700 hover:bg-gray-100"
                    >
                      <IoIosLogOut className='size-6 pr-1'/>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Hamburger Icon for smaller screens */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            {menuOpen ? (
              <p></p>
            ) : (
              <HiOutlineMenu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>
          
      <div ref={menuRef}

        className={`fixed inset-y-0 left-0 bg-white text-black  h-full w-3/4  transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            <span className="text-lg font-bold">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-black hover:text-gray-400"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 flex justify-between">
            {!IsAuthenticated ? (
              <Link
                to="/login"
                className="block bg-gray-200 py-2 px-4 rounded text-center hover:bg-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="py-3 px-1 rounded hover:scale-110 ease-in-out transform duration-200"
                  onClick={() => setMenuOpen(false)}

                >
                  <FaUserLarge className="size-5" />
                </Link>
                <Link
                  to="/cart"
                  className="py-[10px] md:px-1 pr-20 relative rounded"
                  onClick={() => setMenuOpen(false)}

                >
                  <IoMdCart className="size-6 " />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                      {quantity}
                    </span>)}
                </Link>
                <button
                  onClick={handleLogout}
                  setMenuOpen={false}
                  className="text-gray-800  bg-gray-200 py-2 px-4 rounded text-lg hover:scale-90 ease-in-out transform duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          <nav className="flex-grow p-6 space-y-4">
            <Link
              to="/"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Authentication and Cart */}
        </div>
      </div>
    </header>
  );
};

export default Header;
