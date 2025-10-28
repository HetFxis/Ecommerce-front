import React, { useState } from 'react';
import axiosInstance from '../service/Axiosconfig';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_number, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError('');
    try {
      const response = await axiosInstance.post('accounts/send-otp/', { email });
      if (response.status === 200) {
        toast('OTP sent to your email.');
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send OTP please try again');
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    try {
      const response = await axiosInstance.post('accounts/verify-otp/', { email, otp });
      if (response.status === 200) {
        toast.success('OTP verified successfully.');
        setStep(3);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post('register/', {
        username,
        email,
        password,
        mobile_number,
      });
      if (response.status === 201) {
        setLoading(false);
        toast.success('Account Created Successfully');
        navigate('/login');
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || 'Registration failed, please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700">Create New Account</h1>
      <div className="w-full p-6 mt-6 bg-white rounded-md shadow-xl lg:max-w-xl">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-center text-gray-500 mb-4">Step 1: Enter Email</h2>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required="email"
            
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <button onClick={handleSendOtp} className="w-full bg-blue-500 text-white py-2 rounded-md">
              Send OTP
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-center text-gray-500 mb-4">Step 2: OTP is send on <span className='text-gray-700 '>{email} </span><br></br> <br></br> please enter OTP to verify</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <button onClick={handleVerifyOtp} className="w-full bg-yellow-500 text-white py-2 rounded-md">
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-center text-gray-500 mb-4">Step 3: Complete Registration</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <input
              type="text"
              value={mobile_number}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              required
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
