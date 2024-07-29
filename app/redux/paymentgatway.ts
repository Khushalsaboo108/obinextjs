import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  paymentGateway: {},
  error: false,
} 

const paymentGatewaySlice = createSlice({
  name: "paymentGateway",
  initialState: initialState,
  reducers: {
    paymentGatewayFetchSuccess: (state, action) => {
      state.paymentGateway = action.payload;
    },
    paymentGatewayFetchFailure: (state) => {
      state.error = true;
    },
    resetPaymentGatewaySlice: (state) => {
      return initialState
    },
  },
});

export const { paymentGatewayFetchSuccess, paymentGatewayFetchFailure, resetPaymentGatewaySlice } = paymentGatewaySlice.actions;
export const paymentGateway = (state : RootState) => state.reducer.paymentGatewayRedux?.paymentGateway;
export default paymentGatewaySlice.reducer;