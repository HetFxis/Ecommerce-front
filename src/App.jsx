import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Pages/ProtectedRoutes';
import Header from './Components/Header';
import Profile from './Pages/profile';
import Shop from "./Pages/Shop"
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import ProductDetail from './Pages/Productdetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import AboutPage from './Pages/About';
import Orders from './Pages/orders';
import { CartProvider } from "./CartContext";
import OrderDetails from './Pages/OrderDetail';

const App = () => {
  return (


    <>

      <Router>
      <CartProvider>
           <div>
             <Header />
           </div>
      </CartProvider>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/order/:id' element={<OrderDetails />} />


          {/* Protected Routes */}
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
