import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add Product to Cart
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.qty += action.payload.qty || 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          qty: action.payload.qty || 1,
        });
      }
    },

    // Remove Product from Cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },

    // Increase Quantity
    increaseQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload
      );

      if (item) {
        item.qty += 1;
      }
    },

    // Decrease Quantity
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload
      );

      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.productId !== action.payload
          );
        }
      }
    },

    // Clear Cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;