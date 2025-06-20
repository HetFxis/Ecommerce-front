import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../service/Axiosconfig";

const OrderDetails = () => {
  const { id } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState(null);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("orders/");
        const orders = response.data;
        // Find the order that matches the ID from URL
        const selectedOrder = orders.find(order => order.id.toString() === id);
        if (selectedOrder) {
          setOrder(selectedOrder);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [id]);
  if (!order) return <div>Please Login order details...</div>;
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Details (ID: {order.id})</h2>
      <p><strong>Full Name:</strong> {order.full_name}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.zip_code}</p>
      <p><strong>Total Price:</strong> ₹{order.total_price}</p>
      <h3 className="text-xl font-semibold mt-6">Cart Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-8"> 
        {order.cart.map((item, index) => (
          <div key={index} className="border flex p-4 gap-8 rounded-lg shadow-md">
            <img src={`${baseURL}`+item.product.image} alt={item.product_name} className=" h-40 object-cover rounded-md" />
           <div className="flex flex-col"> <h4 className="text-lg font-semibold mt-2">{item.product_name}</h4>
            <p>Price: ₹{item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ₹{item.total}</p></div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
