import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../service/Axiosconfig";

const Orders = () => {
  const [orders, setOrders] = useState([]);  
  const [payment, setpayment] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    fetchpayment()
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("orders/", {
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }; const fetchpayment = async () => {
    try {
      const response = await axiosInstance.get("payment/orders/", {
      });
      setpayment(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <h2 className="text-center mt-10 text-lg">Please Login Orders...</h2>;
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
 <div>
          <p>Your have not place order. <Link to="/shop" className="text-blue-500">Go back to shopping</Link></p>
        </div>      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
                <Link to={`/order/${order.id}`} >
                   <div key={order.id} className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition">
              <h2 className="text-lg font-semibold">Order #{order.id}</h2>
              <p className="text-gray-600"><strong>Total Price:</strong> ₹{order.total_price}</p>
              <p className="text-gray-600"><strong>Full Name:</strong> {order.full_name}</p>
              
              <p className="text-gray-500"><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p className="text-gray-500"><strong>status:</strong>{payment.status}</p>
         
            </div></Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
