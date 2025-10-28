import  { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
// import LoginPage from './Pages/Login';
// import RegisterPage from './Pages/Register';
// import Dashboard from './Pages/Dashboard';
// import ProtectedRoute from './Pages/ProtectedRoutes';
// import Header from './Components/Header';
// import Profile from './Pages/profile';
// import Shop from "./Pages/Shop"
// import Contact from './Pages/Contact';
// import Footer from './Components/Footer';
// import ProductDetail from './Pages/Productdetail';
// import Cart from './Pages/Cart';
// import Checkout from './Pages/Checkout';
// import AboutPage from './Pages/About';
// import Orders from './Pages/orders';
// import OrderDetails from './Pages/OrderDetail';

const LoginPage = lazy(() => import('./Pages/Login'));
const RegisterPage = lazy(() => import('./Pages/Register'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const ProtectedRoute = lazy(() => import('./Pages/ProtectedRoutes'));
const Header = lazy(() => import('./Components/Header'));
const Profile = lazy(() => import('./Pages/profile'));
const Shop = lazy(() => import("./Pages/Shop"));
const Contact = lazy(() => import('./Pages/Contact'));
const Footer = lazy(() => import('./Components/Footer'));
const ProductDetail = lazy(() => import('./Pages/Productdetail'));
const Cart = lazy(() => import('./Pages/Cart'));
const Checkout = lazy(() => import('./Pages/Checkout'));
const AboutPage = lazy(() => import('./Pages/About'));
const Orders = lazy(() => import('./Pages/orders'));
const OrderDetails = lazy(() => import('./Pages/OrderDetail'));
const App = () => {
  return (
    <>
      <Router>
           <div>
             <Header />
           </div>
          <Suspense fallback={<div>Loading...</div>}>
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

  
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Suspense>
      </Router>
      <ToastContainer/>
    </>
  );
};

export default App;
