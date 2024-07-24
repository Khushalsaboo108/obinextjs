// "use server"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessionId: string;
  cartitemId: number | null;
}

const initialState: SessionState = {
  sessionId: "",
  cartitemId: null, 
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
  },
});

export const { setSessionId, cartitemId } = sessionID.actions;
export default sessionID.reducer;
