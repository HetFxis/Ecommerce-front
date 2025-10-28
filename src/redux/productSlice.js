import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   quantity:null,
   items:localStorage.getItem("items") || null
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("items", action.payload);
    },
    updateCartItem: (state, action) => {
        state.quantity = action.payload.quantity;
        localStorage.setItem("quantity", action.payload.quantity);
  }
}
});

export const { setItem,updateCartItem} = cartSlice.actions;
export default cartSlice.reducer;
