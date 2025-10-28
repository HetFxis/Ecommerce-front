// import { createContext, useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import axiosInstance from "./service/Axiosconfig";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const IsAuthenticated = localStorage.getItem("IsAuthenticated")
//   useEffect(() => {
//     if(IsAuthenticated){
//     axiosInstance
//       .get("cart/")
//       .then((response) => setCart(response.data))
//       .catch((error) => console.error("Error fetching cart:", error));
//   }}, [IsAuthenticated]);
//   useEffect(()=>{
//     setCart(cart)
//     console.log(cart)
//   },[cart])

//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
