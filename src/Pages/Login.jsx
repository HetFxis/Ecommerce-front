import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";


function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.warn("⚠️ Please fill in all required fields.");
      return;
    }
 
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/`, {username, password,});
      dispatch(loginSuccess({ userid: JSON.stringify(response.data.userid), token: response.data.access,refresh:response.data.refresh }));
     toast("✅ Login successful!");
      navigate("/"); 
    } catch (error) {
      toast.error("❌ Invalid credentials, please try again.");
    }
  };

  return (
    <>
<div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <h1 className="text-3xl font-bold text-center pb-12 text-gray-700">
          My Account
        </h1>
        <div className="w-full p-6 bg-white rounded-md max-w-md shadow-md lg:max-w-xl">
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <h1 className="text-xl font-bold text-center text-gray-700">
                Welcome Back
              </h1>
              <h6 className="text-sm font-normal text-center text-gray-700">
                Please sign in to access your full account
              </h6>
            </div>
            <br />
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            
            <div className="mt-2">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div><ToastContainer/>
      </div>
    </>
  );
}

export default Login;
