import { createSlice } from "@reduxjs/toolkit";
import { cardSlice } from "../types";
import { RootState } from "./store";

const initialState: cardSlice = {
  cartData: [],
  cartItemId: 0,
  error: false,
};

const cartSlice = createSlice({
  name: "getCart",
  initialState: initialState,
  reducers: {
    cartFetchSuccess: (state, action) => {
      state.cartData.push(action.payload);
      state.cartItemId = action?.payload?.key;
    },
    cartUpdateData: (state, action) => {
      const data = action?.payload;
      state.cartData.forEach((c: any) => {
        if (c.key === data?.passengerInfo?.cartItemId) {
          c.value = { ...c?.value, data };
        }
      });
    },
    deleteProduct: (state, action) => {
      state.cartData.splice(
        state.cartData.findIndex((item: any) => item.key === action.payload),
        1
      );
      state.cartItemId = state?.cartData[state?.cartData?.length - 1]?.key;
    },
    cartFetchFailure: (state) => {
      state.error = true;
    },
    clearCart: (state) => {
      return initialState;
    },
    cartBookingDetailUpdate: (state, action) => {
      const data = action?.payload;
      state.cartData.find((c: any) => c.key === data.cartItemId).value = data;
    },
    resetCartData: (state) => {
      state.cartData = [];
      state.cartItemId = 0;
    },
  },
});

export const {
  cartFetchSuccess,
  cartUpdateData,
  cartFetchFailure,
  clearCart,
  resetCartData,
  cartBookingDetailUpdate,
  deleteProduct,
} = cartSlice.actions;

export const currentCart = (state: RootState) => state.reducer.cartData?.cartData?.find((c: any) => c.key === state.reducer.cartData?.cartItemId) ?? {};
export const cartData = (state : RootState) => state.reducer.cartData?.cartData;

export default cartSlice.reducer;
