// "use server"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessionId: string;
  cartitemId: number | null;
  orderId: string;
}

const initialState: SessionState = {
  sessionId: "",
  cartitemId: null, 
  orderId:"",
};

const sessionID = createSlice({
  name: "sessionData",
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    cartitemId: (state, action) => {
      state.cartitemId = action.payload;
    },
    orderIdData: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { setSessionId, cartitemId, orderIdData } = sessionID.actions;
export default sessionID.reducer;
